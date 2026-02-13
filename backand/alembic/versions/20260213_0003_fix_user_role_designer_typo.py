"""fix user_role value designer typo

Revision ID: 20260213_0003
Revises: 20260213_0002
Create Date: 2026-02-13
"""

from alembic import op


revision = "20260213_0003"
down_revision = "20260213_0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Previous migration created enum value 'desinger' by mistake.
    op.execute("ALTER TYPE app.user_role RENAME VALUE 'desinger' TO 'designer';")


def downgrade() -> None:
    op.execute("ALTER TYPE app.user_role RENAME VALUE 'designer' TO 'desinger';")

