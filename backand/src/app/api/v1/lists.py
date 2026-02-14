from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.v1.deps import require_roles
from app.core.database import get_db
from app.models.list import List
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.task import Task
from app.models.user import User
from app.schemas.list import ListCreate, ListRead

router = APIRouter(prefix="/lists", tags=["lists"])


@router.get("", response_model=list[ListRead])
def list_lists(
    project_id: int = Query(..., ge=1),
    task_id: int = Query(..., ge=1),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "chief", "designer")),
) -> list[List]:
    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.project_id == project_id)
        .first()
    )
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found for this project",
        )

    if current_user.role == "chief":
        owns_project = (
            db.query(Project.id)
            .filter(Project.id == project_id, Project.owner_id == current_user.id)
            .first()
            is not None
        )
        if not owns_project:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="chief can view lists only in own projects",
            )

    if current_user.role == "designer":
        is_member = (
            db.query(ProjectMember.project_id)
            .filter(
                ProjectMember.project_id == project_id,
                ProjectMember.user_id == current_user.id,
            )
            .first()
            is not None
        )
        if not is_member:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="designer can view lists only in projects where they participate",
            )

    return (
        db.query(List)
        .filter(List.task_id == task_id)
        .order_by(List.id.desc())
        .all()
    )


@router.post("", response_model=ListRead, status_code=status.HTTP_201_CREATED)
def create_list(
    payload: ListCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("designer")),
) -> List:
    task = db.query(Task).filter(Task.id == payload.task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    assignee = db.query(User).filter(User.id == payload.assignee_id).first()
    if not assignee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignee not found")

    item = List(
        task_id=payload.task_id,
        assignee_id=payload.assignee_id,
        title=payload.title,
        progress=payload.progress,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
