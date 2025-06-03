// src/features/reportes/ReporteMaterialesPage.jsx

import React, { useState } from 'react';
import { saveAs } from 'file-saver'; // para descargar CSV
import materialesMock from '../../services/mock/materialesMock';
import MaterialList from '../materiales/MaterialList';

export default function ReporteMaterialesPage() {
  // Estados para filtros
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cantidadMin, setCantidadMin] = useState('');
  const [cantidadMax, setCantidadMax] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  // Función que aplica filtros a materialesMock
  const filtrarMateriales = () => {
    return materialesMock.filter((m) => {
      if (autor && !m.autor.toLowerCase().includes(autor.toLowerCase())) return false;
      if (categoria && !m.categoria.toLowerCase().includes(categoria.toLowerCase())) return false;
      if (fechaInicio && m.fecha_publicacion < fechaInicio) return false;
      if (fechaFin && m.fecha_publicacion > fechaFin) return false;
      if (cantidadMin && m.cantidad_total < Number(cantidadMin)) return false;
      if (cantidadMax && m.cantidad_total > Number(cantidadMax)) return false;
      return true;
    });
  };

  const filtered = filtrarMateriales();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    // Encabezado CSV
    const header = [
      'id',
      'titulo',
      'autor',
      'categoria',
      'cantidad_total',
      'cantidad_disponible',
      'fecha_publicacion'
    ];
    // Filas de datos filtrados (sin paginación)
    const rows = filtered.map((m) => [
      m.id,
      `"${m.titulo}"`,
      `"${m.autor}"`,
      `"${m.categoria}"`,
      m.cantidad_total,
      m.cantidad_disponible,
      `"${m.fecha_publicacion}"`
    ]);

  // Construir string CSV con saltos de línea Windows (\r\n)
  let csvContent = header.join(',') + '\r\n';
  rows.forEach((row) => {
    csvContent += row.join(',') + '\r\n';
  });


    // Descargar con FileSaver
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte_materiales.csv');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Reporte de Materiales</h1>

      {/* Panel de filtros */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Fecha inicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Cant. min"
          value={cantidadMin}
          onChange={(e) => setCantidadMin(e.target.value)}
          style={{ width: '80px', marginRight: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Cant. max"
          value={cantidadMax}
          onChange={(e) => setCantidadMax(e.target.value)}
          style={{ width: '80px', marginRight: '0.5rem' }}
        />

        <button onClick={handleExportCSV} style={{ marginLeft: '1rem' }}>
          Exportar CSV
        </button>
      </div>

      {/* Resultados paginados */}
      <MaterialList data={paginatedData} />

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 1rem' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
