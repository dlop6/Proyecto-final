-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro DATE NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla de materiales
CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    editorial_id INT,
    tipo_id INT,
    cantidad_total INT NOT NULL,
    cantidad_disponible INT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    descripcion TEXT,
    ubicacion_id INT
);

-- Tabla de préstamos
CREATE TABLE prestamos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id),
    material_id INT NOT NULL REFERENCES materiales(id),
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado VARCHAR(20) NOT NULL,
    multa NUMERIC(10,2) DEFAULT 0,
    notas TEXT
);

-- Tabla de eventos
CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    material_id INT REFERENCES materiales(id),
    tipo_evento VARCHAR(50) NOT NULL,
    fecha_evento TIMESTAMP NOT NULL,
    notas TEXT
);