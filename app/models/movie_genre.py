from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid

class MovieGenre(Base):
    __tablename__ = "movie_genres"

    movie_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("movies.id"), primary_key=True)
    genre_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("genres.id"), primary_key=True)