"""Create quiz tables.

Revision ID: 0002
Revises: 0001
Create Date: 2026-10-06

"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create quiz_sessions table
    op.create_table(
        "quiz_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("state", sa.String(length=50), nullable=False),
        sa.Column("created_by", sa.Integer(), nullable=False),
        sa.Column("current_question_id", sa.Integer(), nullable=True),
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
        sa.ForeignKeyConstraint(["created_by"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_quiz_sessions_id"), "quiz_sessions", ["id"])
    op.create_index(op.f("ix_quiz_sessions_state"), "quiz_sessions", ["state"])

    # Create questions table
    op.create_table(
        "questions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("order", sa.Integer(), nullable=False),
        sa.Column("time_limit_seconds", sa.Integer(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["session_id"], ["quiz_sessions.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id", "order", name="uq_session_order"),
    )
    op.create_index(op.f("ix_questions_id"), "questions", ["id"])
    op.create_index(op.f("ix_questions_session_id"), "questions", ["session_id"])

    # Create question_options table
    op.create_table(
        "question_options",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column("text", sa.String(length=500), nullable=False),
        sa.Column("is_correct", sa.Boolean(), nullable=True),
        sa.Column("order", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["question_id"], ["questions.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("question_id", "order", name="uq_question_order"),
    )
    op.create_index(op.f("ix_question_options_id"), "question_options", ["id"])
    op.create_index(
        op.f("ix_question_options_question_id"), "question_options", ["question_id"]
    )

    # Create session_participants table
    op.create_table(
        "session_participants",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.Column(
            "joined_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["session_id"], ["quiz_sessions.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id", "user_id", name="uq_session_user"),
    )
    op.create_index(op.f("ix_session_participants_id"), "session_participants", ["id"])
    op.create_index(
        op.f("ix_session_participants_session_id"),
        "session_participants",
        ["session_id"],
    )
    op.create_index(
        op.f("ix_session_participants_user_id"), "session_participants", ["user_id"]
    )

    # Create answers table
    op.create_table(
        "answers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column("participant_id", sa.Integer(), nullable=False),
        sa.Column("option_id", sa.Integer(), nullable=False),
        sa.Column("is_correct", sa.Boolean(), nullable=False),
        sa.Column(
            "submitted_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["option_id"], ["question_options.id"]),
        sa.ForeignKeyConstraint(["participant_id"], ["session_participants.id"]),
        sa.ForeignKeyConstraint(["question_id"], ["questions.id"]),
        sa.ForeignKeyConstraint(["session_id"], ["quiz_sessions.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("question_id", "participant_id", name="uq_question_participant"),
    )
    op.create_index(op.f("ix_answers_id"), "answers", ["id"])
    op.create_index(op.f("ix_answers_session_id"), "answers", ["session_id"])
    op.create_index(op.f("ix_answers_question_id"), "answers", ["question_id"])
    op.create_index(op.f("ix_answers_participant_id"), "answers", ["participant_id"])


def downgrade() -> None:
    op.drop_index(op.f("ix_answers_participant_id"), table_name="answers")
    op.drop_index(op.f("ix_answers_question_id"), table_name="answers")
    op.drop_index(op.f("ix_answers_session_id"), table_name="answers")
    op.drop_index(op.f("ix_answers_id"), table_name="answers")
    op.drop_table("answers")

    op.drop_index(op.f("ix_session_participants_user_id"), table_name="session_participants")
    op.drop_index(
        op.f("ix_session_participants_session_id"), table_name="session_participants"
    )
    op.drop_index(op.f("ix_session_participants_id"), table_name="session_participants")
    op.drop_table("session_participants")

    op.drop_index(
        op.f("ix_question_options_question_id"), table_name="question_options"
    )
    op.drop_index(op.f("ix_question_options_id"), table_name="question_options")
    op.drop_table("question_options")

    op.drop_index(op.f("ix_questions_session_id"), table_name="questions")
    op.drop_index(op.f("ix_questions_id"), table_name="questions")
    op.drop_table("questions")

    op.drop_index(op.f("ix_quiz_sessions_state"), table_name="quiz_sessions")
    op.drop_index(op.f("ix_quiz_sessions_id"), table_name="quiz_sessions")
    op.drop_table("quiz_sessions")
