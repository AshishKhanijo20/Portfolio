from sqlmodel import Session, select

from app.config import get_settings
from app.models import ContactMessage

VALID = {
    "type": "recruiter",
    "name": "Jane Recruiter",
    "email": "jane@example.com",
    "company": "Acme AI",
    "message": "Hi Ashish, we have a GenAI engineer role in Vienna.",
    "locale": "de",
}


def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}


def test_valid_message_is_stored_and_emailed(client, session: Session, emails):
    r = client.post("/contact", json=VALID)

    assert r.status_code == 201
    assert r.json() == {"status": "received"}

    msg = session.exec(select(ContactMessage)).one()
    assert msg.name == "Jane Recruiter"
    assert msg.locale == "de"
    assert msg.notified is True
    assert len(msg.ip_hash) == 64  # hashed, never the raw IP

    [email] = emails.sent
    assert email.to == get_settings().alert_email_to
    assert email.reply_to == "jane@example.com"
    assert "[recruiter]" in email.subject and "Acme AI" in email.subject


def test_honeypot_discards_silently(client, session: Session, emails):
    r = client.post("/contact", json={**VALID, "website": "http://spam.example"})

    assert r.status_code == 201  # bot sees "success"
    assert session.exec(select(ContactMessage)).all() == []
    assert emails.sent == []


def test_validation_errors(client):
    assert client.post("/contact", json={**VALID, "email": "not-an-email"}).status_code == 422
    assert client.post("/contact", json={**VALID, "message": "too short"}).status_code == 422
    assert client.post("/contact", json={**VALID, "type": "spam"}).status_code == 422
    assert client.post("/contact", json={**VALID, "name": "   "}).status_code == 422


def test_blank_company_becomes_null(client, session: Session):
    client.post("/contact", json={**VALID, "company": "  "})
    assert session.exec(select(ContactMessage)).one().company is None


def test_rate_limit_per_ip(client, session: Session):
    limit = get_settings().rate_limit_per_hour
    for _ in range(limit):
        assert client.post("/contact", json=VALID).status_code == 201

    r = client.post("/contact", json=VALID)
    assert r.status_code == 429
    assert len(session.exec(select(ContactMessage)).all()) == limit
