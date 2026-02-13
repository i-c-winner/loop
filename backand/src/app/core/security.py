import base64
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

import jwt
from jwt import ExpiredSignatureError, InvalidTokenError

from app.core.config import settings


PBKDF2_ITERATIONS = 260_000
PBKDF2_ALGORITHM = "sha256"


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    dk = hashlib.pbkdf2_hmac(
        PBKDF2_ALGORITHM,
        password.encode("utf-8"),
        salt,
        PBKDF2_ITERATIONS,
    )
    salt_b64 = base64.urlsafe_b64encode(salt).decode("ascii").rstrip("=")
    dk_b64 = base64.urlsafe_b64encode(dk).decode("ascii").rstrip("=")
    return f"pbkdf2_{PBKDF2_ALGORITHM}${PBKDF2_ITERATIONS}${salt_b64}${dk_b64}"


def verify_password(plain_password: str, hashed_password: str | None) -> bool:
    if not hashed_password:
        return False
    if hashed_password.startswith("pbkdf2_"):
        try:
            _, iterations_raw, salt_b64, dk_b64 = hashed_password.split("$", 3)
            iterations = int(iterations_raw)
            salt = base64.urlsafe_b64decode(salt_b64 + "==")
            expected = base64.urlsafe_b64decode(dk_b64 + "==")
        except (ValueError, TypeError):
            return False

        candidate = hashlib.pbkdf2_hmac(
            PBKDF2_ALGORITHM,
            plain_password.encode("utf-8"),
            salt,
            iterations,
            dklen=len(expected),
        )
        return hmac.compare_digest(candidate, expected)
    # Legacy fallback for old plain-text records
    if hmac.compare_digest(plain_password, hashed_password):
        return True
    # Legacy fallback for old truncated sha256 records
    legacy = hashlib.sha256(plain_password.encode("utf-8")).hexdigest()[:10]
    return hmac.compare_digest(legacy, hashed_password)


def create_access_token(
    subject: str,
    expires_delta: timedelta | None = None,
    extra_claims: dict | None = None,
) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.access_token_expire_minutes)
    )
    payload = {"sub": subject, "exp": expire}
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
    except (ExpiredSignatureError, InvalidTokenError) as exc:
        raise ValueError("Invalid or expired token") from exc
