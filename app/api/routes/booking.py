from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import get_current_user,require_role
from app.enums.user import UserRole
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingRead
from app.services.booking import BookingService

router = APIRouter(prefix="/bookings",tags=["bookings"])

def get_booking_service(db: Session = Depends(get_db)) -> BookingService:
    return BookingService(db)

@router.post("", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(
    data: BookingCreate,
    user: User = Depends(get_current_user),
    service: BookingService = Depends(get_booking_service)
):
    return service.create(user.id, data)

@router.get("", response_model=list[BookingRead],status_code=status.HTTP_200_OK,dependencies=[Depends(require_role(UserRole.admin))])
def all_bookings(
    user: User = Depends(get_current_user),
    service: BookingService = Depends(get_booking_service)
):
    return service.get_all_bookings()

@router.get("", response_model=list[BookingRead],status_code=status.HTTP_200_OK)
def my_bookings(
    user: User = Depends(get_current_user),
    service: BookingService = Depends(get_booking_service),
):
    return service.get_user_bookings(user.id)

@router.get("/{booking_id}", response_model=BookingRead)
def get_booking(
    booking_id: UUID,
    user: User = Depends(get_current_user),
    service: BookingService = Depends(get_booking_service),
):
    return service.get_one(booking_id, user.id)

@router.post("/{booking_id}/cancel", response_model=BookingRead)
def cancel_booking(
    booking_id: UUID,
    user: User = Depends(get_current_user),
    service: BookingService = Depends(get_booking_service),
):
    return service.cancel(booking_id, user.id)
