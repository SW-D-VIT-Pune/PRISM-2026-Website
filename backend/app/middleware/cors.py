"""PRISM '26 — CORS middleware configuration.

Origins are read from settings so they can differ between dev/staging/prod
without code changes.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings


def register_cors(app: FastAPI) -> None:
    """Attach CORSMiddleware to *app* using environment-configured origins."""
    settings = get_settings()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
