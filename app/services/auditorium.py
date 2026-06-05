from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.auditorium import Auditorium
from app.schemas.auditorium import AuditoriumCreate, AuditoriumUpdate

class AuditoriumService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self) -> list[Auditorium]:
        return self._db.query(Auditorium).all()

    def get_one(self, auditorium_id: UUID) -> Auditorium:
        a = self._db.query(Auditorium).filter(Auditorium.id == auditorium_id).first()
        if not a:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Auditorium not found")
        return a
    
    def create(self, data: AuditoriumCreate) -> Auditorium:
        if data.capacity <= 0:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="Capacity must be greater than 0")
        if self._db.query(Auditorium).filter(Auditorium.name == data.name).first():
            raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail="Auditorium name already exists")
        a = Auditorium(name=data.name, capacity=data.capacity)
        self._db.add(a)
        try:
            self._db.commit()
            self._db.refresh(a)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create auditorium")
        return a

    def update(self, auditorium_id: UUID, data: AuditoriumUpdate) -> Auditorium:
        a = self.get_one(auditorium_id)
        update_data = data.model_dump(exclude_unset=True)

        if "capacity" in update_data and update_data["capacity"] <= 0:
            raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="Capacity must be greater than 0")
        if "name" in update_data:
            existing = self._db.query(Auditorium).filter(Auditorium.name == update_data["name"]).first()
            if existing and existing.id != auditorium_id:
                raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail="Auditorium name already exists")

        for k, v in update_data.items():
            setattr(a, k, v)
        try:
            self._db.commit()
            self._db.refresh(a)
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update auditorium")
        return a
    
    def delete(self, auditorium_id: UUID) -> None:
        a = self.get_one(auditorium_id)
        try:
            self._db.delete(a)
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update auditorium")