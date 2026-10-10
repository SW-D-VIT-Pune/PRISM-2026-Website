"""PRISM '26 — Development seed script (sync version for Windows 32-bit).

This sync version doesn't require greenlet.
"""

from __future__ import annotations

import sys

from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, sessionmaker

from app.config import get_settings
from app.models.user import User, UserRole
from app.services.auth import hash_password

settings = get_settings()

# ── Seed data ──────────────────────────────────────────────────────────────
SEED_USERS = [
    {
        "email": "admin/anchor-vitswd26@vit.edu",
        "password": settings.seed_admin_password,
        "role": UserRole.admin,
    },
]


def seed(session: Session) -> None:
    """Insert seed users if they do not already exist."""
    for data in SEED_USERS:
        result = session.execute(
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

    session.commit()


def main() -> None:
    print("=" * 60)
    print("PRISM '26 — Development Seed Script (Sync)")
    print("WARNING: For development use only — never run in production!")
    print("=" * 60)

    # Use SQLite sync for seeding
    db_url = settings.database_url.replace("+aiosqlite", "")
    engine = create_engine(db_url, echo=False)
    Session_ = sessionmaker(engine)

    with Session_() as session:
        seed(session)

    engine.dispose()
    print("\nSeed complete.")


if __name__ == "__main__":
    main()
