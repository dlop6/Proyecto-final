

import enum
from sqlalchemy import Enum

class UserRoleEnum(str, enum.Enum):
    estudiante = "estudiante"
    bibliotecario = "bibliotecario"

class LoanStatusEnum(str, enum.Enum):
    pendiente = "pendiente"
    devuelto = "devuelto"
    atrasado = "atrasado"

class ReservationStatusEnum(str, enum.Enum):
    activa = "activa"
    cancelada = "cancelada"
    expirada = "expirada"

class EventTypeEnum(str, enum.Enum):
    prestamo = "prestamo"
    devolucion = "devolucion"
    reserva = "reserva"
    pago_multa = "pago_multa"

class MaterialCopyStateEnum(str, enum.Enum):
    disponible = "disponible"
    prestado = "prestado"
    deteriorado = "deteriorado"


# Funciones de conveniencia para usar en los modelos:
def user_role_enum():
    return Enum(UserRoleEnum, name="user_role")

def loan_status_enum():
    return Enum(LoanStatusEnum, name="loan_status")

def reservation_status_enum():
    return Enum(ReservationStatusEnum, name="reservation_status")

def event_type_enum():
    return Enum(EventTypeEnum, name="event_type")

def material_copy_state_enum():
    return Enum(MaterialCopyStateEnum, name="material_copy_state")
