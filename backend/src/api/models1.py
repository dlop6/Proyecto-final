from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import date, datetime

class Rol(BaseModel):
    id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None

class DireccionUsuario(BaseModel):
    id: Optional[int] = None
    usuario_id: int
    direccion: str
    ciudad: str
    codigo_postal: str
    pais: str

class Usuario(BaseModel):
    id: Optional[int] = None
    nombre: str
    email: str
    fecha_registro: date
    telefono: Optional[str] = None
    roles: Optional[List[Rol]] = None
    direcciones: Optional[List[DireccionUsuario]] = None

class UsuarioCreate(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = None

class Autor(BaseModel):
    id: Optional[int] = None
    nombre: str
    biografia: Optional[str] = None

class Categoria(BaseModel):
    id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None

class Editorial(BaseModel):
    id: Optional[int] = None
    nombre: str
    direccion: Optional[str] = None
    telefono: Optional[str] = None

class Ubicacion(BaseModel):
    id: Optional[int] = None
    estante: str
    pasillo: str
    descripcion: Optional[str] = None

class Proveedor(BaseModel):
    id: Optional[int] = None
    nombre: str
    contacto: Optional[str] = None
    direccion: Optional[str] = None

class Etiqueta(BaseModel):
    id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None

class TipoMaterial(BaseModel):
    id: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None

class Material(BaseModel):
    id: Optional[int] = None
    titulo: str
    editorial_id: int
    tipo_id: int
    cantidad_total: int
    cantidad_disponible: int
    fecha_publicacion: date
    descripcion: Optional[str] = None
    ubicacion_id: int
    autores: Optional[List[Autor]] = None
    categorias: Optional[List[Categoria]] = None
    proveedores: Optional[List[Proveedor]] = None
    etiquetas: Optional[List[Etiqueta]] = None

class MaterialCreate(BaseModel):
    titulo: str
    editorial_id: int
    tipo_id: int
    cantidad_total: int
    fecha_publicacion: date
    descripcion: Optional[str] = None
    ubicacion_id: int
    autores: Optional[List[int]] = None
    categorias: Optional[List[int]] = None
    proveedores: Optional[List[int]] = None
    etiquetas: Optional[List[int]] = None

class Multa(BaseModel):
    id: Optional[int] = None
    prestamo_id: int
    fecha_aplicacion: date
    monto: float
    motivo: Optional[str] = None

class Prestamo(BaseModel):
    id: Optional[int] = None
    usuario_id: int
    material_id: int
    fecha_prestamo: date
    fecha_devolucion: date
    estado: str
    multa: float
    notas: Optional[str] = None
    multas: Optional[List[Multa]] = None

class PrestamoCreate(BaseModel):
    usuario_id: int
    material_id: int
    fecha_prestamo: date
    fecha_devolucion: date
    notas: Optional[str] = None

class Evento(BaseModel):
    id: Optional[int] = None
    usuario_id: Optional[int] = None
    material_id: Optional[int] = None
    tipo_evento: str
    fecha_evento: datetime
    notas: Optional[str] = None

class Notificacion(BaseModel):
    id: Optional[int] = None
    usuario_id: int
    mensaje: str
    fecha_envio: datetime
    leido: bool

class Configuracion(BaseModel):
    clave: str
    valor: str
    descripcion: Optional[str] = None

class Actividad(BaseModel):
    id: Optional[int] = None
    usuario_id: int
    accion: str
    fecha_accion: datetime
    detalles: Optional[Dict] = None
