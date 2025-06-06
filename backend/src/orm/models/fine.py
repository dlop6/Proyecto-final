from sqlalchemy import Column, Integer, ForeignKey, Numeric, Date, CheckConstraint
from sqlalchemy import CheckConstraint
from .base import Base

class Fine(Base):
    __tablename__ = "fines"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id", ondelete="CASCADE"), nullable=False)
    monto = Column(Numeric(7,2), nullable=False)
    fecha_pago = Column(Date, nullable=False)

    __table_args__ = (
        CheckConstraint("monto >= 0", name="chk_fine_monto_nonneg"),
    )
