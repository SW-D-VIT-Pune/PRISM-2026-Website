"""PRISM '26 — Development seed script.

⚠️  WARNING: This script creates development-only accounts.
    Do NOT run this script against a production database.

Usage
-----
    cd backend
    python seed.py

Reads passwords from environment variables:
    SEED_ADMIN_PASSWORD
    SEED_ANCHOR_PASSWORD
    SEED_PARTICIPANT_PASSWORD

If a user with the given email already exists, the seed is skipped
(idempotent — safe to run multiple times).
"""

from __future__ import annotations

import asyncio
import sys

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.config import get_settings
from app.models.user import User, UserRole
from app.services.auth import hash_password

settings = get_settings()

# ── Seed data ──────────────────────────────────────────────────────────────
# Passwords come from environment variables — never hardcoded.
SEED_USERS = [
    {
        "email": "admin@prism26.dev",
        "password": settings.seed_admin_password,
        "role": UserRole.admin,
    },
    {
        "email": "anchor@prism26.dev",
        "password": settings.seed_anchor_password,
        "role": UserRole.anchor,
    },
    {
        "email": "participant@prism26.dev",
        "password": settings.seed_participant_password,
        "role": UserRole.participant,
    },
]


async def seed(session: AsyncSession) -> None:
    """Insert seed users if they do not already exist."""
    for data in SEED_USERS:
        result = await session.execute(
            select(User).where(User.email == data["email"])
        )
        existing = result.scalar_one_or_none()

        if existing is not None:
            print(f"  [SKIP] {data['email']} already exists")
            continue

        user = User(
            email=data["email"],
            password_hash=hash_password(data["password"]),
            role=data["role"],
            is_active=True,
        )
        session.add(user)
        print(f"  [CREATE] {data['email']} ({data['role'].value})")

    await session.commit()


async def main() -> None:
    print("=" * 60)
    print("PRISM '26 — Development Seed Script")
    print("WARNING: For development use only — never run in production!")
    print("=" * 60)

    engine = create_async_engine(settings.async_database_url, echo=False)
    AsyncSession_ = async_sessionmaker(engine, expire_on_commit=False)

    async with AsyncSession_() as session:
        await seed(session)

    await engine.dispose()
    print("\nSeed complete.")


if __name__ == "__main__":
    asyncio.run(main())
