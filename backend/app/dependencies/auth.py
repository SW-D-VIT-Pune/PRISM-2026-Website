"""PRISM '26 — FastAPI dependency providers for authentication and RBAC.

Usage in a router
-----------------
    from app.dependencies.auth import get_current_user, require_role
    from app.models.user import UserRole

    @router.get("/admin-only")
    async def admin_endpoint(user: User = Depends(require_role(UserRole.admin))):
        ...
"""

from __future__ import annotations

from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database import get_db
from app.models.user import User, UserRole
from app.services.auth import decode_access_token, get_user_by_id_async

_bearer = HTTPBearer(auto_error=True)

# ---------------------------------------------------------------------------
# get_current_user
# ---------------------------------------------------------------------------


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
    db = Depends(get_db),  # type: ignore
) -> User:
    """Validate the Bearer token and return the authenticated User.

    Raises 401 if the token is missing, expired, or malformed.
    Raises 401 if the user no longer exists or is inactive.
    """
    _unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_access_token(credentials.credentials)
        user_id: int = int(payload.get("sub", -1))
    except (InvalidTokenError, ValueError):
        raise _unauthorized

    user = await get_user_by_id_async(db, user_id)
    
    if user is None or not user.is_active:
        raise _unauthorized

    return user


# ---------------------------------------------------------------------------
# require_role  — RBAC dependency factory
# ---------------------------------------------------------------------------


def require_role(*roles: UserRole):
    """Return a dependency that enforces one of the specified roles.

    Example
    -------
        @router.get("/anchors-only")
        async def endpoint(user: User = Depends(require_role(UserRole.anchor, UserRole.admin))):
            ...
    """

    async def _role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    f"Access denied. Required role(s): "
                    f"{', '.join(r.value for r in roles)}."
                ),
            )
        return current_user

    return _role_checker
