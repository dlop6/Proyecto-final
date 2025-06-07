-- Trigger 1: Actualizar cantidad_disponible al registrar un préstamo
CREATE OR REPLACE FUNCTION descontar_material_prestamo()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE materiales
    SET cantidad_disponible = cantidad_disponible - 1
    WHERE id = NEW.material_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_descontar_material_prestamo
AFTER INSERT ON prestamos
FOR EACH ROW
EXECUTE FUNCTION descontar_material_prestamo();

-- Trigger 2: Restaurar cantidad_disponible al devolver un material
CREATE OR REPLACE FUNCTION restaurar_material_devolucion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'devuelto' AND OLD.estado <> 'devuelto' THEN
        UPDATE materiales
        SET cantidad_disponible = cantidad_disponible + 1
        WHERE id = NEW.material_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurar_material_devolucion
AFTER UPDATE ON prestamos
FOR EACH ROW
EXECUTE FUNCTION restaurar_material_devolucion();

-- Trigger 3: Registrar evento cuando se crea un préstamo
CREATE OR REPLACE FUNCTION registrar_evento_prestamo()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO eventos (usuario_id, material_id, tipo_evento, fecha_evento, notas)
    VALUES (NEW.usuario_id, NEW.material_id, 'prestamo', NOW(), 'Préstamo registrado');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_registrar_evento_prestamo
AFTER INSERT ON prestamos
FOR EACH ROW
EXECUTE FUNCTION registrar_evento_prestamo();