from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.models.booking import BookingStatus

class Booking(BaseModel):
    id: UUID
    user_id: UUID
    showing_id: UUID
    seats: int
    status: BookingStatus
    booked_at: datetime