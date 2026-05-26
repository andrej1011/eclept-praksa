from fastapi import HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import date

from app.models.showing import Showing
from app.schemas.showing import ShowingCreate, ShowingUpdate

class ShowingService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self) -> list[Showing]:
        return self._db.query(Showing).all()

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
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create showing")
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
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update showing")
        return showing

    def delete(self, showing_id: UUID) -> None:
        showing = self.get_one(showing_id)
        try:
            self._db.delete(showing)
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete showing")