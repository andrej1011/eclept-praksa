from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password, create_access_token, decode_token

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
    
    def login(self, data: LoginRequest) -> tuple[User, str]:
        user = self._db.query(User).filter(User.username == data.username).first()
        if not user or not verify_password(data.password, user.password):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Username or password incorrect")
        token = create_access_token(str(user.id), user.role.value)
        return user, token
    
    def whoami(self, token: str) -> str:
        payload = decode_token(token)
        user = self._db.query(User).filter(User.id == payload["sub"]).first()
        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
        return user.username