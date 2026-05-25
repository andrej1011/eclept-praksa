import uuid
from datetime import datetime, timezone
from sqlalchemy import ForeignKey, Integer, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import TIMESTAMP

from app.db.database import Base
from app.enums.booking import BookingStatus

class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    showing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("showings.id"))
    seats: Mapped[int] = mapped_column(Integer)
    status: Mapped[BookingStatus] = mapped_column(SAEnum(BookingStatus, name="booking_status"), default=BookingStatus.active)
    booked_at: Mapped[datetime] = mapped_column(TIMESTAMP, default=lambda: datetime.now(timezone.utc))

    user: Mapped["User"] = relationship("User", back_populates="bookings")
    showing: Mapped["Showing"] = relationship("Showing", back_populates="bookings")