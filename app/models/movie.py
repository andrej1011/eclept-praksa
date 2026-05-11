from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import List

class Movie(BaseModel):
    id: UUID
    name: str
    available: bool
    duration: int
    poster_url: str | None = None
    short_description: str | None = None
    release_date: date | None = None
    imdb_link: str | None = None
    showings: List = []
    genres: List = []