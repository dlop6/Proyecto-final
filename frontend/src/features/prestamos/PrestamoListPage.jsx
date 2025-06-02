// src/features/prestamos/PrestamoListPage.jsx

import React, { useState } from 'react';
import prestamosMock from '../../services/mock/prestamosMock';
import PrestamoList from './PrestamoList';

export default function PrestamoListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const totalItems = prestamosMock.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = prestamosMock.slice(startIndex, endIndex);

  const goToPrevious = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Lista de Préstamos</h1>
      <button
        onClick={() => (window.location.href = '/prestamos/crear')}
        style={{ marginBottom: '1rem' }}
      >
        Crear Préstamo
      </button>

      <PrestamoList data={paginatedData} />

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
