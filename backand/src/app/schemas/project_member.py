from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.enums import ProjectRole


class ProjectMemberBase(BaseModel):
    project_id: int
    user_id: int
    role: ProjectRole = ProjectRole.viewer


class ProjectMemberCreate(ProjectMemberBase):
    pass


class ProjectMemberRead(ProjectMemberBase):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime

