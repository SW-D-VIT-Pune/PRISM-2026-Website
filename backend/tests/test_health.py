"""Tests for GET /health."""

from __future__ import annotations

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_returns_200(client: AsyncClient) -> None:
    """Health endpoint should return 200 with the expected payload."""
    response = await client.get("/health")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_health_payload(client: AsyncClient) -> None:
    """Health endpoint payload must contain status=ok."""
    response = await client.get("/health")
    data = response.json()
    assert data["status"] == "ok"
    assert "service" in data


@pytest.mark.asyncio
async def test_health_no_auth_required(client: AsyncClient) -> None:
    """Health endpoint must NOT require authentication (no Authorization header)."""
    response = await client.get("/health")
    assert response.status_code != 401
    assert response.status_code != 403
