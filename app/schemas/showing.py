from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from datetime import datetime,date,timezone
from app.enums.sorting import SortOrder
from app.enums.showing import ShowingStatus

from app.schemas.booking import BookingRead

class ShowingBase(BaseModel):
    movie_id: UUID
    auditorium_id: UUID
    start_time: datetime

    @field_validator("start_time")
    @classmethod
    def future(cls, v):
        assert v >= datetime.now(timezone.utc), "start_time must be in the future"
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
    status: ShowingStatus
    model_config = {"from_attributes": True}

class ShowingFilters(BaseModel):
    movie_id: UUID | None = None
    day: date | None = None
    upcoming: bool | None = None
    passed: bool | None = None
    fully_booked: bool | None = None
    order: SortOrder = SortOrder.asc
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)

ShowingRead.model_rebuild()