"""add auth fields and roles to users

Revision ID: 20260213_0002
Revises: 20260213_0001
Create Date: 2026-02-13
"""

from alembic import op
import sqlalchemy as sa


revision = "20260213_0002"
down_revision = "20260213_0001"
branch_labels = None
depends_on = None

APP_SCHEMA = "app"


def upgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type t
                         JOIN pg_namespace n ON n.oid = t.typnamespace
                         WHERE t.typname = 'user_role' AND n.nspname = 'app') THEN
            CREATE TYPE app.user_role AS ENUM ('admin', 'chief', 'desinger', 'pm');
          END IF;
        END$$;
        """
    )

    op.add_column(
        "users",
        sa.Column(
            "role",
            sa.Enum(
                "admin",
                "chief",
                "desinger",
                "pm",
                name="user_role",
                schema=APP_SCHEMA,
            ),
            nullable=False,
            server_default=sa.text("'pm'"),
        ),
        schema=APP_SCHEMA,
    )
    op.add_column(
        "users",
        sa.Column("hashed_password", sa.Text(), nullable=True),
        schema=APP_SCHEMA,
    )
    op.add_column(
        "users",
        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true"),
        ),
        schema=APP_SCHEMA,
    )


def downgrade() -> None:
    op.drop_column("users", "is_active", schema=APP_SCHEMA)
    op.drop_column("users", "hashed_password", schema=APP_SCHEMA)
    op.drop_column("users", "role", schema=APP_SCHEMA)
    op.execute("DROP TYPE IF EXISTS app.user_role;")

