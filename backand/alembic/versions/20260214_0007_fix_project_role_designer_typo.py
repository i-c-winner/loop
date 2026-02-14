"""fix project_role designer typo

Revision ID: 20260214_0007
Revises: 20260214_0006
Create Date: 2026-02-14
"""

from alembic import op


revision = "20260214_0007"
down_revision = "20260214_0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE design.project_role RENAME VALUE 'desinger' TO 'designer';")


def downgrade() -> None:
    op.execute("ALTER TYPE design.project_role RENAME VALUE 'designer' TO 'desinger';")

