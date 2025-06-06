from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, func
from .base import Base

class ReservationDetail(Base):
    __tablename__ = "reservation_detail"

    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, ForeignKey("reservations.id", ondelete="CASCADE"), nullable=False)
    fecha_cambio = Column(DateTime, nullable=False, server_default=func.now())
    tipo_cambio = Column(String(50), nullable=False)
