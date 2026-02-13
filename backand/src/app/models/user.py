from sqlalchemy import BigInteger, Boolean, Column, DateTime, Text, func, text
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.models.enums import APP_SCHEMA, user_role_enum


class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": APP_SCHEMA}

    id = Column(BigInteger, primary_key=True, index=True)
    email = Column(Text, unique=True, nullable=True)
    full_name = Column(Text, nullable=False)
    role = Column(user_role_enum, nullable=False, server_default=text("'pm'"))
    hashed_password = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, server_default=text("true"))
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    owned_projects = relationship("Project", back_populates="owner")
    memberships = relationship(
        "ProjectMember",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    assigned_tasks = relationship("Task", back_populates="assignee")
