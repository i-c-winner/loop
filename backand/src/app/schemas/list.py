from pydantic import BaseModel, ConfigDict, Field


class ListBase(BaseModel):
    task_id: int
    assignee_id: int
    title: str
    progress: int = Field(default=0, ge=0, le=100)


class ListCreate(ListBase):
    pass


class ListUpdate(BaseModel):
    assignee_id: int | None = None
    title: str | None = None
    progress: int | None = Field(default=None, ge=0, le=100)


class ListRead(ListBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

