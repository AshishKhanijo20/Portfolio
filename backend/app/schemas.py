from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models import ContactType


class ContactCreate(BaseModel):
    type: ContactType
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    locale: Literal["en", "de"] = "en"
    # Honeypot: hidden in the form. Humans leave it empty; naive bots fill it in.
    website: str = Field(default="", max_length=200)

    @field_validator("name", "message", "company", mode="before")
    @classmethod
    def strip(cls, v: object) -> object:
        return v.strip() if isinstance(v, str) else v

    @field_validator("company")
    @classmethod
    def empty_to_none(cls, v: str | None) -> str | None:
        return v or None


class ContactAccepted(BaseModel):
    status: Literal["received"] = "received"
