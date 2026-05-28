from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from app.enums.booking import BookingStatus
from app.enums.sorting import SortOrder

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

class BookingFilters(BaseModel):
    status: BookingStatus | None = None
    upcoming: bool | None = None
    passed: bool | None = None
    order: SortOrder = SortOrder.desc
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)