from pydantic import BaseModel, Field
from uuid import UUID

from app.models.showing import Showing

class AuditoriumBase(BaseModel):
    name: str
    capacity: int

class AuditoriumCreate(AuditoriumBase):
    pass

class AuditoriumRead(AuditoriumBase):
    id: UUID
    showings: list["Showing"] = Field(default_factory=list)

    model_config = {"from_attributes": True}


AuditoriumRead.model_rebuild()