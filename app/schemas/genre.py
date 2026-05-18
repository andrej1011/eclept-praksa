from pydantic import BaseModel, Field
from uuid import UUID

class GenreBase(BaseModel):
    name: str = Field(min_length=1, max_length=30)

class GenreCreate(GenreBase):
    pass

class GenreUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=30)

class GenreRead(GenreBase):
    id: UUID
    model_config = {"from_attributes": True}