"""update project_members role enum values

Revision ID: 20260214_0006
Revises: 20260214_0005
Create Date: 2026-02-14
"""

from alembic import op


revision = "20260214_0006"
down_revision = "20260214_0005"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1
            FROM pg_type t
            JOIN pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'design' AND t.typname = 'project_role_new'
          ) THEN
            CREATE TYPE design.project_role_new AS ENUM ('chief', 'desinger', 'pm');
          END IF;
        END$$;
        """
    )

    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role DROP DEFAULT;
        """
    )
    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role TYPE design.project_role_new
        USING (
          CASE role::text
            WHEN 'owner' THEN 'chief'
            WHEN 'viewer' THEN 'pm'
            ELSE role::text
          END
        )::design.project_role_new;
        """
    )
    op.execute("DROP TYPE design.project_role;")
    op.execute("ALTER TYPE design.project_role_new RENAME TO project_role;")
    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role SET DEFAULT 'pm'::design.project_role;
        """
    )


def downgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1
            FROM pg_type t
            JOIN pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'design' AND t.typname = 'project_role_old'
          ) THEN
            CREATE TYPE design.project_role_old AS ENUM ('owner', 'viewer');
          END IF;
        END$$;
        """
    )
    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role DROP DEFAULT;
        """
    )
    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role TYPE design.project_role_old
        USING (
          CASE role::text
            WHEN 'chief' THEN 'owner'
            WHEN 'pm' THEN 'viewer'
            WHEN 'desinger' THEN 'viewer'
            ELSE 'viewer'
          END
        )::design.project_role_old;
        """
    )
    op.execute("DROP TYPE design.project_role;")
    op.execute("ALTER TYPE design.project_role_old RENAME TO project_role;")
    op.execute(
        """
        ALTER TABLE design.project_members
        ALTER COLUMN role SET DEFAULT 'viewer'::design.project_role;
        """
    )

