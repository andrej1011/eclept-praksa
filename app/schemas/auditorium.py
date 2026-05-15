from pydantic import BaseModel, Field
from uuid import UUID

from app.schemas.showing import ShowingRead

class AuditoriumBase(BaseModel):
    name: str
    capacity: int

class AuditoriumCreate(AuditoriumBase):
    pass

class AuditoriumUpdate(BaseModel):
    name: str | None = None
    capacity: int | None = None

class AuditoriumRead(AuditoriumBase):
    id: UUID
    showings: list["ShowingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

AuditoriumRead.model_rebuild()