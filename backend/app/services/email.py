"""Pluggable email sending: Resend in production, console output in local dev."""

import logging
from dataclasses import dataclass
from functools import lru_cache
from typing import Protocol

import httpx

from app.config import get_settings

log = logging.getLogger(__name__)


@dataclass(frozen=True)
class Email:
    to: str
    subject: str
    text: str
    reply_to: str | None = None


class EmailSender(Protocol):
    def send(self, email: Email) -> bool:
        """Returns True if the email was handed off successfully."""
        ...


class ConsoleEmailSender:
    def send(self, email: Email) -> bool:
        log.info("📧 [console email] to=%s subject=%s\n%s", email.to, email.subject, email.text)
        return True


class ResendEmailSender:
    API_URL = "https://api.resend.com/emails"

    def __init__(self, api_key: str, sender: str):
        self._api_key = api_key
        self._sender = sender

    def send(self, email: Email) -> bool:
        payload = {
            "from": self._sender,
            "to": [email.to],
            "subject": email.subject,
            "text": email.text,
        }
        if email.reply_to:
            payload["reply_to"] = email.reply_to
        try:
            r = httpx.post(
                self.API_URL,
                json=payload,
                headers={"Authorization": f"Bearer {self._api_key}"},
                timeout=10,
            )
            r.raise_for_status()
            return True
        except httpx.HTTPError:
            log.exception("Resend email failed")
            return False


@lru_cache
def get_email_sender() -> EmailSender:
    s = get_settings()
    if s.resend_api_key:
        return ResendEmailSender(s.resend_api_key, s.alert_email_from)
    log.warning("RESEND_API_KEY not set — emails will be printed to the console")
    return ConsoleEmailSender()
