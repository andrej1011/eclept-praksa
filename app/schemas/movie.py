from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date

from app.schemas.showing import ShowingRead
from app.schemas.genre import GenreRead

class MovieBase(BaseModel):
    name: str
    available: bool
    duration: int
    poster_url: str | None = None
    short_description: str | None = None
    release_date: date | None = None
    imdb_link: str | None = None

class MovieCreate(MovieBase):
    genre_ids: list[UUID] = Field(default_factory=list)

class MovieUpdate(BaseModel):
    name: str | None = None
    available: bool | None = None
    duration: int | None = None
    poster_url: str | None = None
    short_description: str | None = None
    release_date: date | None = None
    imdb_link: str | None = None
    genre_ids: list[UUID] | None = None

class MovieRead(MovieBase):
    id: UUID
    showings: list["ShowingRead"] = Field(default_factory=list)
    genres: list["GenreRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}


MovieRead.model_rebuild()