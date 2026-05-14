from pydantic import BaseModel
from uuid import UUID
from typing import List

class Genre(BaseModel):
    id: UUID
    name: str
    movies: List = []