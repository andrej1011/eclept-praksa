from pydantic import BaseModel, Field
from uuid import UUID

from app.schemas.showing import ShowingRead

class AuditoriumBase(BaseModel):
    name: str = Field(min_length=1, max_length=30)
    capacity: int = Field(gt=0)

class AuditoriumCreate(AuditoriumBase):
    pass

class AuditoriumUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=30)
    capacity: int | None = Field(default=None, gt=0)

class AuditoriumRead(AuditoriumBase):
    id: UUID
    showings: list["ShowingRead"] = Field(default_factory=list)
    model_config = {"from_attributes": True}

AuditoriumRead.model_rebuild()