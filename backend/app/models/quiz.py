"""PRISM '26 — Quiz ORM models."""

from __future__ import annotations

import enum
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class QuizSessionState(str, enum.Enum):
    """Quiz session state machine."""

    created = "created"
    active = "active"
    ended = "ended"


class QuizSession(Base):
    """Quiz sessions table."""

    __tablename__ = "quiz_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    state: Mapped[QuizSessionState] = mapped_column(
        String(50), nullable=False, default=QuizSessionState.created
    )
    created_by: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False
    )
    current_question_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
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

    # Relationships
    questions = relationship(
        "Question",
        back_populates="session",
        cascade="all, delete-orphan",
        foreign_keys="Question.session_id",
    )
    participants = relationship(
        "SessionParticipant", back_populates="session", cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_quiz_sessions_state", "state"),
    )


class Question(Base):
    """Questions table."""

    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    session_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz_sessions.id"), nullable=False
    )
    text: Mapped[str] = mapped_column(Text, nullable=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False)
    time_limit_seconds: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    # Relationships
    session = relationship(
        "QuizSession",
        back_populates="questions",
        foreign_keys=[session_id],
    )
    options = relationship(
        "QuestionOption", back_populates="question", cascade="all, delete-orphan"
    )
    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan",
        foreign_keys="Answer.question_id",
    )

    __table_args__ = (
        UniqueConstraint("session_id", "order", name="uq_session_order"),
        Index("ix_questions_session_id", "session_id"),
    )


class QuestionOption(Base):
    """Question options table."""

    __tablename__ = "question_options"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    question_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("questions.id"), nullable=False
    )
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationships
    question = relationship("Question", back_populates="options")

    __table_args__ = (
        UniqueConstraint("question_id", "order", name="uq_question_order"),
        Index("ix_question_options_question_id", "question_id"),
    )


class SessionParticipant(Base):
    """Session participants table."""

    __tablename__ = "session_participants"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    session_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz_sessions.id"), nullable=False
    )
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    score: Mapped[int] = mapped_column(Integer, default=0)
    joined_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    # Relationships
    session = relationship("QuizSession", back_populates="participants")
    answers = relationship("Answer", back_populates="participant", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("session_id", "user_id", name="uq_session_user"),
        Index("ix_session_participants_session_id", "session_id"),
        Index("ix_session_participants_user_id", "user_id"),
    )


class Answer(Base):
    """Answers table."""

    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    session_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz_sessions.id"), nullable=False
    )
    question_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("questions.id"), nullable=False
    )
    participant_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("session_participants.id"), nullable=False
    )
    option_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("question_options.id"), nullable=False
    )
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    # Relationships
    question = relationship(
        "Question",
        back_populates="answers",
        foreign_keys=[question_id],
    )
    participant = relationship("SessionParticipant", back_populates="answers")

    __table_args__ = (
        UniqueConstraint("question_id", "participant_id", name="uq_question_participant"),
        Index("ix_answers_session_id", "session_id"),
        Index("ix_answers_question_id", "question_id"),
        Index("ix_answers_participant_id", "participant_id"),
    )
