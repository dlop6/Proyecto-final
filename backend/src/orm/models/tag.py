from sqlalchemy import Column, Integer, String
from .base import Base
from sqlalchemy.orm import relationship

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)

    material_links = relationship("MaterialTag", backref="tag", cascade="all, delete-orphan")
