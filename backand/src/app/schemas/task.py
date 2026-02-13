from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.enums import TaskStatus


class TaskBase(BaseModel):
    project_id: int
    assignee_id: int
    title: str
    description: str | None = None
    progress: int = Field(default=0, ge=0, le=100)
    status: TaskStatus = TaskStatus.todo


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    assignee_id: int | None = None
    title: str | None = None
    description: str | None = None
    progress: int | None = Field(default=None, ge=0, le=100)
    status: TaskStatus | None = None


class TaskRead(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime

