from sqlalchemy import Column, Integer, ForeignKey, DateTime
from .custom_types import reservation_status_enum
from sqlalchemy.orm import relationship
from .base import Base

class ReservationHistory(Base):
    __tablename__ = "reservation_history"

    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, ForeignKey("reservations.id", ondelete="CASCADE"), nullable=False)
    fecha_cambio = Column(DateTime, nullable=False)
    estado_anterior = Column(reservation_status_enum(), nullable=False)
    estado_nuevo = Column(reservation_status_enum(), nullable=False)
