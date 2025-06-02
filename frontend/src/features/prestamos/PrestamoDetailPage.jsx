// src/features/prestamos/PrestamoDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import prestamosMock from '../../services/mock/prestamosMock';

export default function PrestamoDetailPage() {
  const { id } = useParams();
  const prestamo = prestamosMock.find((p) => String(p.id) === id);

  if (!prestamo) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Préstamo no encontrado</h2>
        <Link to="/prestamos">← Volver a Lista de Préstamos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Detalle de Préstamo</h1>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>ID:</strong> {prestamo.id}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Usuario ID:</strong> {prestamo.usuario_id}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Usuario Nombre:</strong> {prestamo.usuario_nombre}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Material ID:</strong> {prestamo.material_id}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Material Título:</strong> {prestamo.material_titulo}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Fecha Préstamo:</strong> {prestamo.fecha_prestamo}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Fecha Devolución:</strong> {prestamo.fecha_devolucion}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Estado:</strong> {prestamo.estado}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Multa:</strong> {prestamo.multa}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Notas:</strong> {prestamo.notas || '—'}
      </div>
      <Link to="/prestamos">← Volver a Lista de Préstamos</Link>
    </div>
  );
}
