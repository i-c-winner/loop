from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Text,
    func,
    text,
)
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.models.enums import APP_SCHEMA, task_status_enum


class Task(Base):
    __tablename__ = "tasks"
    __table_args__ = (
        CheckConstraint("progress >= 0 AND progress <= 100", name="ck_tasks_progress"),
        Index("idx_tasks_project_id", "project_id"),
        Index("idx_tasks_assignee_id", "assignee_id"),
        Index("idx_tasks_project_assignee", "project_id", "assignee_id"),
        {"schema": APP_SCHEMA},
    )

    id = Column(BigInteger, primary_key=True, index=True)
    project_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.projects.id", ondelete="CASCADE"),
        nullable=False,
    )
    assignee_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.users.id", ondelete="RESTRICT"),
        nullable=False,
    )
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    progress = Column(Integer, nullable=False, server_default=text("0"))
    status = Column(task_status_enum, nullable=False, server_default=text("'todo'"))
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User", back_populates="assigned_tasks")

