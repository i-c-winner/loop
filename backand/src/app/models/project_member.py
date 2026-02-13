from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, Index, func, text
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.models.enums import APP_SCHEMA, project_role_enum


class ProjectMember(Base):
    __tablename__ = "project_members"
    __table_args__ = (
        Index("idx_project_members_user_id", "user_id"),
        {"schema": APP_SCHEMA},
    )

    project_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.projects.id", ondelete="CASCADE"),
        primary_key=True,
    )
    user_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    role = Column(project_role_enum, nullable=False, server_default=text("'viewer'"))
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    project = relationship("Project", back_populates="members")
    user = relationship("User", back_populates="memberships")

