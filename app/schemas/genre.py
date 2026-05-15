from pydantic import BaseModel, Field
from uuid import UUID

class GenreBase(BaseModel):
    name: str

class GenreCreate(GenreBase):
    pass

class GenreUpdate(BaseModel):
    name: str | None = None

class GenreRead(GenreBase):
    id: UUID
    model_config = {"from_attributes": True}