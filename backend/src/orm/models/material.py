from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint, Text
from sqlalchemy.orm import relationship
from .base import Base

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200), nullable=False)
    autor_id = Column(Integer, ForeignKey("authors.id", ondelete="RESTRICT"), nullable=False)
    categoria_id = Column(Integer, ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False)
    cantidad_total = Column(Integer, nullable=False)
    cantidad_disponible = Column(Integer, nullable=False)
    fecha_publicacion = Column(Date, nullable=False)
    descripcion = Column(Text, nullable=True)
    ubicacion = Column(String(100), nullable=False)

    __table_args__ = (
        CheckConstraint("cantidad_total >= 1", name="chk_material_cantidad_total"),
        CheckConstraint("cantidad_disponible >= 0", name="chk_material_cantidad_disp"),
    )

    autor = relationship("Author", backref="materiales")
    categoria = relationship("Category", backref="materiales")
    copies = relationship("MaterialCopy", backref="material", cascade="all, delete-orphan")
    loan_records = relationship("Loan", backref="material", cascade="all, delete-orphan")
    reservation_records = relationship("Reservation", backref="material", cascade="all, delete-orphan")
    publisher_links = relationship("PublisherMaterial", backref="material", cascade="all, delete-orphan")
    tag_links = relationship("MaterialTag", backref="material", cascade="all, delete-orphan")
    author_links = relationship("AuthorMaterial", backref="material", cascade="all, delete-orphan")
    event_records = relationship("Event", backref="material", cascade="all, delete-orphan")
