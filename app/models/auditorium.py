import uuid
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

class Auditorium(Base):
    __tablename__ = "auditoriums"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(30), unique=True)
    capacity: Mapped[int] = mapped_column(Integer)

    showings: Mapped[list["Showing"]] = relationship("Showing", back_populates="auditorium")