from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.genre import Genre
from app.schemas.genre import GenreCreate,GenreUpdate

class GenreService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self) -> list[Genre]:
        return self._db.query(Genre).all()
    
    def get_one(self, genre_id: UUID) -> Genre:
        g = self._db.query(Genre).filter(Genre.id == genre_id).first()
        if not g:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Genre not found")
        return g

    def get_by_name(self, name: str) -> Genre:
        g = self._db.query(Genre).filter(Genre.name.ilike(name)).first()
        if not g:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Genre not found")
        return g

    def create(self, data: GenreCreate) -> Genre:
        if self._db.query(Genre).filter(Genre.name == data.name).first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Genre already exists")
        g = Genre(name=data.name)
        self._db.add(g)
        self._db.commit()
        self._db.refresh(g)
        return g
    
    def update(self, genre_id: UUID, data: GenreUpdate) -> Genre:
        g = self.get_one(genre_id)
        update_data = data.model_dump(exclude_unset=True)
        if "name" in update_data and update_data["name"] != g.name:
            if self._db.query(Genre).filter(Genre.name == update_data["name"]).first():
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Genre already exists")
        for k, v in update_data.items():
            setattr(g, k, v)
        self._db.commit()
        self._db.refresh(g)
        return g

    def delete(self, genre_id: UUID) -> None:
        g = self.get_one(genre_id)
        self._db.delete(g)
        self._db.commit()
