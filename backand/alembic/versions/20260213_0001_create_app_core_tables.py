"""create app schema and core tables

Revision ID: 20260213_0001
Revises: None
Create Date: 2026-02-13
"""

from alembic import op
import sqlalchemy as sa


revision = "20260213_0001"
down_revision = None
branch_labels = None
depends_on = None

APP_SCHEMA = "app"


def upgrade() -> None:
    op.execute("CREATE SCHEMA IF NOT EXISTS app")

    project_role_enum = sa.Enum(
        "owner",
        "viewer",
        name="project_role",
        schema=APP_SCHEMA,
    )
    task_status_enum = sa.Enum(
        "todo",
        "in_progress",
        "done",
        "blocked",
        name="task_status",
        schema=APP_SCHEMA,
    )

    op.create_table(
        "users",
        sa.Column("id", sa.BigInteger(), sa.Identity(), primary_key=True),
        sa.Column("email", sa.Text(), nullable=True),
        sa.Column("full_name", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.UniqueConstraint("email", name="uq_users_email"),
        schema=APP_SCHEMA,
    )

    op.create_table(
        "projects",
        sa.Column("id", sa.BigInteger(), sa.Identity(), primary_key=True),
        sa.Column("owner_id", sa.BigInteger(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            [f"{APP_SCHEMA}.users.id"],
            ondelete="RESTRICT",
            name="fk_projects_owner_id_users",
        ),
        schema=APP_SCHEMA,
    )
    op.create_index(
        "idx_projects_owner_id",
        "projects",
        ["owner_id"],
        unique=False,
        schema=APP_SCHEMA,
    )

    op.create_table(
        "project_members",
        sa.Column("project_id", sa.BigInteger(), nullable=False),
        sa.Column("user_id", sa.BigInteger(), nullable=False),
        sa.Column(
            "role",
            project_role_enum,
            nullable=False,
            server_default=sa.text("'viewer'"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            [f"{APP_SCHEMA}.projects.id"],
            ondelete="CASCADE",
            name="fk_project_members_project_id_projects",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            [f"{APP_SCHEMA}.users.id"],
            ondelete="CASCADE",
            name="fk_project_members_user_id_users",
        ),
        sa.PrimaryKeyConstraint("project_id", "user_id", name="pk_project_members"),
        schema=APP_SCHEMA,
    )
    op.create_index(
        "idx_project_members_user_id",
        "project_members",
        ["user_id"],
        unique=False,
        schema=APP_SCHEMA,
    )

    op.create_table(
        "tasks",
        sa.Column("id", sa.BigInteger(), sa.Identity(), primary_key=True),
        sa.Column("project_id", sa.BigInteger(), nullable=False),
        sa.Column("assignee_id", sa.BigInteger(), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "progress",
            sa.Integer(),
            nullable=False,
            server_default=sa.text("0"),
        ),
        sa.Column(
            "status",
            task_status_enum,
            nullable=False,
            server_default=sa.text("'todo'"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.CheckConstraint(
            "progress >= 0 AND progress <= 100",
            name="ck_tasks_progress",
        ),
        sa.ForeignKeyConstraint(
            ["project_id"],
            [f"{APP_SCHEMA}.projects.id"],
            ondelete="CASCADE",
            name="fk_tasks_project_id_projects",
        ),
        sa.ForeignKeyConstraint(
            ["assignee_id"],
            [f"{APP_SCHEMA}.users.id"],
            ondelete="RESTRICT",
            name="fk_tasks_assignee_id_users",
        ),
        schema=APP_SCHEMA,
    )
    op.create_index(
        "idx_tasks_project_id",
        "tasks",
        ["project_id"],
        unique=False,
        schema=APP_SCHEMA,
    )
    op.create_index(
        "idx_tasks_assignee_id",
        "tasks",
        ["assignee_id"],
        unique=False,
        schema=APP_SCHEMA,
    )
    op.create_index(
        "idx_tasks_project_assignee",
        "tasks",
        ["project_id", "assignee_id"],
        unique=False,
        schema=APP_SCHEMA,
    )

    op.execute(
        """
        CREATE OR REPLACE FUNCTION app.set_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at := now();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        """
    )

    op.execute("DROP TRIGGER IF EXISTS trg_projects_updated_at ON app.projects;")
    op.execute(
        """
        CREATE TRIGGER trg_projects_updated_at
        BEFORE UPDATE ON app.projects
        FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();
        """
    )

    op.execute("DROP TRIGGER IF EXISTS trg_tasks_updated_at ON app.tasks;")
    op.execute(
        """
        CREATE TRIGGER trg_tasks_updated_at
        BEFORE UPDATE ON app.tasks
        FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();
        """
    )


def downgrade() -> None:
    op.execute("DROP TRIGGER IF EXISTS trg_tasks_updated_at ON app.tasks;")
    op.execute("DROP TRIGGER IF EXISTS trg_projects_updated_at ON app.projects;")
    op.execute("DROP FUNCTION IF EXISTS app.set_updated_at();")

    op.drop_index("idx_tasks_project_assignee", table_name="tasks", schema=APP_SCHEMA)
    op.drop_index("idx_tasks_assignee_id", table_name="tasks", schema=APP_SCHEMA)
    op.drop_index("idx_tasks_project_id", table_name="tasks", schema=APP_SCHEMA)
    op.drop_table("tasks", schema=APP_SCHEMA)

    op.drop_index(
        "idx_project_members_user_id",
        table_name="project_members",
        schema=APP_SCHEMA,
    )
    op.drop_table("project_members", schema=APP_SCHEMA)

    op.drop_index("idx_projects_owner_id", table_name="projects", schema=APP_SCHEMA)
    op.drop_table("projects", schema=APP_SCHEMA)

    op.drop_table("users", schema=APP_SCHEMA)

    bind = op.get_bind()
    sa.Enum(
        "todo",
        "in_progress",
        "done",
        "blocked",
        name="task_status",
        schema=APP_SCHEMA,
    ).drop(bind, checkfirst=True)
    sa.Enum(
        "owner",
        "viewer",
        name="project_role",
        schema=APP_SCHEMA,
    ).drop(bind, checkfirst=True)

    op.execute("DROP SCHEMA IF EXISTS app")
