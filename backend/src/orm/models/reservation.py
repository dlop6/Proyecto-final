from sqlalchemy import Column, Integer, ForeignKey, Date, Text
from .custom_types import reservation_status_enum
from sqlalchemy.orm import relationship
from .base import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="RESTRICT"), nullable=False)
    fecha_reserva = Column(Date, nullable=False)
    fecha_expiracion = Column(Date, nullable=False)
    estado = Column(reservation_status_enum(), nullable=False, default="activa")

    detalles = relationship("ReservationDetail", backref="reservation", cascade="all, delete-orphan")
    history = relationship("ReservationHistory", backref="reservation", cascade="all, delete-orphan")
