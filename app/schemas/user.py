from pydantic import BaseModel, Field, EmailStr
from uuid import UUID
from app.enums.user import UserRole
from app.schemas.booking import BookingRead

class UserBase(BaseModel):
    username: str
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone_number: str | None = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    password: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone_number: str | None = None

class UserRead(UserBase):
    id: UUID
    role: UserRole
    bookings: list["BookingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

UserRead.model_rebuild()