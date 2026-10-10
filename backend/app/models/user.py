"""PRISM '26 — User ORM model.

Compatibility notes
-------------------
* The `UserRole` enum is stored as a native PostgreSQL ENUM in production
  (created by Alembic migration 0001).
* In SQLite (tests), enums are stored as VARCHAR — SQLite does not enforce
  enum constraints at the DB level, which is fine for unit/integration tests.
  Application-level validation via Pydantic schemas covers this gap.
"""

from __future__ import annotations

import enum
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Index,
    Integer,
    String,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class UserRole(str, enum.Enum):
    """Server-side role enum — maps 1-to-1 with the DB column."""

    admin = "admin"
    anchor = "anchor"
    participant = "participant"


class User(Base):
    """Users table.

    Columns
    -------
    id            : Auto-incrementing surrogate PK.
    email         : Unique, case-insensitive login identifier.
    password_hash : bcrypt hash — never store plaintext.
    role          : One of admin | anchor | participant.
    is_active     : Soft-disable an account without deleting it.
    created_at    : UTC timestamp set by the database on INSERT.
    updated_at    : UTC timestamp updated on every UPDATE.
    """

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True,
    )
    password_hash: Mapped[str] = mapped_column(String(1024), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        # native_enum=False: store as VARCHAR for SQLite compatibility in tests.
        # Alembic migration 0001 creates the proper PostgreSQL ENUM type.
        Enum(UserRole, name="user_role", native_enum=False),
        nullable=False,
        default=UserRole.participant,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Compound index — role lookups in future dashboards
    __table_args__ = (
        Index("ix_users_role_is_active", "role", "is_active"),
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email!r} role={self.role}>"
