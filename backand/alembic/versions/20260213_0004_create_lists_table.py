"""create lists table

Revision ID: 20260213_0004
Revises: 20260213_0003
Create Date: 2026-02-13
"""

from alembic import op
import sqlalchemy as sa


revision = "20260213_0004"
down_revision = "20260213_0003"
branch_labels = None
depends_on = None

APP_SCHEMA = "app"


def upgrade() -> None:
    op.create_table(
        "lists",
        sa.Column("id", sa.BigInteger(), sa.Identity(), primary_key=True),
        sa.Column("task_id", sa.BigInteger(), nullable=False),
        sa.Column("assignee_id", sa.BigInteger(), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column(
            "progress",
            sa.Integer(),
            nullable=False,
            server_default=sa.text("0"),
        ),
        sa.CheckConstraint(
            "progress >= 0 AND progress <= 100",
            name="ck_lists_progress",
        ),
        sa.ForeignKeyConstraint(
            ["task_id"],
            [f"{APP_SCHEMA}.tasks.id"],
            ondelete="CASCADE",
            name="fk_lists_task_id_tasks",
        ),
        sa.ForeignKeyConstraint(
            ["assignee_id"],
            [f"{APP_SCHEMA}.users.id"],
            ondelete="RESTRICT",
            name="fk_lists_assignee_id_users",
        ),
        schema=APP_SCHEMA,
    )
    op.create_index("idx_lists_task_id", "lists", ["task_id"], schema=APP_SCHEMA)
    op.create_index(
        "idx_lists_assignee_id",
        "lists",
        ["assignee_id"],
        schema=APP_SCHEMA,
    )


def downgrade() -> None:
    op.drop_index("idx_lists_assignee_id", table_name="lists", schema=APP_SCHEMA)
    op.drop_index("idx_lists_task_id", table_name="lists", schema=APP_SCHEMA)
    op.drop_table("lists", schema=APP_SCHEMA)

