from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List

class Showing(BaseModel):
    id: UUID
    movie_id: UUID
    auditorium_id: UUID
    start_time: datetime
    booked_seats: int
    bookings: List = []