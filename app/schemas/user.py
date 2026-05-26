from pydantic import BaseModel, Field, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber
from uuid import UUID

from app.enums.user import UserRole
from app.schemas.booking import BookingRead
from app.schemas.types import Password

class UserBase(BaseModel):
    username: str = Field(min_length=3, max_length=32)
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    email: EmailStr | None = None
    phone_number: PhoneNumber | None = None

class UserCreate(UserBase):
    password: Password

class UserUpdate(BaseModel):
    password: Password | None = None
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    email: EmailStr | None = None
    phone_number: PhoneNumber | None = None

class UserRead(UserBase):
    id: UUID
    role: UserRole
    bookings: list["BookingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

class PasswordChange(BaseModel):
    old_password: str
    new_password: Password

class RoleUpdate(BaseModel):
    role: UserRole

UserRead.model_rebuild()