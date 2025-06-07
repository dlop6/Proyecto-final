-- Función 1: Calcular el total de préstamos de un usuario
CREATE OR REPLACE FUNCTION total_prestamos_usuario(usuario_id INT)
RETURNS INT AS $$
DECLARE
    total INT;
BEGIN
    SELECT COUNT(*) INTO total
    FROM prestamos
    WHERE prestamos.usuario_id = usuario_id;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Función 2: Obtener la cantidad disponible de un material por su ID
CREATE OR REPLACE FUNCTION cantidad_disponible_material(material_id INT)
RETURNS INT AS $$
DECLARE
    disponible INT;
BEGIN
    SELECT cantidad_disponible INTO disponible
    FROM materiales
    WHERE id = material_id;
    RETURN disponible;
END;
$$ LANGUAGE plpgsql;