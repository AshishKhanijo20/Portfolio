import hashlib

from fastapi import Request

from app.config import Settings


def client_ip(request: Request, settings: Settings) -> str:
    # Behind a hosting proxy the real client IP is the first X-Forwarded-For entry.
    # Only trust it when configured — otherwise anyone could spoof it to dodge rate limits.
    if settings.trust_proxy_headers:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def hash_ip(ip: str, salt: str) -> str:
    return hashlib.sha256(f"{salt}:{ip}".encode()).hexdigest()
