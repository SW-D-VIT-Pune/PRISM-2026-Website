"""Alembic environment script — async-compatible PostgreSQL migration runner."""

from __future__ import annotations

import asyncio
from logging.config import fileConfig

from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

# Import all models so Alembic's autogenerate can detect them
from app.config import get_settings
from app.database import Base
from app.models import quiz as _quiz_models  # noqa: F401 — side-effect import
from app.models import user as _user_models  # noqa: F401 — side-effect import

settings = get_settings()
config = context.config

# ── Logging ───────────────────────────────────────────────────────
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ── Metadata ──────────────────────────────────────────────────────
target_metadata = Base.metadata


# ---------------------------------------------------------------------------
# Offline migrations (generate SQL without a live DB connection)
# ---------------------------------------------------------------------------
def run_migrations_offline() -> None:
    """Emit SQL to stdout — useful for review or manual application."""
    context.configure(
        url=settings.database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


# ---------------------------------------------------------------------------
# Online migrations (run against a live database)
# ---------------------------------------------------------------------------
def do_run_migrations(connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Create an async engine and run migrations inside a sync-compatible wrapper."""
    engine = create_async_engine(settings.database_url)
    async with engine.connect() as conn:
        await conn.run_sync(do_run_migrations)
    await engine.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
