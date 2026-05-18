from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.core.security import hash_password

class AuthService:
    def __init__(self, db: Session):
        self._db = db

    def create_user(self, data: RegisterRequest) -> User:
        if self._db.query(User).filter(User.username == data.username).first():
            raise HTTPException(status.HTTP_409_CONFLICT, "Username already taken")
        if data.email and self._db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status.HTTP_409_CONFLICT, "Email already in use")
        if data.phone_number and self._db.query(User).filter(User.phone_number == str(data.phone_number)).first():
            raise HTTPException(status.HTTP_409_CONFLICT, "Phone number already in use")

        user = User(
            username=data.username,
            password=hash_password(data.password),
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            phone_number=str(data.phone_number) if data.phone_number else None,
        )
        self._db.add(user)
        self._db.commit()
        self._db.refresh(user)
        return user