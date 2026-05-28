from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone

from app.models.booking import Booking
from app.models.showing import Showing
from app.enums.booking import BookingStatus
from app.schemas.booking import BookingCreate, BookingFilters
from app.enums.sorting import SortOrder

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
        return self._db.query(Booking)
    
    def get_user_bookings(self, user_id: UUID, f: BookingFilters) -> list[Booking]:
        now = datetime.now(timezone.utc)
        query = self._db.query(Booking).filter(Booking.user_id == user_id)

        if f.status:
            query = query.filter(Booking.status == f.status)
        if f.upcoming or f.passed:
            query = query.join(Showing)
            if f.upcoming:
                query = query.filter(Showing.start_time >= now)
            if f.passed:
                query = query.filter(Showing.start_time < now)

        col = Booking.booked_at
        query = query.order_by(col.desc() if f.order == SortOrder.desc else col.asc())
        return query.offset(f.offset).limit(f.limit).all()

    def get_one(self, booking_id: UUID, user_id: UUID) -> Booking:
        b = self._db.query(Booking).filter(Booking.id == booking_id).first()
        if not b:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Booking not found")
        if b.user_id != user_id:
            raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Not your booking")
        return b

    def cancel(self, booking_id: UUID, user_id: UUID) -> Booking:
        booking = self.get_one(booking_id, user_id)
        if booking.status == BookingStatus.cancelled:
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "Booking already cancelled")

        showing = (
            self._db.query(Showing)
            .filter(Showing.id == booking.showing_id)
            .with_for_update()
            .first()
        )
        try:
            showing.booked_seats -= booking.seats
            booking.status = BookingStatus.cancelled
            self._db.commit()
            self._db.refresh(booking)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to cancel the booking")
        return booking

    def mark_used(self, booking_id: UUID) -> Booking:
        booking = self._db.query(Booking).filter(Booking.id == booking_id).first()
        if not booking:
            raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Booking not found")
        if booking.status != BookingStatus.active:
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail=f"Booking is {booking.status.value}, cannot mark used")

        booking.status = BookingStatus.used
        try:
            self._db.commit()
            self._db.refresh(booking)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to mark booking used")
        return booking