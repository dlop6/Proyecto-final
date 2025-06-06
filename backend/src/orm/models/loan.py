from sqlalchemy import Column, Integer, ForeignKey, Date, Numeric, Text
from sqlalchemy.orm import relationship
from .custom_types import loan_status_enum
from sqlalchemy import CheckConstraint
from .base import Base

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False)
    material_id = Column(Integer, ForeignKey("materials.id", ondelete="RESTRICT"), nullable=False)
    fecha_prestamo = Column(Date, nullable=False)
    fecha_devolucion = Column(Date, nullable=False)
    estado = Column(loan_status_enum(), nullable=False, default="pendiente")
    multa = Column(Numeric(7,2), nullable=False, default=0)
    notas = Column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint("multa >= 0", name="chk_loan_multa_nonneg"),
    )

    detalles = relationship("LoanDetail", backref="loan", cascade="all, delete-orphan")
    fines = relationship("Fine", backref="loan", cascade="all, delete-orphan")
