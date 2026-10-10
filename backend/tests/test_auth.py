"""Tests for authentication endpoints and RBAC dependencies.

Coverage
--------
  - POST /auth/login — success
  - POST /auth/login — wrong password
  - POST /auth/login — non-existent email
  - POST /auth/login — inactive user
  - POST /auth/login — malformed email → 422
  - POST /auth/refresh — valid refresh token
  - POST /auth/refresh — invalid/garbage token
  - POST /auth/refresh — passing an access token → rejected
  - POST /auth/refresh — inactive user
  - Access token JWT claims validation
  - RBAC: require_role — correct role → passes
  - RBAC: require_role — wrong role → 403
  - RBAC: require_role — multi-role acceptance
"""

from __future__ import annotations

import jwt
import pytest
from httpx import AsyncClient
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from app.config import get_settings
from app.dependencies.auth import require_role
from app.models.user import User, UserRole
from app.services.auth import create_access_token, create_refresh_token
from tests.conftest import create_user

settings = get_settings()

# ─────────────────────────────────────────────────────────────────────────────
# Test user credentials
# ─────────────────────────────────────────────────────────────────────────────

ADMIN_EMAIL = "auth_test_admin@example.com"
ADMIN_PASS = "TestAdmin@5678"

ANCHOR_EMAIL = "auth_test_anchor@example.com"
ANCHOR_PASS = "TestAnchor@5678"

PARTICIPANT_EMAIL = "auth_test_participant@example.com"
PARTICIPANT_PASS = "TestParticipant@5678"

INACTIVE_EMAIL = "auth_test_inactive@example.com"
INACTIVE_PASS = "TestInactive@5678"


# ─────────────────────────────────────────────────────────────────────────────
# Login — success
# ─────────────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient, db: Session) -> None:
    """Valid credentials must return 200 with access + refresh tokens."""
    create_user(db, ADMIN_EMAIL, ADMIN_PASS, role=UserRole.admin)

    response = await client.post(
        "/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS}
    )
    assert response.status_code == 200
    data = response.json()

    assert "tokens" in data
    assert "user" in data
    assert data["tokens"]["token_type"] == "bearer"
    assert data["tokens"]["access_token"]
    assert data["tokens"]["refresh_token"]

    assert data["user"]["email"] == ADMIN_EMAIL
    assert data["user"]["role"] == "admin"
    assert data["user"]["is_active"] is True
    assert "password_hash" not in data["user"]


@pytest.mark.asyncio
async def test_login_returns_valid_access_token_claims(
    client: AsyncClient, db: Session
) -> None:
    """Access token must carry the expected JWT claims."""
    create_user(db, ANCHOR_EMAIL, ANCHOR_PASS, role=UserRole.anchor)

    resp = await client.post(
        "/auth/login", json={"email": ANCHOR_EMAIL, "password": ANCHOR_PASS}
    )
    assert resp.status_code == 200
    token = resp.json()["tokens"]["access_token"]

    payload = jwt.decode(
        token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
    )
    assert payload["type"] == "access"
    assert payload["role"] == "anchor"
    assert payload["email"] == ANCHOR_EMAIL
    assert "sub" in payload
    assert "exp" in payload


# ─────────────────────────────────────────────────────────────────────────────
# Login — failure cases
# ─────────────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient, db: Session) -> None:
    """Wrong password must return 401, not 400 or 404."""
    create_user(db, PARTICIPANT_EMAIL, PARTICIPANT_PASS)

    resp = await client.post(
        "/auth/login",
        json={"email": PARTICIPANT_EMAIL, "password": "WrongPassword!"},
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_login_nonexistent_email(client: AsyncClient) -> None:
    """Logging in with an unknown email must return 401 (not 404 — prevents enumeration)."""
    resp = await client.post(
        "/auth/login",
        json={"email": "ghost@prism26.dev", "password": "anything"},
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_login_inactive_user(client: AsyncClient, db: Session) -> None:
    """Inactive users must not be able to log in (returns 401)."""
    create_user(db, INACTIVE_EMAIL, INACTIVE_PASS, is_active=False)

    resp = await client.post(
        "/auth/login", json={"email": INACTIVE_EMAIL, "password": INACTIVE_PASS}
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_login_invalid_email_format(client: AsyncClient) -> None:
    """Malformed email in request body should return 422 Unprocessable Entity."""
    resp = await client.post(
        "/auth/login", json={"email": "not-an-email", "password": "somepass"}
    )
    assert resp.status_code == 422


# ─────────────────────────────────────────────────────────────────────────────
# Refresh token
# ─────────────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_refresh_success(client: AsyncClient, db: Session) -> None:
    """A valid refresh token must return a new token pair (with token rotation)."""
    user = create_user(db, "refresh_ok@example.com", "Refresh@1234")
    refresh_token = create_refresh_token(user)

    resp = await client.post("/auth/refresh", json={"refresh_token": refresh_token})
    assert resp.status_code == 200

    data = resp.json()
    assert data["access_token"]
    assert data["refresh_token"]
    # Token rotation — new refresh token differs from old
    assert data["refresh_token"] != refresh_token


@pytest.mark.asyncio
async def test_refresh_with_garbage_token(client: AsyncClient) -> None:
    """A garbage token string must return 401."""
    resp = await client.post(
        "/auth/refresh", json={"refresh_token": "this.is.garbage"}
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_refresh_with_access_token_rejected(
    client: AsyncClient, db: Session
) -> None:
    """Passing an access token to /refresh must be rejected (wrong token type)."""
    user = create_user(db, "refresh_wrong_type@example.com", "WrongType@1234")
    access_token = create_access_token(user)

    resp = await client.post(
        "/auth/refresh", json={"refresh_token": access_token}
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_refresh_inactive_user(client: AsyncClient, db: Session) -> None:
    """Refreshing tokens for an inactive user must return 401."""
    user = create_user(db, "refresh_inactive@example.com", "Inactive@1234", is_active=False)
    refresh_token = create_refresh_token(user)

    resp = await client.post("/auth/refresh", json={"refresh_token": refresh_token})
    assert resp.status_code == 401


# ─────────────────────────────────────────────────────────────────────────────
# RBAC — dependency unit tests (no HTTP layer needed)
# ─────────────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_access_token_claims_are_valid(db: Session) -> None:
    """Access token must decode correctly and carry all required claims."""
    user = create_user(
        db, "claims_check@example.com", "Claims@1234", role=UserRole.admin
    )
    access_token = create_access_token(user)

    payload = jwt.decode(
        access_token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
    )
    assert payload["type"] == "access"
    assert payload["role"] == "admin"
    assert payload["email"] == "claims_check@example.com"
    assert int(payload["sub"]) == user.id


@pytest.mark.asyncio
async def test_require_role_participant_gets_403_on_admin_endpoint(
    db: Session,
) -> None:
    """A participant token must not satisfy require_role(admin) — raises 403."""
    from fastapi import HTTPException

    participant = create_user(
        db, "role_participant@example.com", "RolePart@1234", role=UserRole.participant
    )

    admin_dep = require_role(UserRole.admin)

    with pytest.raises(HTTPException) as exc_info:
        await admin_dep(current_user=participant)

    assert exc_info.value.status_code == 403


@pytest.mark.asyncio
async def test_require_role_anchor_with_anchor_user(db: Session) -> None:
    """An anchor user must satisfy require_role(anchor) without raising."""
    anchor = create_user(
        db, "role_anchor@example.com", "RoleAnch@1234", role=UserRole.anchor
    )
    anchor_dep = require_role(UserRole.anchor)

    result = await anchor_dep(current_user=anchor)
    assert result.role == UserRole.anchor


@pytest.mark.asyncio
async def test_require_role_admin_with_admin_user(db: Session) -> None:
    """An admin user must satisfy require_role(admin) without raising."""
    admin = create_user(
        db, "role_admin2@example.com", "RoleAdmin@1234", role=UserRole.admin
    )
    admin_dep = require_role(UserRole.admin)

    result = await admin_dep(current_user=admin)
    assert result.role == UserRole.admin


@pytest.mark.asyncio
async def test_require_role_multi_role(db: Session) -> None:
    """require_role(admin, anchor) must accept both admin and anchor users."""
    admin_user = create_user(
        db, "multi_admin@example.com", "MultiAdm@1234", role=UserRole.admin
    )
    anchor_user = create_user(
        db, "multi_anchor@example.com", "MultiAnch@1234", role=UserRole.anchor
    )

    multi_dep = require_role(UserRole.admin, UserRole.anchor)

    result_admin = await multi_dep(current_user=admin_user)
    assert result_admin.role == UserRole.admin

    result_anchor = await multi_dep(current_user=anchor_user)
    assert result_anchor.role == UserRole.anchor


@pytest.mark.asyncio
async def test_require_role_participant_blocked_from_multi(db: Session) -> None:
    """A participant must NOT satisfy require_role(admin, anchor)."""
    from fastapi import HTTPException

    participant = create_user(
        db, "multi_blocked@example.com", "MultiBl@1234", role=UserRole.participant
    )
    multi_dep = require_role(UserRole.admin, UserRole.anchor)

    with pytest.raises(HTTPException) as exc_info:
        await multi_dep(current_user=participant)

    assert exc_info.value.status_code == 403


@pytest.mark.asyncio
async def test_participant_login_success(client: AsyncClient) -> None:
    """A new participant can login with name and email, receiving participant tokens."""
    resp = await client.post(
        "/auth/participant-login",
        json={"name": "Alice Smith", "email": "alice_test@example.com"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "tokens" in data
    assert data["tokens"]["access_token"]
    assert data["tokens"]["refresh_token"]
    assert data["user"]["role"] == "participant"
    assert data["user"]["email"] == "alice_test@example.com"


@pytest.mark.asyncio
async def test_participant_login_existing_participant(
    client: AsyncClient, db: Session
) -> None:
    """An existing participant can log in without password."""
    create_user(
        db, "existing_part@example.com", "DummyPass@1234", role=UserRole.participant
    )
    resp = await client.post(
        "/auth/participant-login",
        json={"name": "Existing User", "email": "existing_part@example.com"},
    )
    assert resp.status_code == 200
    assert resp.json()["user"]["email"] == "existing_part@example.com"
    assert resp.json()["user"]["role"] == "participant"


@pytest.mark.asyncio
async def test_participant_login_rejects_staff_email(
    client: AsyncClient, db: Session
) -> None:
    """Admin or anchor accounts must NOT be accessible through participant endpoint."""
    create_user(db, "staff_admin@vit.edu", "Admin@1234", role=UserRole.admin)
    create_user(db, "staff_anchor@vit.edu", "Anchor@1234", role=UserRole.anchor)

    resp_admin = await client.post(
        "/auth/participant-login",
        json={"name": "Attacker", "email": "staff_admin@vit.edu"},
    )
    assert resp_admin.status_code == 403
    assert "staff" in resp_admin.json()["detail"].lower()

    resp_anchor = await client.post(
        "/auth/participant-login",
        json={"name": "Attacker", "email": "staff_anchor@vit.edu"},
    )
    assert resp_anchor.status_code == 403
    assert "staff" in resp_anchor.json()["detail"].lower()


@pytest.mark.asyncio
async def test_participant_login_inactive_user(
    client: AsyncClient, db: Session
) -> None:
    """Disabled participant accounts cannot log in."""
    create_user(
        db, "disabled_p@example.com", "Pass@1234", role=UserRole.participant, is_active=False
    )
    resp = await client.post(
        "/auth/participant-login",
        json={"name": "Disabled", "email": "disabled_p@example.com"},
    )
    assert resp.status_code == 401
