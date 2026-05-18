from pydantic import BaseModel
from uuid import UUID

class MovieGenre(BaseModel):
    movie_id: UUID
    genre_id: UUID