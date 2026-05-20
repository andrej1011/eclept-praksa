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
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Auditorium not found")
        return a

    def create(self, data: AuditoriumCreate) -> Auditorium:
        if self._db.query(Auditorium).filter(Auditorium.name == data.name).first():
            raise HTTPException(status.HTTP_409_CONFLICT, "Auditorium name already exists")
        a = Auditorium(name=data.name, capacity=data.capacity)
        self._db.add(a)
        self._db.commit()
        self._db.refresh(a)
        return a

    def update(self, auditorium_id: UUID, data: AuditoriumUpdate) -> Auditorium:
        a = self.get_one(auditorium_id)
        update_data = data.model_dump(exclude_unset=True)
        if "name" in update_data and update_data["name"] != a.name:
            if self._db.query(Auditorium).filter(Auditorium.name == update_data["name"]).first():
                raise HTTPException(status.HTTP_409_CONFLICT, "Auditorium name already exists")
        for k, v in update_data.items():
            setattr(a, k, v)
        self._db.commit()
        self._db.refresh(a)
        return a

    def delete(self, auditorium_id: UUID) -> None:
        a = self.get_one(auditorium_id)
        self._db.delete(a)
        self._db.commit()