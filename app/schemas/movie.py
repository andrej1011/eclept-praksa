from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date

from app.schemas.showing import ShowingRead
from app.schemas.genre import GenreRead

class MovieBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    available: bool
    duration: int = Field(gt=0)
    poster_url: str | None = Field(default=None, max_length=255)
    short_description: str | None = Field(default=None, max_length=1000)
    release_date: date | None = None
    imdb_link: str | None = Field(default=None, max_length=100)

class MovieCreate(MovieBase):
    genre_ids: list[UUID] = Field(default_factory=list)

class MovieUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    available: bool | None = None
    duration: int | None = Field(default=None, gt=0)
    poster_url: str | None = Field(default=None, max_length=255)
    short_description: str | None = Field(default=None, max_length=1000)
    release_date: date | None = None
    imdb_link: str | None = Field(default=None, max_length=100)
    genre_ids: list[UUID] | None = None

class MovieRead(MovieBase):
    id: UUID
    showings: list["ShowingRead"] = Field(default_factory=list)
    genres: list["GenreRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

MovieRead.model_rebuild()