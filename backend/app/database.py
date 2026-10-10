"""PRISM '26 Backend — Async SQLAlchemy engine and session factory.

Database driver notes
---------------------
* **Production (PostgreSQL)**: uses asyncpg for async PostgreSQL access.
  URL format: postgresql+asyncpg://user:pass@host:port/db
  Install separately: pip install asyncpg==0.30.0
* **Tests / local dev (SQLite)**: uses aiosqlite (pure Python, no build tools).
  URL format: sqlite+aiosqlite:///./db.sqlite3

The engine is configured to work with both drivers — pool settings are only
applied for non-SQLite connections.
"""

from __future__ import annotations

import os
from pathlib import Path

from collections.abc import AsyncGenerator

from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings

# Load .env.local before reading SYNC_MODE
from dotenv import load_dotenv
load_dotenv(".env.local")

settings = get_settings()

# ---------------------------------------------------------------------------
# Engine — pool args differ between SQLite and PostgreSQL
# ---------------------------------------------------------------------------
# Skip engine creation in test mode (tests provide their own sync engine)
# Also use sync mode on Windows 32-bit if SYNC_MODE is set
IS_TESTING = os.getenv("APP_ENV") == "testing"
USE_SYNC_MODE = os.getenv("SYNC_MODE") == "true"

if not IS_TESTING and not USE_SYNC_MODE:
    from sqlalchemy.ext.asyncio import (
        AsyncSession,
        async_sessionmaker,
        create_async_engine,
    )
    _is_sqlite = settings.database_url.startswith("sqlite")

    _engine_kwargs = {
        "echo": (settings.app_env == "development"),
        "pool_pre_ping": not _is_sqlite,   # NullPool (SQLite) doesn't support this
    }

    if not _is_sqlite:
        # PostgreSQL connection pool settings
        _engine_kwargs["pool_size"] = 10
        _engine_kwargs["max_overflow"] = 20

    engine = create_async_engine(settings.async_database_url, **_engine_kwargs)

    # ---------------------------------------------------------------------------
    # Session factory
    # ---------------------------------------------------------------------------
    AsyncSessionLocal = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,   # avoids lazy-load errors after commit
        autoflush=False,
        autocommit=False,
    )
elif USE_SYNC_MODE:
    # Use sync SQLAlchemy for Windows 32-bit (no greenlet)
    from sqlalchemy import create_engine
    from sqlalchemy.orm import Session, sessionmaker

    _is_sqlite = settings.database_url.startswith("sqlite")
    db_url = settings.database_url.replace("+aiosqlite", "")

    _engine_kwargs = {
        "echo": (settings.app_env == "development"),
    }

    engine = create_engine(db_url, **_engine_kwargs)
    AsyncSessionLocal = sessionmaker(engine, autoflush=False, autocommit=False)
    # For type compatibility
    AsyncSession = Session  # type: ignore
else:
    # In test mode, these will be set by conftest
    engine = None
    AsyncSessionLocal = None


# ---------------------------------------------------------------------------
# Declarative base — all ORM models inherit from this
# ---------------------------------------------------------------------------
class Base(DeclarativeBase):
    """Shared declarative base for all ORM models."""


# ---------------------------------------------------------------------------
# FastAPI dependency: yields an async session per request
# ---------------------------------------------------------------------------
async def get_db() -> AsyncGenerator:  # type: ignore
    """Yield a database session and guarantee it is closed afterwards."""
    if USE_SYNC_MODE:
        # Sync mode for Windows 32-bit - wrap sync session to make it awaitable
        session = AsyncSessionLocal()
        try:
            # Create an async wrapper for the sync session
            class AsyncSessionWrapper:
                def __init__(self, sync_session):
                    self._sync_session = sync_session

                async def execute(self, statement, *args, **kwargs):
                    return self._sync_session.execute(statement, *args, **kwargs)

                async def commit(self):
                    self._sync_session.commit()

                async def rollback(self):
                    self._sync_session.rollback()

                async def close(self):
                    self._sync_session.close()

                def add(self, obj):
                    self._sync_session.add(obj)

                def delete(self, obj):
                    self._sync_session.delete(obj)

                async def refresh(self, obj, attribute_names=None):
                    self._sync_session.refresh(obj, attribute_names=attribute_names)

                async def flush(self):
                    self._sync_session.flush()

            wrapper = AsyncSessionWrapper(session)
            yield wrapper
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
    else:
        # Async mode
        async with AsyncSessionLocal() as session:  # type: ignore
            try:
                yield session
            except Exception:
                await session.rollback()  # type: ignore
                raise
            finally:
                await session.close()  # type: ignore


from contextlib import asynccontextmanager


@asynccontextmanager
async def get_db_context(override_provider=None):
    """Context manager for short-lived database sessions.

    Used by WebSocket handlers and background tasks to acquire and release
    database sessions promptly, preventing connection pool exhaustion.
    """
    provider = override_provider or get_db
    gen = provider()
    try:
        session = await gen.__anext__()
        yield session
    finally:
        try:
            await gen.__anext__()
        except StopAsyncIteration:
            pass
