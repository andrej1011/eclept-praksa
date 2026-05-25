import uuid
from datetime import date
from sqlalchemy import String, Boolean, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

class Movie(Base):
    __tablename__ = "movies"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255),nullable=False)
    available: Mapped[bool] = mapped_column(Boolean, default=True)
    duration: Mapped[int] = mapped_column(Integer)
    poster_url: Mapped[str | None] = mapped_column(String(255))
    short_description: Mapped[str | None] = mapped_column(String(1000))
    release_date: Mapped[date | None] = mapped_column(Date)
    imdb_link: Mapped[str | None] = mapped_column(String(100))

    showings: Mapped[list["Showing"]] = relationship("Showing", back_populates="movie")
    genres: Mapped[list["Genre"]] = relationship("Genre", secondary="movie_genres", back_populates="movies")