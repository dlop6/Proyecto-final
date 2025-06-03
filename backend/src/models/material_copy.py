from sqlalchemy import Column, Integer, ForeignKey, Date
from .custom_types import material_copy_state_enum
from sqlalchemy.orm import relationship
from .base import Base

class MaterialCopy(Base):
    __tablename__ = "material_copies"

    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="CASCADE"), nullable=False)
    estado = Column(material_copy_state_enum(), nullable=False, default="disponible")
    fecha_adquisicion = Column(Date, nullable=False)

    locations = relationship("MaterialLocation", backref="material_copy", cascade="all, delete-orphan")
