"""PRISM '26 — FastAPI application entrypoint."""

from __future__ import annotations

from fastapi import FastAPI

from app.config import get_settings
from app.middleware.cors import register_cors
from app.routers import auth, health, quiz, websocket

settings = get_settings()

# ---------------------------------------------------------------------------
# Application factory
# ---------------------------------------------------------------------------
app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description=(
        "PRISM '26 backend API — Complete quiz system.\n\n"
        "**Endpoints:** `/health`, `/auth/login`, `/auth/refresh`, `/quiz/*`, `/ws`"
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── Middleware ────────────────────────────────────────────────────
register_cors(app)

# ── Routers ───────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(quiz.router)
app.include_router(websocket.router)
