// src/features/materiales/MaterialDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import materialesMock from '../../services/mock/materialesMock';

export default function MaterialDetailPage() {
  const { id } = useParams();
  const material = materialesMock.find((m) => String(m.id) === id);

  if (!material) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Material no encontrado</h2>
        <Link to="/materiales">← Volver a Lista de Materiales</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Detalle de Material</h1>
      <div style={{ marginBottom: '1rem' }}>
        <strong>ID:</strong> {material.id}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Título:</strong> {material.titulo}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Autor:</strong> {material.autor}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Categoría:</strong> {material.categoria}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Cantidad Total:</strong> {material.cantidad_total}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Cantidad Disponible:</strong> {material.cantidad_disponible}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Fecha de Publicación:</strong> {material.fecha_publicacion}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Ubicación:</strong> {material.ubicacion}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Descripción:</strong> {material.descripcion || '—'}
      </div>
      <Link to="/materiales">← Volver a Lista de Materiales</Link>
    </div>
  );
}
