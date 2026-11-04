from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import Engine
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, create_engine

from app.db import create_tables, get_engine
from app.main import app
from app.services.email import Email, get_email_sender


class FakeEmailSender:
    def __init__(self) -> None:
        self.sent: list[Email] = []

    def send(self, email: Email) -> bool:
        self.sent.append(email)
        return True


@pytest.fixture
def engine() -> Engine:
    # Fresh in-memory SQLite per test — no Postgres needed to run the suite.
    eng = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    create_tables(eng)
    return eng


@pytest.fixture
def emails() -> FakeEmailSender:
    return FakeEmailSender()


@pytest.fixture
def client(engine: Engine, emails: FakeEmailSender) -> Iterator[TestClient]:
    app.dependency_overrides[get_engine] = lambda: engine
    app.dependency_overrides[get_email_sender] = lambda: emails
    # No `with` block: skips the startup hook that would connect to the real database.
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def session(engine: Engine) -> Iterator[Session]:
    with Session(engine) as s:
        yield s
