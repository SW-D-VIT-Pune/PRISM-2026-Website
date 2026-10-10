"""Tests for quiz endpoints."""

from __future__ import annotations

import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from app.models.quiz import QuizSession, QuizSessionState
from app.models.user import User, UserRole
from tests.conftest import create_user


@pytest.mark.asyncio
async def test_create_session(client: AsyncClient, db: Session) -> None:
    """Admin can create a quiz session."""
    admin = create_user(db, "quiz_admin_1@example.com", "QuizAdmin@1234", role=UserRole.admin)

    # Login to get token
    resp = await client.post(
        "/auth/login", json={"email": "quiz_admin_1@example.com", "password": "QuizAdmin@1234"}
    )
    token = resp.json()["tokens"]["access_token"]

    # Create session
    resp = await client.post(
        "/quiz/sessions",
        json={"name": "Test Quiz"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Test Quiz"
    assert data["state"] == QuizSessionState.created
    assert data["created_by"] == admin.id


@pytest.mark.asyncio
async def test_create_question(client: AsyncClient, db: Session) -> None:
    """Admin can add questions to a session."""
    admin = create_user(db, "quiz_admin_2@example.com", "QuizAdmin@1234", role=UserRole.admin)

    # Login
    resp = await client.post(
        "/auth/login", json={"email": "quiz_admin_2@example.com", "password": "QuizAdmin@1234"}
    )
    token = resp.json()["tokens"]["access_token"]

    # Create session
    resp = await client.post(
        "/quiz/sessions",
        json={"name": "Test Quiz"},
        headers={"Authorization": f"Bearer {token}"},
    )
    session_id = resp.json()["id"]

    # Create question
    resp = await client.post(
        f"/quiz/sessions/{session_id}/questions",
        json={
            "text": "What is 2+2?",
            "order": 1,
            "time_limit_seconds": 30,
            "options": [
                {"text": "3", "is_correct": False, "order": 1},
                {"text": "4", "is_correct": True, "order": 2},
                {"text": "5", "is_correct": False, "order": 3},
            ],
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["text"] == "What is 2+2?"
    assert len(data["options"]) == 3


@pytest.mark.asyncio
async def test_join_session(client: AsyncClient, db: Session) -> None:
    """Participant can join a session."""
    admin = create_user(db, "quiz_admin_3@example.com", "QuizAdmin@1234", role=UserRole.admin)
    participant = create_user(db, "quiz_participant_1@example.com", "QuizParticipant@1234", role=UserRole.participant)

    # Login as admin
    resp = await client.post(
        "/auth/login", json={"email": "quiz_admin_3@example.com", "password": "QuizAdmin@1234"}
    )
    admin_token = resp.json()["tokens"]["access_token"]

    # Create session
    resp = await client.post(
        "/quiz/sessions",
        json={"name": "Test Quiz"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    session_id = resp.json()["id"]

    # Login as participant
    resp = await client.post(
        "/auth/login", json={"email": "quiz_participant_1@example.com", "password": "QuizParticipant@1234"}
    )
    participant_token = resp.json()["tokens"]["access_token"]

    # Join session
    resp = await client.post(
        f"/quiz/sessions/{session_id}/join",
        headers={"Authorization": f"Bearer {participant_token}"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["session_id"] == session_id
    assert data["user_id"] == participant.id
    assert data["score"] == 0


@pytest.mark.asyncio
async def test_submit_answer(client: AsyncClient, db: Session) -> None:
    """Participant can submit an answer."""
    admin = create_user(db, "quiz_admin_4@example.com", "QuizAdmin@1234", role=UserRole.admin)
    participant = create_user(db, "quiz_participant_2@example.com", "QuizParticipant@1234", role=UserRole.participant)

    # Login as admin
    resp = await client.post(
        "/auth/login", json={"email": "quiz_admin_4@example.com", "password": "QuizAdmin@1234"}
    )
    admin_token = resp.json()["tokens"]["access_token"]

    # Create session and question
    resp = await client.post(
        "/quiz/sessions",
        json={"name": "Test Quiz"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    session_id = resp.json()["id"]

    resp = await client.post(
        f"/quiz/sessions/{session_id}/questions",
        json={
            "text": "What is 2+2?",
            "order": 1,
            "options": [
                {"text": "3", "is_correct": False, "order": 1},
                {"text": "4", "is_correct": True, "order": 2},
            ],
        },
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    question_id = resp.json()["id"]
    correct_option_id = resp.json()["options"][1]["id"]

    # Start session
    await client.post(
        f"/quiz/sessions/{session_id}/start",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    # Move to first question
    await client.post(
        f"/quiz/sessions/{session_id}/next",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    # Login as participant and join
    resp = await client.post(
        "/auth/login", json={"email": "quiz_participant_2@example.com", "password": "QuizParticipant@1234"}
    )
    participant_token = resp.json()["tokens"]["access_token"]

    await client.post(
        f"/quiz/sessions/{session_id}/join",
        headers={"Authorization": f"Bearer {participant_token}"},
    )

    # Submit answer
    resp = await client.post(
        f"/quiz/sessions/{session_id}/answers",
        json={"option_id": correct_option_id},
        headers={"Authorization": f"Bearer {participant_token}"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_correct"] is True


@pytest.mark.asyncio
async def test_get_leaderboard(client: AsyncClient, db: Session) -> None:
    """Users can view leaderboard."""
    admin = create_user(db, "quiz_admin_5@example.com", "QuizAdmin@1234", role=UserRole.admin)
    participant = create_user(db, "quiz_participant_3@example.com", "QuizParticipant@1234", role=UserRole.participant)

    # Login as admin
    resp = await client.post(
        "/auth/login", json={"email": "quiz_admin_5@example.com", "password": "QuizAdmin@1234"}
    )
    admin_token = resp.json()["tokens"]["access_token"]

    # Create session
    resp = await client.post(
        "/quiz/sessions",
        json={"name": "Test Quiz"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    session_id = resp.json()["id"]

    # Login as participant and join
    resp = await client.post(
        "/auth/login", json={"email": "quiz_participant_3@example.com", "password": "QuizParticipant@1234"}
    )
    participant_token = resp.json()["tokens"]["access_token"]

    await client.post(
        f"/quiz/sessions/{session_id}/join",
        headers={"Authorization": f"Bearer {participant_token}"},
    )

    # Get leaderboard
    resp = await client.get(
        f"/quiz/sessions/{session_id}/leaderboard",
        headers={"Authorization": f"Bearer {participant_token}"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["session_id"] == session_id
    assert len(data["leaderboard"]) == 1
    assert data["leaderboard"][0]["user_id"] == participant.id
    assert data["leaderboard"][0]["rank"] == 1
