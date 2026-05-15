from pydantic import BaseModel, Field, field_validator
from uuid import UUID
import datetime

from app.core.config import timezone
from app.schemas.booking import BookingRead

class ShowingBase(BaseModel):
    movie_id: UUID
    auditorium_id: UUID
    start_time: datetime

    @field_validator("start_time")
    @classmethod
    def future(cls, v):
        assert v >= datetime.now(timezone.SERVER_TIMEZONE), "start_time must be in the future"
        return v

class ShowingCreate(ShowingBase):
    pass

class ShowingUpdate(BaseModel):
    movie_id: UUID | None = None
    auditorium_id: UUID | None = None
    start_time: datetime | None = None

class ShowingRead(BaseModel):
    id: UUID
    movie_id: UUID
    auditorium_id: UUID
    start_time: datetime
    booked_seats: int = Field(ge=0)
    bookings: list["BookingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

ShowingRead.model_rebuild()