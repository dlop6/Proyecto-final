from sqlalchemy import Column, Integer, ForeignKey
from .base import Base

class PublisherMaterial(Base):
    __tablename__ = "publisher_material"

    publisher_id = Column(Integer, ForeignKey("publishers.id", ondelete="CASCADE"), primary_key=True)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="CASCADE"), primary_key=True)
