from sqlalchemy import Column, Integer, ForeignKey
from .base import Base

class AuthorMaterial(Base):
    __tablename__ = "author_material"

    author_id = Column(Integer, ForeignKey("authors.id", ondelete="CASCADE"), primary_key=True)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="CASCADE"), primary_key=True)
