from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from app.enums.booking import BookingStatus

class BookingBase(BaseModel):
    showing_id: UUID
    seats: int

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    status: BookingStatus | None = None

class BookingRead(BookingBase):
    id: UUID
    user_id: UUID
    status: BookingStatus
    booked_at: datetime
    model_config = {"from_attributes": True}