from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.user import User
from app.schemas.user import UserUpdate
from app.core.security import hash_password, verify_password

class UserService:
    def __init__(self, db: Session):
        self._db = db

    def update_profile(self, user: User, data: UserUpdate) -> User:
        update_data = data.model_dump(exclude_unset=True)
        if update_data.get("email"):
            existing = self._db.query(User).filter(User.email == update_data["email"]).first()
            if existing and existing.id != user.id:
                raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail="Email already in use")
        if update_data.get("phone_number"):
            existing = self._db.query(User).filter(User.phone_number == str(update_data["phone_number"])).first()
            if existing and existing.id != user.id:
                raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail="Phone number already in use")
        for k, v in update_data.items():
            setattr(user, k, v)
        try:
            self._db.commit()
            self._db.refresh(user)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update profile")
        return user

    def change_password(self, user: User, old_password: str, new_password: str) -> None:
        if not verify_password(old_password, user.password):
            raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail="Old password incorrect")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Old password incorrect")
        user.password = hash_password(new_password)
        try:
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to change password")

    def get_all(self) -> list[User]:
        return self._db.query(User).all()

    def get_one(self, user_id: UUID) -> User:
        u = self._db.query(User).filter(User.id == user_id).first()
        if not u:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
        return u

    def change_role(self, user_id: UUID, role: UserRole) -> User:
        u = self.get_one(user_id)
        u.role = role
        try:
            self._db.commit()
            self._db.refresh(u)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to change role")
        return u

    def delete(self, user_id: UUID) -> None:
        u = self.get_one(user_id)
        self._db.delete(u)
        try:
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete user")
