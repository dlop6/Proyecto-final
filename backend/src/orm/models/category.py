from sqlalchemy import Column, Integer, String
from .base import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
