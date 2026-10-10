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
    bind = op.get_bind()

    # Safely create enum type for PostgreSQL idempotently
    if bind.dialect.name == "postgresql":
        op.execute(
            sa.text(
                """
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
                        CREATE TYPE user_role AS ENUM ('admin', 'anchor', 'participant');
                    END IF;
                END$$;
                """
            )
        )

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=1024), nullable=False),
        sa.Column(
            "role",
            sa.Enum("admin", "anchor", "participant", name="user_role", create_type=False),
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

    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        op.execute(sa.text("DROP TYPE IF EXISTS user_role;"))
