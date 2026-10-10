"""PRISM '26 — Pydantic schemas for auth endpoints."""

from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------


class LoginRequest(BaseModel):
    """Body for POST /auth/login."""

    email: EmailStr
    password: str = Field(..., min_length=1)


class ParticipantLoginRequest(BaseModel):
    """Body for POST /auth/participant-login."""

    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr


class RefreshRequest(BaseModel):
    """Body for POST /auth/refresh."""

    refresh_token: str = Field(..., min_length=1)


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------


class TokenPair(BaseModel):
    """Returned on successful login or token refresh."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    """Safe user representation — never includes password_hash."""

    id: int
    email: EmailStr
    role: UserRole
    is_active: bool

    model_config = {"from_attributes": True}


class LoginResponse(BaseModel):
    """Full login response with token pair and user info."""

    tokens: TokenPair
    user: UserOut
