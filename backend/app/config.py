"""PRISM '26 Backend — Application Configuration.

All settings are loaded from environment variables (or a .env file).
No secrets are ever hardcoded here.
"""

from __future__ import annotations

from functools import lru_cache

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralised settings object — injected via env / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env.local",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Application ───────────────────────────────────────────────
    app_env: str = "development"
    app_title: str = "PRISM '26 API"
    app_version: str = "1.0.0"

    # ── Database ──────────────────────────────────────────────────
    # Default to SQLite for local development (PostgreSQL for production)
    database_url: str = "sqlite+aiosqlite:///./prism26.db"
    # SQLite URL used by the test suite (swapped via conftest fixture)
    test_database_url: str = "sqlite+aiosqlite:///./test_prism26.db"

    @property
    def async_database_url(self) -> str:
        """Return database URL formatted for async SQLAlchemy driver."""
        url = self.database_url
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    # ── JWT ───────────────────────────────────────────────────────
    jwt_secret: str = "CHANGE_ME_IN_PRODUCTION"
    jwt_refresh_secret: str = "CHANGE_ME_IN_PRODUCTION_REFRESH"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7

    # ── CORS ──────────────────────────────────────────────────────
    # Accepts a comma-separated string from the environment.
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origins_list(self) -> list[str]:
        """Return CORS origins as a list."""
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    # ── Seed user passwords (dev only) ────────────────────────────
    seed_admin_password: str = "Admin@1234"
    seed_anchor_password: str = "Anchor@1234"
    seed_participant_password: str = "Participant@1234"

    @model_validator(mode="after")
    def validate_production_configuration(self) -> Settings:
        """Enforce strict secret and CORS configuration when running in production."""
        if self.app_env.lower() in ("production", "prod"):
            insecure = {
                "",
                "CHANGE_ME_IN_PRODUCTION",
                "CHANGE_ME_IN_PRODUCTION_REFRESH",
                "dev-secret-change-in-production",
                "dev-refresh-secret-change-in-production",
            }
            if self.jwt_secret in insecure or len(self.jwt_secret) < 32:
                raise ValueError(
                    "Production startup rejected: JWT_SECRET must be set to a strong secret (at least 32 characters)."
                )
            if self.jwt_refresh_secret in insecure or len(self.jwt_refresh_secret) < 32:
                raise ValueError(
                    "Production startup rejected: JWT_REFRESH_SECRET must be set to a strong secret (at least 32 characters)."
                )
            if "*" in self.cors_origins_list:
                raise ValueError(
                    "Production startup rejected: CORS_ORIGINS must specify explicit allowed origins (wildcard '*' disallowed with credentials)."
                )
        return self


@lru_cache
def get_settings() -> Settings:
    """Return a cached singleton Settings instance."""
    return Settings()
