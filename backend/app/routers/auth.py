"""PRISM '26 — Auth router.

POST /auth/login
----------------
Accepts email + password.
Returns access token, refresh token, and safe user info.

POST /auth/refresh
------------------
Accepts a valid refresh token.
Returns a new access token (and rotated refresh token — token rotation
is enabled by default to limit the refresh token window).
"""

from __future__ import annotations

import os
import secrets
from jwt.exceptions import InvalidTokenError
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select

from app.database import get_db
from app.models.user import User, UserRole
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    ParticipantLoginRequest,
    RefreshRequest,
    TokenPair,
    UserOut,
)
from app.services.auth import (
    authenticate_user,
    authenticate_user_async,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
    get_user_by_id,
    get_user_by_id_async,
    hash_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/participant-login",
    response_model=LoginResponse,
    summary="Participant login without password",
    status_code=status.HTTP_200_OK,
)
async def participant_login(
    body: ParticipantLoginRequest,
    db = Depends(get_db),  # type: ignore
) -> LoginResponse:
    """Issue participant-scoped tokens for the live quiz.

    Security guarantees:
    - Never grants administrative or anchor privileges (strictly UserRole.participant).
    - If the email belongs to an existing admin or anchor, the request is rejected with 403 Forbidden.
    - If user exists as a participant:
      - Validates account is active.
      - Issues participant JWT tokens.
    - If user does not exist:
      - Creates a new participant User account with an unguessable random password hash.
      - Issues participant JWT tokens.
    """
    clean_email = body.email.strip().lower()

    result = await db.execute(select(User).where(User.email == clean_email))
    user = result.scalar_one_or_none()

    if user:
        if user.role != UserRole.participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Staff accounts must authenticate via staff portal with password.",
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Participant account is disabled.",
            )
    else:
        dummy_secret = secrets.token_urlsafe(32)
        user = User(
            email=clean_email,
            password_hash=hash_password(dummy_secret),
            role=UserRole.participant,
            is_active=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return LoginResponse(
        tokens=TokenPair(
            access_token=create_access_token(user),
            refresh_token=create_refresh_token(user),
        ),
        user=UserOut.model_validate(user),
    )


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Login with email and password",
    status_code=status.HTTP_200_OK,
)
async def login(
    body: LoginRequest,
    db = Depends(get_db),  # type: ignore
) -> LoginResponse:
    """Authenticate a user and issue access + refresh tokens.

    Returns 401 for invalid credentials regardless of whether the email
    exists — prevents user enumeration.
    """
    user = await authenticate_user_async(db, body.email, body.password)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is disabled",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return LoginResponse(
        tokens=TokenPair(
            access_token=create_access_token(user),
            refresh_token=create_refresh_token(user),
        ),
        user=UserOut.model_validate(user),
    )


@router.post(
    "/refresh",
    response_model=TokenPair,
    summary="Refresh access token",
    status_code=status.HTTP_200_OK,
)
async def refresh(
    body: RefreshRequest,
    db = Depends(get_db),  # type: ignore
) -> TokenPair:
    """Issue a new access token (and rotated refresh token) from a valid refresh token.

    Token rotation: each call issues a new refresh token.
    In Stage 2, the old jti will be added to a Redis revocation set.
    """
    _invalid = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_refresh_token(body.refresh_token)
    except InvalidTokenError:
        raise _invalid

    try:
        user_id = int(payload["sub"])
    except (KeyError, ValueError):
        raise _invalid

    user = await get_user_by_id_async(db, user_id)
    
    if user is None or not user.is_active:
        raise _invalid

    # Stage 2 hook: revoke old token via jti before issuing new one
    # jti = payload.get("jti")
    # if jti and await is_refresh_token_revoked(jti):
    #     raise _invalid
    # await revoke_refresh_token(jti)

    return TokenPair(
        access_token=create_access_token(user),
        refresh_token=create_refresh_token(user),  # rotated
    )
