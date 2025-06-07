
-- Tabla roles
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla usuarios
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    fecha_registro DATE NOT NULL,
    telefono TEXT
);

-- Tabla intermedia usuario_rol
CREATE TABLE usuario_rol (
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
    rol_id INT REFERENCES rol(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, rol_id)
);

-- Tabla direcciones
CREATE TABLE direccion_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
    direccion TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    pais TEXT NOT NULL
);

-- Tabla autores
CREATE TABLE autor (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    biografia TEXT
);

-- Tabla categorias
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla editoriales
CREATE TABLE editorial (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    direccion TEXT,
    telefono TEXT
);

-- Tabla ubicaciones
CREATE TABLE ubicacion (
    id SERIAL PRIMARY KEY,
    estante TEXT NOT NULL,
    pasillo TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla proveedores
CREATE TABLE proveedor (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    contacto TEXT,
    direccion TEXT
);

-- Tabla etiquetas
CREATE TABLE etiqueta (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla tipo de material
CREATE TABLE tipo_material (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla materiales
CREATE TABLE material (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    editorial_id INT REFERENCES editorial(id),
    tipo_id INT REFERENCES tipo_material(id),
    cantidad_total INT NOT NULL,
    cantidad_disponible INT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    descripcion TEXT,
    ubicacion_id INT REFERENCES ubicacion(id)
);

-- Relaciones de materiales
CREATE TABLE material_autor (
    material_id INT REFERENCES material(id) ON DELETE CASCADE,
    autor_id INT REFERENCES autor(id) ON DELETE CASCADE,
    PRIMARY KEY (material_id, autor_id)
);

CREATE TABLE material_categoria (
    material_id INT REFERENCES material(id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categoria(id) ON DELETE CASCADE,
    PRIMARY KEY (material_id, categoria_id)
);

CREATE TABLE material_proveedor (
    material_id INT REFERENCES material(id) ON DELETE CASCADE,
    proveedor_id INT REFERENCES proveedor(id) ON DELETE CASCADE,
    PRIMARY KEY (material_id, proveedor_id)
);

CREATE TABLE material_etiqueta (
    material_id INT REFERENCES material(id) ON DELETE CASCADE,
    etiqueta_id INT REFERENCES etiqueta(id) ON DELETE CASCADE,
    PRIMARY KEY (material_id, etiqueta_id)
);

-- Tabla préstamos
CREATE TABLE prestamo (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    material_id INT REFERENCES material(id),
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado TEXT NOT NULL,
    multa NUMERIC DEFAULT 0,
    notas TEXT
);

-- Tabla multas
CREATE TABLE multa (
    id SERIAL PRIMARY KEY,
    prestamo_id INT REFERENCES prestamo(id) ON DELETE CASCADE,
    fecha_aplicacion DATE NOT NULL,
    monto NUMERIC NOT NULL,
    motivo TEXT
);

-- Tabla eventos
CREATE TABLE evento (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    material_id INT REFERENCES material(id),
    tipo_evento TEXT NOT NULL,
    fecha_evento TIMESTAMP NOT NULL,
    notas TEXT
);

-- Tabla notificaciones
CREATE TABLE notificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP NOT NULL,
    leido BOOLEAN DEFAULT FALSE
);

-- Tabla configuraciones
CREATE TABLE configuracion (
    clave TEXT PRIMARY KEY,
    valor TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla actividades
CREATE TABLE actividad (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    accion TEXT NOT NULL,
    fecha_accion TIMESTAMP NOT NULL,
    detalles JSONB
);
