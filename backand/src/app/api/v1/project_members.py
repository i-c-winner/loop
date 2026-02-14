from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_user, require_roles
from app.core.database import get_db
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.user import User
from app.schemas.project_member import ProjectMemberCreate, ProjectMemberRead

router = APIRouter(prefix="/project-members", tags=["project-members"])


@router.post("", response_model=ProjectMemberRead, status_code=status.HTTP_201_CREATED)
def add_project_member(
    payload: ProjectMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "chief")),
) -> ProjectMember:
    project = db.query(Project).filter(Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if current_user.role == "chief" and project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="chief can add members only to own projects",
        )

    item = ProjectMember(
        project_id=payload.project_id,
        user_id=payload.user_id,
        role=payload.role.value,
    )
    db.add(item)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Member already exists in project",
        )
    db.refresh(item)
    return item

