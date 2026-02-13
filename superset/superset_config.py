import os

FEATURE_FLAGS = {
    "EMBEDDED_SUPERSET": True,
    "GUEST_TOKEN": True,
}

SECRET_KEY = os.getenv("SUPERSET_SECRET_KEY", "change-me-in-prod")

# Embedded dashboards are rendered in the frontend iframe.
TALISMAN_ENABLED = False

ENABLE_CORS = True
CORS_OPTIONS = {
    "supports_credentials": True,
    "allow_headers": ["*"],
    "resources": [r"/api/.*", r"/embedded/.*"],
    "origins": ["http://localhost:3000"],
}

# These can be overridden via env if needed.
SQLALCHEMY_DATABASE_URI = os.getenv(
    "SUPERSET_DATABASE_URI", "postgresql+psycopg2://superset:superset@db:5432/superset"
)
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
GUEST_ROLE_NAME = "Admin"
GUEST_TOKEN_JWT_AUDIENCE = os.getenv("SUPERSET_GUEST_TOKEN_AUDIENCE", "superset")
