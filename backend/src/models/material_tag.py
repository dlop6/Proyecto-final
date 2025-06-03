from sqlalchemy import Column, Integer, ForeignKey
from .base import Base

class MaterialTag(Base):
    __tablename__ = "material_tag"

    material_id = Column(Integer, ForeignKey("materials.id", ondelete="CASCADE"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
