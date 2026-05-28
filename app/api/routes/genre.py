from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import require_role
from app.enums.user import UserRole
from app.schemas.genre import GenreRead,GenreCreate,GenreUpdate
from app.services.genre import GenreService

router = APIRouter(prefix="/genres",tags=["genres"])

def get_genre_service(db: Session = Depends(get_db)) -> GenreService:
    return GenreService(db)

@router.get("", response_model=list[GenreRead],status_code=status.HTTP_200_OK)
def list_genres(name: str | None = None, service: GenreService = Depends(get_genre_service)):
    return service.get_all(name)

@router.get("/{genre_id}", response_model=GenreRead,status_code=status.HTTP_200_OK)
def get_genre(genre_id: UUID, service: GenreService = Depends(get_genre_service)):
    return service.get_one(genre_id)

@router.post("", response_model=GenreRead, status_code=status.HTTP_201_CREATED,dependencies=[Depends(require_role(UserRole.admin))])
def create_genre(data: GenreCreate, service: GenreService = Depends(get_genre_service)):
    return service.create(data)

@router.patch("/{genre_id}", response_model=GenreRead,status_code=status.HTTP_200_OK,dependencies=[Depends(require_role(UserRole.admin))])
def update_genre(auditorium_id: UUID, data: GenreUpdate, service: GenreService = Depends(get_genre_service)):
    return service.update(auditorium_id, data)

@router.delete("/{genre_id}", status_code=status.HTTP_204_NO_CONTENT,dependencies=[Depends(require_role(UserRole.admin))])
def delete_genre(genre_id: UUID, service: GenreService = Depends(get_genre_service)):
    service.delete(genre_id)
