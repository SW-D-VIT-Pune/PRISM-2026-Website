# PRISM '26 Backend — Stage 1

FastAPI backend providing authentication and RBAC for the PRISM '26 quiz system.

> **Stage 1 scope:** auth, RBAC, health endpoint.  
> WebSockets, Redis, quiz endpoints, and dashboards are implemented in later stages.

---

## Prerequisites

| Tool | Version |
|---|---|
| Python | 3.11+ |
| PostgreSQL | 14+ (for production) |
| `python -m venv` | Built-in |

---

## Setup

### 1. Create and activate a virtual environment

```powershell
# From the repo root
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1        # Windows PowerShell
# source .venv/bin/activate       # macOS / Linux
```

### 2. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

### 3. Configure environment

```powershell
Copy-Item .env.example .env
# Edit .env and fill in:
#   DATABASE_URL
#   JWT_SECRET
#   JWT_REFRESH_SECRET
#   SEED_ADMIN_PASSWORD
#   SEED_ANCHOR_PASSWORD
#   SEED_PARTICIPANT_PASSWORD
```

Generate strong JWT secrets:
```powershell
python -c "import secrets; print(secrets.token_hex(64))"
```

---

## Database — Alembic migrations

> **PostgreSQL must be running before running migrations.**

```powershell
# Apply all pending migrations
alembic upgrade head

# Check current migration state
alembic current

# Roll back one step
alembic downgrade -1

# Generate a new migration (after ORM model changes)
alembic revision --autogenerate -m "describe change"
```

---

## Seed development users

> ⚠️ **Development only — never run against production.**

```powershell
python seed.py
```

Creates three dev accounts (passwords from `.env`):

| Email | Role |
|---|---|
| `admin@prism26.dev` | admin |
| `anchor@prism26.dev` | anchor |
| `participant@prism26.dev` | participant |

---

## Run the API locally

```powershell
# From the backend/ directory with .venv active
uvicorn app.main:app --reload --port 8000
```

- API docs: http://localhost:8000/docs  
- ReDoc: http://localhost:8000/redoc

---

## Run tests

Tests use **SQLite + aiosqlite** — no PostgreSQL server required.

```powershell
# From the backend/ directory
pytest
```

Run with coverage:
```powershell
python -m pip install pytest-cov
pytest --cov=app --cov-report=term-missing
```

---

## Stage 1 API endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | None | Service health check |
| `POST` | `/auth/login` | None | Login — returns access + refresh tokens |
| `POST` | `/auth/refresh` | None | Refresh — returns new token pair |

### POST /auth/login

```json
// Request
{ "email": "admin@prism26.dev", "password": "YourPassword" }

// Response 200
{
  "tokens": {
    "access_token": "<jwt>",
    "refresh_token": "<jwt>",
    "token_type": "bearer"
  },
  "user": {
    "id": 1,
    "email": "admin@prism26.dev",
    "role": "admin",
    "is_active": true
  }
}
```

### POST /auth/refresh

```json
// Request
{ "refresh_token": "<refresh_jwt>" }

// Response 200
{
  "access_token": "<new_jwt>",
  "refresh_token": "<new_rotated_refresh_jwt>",
  "token_type": "bearer"
}
```

### GET /health

```json
// Response 200
{ "status": "ok", "service": "prism26-api" }
```

---

## RBAC roles

| Role | Description |
|---|---|
| `admin` | Full access |
| `anchor` | Quiz flow control |
| `participant` | Read-only quiz participation |

Access tokens include a `role` claim. The `require_role()` dependency factory
enforces roles server-side — frontend route hiding is never relied upon.

---

## Project structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app + router registration
│   ├── config.py        # Pydantic-settings config
│   ├── database.py      # SQLAlchemy async engine + session
│   ├── models/          # ORM models
│   ├── schemas/         # Pydantic I/O schemas
│   ├── routers/         # Route handlers
│   ├── services/        # Business logic (auth tokens, hashing)
│   ├── dependencies/    # FastAPI dependency providers (RBAC)
│   └── middleware/      # CORS
├── migrations/          # Alembic
├── tests/               # pytest test suite
├── seed.py              # Dev seed script
├── requirements.txt
├── pyproject.toml       # pytest config
└── .env.example
```

---

## What is NOT in Stage 1

- WebSockets
- Redis
- Quiz sessions / questions / answers
- Leaderboards
- Admin / anchor / participant dashboards
- Frontend quiz integration
- Docker / production deployment
- Refresh token revocation (Redis-backed — Stage 2)
