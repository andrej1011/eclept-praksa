from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.movie import Movie
from app.models.genre import Genre
from app.schemas.movie import MovieCreate, MovieUpdate

class MovieService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self) -> list[Movie]:
        return self._db.query(Movie).all()

    def get_one(self, movie_id: UUID) -> Movie:
        m = self._db.query(Movie).filter(Movie.id == movie_id).first()
        if not m:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found")
        return m
    
    def get_by_name(self, movie_name: str) -> Movie:
        m = self._db.query(Movie).filter(Movie.name == movie_name).first()
        if not m:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found")
        return m

    def create(self, data: MovieCreate) -> Movie:
        movie = Movie(
            name=data.name,
            available=data.available,
            duration=data.duration,
            poster_url=data.poster_url,
            short_description=data.short_description,
            release_date=data.release_date,
            imdb_link=data.imdb_link,
        )
        if data.genre_ids:
            movie.genres = self._db.query(Genre).filter(Genre.id.in_(data.genre_ids)).all()
        self._db.add(movie)
        self._db.commit()
        self._db.refresh(movie)
        return movie

    def update(self, movie_id: UUID, data: MovieUpdate) -> Movie:
        movie = self.get_one(movie_id)
        update_data = data.model_dump(exclude_unset=True)
        genre_ids = update_data.pop("genre_ids", None)
        for k, v in update_data.items():
            setattr(movie, k, v)
        if genre_ids is not None:
            movie.genres = self._db.query(Genre).filter(Genre.id.in_(genre_ids)).all()
        self._db.commit()
        self._db.refresh(movie)
        return movie

    def delete(self, movie_id: UUID) -> None:
        movie = self.get_one(movie_id)
        self._db.delete(movie)
        self._db.commit()