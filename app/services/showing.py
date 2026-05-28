from fastapi import HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime,timezone

from app.models.showing import Showing
from app.schemas.showing import ShowingCreate, ShowingUpdate,ShowingFilters
from app.models.auditorium import Auditorium
from app.enums.sorting import SortOrder
from app.enums.showing import ShowingStatus
from app.enums.booking import BookingStatus
from app.models.booking import Booking



class ShowingService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self, f: ShowingFilters) -> list[Showing]:
        now = datetime.now(timezone.utc)
        query = self._db.query(Showing)

        if f.movie_id:
            query = query.filter(Showing.movie_id == f.movie_id)
        if f.day:
            query = query.filter(func.date(Showing.start_time) == f.day)
        if f.upcoming:
            query = query.filter(Showing.start_time >= now)
        if f.passed:
            query = query.filter(Showing.start_time < now)
        if f.fully_booked is not None:
            query = query.join(Auditorium)
            if f.fully_booked:
                query = query.filter(Showing.booked_seats >= Auditorium.capacity)
            else:
                query = query.filter(Showing.booked_seats < Auditorium.capacity)

        col = Showing.start_time
        query = query.order_by(col.desc() if f.order == SortOrder.desc else col.asc())
        return query.offset(f.offset).limit(f.limit).all()

    def get_one(self, showing_id: UUID) -> Showing:
        s = self._db.query(Showing).filter(Showing.id == showing_id).first()
        if not s:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Showing not found")
        return s

    def create(self, data: ShowingCreate) -> Showing:
        showing = Showing(
            movie_id=data.movie_id,
            auditorium_id=data.auditorium_id,
            start_time=data.start_time,
            booked_seats=0,
        )
        try:
            self._db.add(showing)
            self._db.commit()
            self._db.refresh(showing)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create showing")
        return showing

    def update(self, showing_id: UUID, data: ShowingUpdate) -> Showing:
        showing = self.get_one(showing_id)
        for k, v in data.model_dump(exclude_unset=True).items():
            setattr(showing, k, v)
        try:
            self._db.commit()
            self._db.refresh(showing)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update showing")
        return showing

    def delete(self, showing_id: UUID) -> None:
        showing = self.get_one(showing_id)
        try:
            self._db.delete(showing)
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete showing")
        
    def cancel(self, showing_id: UUID) -> Showing:
        showing = self.get_one(showing_id)
        if showing.status == ShowingStatus.cancelled:
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail="Showing already cancelled")

        showing.status = ShowingStatus.cancelled
        self._db.query(Booking).filter(
            Booking.showing_id == showing_id,
            Booking.status == BookingStatus.active,
        ).update({"status": BookingStatus.cancelled}, synchronize_session=False)

        try:
            self._db.commit()
            self._db.refresh(showing)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to cancel showing")
        return showing