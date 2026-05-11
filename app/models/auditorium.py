from pydantic import BaseModel
from uuid import UUID
from typing import List

class Auditorium(BaseModel):
    id: UUID
    name: str
    capacity: int
    showings: List = []