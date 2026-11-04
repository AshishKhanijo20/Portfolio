# Portfolio API

FastAPI + SQLModel + PostgreSQL. Handles the contact form (Phase 3) and later the AI chatbot (Phase 4).

## Run locally

```powershell
# from the repo root: start Postgres
docker compose up -d db

# from backend/
copy .env.example .env          # first time only
uv sync
uv run uvicorn app.main:app --reload
```

- API: http://localhost:8000 · interactive docs: http://localhost:8000/docs
- Without `RESEND_API_KEY`, alert emails are printed in this terminal.

## Test & lint

```powershell
uv run pytest
uv run ruff check . ; uv run ruff format .
```

Tests use in-memory SQLite — Docker isn't needed to run them.

## Endpoints

| Method | Path       | Notes |
|--------|------------|-------|
| GET    | `/health`  | liveness check |
| POST   | `/contact` | `{type, name, email, company?, message, locale, website}` → 201. `website` is a honeypot. 429 when rate-limited. |

## Spam & privacy

- **Honeypot** field — bots that fill it get a fake success.
- **Rate limit** — `RATE_LIMIT_PER_HOUR` messages per sender.
- **No raw IPs stored** — only a salted SHA-256 hash (`IP_HASH_SALT`), used for rate limiting.
