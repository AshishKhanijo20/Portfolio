from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All config comes from environment variables (or backend/.env in local dev)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    # Default = Docker Postgres from docker-compose.yml (host port 5433)
    database_url: str = "postgresql+psycopg://portfolio:portfolio@localhost:5433/portfolio"

    # Comma-separated list of frontend origins allowed to call the API
    cors_origins: str = "http://localhost:3000"

    # Contact alerts. Without RESEND_API_KEY, emails are printed to the console instead.
    resend_api_key: str | None = None
    alert_email_to: str = "askhanijo20@gmail.com"
    alert_email_from: str = "Portfolio <onboarding@resend.dev>"

    # Spam protection
    rate_limit_per_hour: int = Field(default=5, ge=1)
    # Secret salt so stored IP hashes can't be reversed (GDPR: we never store raw IPs)
    ip_hash_salt: str = "dev-only-change-me"
    # Only trust X-Forwarded-For when running behind a known proxy (Render/Fly)
    trust_proxy_headers: bool = False

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
