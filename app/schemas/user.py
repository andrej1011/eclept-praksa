from pydantic import BaseModel
from uuid import UUID
from typing import List

from app.enums.user import UserRole
from app.models.booking import Booking

class User(BaseModel):
    id:UUID
    username: str
    role: UserRole
    password: str
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    phone_number: str | None = None
    
    bookings: List[Booking] = []