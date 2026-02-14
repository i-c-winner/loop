from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    Column,
    ForeignKey,
    Index,
    Integer,
    Text,
    text,
)
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.models.enums import APP_SCHEMA


class List(Base):
    __tablename__ = "lists"
    __table_args__ = (
        CheckConstraint("progress >= 0 AND progress <= 100", name="ck_lists_progress"),
        Index("idx_lists_task_id", "task_id"),
        Index("idx_lists_assignee_id", "assignee_id"),
        {"schema": APP_SCHEMA},
    )

    id = Column(BigInteger, primary_key=True, index=True)
    task_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.tasks.id", ondelete="CASCADE"),
        nullable=False,
    )
    assignee_id = Column(
        BigInteger,
        ForeignKey(f"{APP_SCHEMA}.users.id", ondelete="RESTRICT"),
        nullable=False,
    )
    title = Column(Text, nullable=False)
    progress = Column(Integer, nullable=False, server_default=text("0"))

    task = relationship("Task")
    assignee = relationship("User")

