from datetime import UTC, datetime
from enum import StrEnum

from sqlalchemy import DateTime
from sqlmodel import Field, SQLModel


class ContactType(StrEnum):
    recruiter = "recruiter"
    feedback = "feedback"
    other = "other"


def utcnow() -> datetime:
    return datetime.now(UTC)


class ContactMessage(SQLModel, table=True):
    __tablename__ = "contact_messages"

    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(
        default_factory=utcnow, index=True, sa_type=DateTime(timezone=True)
    )
    type: ContactType
    name: str = Field(max_length=100)
    email: str = Field(max_length=254)
    company: str | None = Field(default=None, max_length=120)
    message: str = Field(max_length=5000)
    locale: str = Field(default="en", max_length=5)
    # Salted SHA-256 of the sender IP — used only for rate limiting
    ip_hash: str = Field(index=True, max_length=64)
    user_agent: str | None = Field(default=None, max_length=300)
    notified: bool = False
