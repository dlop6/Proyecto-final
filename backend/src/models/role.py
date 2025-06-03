from sqlalchemy import Column, Integer
from .custom_types import user_role_enum
from sqlalchemy import Enum
from .base import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(user_role_enum(), nullable=False, unique=True)

    users = relationship("User", backref="role", cascade="all, delete-orphan")
