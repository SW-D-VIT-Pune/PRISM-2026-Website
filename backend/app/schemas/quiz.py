"""PRISM '26 — Quiz API schemas."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


# ── Quiz Session Schemas ─────────────────────────────────────────────────────


class QuizSessionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class QuizSessionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    state: str
    created_by: int
    current_question_id: int | None
    created_at: datetime
    updated_at: datetime


# ── Question Schemas ─────────────────────────────────────────────────────────


class QuestionOptionCreate(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    is_correct: bool = False
    order: int = Field(..., ge=0)


class QuestionOptionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    is_correct: bool
    order: int


class QuestionCreate(BaseModel):
    text: str = Field(..., min_length=1)
    order: int = Field(..., ge=0)
    time_limit_seconds: int | None = Field(None, ge=1)
    options: list[QuestionOptionCreate] = Field(..., min_length=2)


class QuestionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    session_id: int
    text: str
    order: int
    time_limit_seconds: int | None
    is_active: bool
    created_at: datetime
    options: list[QuestionOptionOut]


class QuestionUpdate(BaseModel):
    text: str | None = Field(None, min_length=1)
    time_limit_seconds: int | None = Field(None, ge=1)
    options: list[QuestionOptionCreate] | None = None


# ── Session Join Schemas ─────────────────────────────────────────────────────


class SessionJoinResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: int
    user_id: int
    score: int
    joined_at: datetime


# ── Answer Schemas ─────────────────────────────────────────────────────────


class AnswerSubmit(BaseModel):
    option_id: int
    question_id: int | None = None


class AnswerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    question_id: int
    option_id: int
    is_correct: bool
    submitted_at: datetime


# ── Results Schemas ─────────────────────────────────────────────────────────


class LeaderboardEntry(BaseModel):
    user_id: int
    score: int
    rank: int


class LeaderboardResponse(BaseModel):
    session_id: int
    leaderboard: list[LeaderboardEntry]


class ResultsResponse(BaseModel):
    session_id: int
    total_questions: int
    total_participants: int
    answers: list[dict[str, Any]]


# ── WebSocket Message Schemas ───────────────────────────────────────────────


class WSMessage(BaseModel):
    type: str
    data: dict[str, Any] | None = None


class WSJoinSession(BaseModel):
    session_id: int


class WSSubmitAnswer(BaseModel):
    session_id: int
    question_id: int
    option_id: int


class WSBroadcastQuestion(BaseModel):
    session_id: int
    question_id: int


class WSEndQuestion(BaseModel):
    session_id: int
    question_id: int


class WSEndSession(BaseModel):
    session_id: int
