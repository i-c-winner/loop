from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_user, require_roles
from app.core.database import get_db
from app.models.project import Project
from app.models.project_member import ProjectMember
from app.models.task import Task
from app.models.user import User
from app.schemas.enums import TaskStatus
from app.schemas.task import TaskCreate, TaskRead

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskRead])
def list_tasks(
    project_id: int | None = Query(default=None, ge=1),
    assignee_id: int | None = Query(default=None, ge=1),
    status_value: TaskStatus | None = Query(default=None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Task]:
    query = db.query(Task).join(Project, Project.id == Task.project_id)

    if current_user.role == "chief":
        query = query.filter(Project.owner_id == current_user.id)
    elif current_user.role == "designer":
        query = query.join(
            ProjectMember,
            (ProjectMember.project_id == Project.id)
            & (ProjectMember.user_id == current_user.id),
        )
    elif current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    if project_id is not None:
        query = query.filter(Task.project_id == project_id)
    if assignee_id is not None:
        query = query.filter(Task.assignee_id == assignee_id)
    if status_value is not None:
        query = query.filter(Task.status == status_value.value)

    return query.order_by(Task.id.desc()).all()


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "chief")),
) -> Task:
    project = db.query(Project).filter(Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    assignee = db.query(User).filter(User.id == payload.assignee_id).first()
    if not assignee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignee not found")

    if current_user.role == "chief" and project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="chief can create tasks only in own projects",
        )

    task = Task(
        project_id=payload.project_id,
        assignee_id=payload.assignee_id,
        title=payload.title,
        description=payload.description,
        progress=payload.progress,
        status=payload.status.value,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
