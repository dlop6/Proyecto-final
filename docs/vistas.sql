-- Vista 1: Materiales con su cantidad disponible y total de préstamos
CREATE OR REPLACE VIEW vista_materiales_prestamos AS
SELECT
    m.id,
    m.titulo,
    m.cantidad_total,
    m.cantidad_disponible,
    COUNT(p.id) AS total_prestamos
FROM materiales m
LEFT JOIN prestamos p ON m.id = p.material_id
GROUP BY m.id, m.titulo, m.cantidad_total, m.cantidad_disponible;

-- Vista 2: Préstamos activos con información de usuario y material
CREATE OR REPLACE VIEW vista_prestamos_activos AS
SELECT
    p.id AS prestamo_id,
    u.nombre AS usuario,
    m.titulo AS material,
    p.fecha_prestamo,
    p.fecha_devolucion,
    p.estado
FROM prestamos p
JOIN usuarios u ON p.usuario_id = u.id
JOIN materiales m ON p.material_id = m.id
WHERE p.estado = 'activo';