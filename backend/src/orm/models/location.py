from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False, unique=True)

    movimientos = relationship("MaterialLocation", backref="location", cascade="all, delete-orphan")
