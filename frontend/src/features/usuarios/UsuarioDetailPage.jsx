// src/features/usuarios/UsuarioDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import usuariosMock from '../../services/mock/usuariosMock';

export default function UsuarioDetailPage() {
  const { id } = useParams();
  const usuario = usuariosMock.find((u) => String(u.id) === id);

  if (!usuario) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Usuario no encontrado</h2>
        <Link to="/usuarios">← Volver a Lista de Usuarios</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Detalle de Usuario</h1>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>ID:</strong> {usuario.id}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Nombre:</strong> {usuario.nombre}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Email:</strong> {usuario.email}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Rol:</strong> {usuario.rol}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Fecha Registro:</strong> {usuario.fecha_registro}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Teléfono:</strong> {usuario.telefono || '—'}
      </div>
      <Link to="/usuarios">← Volver a Lista de Usuarios</Link>
    </div>
  );
}
