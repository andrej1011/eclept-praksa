from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import require_role
from app.enums.user import UserRole
from app.schemas.showing import ShowingCreate, ShowingUpdate, ShowingRead, ShowingFilters
from app.services.showing import ShowingService

router = APIRouter(prefix="/showings",tags=["showings"])

def get_showing_service(db: Session = Depends(get_db)) -> ShowingService:
    return ShowingService(db)

@router.get("", response_model=list[ShowingRead])
def list_showings(filters: ShowingFilters = Depends(), service: ShowingService = Depends(get_showing_service)):
    return service.get_all(filters)

@router.post("", response_model=ShowingRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role(UserRole.admin))])
def create_showing(data: ShowingCreate, service: ShowingService = Depends(get_showing_service)):
    return service.create(data)

@router.get("/{showing_id}", response_model=ShowingRead,status_code=status.HTTP_200_OK)
def get_showing(showing_id: UUID, service: ShowingService = Depends(get_showing_service)):
    return service.get_one(showing_id)

@router.patch("/{showing_id}", response_model=ShowingRead,status_code=status.HTTP_200_OK, dependencies=[Depends(require_role(UserRole.admin))])
def update_showing(showing_id: UUID, data: ShowingUpdate, service: ShowingService = Depends(get_showing_service)):
    return service.update(showing_id, data)

@router.delete("/{showing_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role(UserRole.admin))])
def delete_showing(showing_id: UUID, service: ShowingService = Depends(get_showing_service)):
    service.delete(showing_id)

@router.post("/{showing_id}/cancel", response_model=ShowingRead, dependencies=[Depends(require_role(UserRole.admin))])
def cancel_showing(showing_id: UUID, service: ShowingService = Depends(get_showing_service)):
    return service.cancel(showing_id)