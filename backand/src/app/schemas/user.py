from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.schemas.enums import UserRole


class UserBase(BaseModel):
    email: EmailStr | None = None
    full_name: str
    role: UserRole = UserRole.pm
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
