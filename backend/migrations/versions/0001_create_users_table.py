"""Create users table.

Revision ID: 0001
Revises:
Create Date: 2026-10-04

Creates the `users` table with:
  - id                : serial PK
  - email             : unique, not null
  - password_hash     : not null
  - role              : enum (admin | anchor | participant)
  - is_active         : boolean, default true
  - created_at        : timestamptz, server default now()
  - updated_at        : timestamptz, server default now()

Indexes:
  - ix_users_id           (implicit from PK)
  - ix_users_email        (unique)
  - ix_users_role_is_active (compound, for role-based queries)
"""

from __future__ import annotations

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create the role enum type first (PostgreSQL-specific)
    user_role_enum = sa.Enum(
        "admin", "anchor", "participant", name="user_role"
    )
    user_role_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=1024), nullable=False),
        sa.Column(
            "role",
            sa.Enum("admin", "anchor", "participant", name="user_role"),
            nullable=False,
        ),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    # Unique index on email
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    # Compound index for role-based dashboard queries
    op.create_index(
        "ix_users_role_is_active", "users", ["role", "is_active"], unique=False
    )


def downgrade() -> None:
    op.drop_index("ix_users_role_is_active", table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")

    # Drop the enum type after the table is gone
    sa.Enum(name="user_role").drop(op.get_bind(), checkfirst=True)
