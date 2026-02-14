from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import require_roles
from app.core.database import get_db
from app.models.list import List
from app.models.task import Task
from app.models.user import User
from app.schemas.list import ListCreate, ListRead

router = APIRouter(prefix="/lists", tags=["lists"])


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

