from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, Index, Text, func
from sqlalchemy.orm import relationship

from app.core.database import Base

APP_SCHEMA = "app"


class Project(Base):
    __tablename__ = "projects"
    __table_args__ = (
        Index("idx_projects_owner_id", "owner_id"),
        {"schema": APP_SCHEMA},
    )

    id = Column(BigInteger, primary_key=True, index=True)
    owner_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.users.id", ondelete="RESTRICT"),
        nullable=False,
    )
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    owner = relationship("User", back_populates="owned_projects")
    members = relationship(
        "ProjectMember",
        back_populates="project",
        cascade="all, delete-orphan",
    )
    tasks = relationship(
        "Task",
        back_populates="project",
        cascade="all, delete-orphan",
    )

