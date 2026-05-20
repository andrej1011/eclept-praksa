from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest, LoginResponse
from app.schemas.user import UserRead
from app.services.auth import AuthService
from app.models.user import User
from app.enums.user import UserRole

router = APIRouter()

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(db)

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, service: AuthService = Depends(get_auth_service)):
    return service.create_user(data)

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest, service: AuthService = Depends(get_auth_service)):
    user, token = service.login(data)
    return LoginResponse(user=user, access_token=token)

bearer_scheme = HTTPBearer()

def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    service: AuthService = Depends(get_auth_service),
) -> User:
    return service.get_user_by_token(creds.credentials)

def require_role(*roles: UserRole):
    def checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status.HTTP_403_FORBIDDEN)
        return user
    return checker
