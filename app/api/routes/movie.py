from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.db.database import get_db
from app.api.routes.auth import require_role
from app.enums.user import UserRole
from app.schemas.movie import MovieCreate, MovieUpdate, MovieRead
from app.services.movie import MovieService

router = APIRouter(prefix="/movies",tags=["movies"])

def get_movie_service(db: Session = Depends(get_db)) -> MovieService:
    return MovieService(db)

@router.get("", response_model=list[MovieRead])
def list_movies(service: MovieService = Depends(get_movie_service)):
    return service.get_all()

@router.get("/search", response_model=MovieRead)
def search_movie(name: str, service: MovieService = Depends(get_movie_service)):
    return service.get_by_name(name)

@router.get("/{movie_id}", response_model=MovieRead)
def get_movie(movie_id: UUID, service: MovieService = Depends(get_movie_service)):
    return service.get_one(movie_id)

@router.post("", response_model=MovieRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role(UserRole.admin))])
def create_movie(data: MovieCreate, service: MovieService = Depends(get_movie_service)):
    return service.create(data)

@router.patch("/{movie_id}", response_model=MovieRead, dependencies=[Depends(require_role(UserRole.admin))])
def update_movie(movie_id: UUID, data: MovieUpdate, service: MovieService = Depends(get_movie_service)):
    return service.update(movie_id, data)

@router.delete("/{movie_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role(UserRole.admin))])
def delete_movie(movie_id: UUID, service: MovieService = Depends(get_movie_service)):
    service.delete(movie_id)