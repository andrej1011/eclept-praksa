from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

from app.schemas.booking import BookingRead

class ShowingBase(BaseModel):
    movie_id: UUID
    auditorium_id: UUID
    start_time: datetime

class ShowingCreate(ShowingBase):
    pass

class ShowingUpdate(BaseModel):
    movie_id: UUID | None = None
    auditorium_id: UUID | None = None
    start_time: datetime | None = None

class ShowingRead(ShowingBase):
    id: UUID
    booked_seats: int
    bookings: list["BookingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

ShowingRead.model_rebuild()