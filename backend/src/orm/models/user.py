from sqlalchemy import Column, Integer, String, ForeignKey, Date, func
from .base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    email = Column(String(200), nullable=False, unique=True)
    rol_id = Column(Integer, ForeignKey("roles.id", ondelete="RESTRICT"), nullable=False)
    fecha_registro = Column(Date, nullable=False, server_default=func.current_date())
    telefono = Column(String(20), nullable=True)

    loans = relationship("Loan", backref="usuario", cascade="all, delete-orphan")
    reservations = relationship("Reservation", backref="usuario", cascade="all, delete-orphan")
    events = relationship("Event", backref="usuario", cascade="all, delete-orphan")
