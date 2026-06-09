from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date
from enum import Enum

from app.schemas.showing import ShowingRead
from app.schemas.genre import GenreRead
from app.enums.sorting import SortOrder

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

#Schemas for filter + sort parameters
class MovieSortField(str, Enum):
    name = "name"
    duration = "duration"
    release_date = "release_date"
    available = "available"

class MovieFilterParams(BaseModel):
    name: str | None = None
    genre_id: UUID | None = None
    available: bool | None = None
    duration_min: int | None = None
    duration_max: int | None = None
    release_date_from: date | None = None
    release_date_to: date | None = None
    sort_by: MovieSortField | None = None
    order: SortOrder = SortOrder.asc
    limit: int = Field(default=20, ge=1, le=100)
    offset: int = Field(default=0, ge=0)

MovieRead.model_rebuild()