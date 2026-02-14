from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_user, require_roles
from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectRead
from pydantic import BaseModel


class ProjectCreateRequest(BaseModel):
    owner_id: int
    name: str
    description: str | None = None


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectRead])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Project]:
    if current_user.role == "admin":
        return db.query(Project).order_by(Project.id.desc()).all()
    if current_user.role == "chief":
        return (
            db.query(Project)
            .filter(Project.owner_id == current_user.id)
            .order_by(Project.id.desc())
            .all()
        )
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not enough permissions",
    )


@router.post("", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectCreateRequest,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> Project:
    name = payload.name.strip()
    if not name:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="name is required",
        )

    owner = db.query(User).filter(User.id == payload.owner_id).first()
    if not owner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Owner user not found",
        )

    project = Project(
        owner_id=payload.owner_id,
        name=name,
        description=payload.description,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project
