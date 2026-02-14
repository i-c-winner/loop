from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.exc import DataError, IntegrityError
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_user, require_roles
from app.core.database import get_db
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.user import User
from app.schemas.enums import ProjectRole
from app.schemas.project_member import ProjectMemberCreate, ProjectMemberRead
from app.schemas.user import UserRead

router = APIRouter(prefix="/project_members", tags=["project_members"])


@router.get("/users", response_model=list[UserRead])
def list_project_member_users(
    project_id: int = Query(..., ge=1),
    role: ProjectRole = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "chief")),
) -> list[User]:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    if current_user.role == "chief" and project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="chief can view members only in own projects",
        )

    return (
        db.query(User)
        .join(
            ProjectMember,
            (ProjectMember.user_id == User.id) & (ProjectMember.project_id == project_id),
        )
        .filter(ProjectMember.role == role.value)
        .order_by(User.id.asc())
        .all()
    )


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

    existing = (
        db.query(ProjectMember)
        .filter(
            ProjectMember.project_id == payload.project_id,
            ProjectMember.user_id == payload.user_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Member already exists in project",
        )

    item = ProjectMember(
        project_id=payload.project_id,
        user_id=payload.user_id,
        role=payload.role.value,
    )
    db.add(item)
    try:
        db.commit()
    except (IntegrityError, DataError) as exc:
        db.rollback()
        raw_message = str(getattr(exc, "orig", exc)).lower()
        if "project_members_pkey" in raw_message or "duplicate key" in raw_message:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Member already exists in project",
            )
        if "project_role" in raw_message or "invalid input value for enum" in raw_message:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid role for project member. Apply latest migrations and use one of: chief, designer, pm",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid project member data",
        )
    db.refresh(item)
    return item
