// src/features/materiales/MaterialDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMaterialById } from "../../services/api/materialesApi";

export default function MaterialDetailPage() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMaterialById(id)
      .then((res) => {
        setMaterial(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error al cargar detalle</p>;

  return (
    <div>
      <h1>Detalle de Material</h1>
      <p><strong>ID:</strong> {material.id}</p>
      <p><strong>Título:</strong> {material.titulo}</p>
      <p><strong>Autor:</strong> {material.autor}</p>
      <p><strong>Categoría:</strong> {material.categoria}</p>
      <p><strong>Cantidad Total:</strong> {material.cantidad_total}</p>
      <p><strong>Cantidad Disponible:</strong> {material.cantidad_disponible}</p>
      <p><strong>Fecha Publicación:</strong> {material.fecha_publicacion}</p>
      <p><strong>Descripción:</strong> {material.descripcion}</p>
      <p><strong>Ubicación:</strong> {material.ubicacion}</p>

      <Link to={`/materiales/${id}/editar`}>Editar</Link> |{" "}
      <Link to="/materiales">Volver a la lista</Link>
    </div>
  );
}
