from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text
from .custom_types import event_type_enum
from sqlalchemy import func
from .base import Base

class Event(Base):
    __tablename__ = "events"

    evento_id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="RESTRICT"), nullable=False)
    tipo_evento = Column(event_type_enum(), nullable=False)
    fecha_evento = Column(DateTime, nullable=False, server_default=func.now())
    notas = Column(Text, nullable=True)
