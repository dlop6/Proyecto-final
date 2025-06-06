from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from .base import Base

class LoanDetail(Base):
    __tablename__ = "loan_details"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id", ondelete="CASCADE"), nullable=False)
    detalle = Column(String, nullable=False)
    fecha = Column(DateTime, nullable=False, server_default=func.now())
