from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base

class Publisher(Base):
    __tablename__ = "publishers"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False, unique=True)
    direccion = Column(String(200), nullable=True)

    material_links = relationship("PublisherMaterial", backref="publisher", cascade="all, delete-orphan")
