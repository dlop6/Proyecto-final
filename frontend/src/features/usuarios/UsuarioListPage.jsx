// src/features/usuarios/UsuarioListPage.jsx

import React, { useState } from 'react';
import usuariosMock from '../../services/mock/usuariosMock';
import UsuarioList from './UsuarioList';

export default function UsuarioListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const totalItems = usuariosMock.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = usuariosMock.slice(startIndex, endIndex);

  const goToPrevious = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Lista de Usuarios</h1>
      <button
        onClick={() => (window.location.href = '/usuarios/crear')}
        style={{ marginBottom: '1rem' }}
      >
        Crear Usuario
      </button>

      <UsuarioList data={paginatedData} />

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <button onClick={goToPrevious} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 1rem' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={goToNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
