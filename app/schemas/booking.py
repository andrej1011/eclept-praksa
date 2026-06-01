from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from app.enums.booking import BookingStatus

class BookingBase(BaseModel):
    user_id: UUID
    showing_id: UUID
    seats: int = Field(gt=0)

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    status: BookingStatus

class BookingRead(BookingBase):
    id: UUID
    status: BookingStatus
    booked_at: datetime
    model_config = {"from_attributes": True}