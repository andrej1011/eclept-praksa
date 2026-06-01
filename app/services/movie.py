from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.movie import Movie
from app.models.genre import Genre
from app.schemas.movie import MovieCreate, MovieUpdate,MovieFilterParams, SortOrder

class MovieService:
    def __init__(self, db: Session):
        self._db = db

    def get_all(self, f: MovieFilterParams) -> list[Movie]:
        query = self._db.query(Movie)

        if f.name:
            query = query.filter(Movie.name.ilike(f"%{f.name}%"))
        if f.genre_id:
            query = query.filter(Movie.genres.any(Genre.id == f.genre_id))
        if f.available is not None:
            query = query.filter(Movie.available == f.available)
        if f.duration_min is not None:
            query = query.filter(Movie.duration >= f.duration_min)
        if f.duration_max is not None:
            query = query.filter(Movie.duration <= f.duration_max)
        if f.release_date_from is not None:
            query = query.filter(Movie.release_date >= f.release_date_from)
        if f.release_date_to is not None:
            query = query.filter(Movie.release_date <= f.release_date_to)

        if f.sort_by:
            col = getattr(Movie, f.sort_by.value)
            query = query.order_by(col.desc() if f.order == SortOrder.desc else col.asc())

        return query.offset(f.offset).limit(f.limit).all()

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
        try:
            self._db.add(movie)
            self._db.commit()
            self._db.refresh(movie)
        except Exception:
            self._db.rollback()
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create movie entry")
        return movie

    def update(self, movie_id: UUID, data: MovieUpdate) -> Movie:
        movie = self.get_one(movie_id)
        update_data = data.model_dump(exclude_unset=True)
        genre_ids = update_data.pop("genre_ids", None)
        for k, v in update_data.items():
            setattr(movie, k, v)
        if genre_ids is not None:
            movie.genres = self._db.query(Genre).filter(Genre.id.in_(genre_ids)).all()
        try:
            self._db.commit()
            self._db.refresh(movie)
        except Exception:
            self._db.rollback()
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update movie entry")
        return movie

    def delete(self, movie_id: UUID) -> None:
        movie = self.get_one(movie_id)
        try:
            self._db.delete(movie)
            self._db.commit()
        except Exception:
            self._db.rollback()
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete movie entry")