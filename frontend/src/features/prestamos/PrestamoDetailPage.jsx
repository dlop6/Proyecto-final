// src/features/prestamos/PrestamoDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPrestamoById } from "../../services/api/prestamosApi";

export default function PrestamoDetailPage() {
  const { id } = useParams();
  const [prestamo, setPrestamo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPrestamoById(id)
      .then((res) => setPrestamo(res))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalle préstamo...</p>;
  if (error) return <p>Error al cargar detalle</p>;

  return (
    <div>
      <h1>Detalle Préstamo #{prestamo.id}</h1>
      <p><strong>Usuario:</strong> {prestamo.usuario_nombre}</p>
      <p><strong>Material:</strong> {prestamo.material_titulo}</p>
      <p><strong>Fecha Préstamo:</strong> {prestamo.fecha_prestamo}</p>
      <p><strong>Fecha Devolución:</strong> {prestamo.fecha_devolucion}</p>
      <p><strong>Estado:</strong> {prestamo.estado}</p>
      <p><strong>Multa:</strong> {prestamo.multa}</p>
      <p><strong>Notas:</strong> {prestamo.notas}</p>

      <Link to={`/prestamos/${id}/editar`}>Editar</Link> |{" "}
      <Link to="/prestamos">Volver a la lista</Link>
    </div>
  );
}
