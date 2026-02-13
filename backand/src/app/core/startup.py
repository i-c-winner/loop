from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User


def ensure_admin_user(db: Session) -> None:
    """
    Seed admin user when users table is empty.
    Uses settings.seed_admin_email / settings.seed_admin_password / settings.seed_admin_login.
    """
    try:
        role_column_exists = db.execute(
            text(
                """
                SELECT 1
                FROM information_schema.columns
                WHERE table_schema = 'app'
                  AND table_name = 'users'
                  AND column_name = 'role'
                LIMIT 1
                """
            )
        ).first()
        if not role_column_exists:
            return

        exists = db.query(User.id).first() is not None
    except SQLAlchemyError:
        return

    if exists:
        return

    admin = User(
        email=settings.seed_admin_email.strip().lower(),
        full_name=settings.seed_admin_login,
        role="admin",
        hashed_password=hash_password(settings.seed_admin_password),
        is_active=True,
    )
    db.add(admin)
    db.commit()
