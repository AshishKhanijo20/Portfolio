import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.db import create_tables
from app.routers import contact

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    create_tables()
    yield


settings = get_settings()
app = FastAPI(
    title="Portfolio API",
    version="0.1.0",
    lifespan=lifespan,
    # Interactive docs only outside production
    docs_url="/docs" if settings.environment != "production" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(contact.router)


@app.get("/health", tags=["meta"])
def health() -> dict[str, str]:
    return {"status": "ok"}
