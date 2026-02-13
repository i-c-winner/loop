from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.v1.deps import require_roles
from app.core.database import get_db
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "chief")),
) -> User:
    if payload.email:
        email = payload.email.strip().lower()
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="email is required",
        )

    if current_user.role == "chief" and payload.role.value != "designer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="chief can create only designer users",
        )

    user = User(
        email=email,
        full_name=payload.full_name,
        role=payload.role.value,
        hashed_password=hash_password(payload.password),
        is_active=payload.is_active,
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists",
        )
    db.refresh(user)
    return user
