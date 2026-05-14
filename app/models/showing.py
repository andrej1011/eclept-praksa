import uuid
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import TIMESTAMP
from app.db.database import Base
from datetime import datetime

class Showing(Base):
    __tablename__ = "showings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4,Nullable=False)
    movie_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("movies.id"),Nullable=False)
    auditorium_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("auditoriums.id"),Nullable=False)
    start_time: Mapped[datetime] = mapped_column(TIMESTAMP,Nullable=False)
    booked_seats: Mapped[int] = mapped_column(Integer, default=0)

    movie: Mapped["Movie"] = relationship("Movie", back_populates="showings")
    auditorium: Mapped["Auditorium"] = relationship("Auditorium", back_populates="showings")
    bookings: Mapped[list["Booking"]] = relationship("Booking", back_populates="showing")