// src/features/materiales/MaterialListPage.jsx

import React, { useState } from 'react';
import materialesMock from '../../services/mock/materialesMock';
import MaterialList from './MaterialList';

export default function MaterialListPage() {
  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20; // ítems por página

  // Cálculos de paginación
  const totalItems = materialesMock.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = materialesMock.slice(startIndex, endIndex);

  // Handlers de cambiar página
  const goToPrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const goToNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div>
      <h1>Lista de Materiales</h1>
      <button
        onClick={() => (window.location.href = '/materiales/crear')}
        style={{ marginBottom: '1rem' }}
      >
        Crear Material
      </button>

      <MaterialList data={paginatedData} />

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
