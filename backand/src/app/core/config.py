from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    project_name: str = "My Project API"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/loop"
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]
    jwt_secret_key: str = "change-me-in-env-please-set-at-least-32-bytes-secret-key"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    seed_admin_login: str = "admin"
    seed_admin_email: str = "admin@admin.ru"
    seed_admin_password: str = "admin123"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
