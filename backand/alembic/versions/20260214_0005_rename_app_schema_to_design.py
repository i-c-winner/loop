"""rename app schema to design

Revision ID: 20260214_0005
Revises: 20260213_0004
Create Date: 2026-02-14
"""

from alembic import op


revision = "20260214_0005"
down_revision = "20260213_0004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
          IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'app') THEN
            IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'design') THEN
              RAISE EXCEPTION 'Schema "design" already exists';
            END IF;
            ALTER SCHEMA app RENAME TO design;
          END IF;
        END$$;
        """
    )


def downgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
          IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'design') THEN
            IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'app') THEN
              RAISE EXCEPTION 'Schema "app" already exists';
            END IF;
            ALTER SCHEMA design RENAME TO app;
          END IF;
        END$$;
        """
    )

