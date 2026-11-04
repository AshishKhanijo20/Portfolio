from collections.abc import Iterator
from functools import lru_cache
from typing import Annotated

from fastapi import Depends
from sqlalchemy import Engine
from sqlmodel import Session, SQLModel, create_engine

from app.config import get_settings


@lru_cache
def get_engine() -> Engine:
    return create_engine(get_settings().database_url, pool_pre_ping=True)


def create_tables(engine: Engine | None = None) -> None:
    # Fine while the schema is tiny; switch to Alembic migrations once it starts changing.
    from app import models  # noqa: F401  (registers tables on the metadata)

    SQLModel.metadata.create_all(engine or get_engine())


EngineDep = Annotated[Engine, Depends(get_engine)]


def get_session(engine: EngineDep) -> Iterator[Session]:
    with Session(engine) as session:
        yield session
