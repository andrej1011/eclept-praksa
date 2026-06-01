from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.booking import Booking
from app.models.showing import Showing
from app.enums.booking import BookingStatus
from app.schemas.booking import BookingCreate

class BookingService:
    def __init__(self, db: Session):
        self._db = db

    def create(self, user_id: UUID, data: BookingCreate) -> Booking:
        showing = (
            self._db.query(Showing)
            .filter(Showing.id == data.showing_id)
            .with_for_update()
            .first()
        )
        if not showing:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Showing not found")

        if showing.booked_seats + data.seats > showing.auditorium.capacity:
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Not enough seats available")

        showing.booked_seats += data.seats
        booking = Booking(
            user_id=user_id,
            showing_id=data.showing_id,
            seats=data.seats,
            status=BookingStatus.active,
        )
        try:
            self._db.add(booking)
            self._db.commit()
            self._db.refresh(booking)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create booking")
        return booking

    def get_all_bookings(self)-> list[Booking]:
        return self._db.query(Booking).all()
    
    def get_user_bookings(self, user_id: UUID) -> list[Booking]:
        return self._db.query(Booking).filter(Booking.user_id == user_id).all()

    def get_one(self, booking_id: UUID, user_id: UUID) -> Booking:
        b = self._db.query(Booking).filter(Booking.id == booking_id).first()
        if not b:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Booking not found")
        if b.user_id != user_id:
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Not your booking")
        return b

    def cancel(self, booking_id: UUID, user_id: UUID) -> Booking:
        booking = (
            self._db.query(Booking)
            .filter(Booking.id == booking_id, Booking.user_id == user_id)
            .with_for_update()
            .first()
        )
        if booking.status == BookingStatus.cancelled:
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Booking already cancelled")

        showing = (
            self._db.query(Showing)
            .filter(Showing.id == booking.showing_id)
            .with_for_update()
            .first()
        )
        if not showing:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Showing not found")
        
        try:
            if (showing.booked_seats-booking.seats>=0):
                showing.booked_seats -= booking.seats
                
            booking.status = BookingStatus.cancelled
            self._db.commit()
            self._db.refresh(booking)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to cancel the booking")
        return booking