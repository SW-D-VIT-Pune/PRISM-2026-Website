"""PRISM '26 — WebSocket router for real-time quiz communication."""

from __future__ import annotations

import json
import os
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect, status
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db, get_db_context
from app.dependencies.auth import get_current_user
from app.models.quiz import (
    Answer,
    Question,
    QuestionOption,
    QuizSession,
    QuizSessionState,
    SessionParticipant,
)
from app.models.user import User, UserRole
from app.services.auth import decode_access_token

router = APIRouter()

# Import AsyncSession only if not in test mode
IS_TESTING = os.getenv("APP_ENV") == "testing"
USE_SYNC_MODE = os.getenv("SYNC_MODE") == "true"
if not IS_TESTING and not USE_SYNC_MODE:
    from sqlalchemy.ext.asyncio import AsyncSession


# ── Connection Manager ───────────────────────────────────────────────────────


class ConnectionManager:
    """Manages WebSocket connections and broadcasts."""

    def __init__(self) -> None:
        # session_id -> list of (websocket, user_id, role)
        self.active_connections: dict[int, list[tuple[WebSocket, int, str]]] = {}

    async def connect(self, websocket: WebSocket, session_id: int, user_id: int, role: str) -> None:
        """Register an accepted connection for a session."""
        if session_id not in self.active_connections:
            self.active_connections[session_id] = []
        self.active_connections[session_id].append((websocket, user_id, role))

    def disconnect(self, websocket: WebSocket, session_id: int) -> None:
        """Remove a connection."""
        if session_id in self.active_connections:
            self.active_connections[session_id] = [
                (ws, uid, r) for ws, uid, r in self.active_connections[session_id] if ws != websocket
            ]
            if not self.active_connections[session_id]:
                del self.active_connections[session_id]

    async def send_personal(self, message: dict[str, Any], websocket: WebSocket) -> None:
        """Send a message to a specific client."""
        await websocket.send_json(message)

    async def broadcast(self, session_id: int, message: dict[str, Any]) -> None:
        """Broadcast a message to all clients in a session."""
        if session_id in self.active_connections:
            for websocket, _, _ in self.active_connections[session_id]:
                try:
                    await websocket.send_json(message)
                except Exception:
                    # Connection may be dead, will be cleaned up on disconnect
                    pass


manager = ConnectionManager()


# ── WebSocket Endpoint ───────────────────────────────────────────────────────


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...),
) -> None:
    """Main WebSocket endpoint for quiz communication.

    Uses short-lived database sessions per event instead of keeping a DB handle
    open for the lifetime of the socket, protecting the connection pool.
    """
    def get_scoped_db():
        provider = websocket.app.dependency_overrides.get(get_db, get_db)
        return get_db_context(provider)

    # Authenticate via JWT
    try:
        payload = decode_access_token(token)
        user_id = int(payload["sub"])
        user_role = payload["role"]
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # Verify user in DB with short-lived session
    async with get_scoped_db() as db:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user or not user.is_active:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

    await websocket.accept()

    # Store session info after join
    current_session_id: int | None = None

    try:
        while True:
            data = await websocket.receive_json()
            message_type = data.get("type")

            # ── PING ───────────────────────────────────────────────────────
            if message_type == "ping":
                await manager.send_personal({"type": "pong"}, websocket)

            # ── JOIN SESSION ─────────────────────────────────────────────────
            elif message_type == "join_session":
                session_id = data.get("session_id")
                if not session_id:
                    await manager.send_personal(
                        {"type": "error", "detail": "Missing session_id"}, websocket
                    )
                    continue

                active_q_data: dict[str, Any] | None = None
                already_answered = False

                async with get_scoped_db() as db:
                    result = await db.execute(
                        select(QuizSession).where(QuizSession.id == session_id)
                    )
                    session = result.scalar_one_or_none()
                    if not session:
                        await manager.send_personal(
                            {"type": "error", "detail": "Session not found"}, websocket
                        )
                        continue

                    # Reject joining ended sessions
                    if session.state == QuizSessionState.ended:
                        await manager.send_personal(
                            {"type": "error", "detail": "Cannot join an ended quiz session"}, websocket
                        )
                        continue

                    # Connect to session
                    await manager.connect(websocket, session_id, user_id, user_role)
                    current_session_id = session_id

                    # Verify / auto-join participant
                    result = await db.execute(
                        select(SessionParticipant).where(
                            SessionParticipant.session_id == session_id,
                            SessionParticipant.user_id == user_id,
                        )
                    )
                    participant = result.scalar_one_or_none()
                    if not participant:
                        if user_role == UserRole.participant.value:
                            participant = SessionParticipant(
                                session_id=session_id, user_id=user_id, score=0
                            )
                            db.add(participant)
                            await db.commit()

                    # Reconnect / catch-up: if session has active question, fetch it
                    if session.state == QuizSessionState.active and session.current_question_id:
                        result = await db.execute(
                            select(Question)
                            .options(selectinload(Question.options))
                            .where(
                                Question.id == session.current_question_id,
                                Question.is_active == True,
                            )
                        )
                        current_q = result.scalar_one_or_none()
                        if current_q:
                            active_q_data = {
                                "question_id": current_q.id,
                                "text": current_q.text,
                                "time_limit_seconds": current_q.time_limit_seconds,
                                "options": [
                                    {"id": opt.id, "text": opt.text, "order": opt.order}
                                    for opt in current_q.options
                                ],
                            }
                            if participant:
                                res_ans = await db.execute(
                                    select(Answer).where(
                                        Answer.question_id == current_q.id,
                                        Answer.participant_id == participant.id,
                                    )
                                )
                                already_answered = res_ans.scalar_one_or_none() is not None

                await manager.send_personal(
                    {
                        "type": "session_joined",
                        "data": {
                            "session_id": session_id,
                            "user_id": user_id,
                            "role": user_role,
                        },
                    },
                    websocket,
                )

                # Send active question state to reconnecting/late-joining participant
                if active_q_data:
                    active_q_data["already_answered"] = already_answered
                    await manager.send_personal(
                        {
                            "type": "question_broadcast",
                            "data": active_q_data,
                        },
                        websocket,
                    )

            # ── SUBMIT ANSWER ───────────────────────────────────────────────
            elif message_type == "submit_answer":
                if not current_session_id:
                    await manager.send_personal(
                        {"type": "error", "detail": "Not joined to a session"}, websocket
                    )
                    continue

                session_id = data.get("session_id")
                question_id = data.get("question_id")
                option_id = data.get("option_id")

                if not all([session_id, question_id, option_id]):
                    await manager.send_personal(
                        {"type": "error", "detail": "Missing required fields"}, websocket
                    )
                    continue

                option_counts: dict[int, int] = {}
                total_answers = 0

                async with get_scoped_db() as db:
                    # Verify session is active
                    result = await db.execute(
                        select(QuizSession).where(QuizSession.id == session_id)
                    )
                    session = result.scalar_one_or_none()
                    if not session or session.state != QuizSessionState.active:
                        await manager.send_personal(
                            {"type": "error", "detail": "Session not active"}, websocket
                        )
                        continue

                    # Validate question is the active question of the session
                    if not session.current_question_id or session.current_question_id != question_id:
                        await manager.send_personal(
                            {"type": "error", "detail": "Question is not currently active"}, websocket
                        )
                        continue

                    # Verify question itself is active
                    result = await db.execute(
                        select(Question).where(
                            Question.id == question_id,
                            Question.session_id == session_id,
                            Question.is_active == True,
                        )
                    )
                    question = result.scalar_one_or_none()
                    if not question:
                        await manager.send_personal(
                            {"type": "error", "detail": "Question is not active"}, websocket
                        )
                        continue

                    # Verify participant
                    result = await db.execute(
                        select(SessionParticipant).where(
                            SessionParticipant.session_id == session_id,
                            SessionParticipant.user_id == user_id,
                        )
                    )
                    participant = result.scalar_one_or_none()
                    if not participant:
                        await manager.send_personal(
                            {"type": "error", "detail": "Not a participant"}, websocket
                        )
                        continue

                    # Verify option belongs to question
                    result = await db.execute(
                        select(QuestionOption).where(
                            QuestionOption.id == option_id,
                            QuestionOption.question_id == question_id,
                        )
                    )
                    option = result.scalar_one_or_none()
                    if not option:
                        await manager.send_personal(
                            {"type": "error", "detail": "Invalid option"}, websocket
                        )
                        continue

                    # Check duplicate
                    result = await db.execute(
                        select(Answer).where(
                            Answer.question_id == question_id,
                            Answer.participant_id == participant.id,
                        )
                    )
                    if result.scalar_one_or_none():
                        await manager.send_personal(
                            {"type": "error", "detail": "Already answered"}, websocket
                        )
                        continue

                    # Create answer
                    answer = Answer(
                        session_id=session_id,
                        question_id=question_id,
                        participant_id=participant.id,
                        option_id=option_id,
                        is_correct=option.is_correct,
                    )
                    db.add(answer)

                    if option.is_correct:
                        participant.score += 1

                    await db.commit()

                    # Query live counts
                    result = await db.execute(
                        select(Answer).where(Answer.question_id == question_id)
                    )
                    answers = result.scalars().all()
                    for a in answers:
                        option_counts[a.option_id] = option_counts.get(a.option_id, 0) + 1
                    total_answers = len(answers)

                # Send acknowledgment WITHOUT leaking is_correct while question is live
                await manager.send_personal(
                    {
                        "type": "answer_acknowledged",
                        "data": {
                            "question_id": question_id,
                            "status": "submitted",
                        },
                    },
                    websocket,
                )

                # Broadcast live poll update
                await manager.broadcast(
                    session_id,
                    {
                        "type": "live_poll_update",
                        "data": {
                            "question_id": question_id,
                            "option_counts": option_counts,
                            "total_answers": total_answers,
                        },
                    },
                )

            # ── BROADCAST QUESTION (admin/anchor only) ─────────────────────
            elif message_type == "broadcast_question":
                if user_role not in [UserRole.admin.value, UserRole.anchor.value]:
                    await manager.send_personal(
                        {"type": "error", "detail": "Not authorized"}, websocket
                    )
                    continue

                session_id = data.get("session_id")
                question_id = data.get("question_id")

                if not all([session_id, question_id]):
                    await manager.send_personal(
                        {"type": "error", "detail": "Missing required fields"}, websocket
                    )
                    continue

                bcast_data: dict[str, Any] | None = None
                async with get_scoped_db() as db:
                    result = await db.execute(
                        select(QuizSession).where(QuizSession.id == session_id)
                    )
                    session = result.scalar_one_or_none()
                    if not session:
                        await manager.send_personal(
                            {"type": "error", "detail": "Session not found"}, websocket
                        )
                        continue

                    if session.created_by != user_id and user_role != UserRole.admin.value:
                        await manager.send_personal(
                            {"type": "error", "detail": "Not authorized"}, websocket
                        )
                        continue

                    result = await db.execute(
                        select(Question)
                        .options(selectinload(Question.options))
                        .where(Question.id == question_id)
                    )
                    question = result.scalar_one_or_none()
                    if not question:
                        await manager.send_personal(
                            {"type": "error", "detail": "Question not found"}, websocket
                        )
                        continue

                    question.is_active = True
                    session.current_question_id = question_id
                    await db.commit()

                    bcast_data = {
                        "question_id": question.id,
                        "text": question.text,
                        "time_limit_seconds": question.time_limit_seconds,
                        "options": [
                            {"id": opt.id, "text": opt.text, "order": opt.order}
                            for opt in question.options
                        ],
                    }

                if bcast_data:
                    await manager.broadcast(
                        session_id,
                        {
                            "type": "question_broadcast",
                            "data": bcast_data,
                        },
                    )

            # ── END QUESTION (admin/anchor only) ────────────────────────────
            elif message_type == "end_question":
                if user_role not in [UserRole.admin.value, UserRole.anchor.value]:
                    await manager.send_personal(
                        {"type": "error", "detail": "Not authorized"}, websocket
                    )
                    continue

                session_id = data.get("session_id")
                question_id = data.get("question_id")

                if not all([session_id, question_id]):
                    await manager.send_personal(
                        {"type": "error", "detail": "Missing required fields"}, websocket
                    )
                    continue

                correct_option_ids: list[int] = []
                async with get_scoped_db() as db:
                    result = await db.execute(
                        select(Question).where(
                            Question.id == question_id,
                            Question.session_id == session_id,
                        )
                    )
                    question = result.scalar_one_or_none()
                    if question:
                        question.is_active = False
                        await db.commit()

                    result = await db.execute(
                        select(QuestionOption.id).where(
                            QuestionOption.question_id == question_id,
                            QuestionOption.is_correct == True,
                        )
                    )
                    correct_option_ids = [opt_id for opt_id in result.scalars().all()]

                # Broadcast question ended with correct answers now revealed safely
                await manager.broadcast(
                    session_id,
                    {
                        "type": "question_ended",
                        "data": {
                            "question_id": question_id,
                            "correct_option_ids": correct_option_ids,
                        },
                    },
                )

            # ── END SESSION (admin/anchor only) ────────────────────────────
            elif message_type == "end_session":
                if user_role not in [UserRole.admin.value, UserRole.anchor.value]:
                    await manager.send_personal(
                        {"type": "error", "detail": "Not authorized"}, websocket
                    )
                    continue

                session_id = data.get("session_id")
                if not session_id:
                    await manager.send_personal(
                        {"type": "error", "detail": "Missing session_id"}, websocket
                    )
                    continue

                async with get_scoped_db() as db:
                    result = await db.execute(
                        select(QuizSession).where(QuizSession.id == session_id)
                    )
                    session = result.scalar_one_or_none()
                    if session:
                        session.state = QuizSessionState.ended
                        session.current_question_id = None
                        await db.commit()

                await manager.broadcast(
                    session_id,
                    {
                        "type": "session_ended",
                        "data": {"session_id": session_id},
                    },
                )

            else:
                await manager.send_personal(
                    {"type": "error", "detail": "Unknown message type"}, websocket
                )

    except WebSocketDisconnect:
        if current_session_id:
            manager.disconnect(websocket, current_session_id)
    except Exception as e:
        await manager.send_personal({"type": "error", "detail": str(e)}, websocket)
        if current_session_id:
            manager.disconnect(websocket, current_session_id)
