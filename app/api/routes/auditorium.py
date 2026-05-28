
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import require_role
from app.enums.user import UserRole
from app.schemas.auditorium import AuditoriumCreate, AuditoriumUpdate, AuditoriumRead
from app.services.auditorium import AuditoriumService


router = APIRouter(prefix="/auditoriums",tags=["auditoriums"])

def get_auditorium_service(db: Session = Depends(get_db)) -> AuditoriumService:
    return AuditoriumService(db)

@router.get("", response_model=list[AuditoriumRead])
def list_auditoriums(service: AuditoriumService = Depends(get_auditorium_service)):
    return service.get_all()

@router.get("/{auditorium_id}", response_model=AuditoriumRead)
def get_auditorium(auditorium_id: UUID, service: AuditoriumService = Depends(get_auditorium_service)):
    return service.get_one(auditorium_id)

@router.post("", response_model=AuditoriumRead, status_code=status.HTTP_201_CREATED,dependencies=[Depends(require_role(UserRole.admin))])
def create_auditorium(data: AuditoriumCreate, service: AuditoriumService = Depends(get_auditorium_service)):
    return service.create(data)

@router.patch("/{auditorium_id}", response_model=AuditoriumRead,dependencies=[Depends(require_role(UserRole.admin))])
def update_auditorium(auditorium_id: UUID, data: AuditoriumUpdate, service: AuditoriumService = Depends(get_auditorium_service)):
    return service.update(auditorium_id, data)

@router.delete("/{auditorium_id}", status_code=status.HTTP_204_NO_CONTENT,dependencies=[Depends(require_role(UserRole.admin))])
def delete_auditorium(auditorium_id: UUID, service: AuditoriumService = Depends(get_auditorium_service)):
    service.delete(auditorium_id)