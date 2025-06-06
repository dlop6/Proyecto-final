from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from .base import Base

class MaterialLocation(Base):
    __tablename__ = "material_location"

    id = Column(Integer, primary_key=True, index=True)
    material_copy_id = Column(Integer, ForeignKey("material_copies.id", ondelete="CASCADE"), nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="RESTRICT"), nullable=False)
    fecha_movimiento = Column(DateTime, nullable=False, server_default=func.now())
