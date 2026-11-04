import logging
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy import Engine
from sqlmodel import Session, func, select

from app.config import Settings, get_settings
from app.db import EngineDep, get_session
from app.models import ContactMessage, utcnow
from app.schemas import ContactAccepted, ContactCreate
from app.services.client_ip import client_ip, hash_ip
from app.services.email import Email, EmailSender, get_email_sender

log = logging.getLogger(__name__)
router = APIRouter(tags=["contact"])

SessionDep = Annotated[Session, Depends(get_session)]
SettingsDep = Annotated[Settings, Depends(get_settings)]
EmailDep = Annotated[EmailSender, Depends(get_email_sender)]


@router.post("/contact", status_code=status.HTTP_201_CREATED, response_model=ContactAccepted)
def create_contact(
    data: ContactCreate,
    request: Request,
    background: BackgroundTasks,
    session: SessionDep,
    engine: EngineDep,
    settings: SettingsDep,
    sender: EmailDep,
) -> ContactAccepted:
    # Honeypot filled → almost certainly a bot. Pretend success so it doesn't adapt.
    if data.website:
        log.info("Honeypot triggered; message discarded")
        return ContactAccepted()

    ip_hash = hash_ip(client_ip(request, settings), settings.ip_hash_salt)
    recent = session.exec(
        select(func.count())
        .select_from(ContactMessage)
        .where(ContactMessage.ip_hash == ip_hash)
        .where(ContactMessage.created_at >= utcnow() - timedelta(hours=1))
    ).one()
    if recent >= settings.rate_limit_per_hour:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, "Too many messages, try later.")

    msg = ContactMessage(
        **data.model_dump(exclude={"website"}),
        ip_hash=ip_hash,
        user_agent=(request.headers.get("user-agent") or "")[:300] or None,
    )
    session.add(msg)
    session.commit()
    session.refresh(msg)

    # Send the alert after responding, so the visitor isn't kept waiting on the email API.
    background.add_task(_notify, msg.id, _alert_email(msg, settings.alert_email_to), sender, engine)
    return ContactAccepted()


def _alert_email(msg: ContactMessage, to: str) -> Email:
    who = f"{msg.name}" + (f" ({msg.company})" if msg.company else "")
    return Email(
        to=to,
        subject=f"📬 Portfolio [{msg.type.value}] from {who}",
        reply_to=msg.email,
        text=(
            f"Type:     {msg.type.value}\n"
            f"Name:     {msg.name}\n"
            f"Email:    {msg.email}\n"
            f"Company:  {msg.company or '-'}\n"
            f"Language: {msg.locale}\n"
            f"Received: {msg.created_at:%Y-%m-%d %H:%M} UTC\n\n"
            f"{msg.message}\n\n"
            f"— Reply to this email to answer {msg.name} directly."
        ),
    )


def _notify(message_id: int, email: Email, sender: EmailSender, engine: Engine) -> None:
    if not sender.send(email):
        return
    # New session: the request's session is closed by the time background tasks run.
    with Session(engine) as session:
        msg = session.get(ContactMessage, message_id)
        if msg:
            msg.notified = True
            session.add(msg)
            session.commit()
