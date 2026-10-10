"""Pytest configuration and shared fixtures for the PRISM '26 backend test suite.

Test Database Strategy
----------------------
Tests use **synchronous SQLite** to avoid the `greenlet` dependency that
SQLAlchemy's async engine requires. greenlet has no pre-built wheels for
Python 3.14 (32-bit) and requires Microsoft C++ Build Tools to compile.

This fixture setup creates a minimal test environment that:
1. Uses sync SQLite for the database
2. Overrides the app's get_db dependency with a sync session
3. Wraps sync session calls to appear async (via SyncSessionAdapter)

Production note
---------------
Before deploying to production:
  1. Install asyncpg (requires MSVC Build Tools or use psycopg[binary]).
  2. Run `alembic upgrade head` against a real PostgreSQL instance.
  3. The application code is already written for async — no changes needed.
"""

from __future__ import annotations

import os
from pathlib import Path

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from passlib.context import CryptContext
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

# ── Environment overrides — must happen BEFORE any app imports ────────────────
os.environ["JWT_SECRET"] = "test-jwt-secret-not-for-production"
os.environ["JWT_REFRESH_SECRET"] = "test-refresh-secret-not-for-production"
os.environ["SEED_ADMIN_PASSWORD"] = "TestAdmin@1234"
os.environ["SEED_ANCHOR_PASSWORD"] = "TestAnchor@1234"
os.environ["SEED_PARTICIPANT_PASSWORD"] = "TestParticipant@1234"
os.environ["APP_ENV"] = "testing"

# ── Import app modules (database.py skips engine creation in test mode) ───────
from app.config import get_settings  # noqa: E402
from app.database import Base, get_db  # noqa: E402
from app.models.quiz import QuizSession, Question, QuestionOption, SessionParticipant, Answer  # noqa: E402
from app.models.user import User, UserRole  # noqa: E402
from app.services.auth import hash_password  # noqa: E402

get_settings.cache_clear()

# ── Sync engine (tests only) ──────────────────────────────────────────────────
TEST_DB_PATH = "./test_prism26.db"
SYNC_DB_URL = f"sqlite:///{TEST_DB_PATH}"

_sync_engine = create_engine(SYNC_DB_URL, connect_args={"check_same_thread": False})
_SyncSession = sessionmaker(bind=_sync_engine, autoflush=False, autocommit=False)


# ─────────────────────────────────────────────────────────────────────────────
# Async-compatible session adapter
# ─────────────────────────────────────────────────────────────────────────────
class SyncSessionAdapter:
    """Thin async wrapper around a synchronous SQLAlchemy Session.

    FastAPI route handlers call `await db.execute(...)`, `await db.commit()`,
    etc. This adapter proxies those awaitable calls to the underlying sync
    Session, so the app code runs unchanged in tests.
    """

    def __init__(self, session: Session) -> None:
        self._s = session

    # ── Core operations ──────────────────────────────────────────────────────

    async def execute(self, *args, **kwargs):
        return self._s.execute(*args, **kwargs)

    async def commit(self):
        self._s.commit()

    async def rollback(self):
        self._s.rollback()

    async def flush(self):
        self._s.flush()

    async def close(self):
        self._s.close()

    async def refresh(self, instance, attribute_names=None):
        self._s.refresh(instance, attribute_names=attribute_names)

    # ── Direct ORM access (add, delete, etc.) ─────────────────────────────────

    def add(self, instance):
        self._s.add(instance)

    def delete(self, instance):
        self._s.delete(instance)

    def expunge(self, instance):
        self._s.expunge(instance)

    # ── Scalar helpers ────────────────────────────────────────────────────────

    async def scalar(self, *args, **kwargs):
        return self._s.scalar(*args, **kwargs)

    async def scalars(self, *args, **kwargs):
        return self._s.scalars(*args, **kwargs)

    # ── Context manager support ───────────────────────────────────────────────

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        await self.close()


# ─────────────────────────────────────────────────────────────────────────────
# Tables — module-scoped: create once, drop after the full module
# ─────────────────────────────────────────────────────────────────────────────
@pytest.fixture(scope="module")
def tables():
    """Create all ORM tables in the test SQLite DB before the module runs."""
    Base.metadata.create_all(_sync_engine)
    yield
    Base.metadata.drop_all(_sync_engine)
    # Dispose engine to release file locks
    _sync_engine.dispose()
    # Clean up test DB file
    if Path(TEST_DB_PATH).exists():
        Path(TEST_DB_PATH).unlink()


# ─────────────────────────────────────────────────────────────────────────────
# db — function-scoped: fresh sync session per test with rollback isolation
# ─────────────────────────────────────────────────────────────────────────────
@pytest.fixture
def db(tables) -> Session:
    """Provide an isolated sync session per test. Always rolls back after."""
    session = _SyncSession()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


# ─────────────────────────────────────────────────────────────────────────────
# Seed helper — create a user in the test DB
# ─────────────────────────────────────────────────────────────────────────────
def create_user(
    db: Session,
    email: str,
    password: str,
    role: UserRole = UserRole.participant,
    is_active: bool = True,
) -> User:
    """Insert a User synchronously and return the instance."""
    user = User(
        email=email,
        password_hash=hash_password(password),
        role=role,
        is_active=is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ─────────────────────────────────────────────────────────────────────────────
# client — function-scoped: AsyncClient with DB dependency overridden
# ─────────────────────────────────────────────────────────────────────────────
@pytest_asyncio.fixture
async def client(db: Session):
    """Provide an AsyncClient with the sync test DB injected as the DB dependency."""
    from app.main import app  # noqa: E402

    async def _override_get_db():
        adapter = SyncSessionAdapter(db)
        yield adapter

    app.dependency_overrides[get_db] = _override_get_db

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac

    app.dependency_overrides.clear()
