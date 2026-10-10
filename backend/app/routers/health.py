"""PRISM '26 — Health check router.

GET /health
-----------
Returns a simple JSON response suitable for:
  - Render health check (no auth required)
  - Load balancer probes
  - CI smoke tests
"""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health", summary="Service health check")
async def health() -> dict[str, str]:
    """Return 200 OK with a status payload.

    This endpoint intentionally performs no database I/O so it can respond
    even during migrations or DB connectivity issues. A deeper /health/db
    endpoint can be added in a later stage if needed.
    """
    return {"status": "ok", "service": "prism26-api"}
