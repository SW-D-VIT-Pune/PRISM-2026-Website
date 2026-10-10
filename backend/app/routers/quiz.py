"""PRISM '26 — Quiz router."""

from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.dependencies.auth import get_current_user, require_role
from app.models.quiz import (
    Answer,
    Question,
    QuestionOption,
    QuizSession,
    QuizSessionState,
    SessionParticipant,
)
from app.models.user import User, UserRole
from app.schemas.quiz import (
    AnswerResponse,
    AnswerSubmit,
    LeaderboardEntry,
    LeaderboardResponse,
    QuestionCreate,
    QuestionOut,
    QuestionUpdate,
    QuizSessionCreate,
    QuizSessionOut,
    ResultsResponse,
    SessionJoinResponse,
)

router = APIRouter(prefix="/quiz", tags=["quiz"])

# Import AsyncSession only if not in test mode
IS_TESTING = os.getenv("APP_ENV") == "testing"
if not IS_TESTING:
    from sqlalchemy.ext.asyncio import AsyncSession


# ── Session Management ───────────────────────────────────────────────────────


@router.post("/sessions", response_model=QuizSessionOut, status_code=status.HTTP_201_CREATED)
async def create_session(
    body: QuizSessionCreate,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuizSessionOut:
    """Create a new quiz session."""
    session = QuizSession(
        name=body.name,
        state=QuizSessionState.created,
        created_by=current_user.id,
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


@router.get("/sessions", response_model=list[QuizSessionOut])
async def list_sessions(
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> list[QuizSession]:
    """List all quiz sessions."""
    result = await db.execute(
        select(QuizSession).order_by(QuizSession.created_at.desc())
    )
    return list(result.scalars().all())


@router.get("/sessions/{session_id}", response_model=QuizSessionOut)
async def get_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> QuizSessionOut:
    """Get a quiz session by ID."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/sessions/{session_id}/join", response_model=SessionJoinResponse)
async def join_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> SessionJoinResponse:
    """Join a quiz session as a participant."""
    # Verify session exists
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.state == QuizSessionState.ended:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot join an ended quiz session",
        )

    # Check if already joined
    result = await db.execute(
        select(SessionParticipant).where(
            SessionParticipant.session_id == session_id,
            SessionParticipant.user_id == current_user.id,
        )
    )
    participant = result.scalar_one_or_none()
    if participant:
        return participant

    # Create participant
    participant = SessionParticipant(
        session_id=session_id,
        user_id=current_user.id,
        score=0,
    )
    db.add(participant)
    await db.commit()
    await db.refresh(participant)
    return participant


# ── Question Management ──────────────────────────────────────────────────────


@router.post("/sessions/{session_id}/questions", response_model=QuestionOut, status_code=status.HTTP_201_CREATED)
async def create_question(
    session_id: int,
    body: QuestionCreate,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuestionOut:
    """Add a question to a quiz session."""
    # Verify session exists and user is creator
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Create question
    question = Question(
        session_id=session_id,
        text=body.text,
        order=body.order,
        time_limit_seconds=body.time_limit_seconds,
    )
    db.add(question)
    await db.flush()

    # Create options
    for opt_data in body.options:
        option = QuestionOption(
            question_id=question.id,
            text=opt_data.text,
            is_correct=opt_data.is_correct,
            order=opt_data.order,
        )
        db.add(option)

    await db.commit()
    await db.refresh(question)

    # Load options for response
    result = await db.execute(
        select(Question)
        .options(selectinload(Question.options))
        .where(Question.id == question.id)
    )
    question = result.scalar_one()
    return question


@router.get("/sessions/{session_id}/questions", response_model=list[QuestionOut])
async def list_questions(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> list[Question]:
    """Get questions for a session."""
    result = await db.execute(
        select(Question)
        .options(selectinload(Question.options))
        .where(Question.session_id == session_id)
        .order_by(Question.order)
    )
    return list(result.scalars().all())


@router.patch("/sessions/{session_id}/questions/{question_id}", response_model=QuestionOut)
async def update_question(
    session_id: int,
    question_id: int,
    body: QuestionUpdate,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuestionOut:
    """Update a question."""
    result = await db.execute(
        select(Question)
        .options(selectinload(Question.options))
        .where(Question.id == question_id, Question.session_id == session_id)
    )
    question = result.scalar_one_or_none()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Verify authorization
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one()
    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Update fields
    if body.text is not None:
        question.text = body.text
    if body.time_limit_seconds is not None:
        question.time_limit_seconds = body.time_limit_seconds

    # Update options if provided
    if body.options is not None:
        # Delete existing options
        for opt in question.options:
            await db.delete(opt)
        # Add new options
        for opt_data in body.options:
            option = QuestionOption(
                question_id=question.id,
                text=opt_data.text,
                is_correct=opt_data.is_correct,
                order=opt_data.order,
            )
            db.add(option)

    await db.commit()
    await db.refresh(question)

    # Reload with options
    result = await db.execute(
        select(Question)
        .options(selectinload(Question.options))
        .where(Question.id == question.id)
    )
    question = result.scalar_one()
    return question


@router.delete("/sessions/{session_id}/questions/{question_id}")
async def delete_question(
    session_id: int,
    question_id: int,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> None:
    """Delete a question."""
    result = await db.execute(
        select(Question).where(Question.id == question_id, Question.session_id == session_id)
    )
    question = result.scalar_one_or_none()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Verify authorization
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one()
    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    await db.delete(question)
    await db.commit()


# ── Quiz Control ─────────────────────────────────────────────────────────────


@router.post("/sessions/{session_id}/start", response_model=QuizSessionOut)
async def start_session(
    session_id: int,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuizSessionOut:
    """Start a quiz session."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    session.state = QuizSessionState.active
    await db.commit()
    await db.refresh(session)
    return session


@router.post("/sessions/{session_id}/next", response_model=QuizSessionOut)
async def next_question(
    session_id: int,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuizSessionOut:
    """Move to the next question in the session."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Get current question order
    current_order = 0
    if session.current_question_id:
        result = await db.execute(
            select(Question).where(Question.id == session.current_question_id)
        )
        current_q = result.scalar_one_or_none()
        if current_q:
            current_order = current_q.order

    # Get next question
    result = await db.execute(
        select(Question)
        .where(Question.session_id == session_id, Question.order > current_order)
        .order_by(Question.order)
        .limit(1)
    )
    next_q = result.scalar_one_or_none()

    if not next_q:
        raise HTTPException(status_code=400, detail="No more questions")

    # Deactivate current question
    if session.current_question_id:
        result = await db.execute(
            select(Question).where(Question.id == session.current_question_id)
        )
        current_q = result.scalar_one()
        current_q.is_active = False

    # Activate next question
    next_q.is_active = True
    session.current_question_id = next_q.id

    await db.commit()
    await db.refresh(session)
    return session


@router.post("/sessions/{session_id}/end", response_model=QuizSessionOut)
async def end_session(
    session_id: int,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> QuizSessionOut:
    """End a quiz session."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.created_by != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    session.state = QuizSessionState.ended
    if session.current_question_id:
        result = await db.execute(
            select(Question).where(Question.id == session.current_question_id)
        )
        current_q = result.scalar_one()
        current_q.is_active = False
        session.current_question_id = None

    await db.commit()
    await db.refresh(session)
    return session


# ── Answer Submission ────────────────────────────────────────────────────────


@router.post("/sessions/{session_id}/answers", response_model=AnswerResponse)
async def submit_answer(
    session_id: int,
    body: AnswerSubmit,
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> AnswerResponse:
    """Submit an answer for the current question."""
    # Verify session is active
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.state != QuizSessionState.active:
        raise HTTPException(status_code=400, detail="Session is not active")
    if not session.current_question_id:
        raise HTTPException(status_code=400, detail="No active question")

    # If question_id is provided in body, ensure it matches the active question
    if body.question_id is not None and body.question_id != session.current_question_id:
        raise HTTPException(status_code=400, detail="Question is not currently active")

    # Verify current question is active
    result = await db.execute(
        select(Question).where(
            Question.id == session.current_question_id,
            Question.session_id == session_id,
            Question.is_active == True,
        )
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Current question is not active")

    # Verify participant
    result = await db.execute(
        select(SessionParticipant).where(
            SessionParticipant.session_id == session_id,
            SessionParticipant.user_id == current_user.id,
        )
    )
    participant = result.scalar_one_or_none()
    if not participant:
        raise HTTPException(status_code=403, detail="Not a participant")

    # Verify option exists and belongs to current question
    result = await db.execute(
        select(QuestionOption).where(
            QuestionOption.id == body.option_id,
            QuestionOption.question_id == session.current_question_id,
        )
    )
    option = result.scalar_one_or_none()
    if not option:
        raise HTTPException(status_code=400, detail="Invalid option")

    # Check for duplicate answer
    result = await db.execute(
        select(Answer).where(
            Answer.question_id == session.current_question_id,
            Answer.participant_id == participant.id,
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Already answered")

    # Create answer
    answer = Answer(
        session_id=session_id,
        question_id=session.current_question_id,
        participant_id=participant.id,
        option_id=body.option_id,
        is_correct=option.is_correct,
    )
    db.add(answer)

    # Update score if correct
    if option.is_correct:
        participant.score += 1

    await db.commit()
    await db.refresh(answer)
    return answer


# ── Results ─────────────────────────────────────────────────────────────────


@router.get("/sessions/{session_id}/results", response_model=ResultsResponse)
async def get_results(
    session_id: int,
    current_user: User = Depends(require_role(UserRole.admin, UserRole.anchor)),
    db = Depends(get_db),  # type: ignore
) -> ResultsResponse:
    """Get detailed results for a session."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Get total questions
    result = await db.execute(
        select(func.count(Question.id)).where(Question.session_id == session_id)
    )
    total_questions = result.scalar() or 0

    # Get total participants
    result = await db.execute(
        select(func.count(SessionParticipant.id)).where(
            SessionParticipant.session_id == session_id
        )
    )
    total_participants = result.scalar() or 0

    # Get all answers with participant info
    result = await db.execute(
        select(Answer)
        .join(SessionParticipant)
        .where(Answer.session_id == session_id)
    )
    answers = result.scalars().all()

    return ResultsResponse(
        session_id=session_id,
        total_questions=total_questions,
        total_participants=total_participants,
        answers=[
            {
                "question_id": a.question_id,
                "participant_id": a.participant_id,
                "option_id": a.option_id,
                "is_correct": a.is_correct,
                "submitted_at": a.submitted_at.isoformat(),
            }
            for a in answers
        ],
    )


@router.get("/sessions/{session_id}/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db = Depends(get_db),  # type: ignore
) -> LeaderboardResponse:
    """Get leaderboard for a session."""
    result = await db.execute(
        select(QuizSession).where(QuizSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Get participants ordered by score
    result = await db.execute(
        select(SessionParticipant)
        .where(SessionParticipant.session_id == session_id)
        .order_by(SessionParticipant.score.desc())
    )
    participants = result.scalars().all()

    leaderboard = [
        LeaderboardEntry(
            user_id=p.user_id,
            score=p.score,
            rank=idx + 1,
        )
        for idx, p in enumerate(participants)
    ]

    return LeaderboardResponse(session_id=session_id, leaderboard=leaderboard)
