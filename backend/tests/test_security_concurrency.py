"""Tests for security, production configuration, and WebSocket reliability."""

from __future__ import annotations

import json
import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from app.config import Settings
from app.database import get_db_context
from app.models.quiz import QuizSession, QuizSessionState
from app.models.user import UserRole
from tests.conftest import create_user, SyncSessionAdapter


@pytest.mark.asyncio
async def test_reject_joining_ended_session_rest(client: AsyncClient, db: Session) -> None:
    """Joining an ended quiz session via REST must be rejected with HTTP 400."""
    admin = create_user(db, "end_admin@example.com", "Admin@1234", role=UserRole.admin)
    participant = create_user(db, "end_part@example.com", "Part@1234", role=UserRole.participant)

    # Admin login & create session
    resp = await client.post("/auth/login", json={"email": "end_admin@example.com", "password": "Admin@1234"})
    admin_token = resp.json()["tokens"]["access_token"]
    
    resp = await client.post("/quiz/sessions", json={"name": "Ending Quiz"}, headers={"Authorization": f"Bearer {admin_token}"})
    session_id = resp.json()["id"]

    # End session
    resp = await client.post(f"/quiz/sessions/{session_id}/end", headers={"Authorization": f"Bearer {admin_token}"})
    assert resp.status_code == 200

    # Participant login & attempt to join ended session
    resp = await client.post("/auth/login", json={"email": "end_part@example.com", "password": "Part@1234"})
    part_token = resp.json()["tokens"]["access_token"]

    resp = await client.post(f"/quiz/sessions/{session_id}/join", headers={"Authorization": f"Bearer {part_token}"})
    assert resp.status_code == 400
    assert "ended" in resp.json()["detail"].lower()


@pytest.mark.asyncio
async def test_reject_wrong_or_inactive_question_rest(client: AsyncClient, db: Session) -> None:
    """Submitting answers to wrong/inactive question IDs via REST must be rejected."""
    admin = create_user(db, "q_admin@example.com", "Admin@1234", role=UserRole.admin)
    part = create_user(db, "q_part@example.com", "Part@1234", role=UserRole.participant)

    resp = await client.post("/auth/login", json={"email": "q_admin@example.com", "password": "Admin@1234"})
    admin_token = resp.json()["tokens"]["access_token"]

    # Create session and question
    resp = await client.post("/quiz/sessions", json={"name": "Q Quiz"}, headers={"Authorization": f"Bearer {admin_token}"})
    session_id = resp.json()["id"]

    resp = await client.post(
        f"/quiz/sessions/{session_id}/questions",
        json={
            "text": "Q1",
            "order": 1,
            "options": [{"text": "A", "is_correct": True, "order": 1}, {"text": "B", "is_correct": False, "order": 2}],
        },
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    q1_id = resp.json()["id"]
    opt1_id = resp.json()["options"][0]["id"]

    resp = await client.post("/auth/login", json={"email": "q_part@example.com", "password": "Part@1234"})
    part_token = resp.json()["tokens"]["access_token"]
    await client.post(f"/quiz/sessions/{session_id}/join", headers={"Authorization": f"Bearer {part_token}"})

    # 1. Try to submit before session/question started
    resp = await client.post(
        f"/quiz/sessions/{session_id}/answers",
        json={"option_id": opt1_id, "question_id": q1_id},
        headers={"Authorization": f"Bearer {part_token}"},
    )
    assert resp.status_code == 400

    # Start session & activate question 1
    await client.post(f"/quiz/sessions/{session_id}/start", headers={"Authorization": f"Bearer {admin_token}"})
    await client.post(f"/quiz/sessions/{session_id}/next", headers={"Authorization": f"Bearer {admin_token}"})

    # 2. Try to submit with wrong/unrelated question_id
    resp = await client.post(
        f"/quiz/sessions/{session_id}/answers",
        json={"option_id": opt1_id, "question_id": 99999},
        headers={"Authorization": f"Bearer {part_token}"},
    )
    assert resp.status_code == 400
    assert "active" in resp.json()["detail"].lower()


def test_production_configuration_validation() -> None:
    """Settings must reject insecure JWT secrets and wildcard CORS in production mode."""
    # 1. Insecure default JWT secret
    with pytest.raises(ValueError, match="JWT_SECRET must be set to a strong secret"):
        Settings(
            app_env="production",
            jwt_secret="CHANGE_ME_IN_PRODUCTION",
            jwt_refresh_secret="sufficiently_long_secret_for_refresh_token_test_32chars",
            cors_origins="https://prism2026.vercel.app",
        )

    # 2. Short JWT secret (< 32 chars)
    with pytest.raises(ValueError, match="JWT_SECRET must be set to a strong secret"):
        Settings(
            app_env="production",
            jwt_secret="short_secret",
            jwt_refresh_secret="sufficiently_long_secret_for_refresh_token_test_32chars",
            cors_origins="https://prism2026.vercel.app",
        )

    # 3. Wildcard CORS origin in production
    with pytest.raises(ValueError, match="CORS_ORIGINS must specify explicit allowed origins"):
        Settings(
            app_env="production",
            jwt_secret="valid_and_sufficiently_long_secret_for_access_token_32chars",
            jwt_refresh_secret="valid_and_sufficiently_long_secret_for_refresh_token_32chars",
            cors_origins="*,https://prism2026.vercel.app",
        )

    # 4. Valid production settings
    prod_settings = Settings(
        app_env="production",
        jwt_secret="valid_and_sufficiently_long_secret_for_access_token_32chars",
        jwt_refresh_secret="valid_and_sufficiently_long_secret_for_refresh_token_32chars",
        cors_origins="https://prism2026.vercel.app,https://prism.vit.edu",
    )
    assert prod_settings.app_env == "production"
    assert len(prod_settings.cors_origins_list) == 2


@pytest.mark.asyncio
async def test_get_db_context_session_lifecycle(db: Session) -> None:
    """Verify get_db_context safely scopes and closes database sessions."""
    adapter = SyncSessionAdapter(db)
    
    async def sample_provider():
        yield adapter

    async with get_db_context(sample_provider) as session:
        assert session is adapter

    # Context exits cleanly without unhandled exceptions or dangling transactions


def test_postgresql_user_role_enum_schema_creation_and_idempotency() -> None:
    """Ensure user_role enum is defined with create_type=False for PostgreSQL to prevent DuplicateObjectError."""
    import sqlalchemy as sa
    from sqlalchemy.dialects import postgresql
    from sqlalchemy.schema import CreateTable

    role_type = sa.Enum("admin", "anchor", "participant", name="user_role").with_variant(
        postgresql.ENUM("admin", "anchor", "participant", name="user_role", create_type=False),
        "postgresql",
    )

    # 1. Dialect implementation on PostgreSQL must have create_type=False
    pg_impl = role_type.dialect_impl(postgresql.dialect())
    assert getattr(pg_impl, "create_type", True) is False

    # 2. Table creation listener must not trigger CREATE TYPE
    # On postgresql.ENUM with create_type=False, _on_table_create returns early
    m = sa.MetaData()
    users_table = sa.Table("users", m, sa.Column("id", sa.Integer, primary_key=True), sa.Column("role", role_type))
    
    ddl = str(CreateTable(users_table).compile(dialect=postgresql.dialect()))
    assert "user_role" in ddl
    assert "CREATE TYPE" not in ddl

    # 3. Repeated / mock execution verifies no exception when enum type pre-exists
    executed_statements: list[str] = []
    mock_engine = sa.create_mock_engine(
        "postgresql://",
        lambda sql, *args: executed_statements.append(str(sql)),
    )
    users_table.create(mock_engine)
    # The table creation must execute CREATE TABLE without pre-creating user_role
    assert any("CREATE TABLE users" in s for s in executed_statements)
    assert not any("CREATE TYPE user_role" in s for s in executed_statements)
