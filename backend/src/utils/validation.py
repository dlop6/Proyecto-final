from pydantic import BaseModel, Field, EmailStr, validator
from datetime import date

class UsuarioCreate(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telefono: str | None = Field(default=None, max_length=20)

class PrestamoCreate(BaseModel):
    usuario_id: int
    material_id: int
    fecha_prestamo: date
    fecha_devolucion: date

    @validator("fecha_devolucion")
    def validar_fechas(cls, v, values):
        if "fecha_prestamo" in values and v < values["fecha_prestamo"]:
            raise ValueError("La fecha de devolución no puede ser anterior a la de préstamo")
        return v