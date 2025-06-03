-- ======================================================================
-- schema.sql
-- Contiene la definición de:
--   • 5 tipos personalizados (ENUMs)
--   • 20 tablas (normalizadas hasta 3FN)
--   • Constraints (PKs, FKs, NOT NULL, UNIQUE, CHECK, DEFAULT)
-- ======================================================================

-- 1) Definición de tipos personalizados (PostgreSQL)
CREATE TYPE user_role AS ENUM ('estudiante', 'bibliotecario');
CREATE TYPE loan_status AS ENUM ('pendiente', 'devuelto', 'atrasado');
CREATE TYPE reservation_status AS ENUM ('activa', 'cancelada', 'expirada');
CREATE TYPE event_type AS ENUM ('prestamo', 'devolucion', 'reserva', 'pago_multa');
CREATE TYPE material_copy_state AS ENUM ('disponible', 'prestado', 'deteriorado');


-- 2) Tabla: authors
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);


-- 3) Tabla: categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);


-- 4) Tabla: materials
CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
    categoria_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    cantidad_total INTEGER NOT NULL CHECK (cantidad_total >= 1),
    cantidad_disponible INTEGER NOT NULL CHECK (cantidad_disponible >= 0),
    fecha_publicacion DATE NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(100) NOT NULL
);


-- 5) Tabla: material_copies
CREATE TABLE material_copies (
    id SERIAL PRIMARY KEY,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    estado material_copy_state NOT NULL DEFAULT 'disponible',
    fecha_adquisicion DATE NOT NULL
);


-- 6) Tabla: locations (ubicaciones físicas de estantes)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


-- 7) Tabla: material_location (historial de movimientos de cada copia)
CREATE TABLE material_location (
    id SERIAL PRIMARY KEY,
    material_copy_id INTEGER NOT NULL REFERENCES material_copies(id) ON DELETE CASCADE,
    location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    fecha_movimiento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 8) Tabla: tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


-- 9) Tabla: material_tag (N:M entre materials y tags)
CREATE TABLE material_tag (
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (material_id, tag_id)
);


-- 10) Tabla: publishers
CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE,
    direccion VARCHAR(200)
);


-- 11) Tabla: publisher_material (N:M entre publishers y materials)
CREATE TABLE publisher_material (
    publisher_id INTEGER NOT NULL REFERENCES publishers(id) ON DELETE CASCADE,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    PRIMARY KEY (publisher_id, material_id)
);


-- 12) Tabla: roles (para usuarios)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre user_role NOT NULL UNIQUE
);


-- 13) Tabla: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    telefono VARCHAR(20)
);


-- 14) Tabla: loans
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado loan_status NOT NULL DEFAULT 'pendiente',
    multa NUMERIC(7,2) NOT NULL DEFAULT 0 CHECK (multa >= 0),
    notas TEXT
);


-- 15) Tabla: loan_details (historial o detalles de cada préstamo)
CREATE TABLE loan_details (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    detalle TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 16) Tabla: fines (multas pagadas)
CREATE TABLE fines (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    monto NUMERIC(7,2) NOT NULL CHECK (monto >= 0),
    fecha_pago DATE NOT NULL DEFAULT CURRENT_DATE
);


-- 17) Tabla: reservations (reservas de usuarios)
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    fecha_reserva DATE NOT NULL,
    fecha_expiracion DATE NOT NULL,
    estado reservation_status NOT NULL DEFAULT 'activa'
);


-- 18) Tabla: reservation_detail (historial de cambios en reservas)
CREATE TABLE reservation_detail (
    id SERIAL PRIMARY KEY,
    reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    fecha_cambio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_cambio VARCHAR(50) NOT NULL
);


-- 19) Tabla: author_material (N:M entre authors y materials)
CREATE TABLE author_material (
    author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    PRIMARY KEY (author_id, material_id)
);


-- 20) Tabla: reservation_history (historial de estados de reserva)
CREATE TABLE reservation_history (
    id SERIAL PRIMARY KEY,
    reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    fecha_cambio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado_anterior reservation_status NOT NULL,
    estado_nuevo reservation_status NOT NULL
);


-- 21) Tabla: events (registro general de actividad)
CREATE TABLE events (
    evento_id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    material_id INTEGER NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    tipo_evento event_type NOT NULL,
    fecha_evento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notas TEXT
);

-- (TOTAL: 21 definiciones de CREATE; las tablas 1–20 + events)
-- Observa que usamos 5 tipos ENUM (user_role, loan_status, reservation_status, event_type, material_copy_state).
