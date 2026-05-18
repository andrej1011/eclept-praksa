from fastapi import APIRouter, Cookie, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.config import jwt_settings
from app.db.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.schemas.user import UserRead
from app.services.auth import AuthService


router = APIRouter(tags=["auth"])

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(db)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, service: AuthService = Depends(get_auth_service)):
    service.create_user(data)
    return {"message": "registered successfully"}

@router.post("/login", response_model=UserRead)
def login(data: LoginRequest, response: Response, service: AuthService = Depends(get_auth_service)):
    user, token = service.login(data)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=jwt_settings.HTTP_ONLY,
        secure=jwt_settings.COOKIE_SECURE,
        samesite=jwt_settings.COOKIE_SAMESITE,
        max_age=jwt_settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    return user

@router.get("/whoami")
def whoami(access_token: str = Cookie(), service: AuthService = Depends(get_auth_service)):
    return service.whoami(access_token)