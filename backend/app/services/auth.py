"""PRISM '26 — Auth service: password hashing and JWT logic.

Design notes
------------
* Token creation / validation lives here, not in routers.
* Uses PyJWT (pure Python) for HS256 JWT operations — no C/Rust dependencies.
* Uses passlib + argon2 for password hashing.
* Refresh token revocation hooks are provided as stubs so Stage 2
  (Redis-backed token store) can drop in without touching this interface.
* Access tokens carry: sub (user id), email, role, type="access".
* Refresh tokens carry: sub (user id), type="refresh", jti (unique ID for future revocation).
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from typing import Any
from uuid import uuid4

import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from sqlalchemy import select

from app.config import get_settings
from app.models.user import User

settings = get_settings()

USE_SYNC_MODE = os.getenv("SYNC_MODE") == "true"

# ---------------------------------------------------------------------------
# Password hashing (argon2 via passlib)
# ---------------------------------------------------------------------------
_pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(plain: str) -> str:
    """Return an argon2 hash of *plain*."""
    return _pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    """Return True if *plain* matches *hashed*."""
    try:
        return _pwd_context.verify(plain, hashed)
    except Exception:
        return False


# ---------------------------------------------------------------------------
# JWT helpers (PyJWT — pure Python, HS256)
# ---------------------------------------------------------------------------


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def create_access_token(user: User) -> str:
    """Create a short-lived JWT access token for *user*."""
    expire = _utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    payload: dict[str, Any] = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role.value,
        "type": "access",
        "exp": expire,
        "iat": _utcnow(),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def create_refresh_token(user: User) -> str:
    """Create a long-lived JWT refresh token for *user*.

    The refresh token carries minimal claims plus a jti (JWT ID).
    The jti is included to enable future revocation implementation in a later stage.

    Stage 1 behavior:
    - Refresh tokens are issued with a unique jti
    - Refresh tokens are validated via decode_refresh_token()
    - Refresh token rotation returns a new token with a new jti
    - Server-side revocation is NOT implemented in Stage 1
    """
    expire = _utcnow() + timedelta(days=settings.refresh_token_expire_days)
    payload: dict[str, Any] = {
        "sub": str(user.id),
        "type": "refresh",
        "exp": expire,
        "iat": _utcnow(),
        "jti": str(uuid4()),  # Unique ID for future revocation support
    }
    return jwt.encode(
        payload, settings.jwt_refresh_secret, algorithm=settings.jwt_algorithm
    )


def decode_access_token(token: str) -> dict[str, Any]:
    """Decode and validate an access token.  Raises InvalidTokenError on failure."""
    payload: dict[str, Any] = jwt.decode(
        token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
    )
    if payload.get("type") != "access":
        raise InvalidTokenError("Not an access token")
    return payload


def decode_refresh_token(token: str) -> dict[str, Any]:
    """Decode and validate a refresh token.  Raises InvalidTokenError on failure."""
    payload: dict[str, Any] = jwt.decode(
        token, settings.jwt_refresh_secret, algorithms=[settings.jwt_algorithm]
    )
    if payload.get("type") != "refresh":
        raise InvalidTokenError("Not a refresh token")
    return payload


# ---------------------------------------------------------------------------
# Revocation stubs — Stage 2 will implement these with Redis
# ---------------------------------------------------------------------------


async def is_refresh_token_revoked(jti: str) -> bool:  # noqa: ARG001
    """Return True if the refresh token has been revoked.

    Stage 1: always returns False (no revocation store yet).
    Stage 2: check Redis for the jti key.
    """
    return False


async def revoke_refresh_token(jti: str) -> None:  # noqa: ARG001
    """Mark a refresh token as revoked.

    Stage 1: no-op.
    Stage 2: set jti in Redis with TTL = remaining token lifetime.
    """


# ---------------------------------------------------------------------------
# Database helpers
# ---------------------------------------------------------------------------


def get_user_by_email(db, email: str) -> User | None:  # type: ignore
    """Fetch a user by email address (case-insensitive via .lower())."""
    result = db.execute(
        select(User).where(User.email == email.lower())
    )
    return result.scalar_one_or_none()


async def get_user_by_email_async(db, email: str) -> User | None:  # type: ignore
    """Async version for when we need to await."""
    result = await db.execute(
        select(User).where(User.email == email.lower())
    )
    return result.scalar_one_or_none()


def get_user_by_id(db, user_id: int) -> User | None:  # type: ignore
    """Fetch a user by primary key."""
    result = db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def get_user_by_id_async(db, user_id: int) -> User | None:  # type: ignore
    """Async version for when we need to await."""
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


def authenticate_user(
    db, email: str, password: str  # type: ignore
) -> User | None:
    """Verify credentials and return the User, or None on failure.

    Runs verify_password even when the user doesn't exist to prevent
    timing-based user enumeration attacks.
    """
    result = db.execute(
        select(User).where(User.email == email.lower())
    )
    user = result.scalar_one_or_none()
    if user is None:
        # Dummy hash to keep response timing constant
        verify_password(password, "$2b$12$placeholderplaceholderplaceholderplaceholder")
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


async def authenticate_user_async(
    db, email: str, password: str  # type: ignore
) -> User | None:
    """Async version for when we need to await."""
    user = await get_user_by_email_async(db, email)
    if user is None:
        # Dummy hash to keep response timing constant
        verify_password(password, "$2b$12$placeholderplaceholderplaceholderplaceholder")
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
