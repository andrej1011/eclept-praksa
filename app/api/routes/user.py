from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import get_current_user, require_role
from app.models.user import User
from app.enums.user import UserRole
from app.schemas.user import UserRead, UserUpdate, PasswordChange, RoleUpdate
from app.services.user import UserService

router = APIRouter(prefix="/users",tags=["users"])

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(db)


@router.get("/me", response_model=UserRead)
def get_my_profile(user: User = Depends(get_current_user)):
    return user

@router.patch("/me", response_model=UserRead)
def update_my_profile(data: UserUpdate, user: User = Depends(get_current_user), service: UserService = Depends(get_user_service)):
    return service.update_profile(user, data)

@router.patch("/me/password", status_code=status.HTTP_204_NO_CONTENT)
def change_my_password(data: PasswordChange, user: User = Depends(get_current_user), service: UserService = Depends(get_user_service)):
    service.change_password(user, data.old_password, data.new_password)

# admin routes
@router.get("", response_model=list[UserRead], dependencies=[Depends(require_role(UserRole.admin))])
def list_users(service: UserService = Depends(get_user_service)):
    return service.get_all()

@router.get("/{user_id}", response_model=UserRead, dependencies=[Depends(require_role(UserRole.admin))])
def get_user(user_id: UUID, service: UserService = Depends(get_user_service)):
    return service.get_one(user_id)

@router.patch("/{user_id}/role", response_model=UserRead, dependencies=[Depends(require_role(UserRole.admin))])
def change_user_role(user_id: UUID, data: RoleUpdate, service: UserService = Depends(get_user_service)):
    return service.change_role(user_id, data.role)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role(UserRole.admin))])
def delete_user(user_id: UUID, service: UserService = Depends(get_user_service)):
    service.delete(user_id)