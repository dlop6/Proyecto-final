// src/features/reportes/ReportePrestamosPage.jsx

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import prestamosMock from '../../services/mock/prestamosMock';
import PrestamoList from '../prestamos/PrestamoList';

export default function ReportePrestamosPage() {
  // Estados para filtros
  const [usuarioId, setUsuarioId] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('');
  const [multaMin, setMultaMin] = useState('');
  const [multaMax, setMultaMax] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const filtrarPrestamos = () => {
    return prestamosMock.filter((p) => {
      if (usuarioId && p.usuario_id !== Number(usuarioId)) return false;
      if (materialId && p.material_id !== Number(materialId)) return false;
      if (fechaInicio && p.fecha_prestamo < fechaInicio) return false;
      if (fechaFin && p.fecha_prestamo > fechaFin) return false;
      if (estado && p.estado !== estado) return false;
      if (multaMin && p.multa < Number(multaMin)) return false;
      if (multaMax && p.multa > Number(multaMax)) return false;
      return true;
    });
  };

  const filtered = filtrarPrestamos();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    const header = [
      'id',
      'usuario_id',
      'usuario_nombre',
      'material_id',
      'material_titulo',
      'fecha_prestamo',
      'fecha_devolucion',
      'estado',
      'multa'
    ];
    const rows = filtered.map((p) => [
      p.id,
      p.usuario_id,
      `"${p.usuario_nombre}"`,
      p.material_id,
      `"${p.material_titulo}"`,
      `"${p.fecha_prestamo}"`,
      `"${p.fecha_devolucion}"`,
      p.estado,
      p.multa
    ]);

   let csvContent = header.join(',') + '\r\n';
   rows.forEach((row) => {
   csvContent += row.join(',') + '\r\n';
  });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte_prestamos.csv');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Reporte de Préstamos</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Usuario ID"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          style={{ marginRight: '0.5rem', width: '80px' }}
        />
        <input
          type="number"
          placeholder="Material ID"
          value={materialId}
          onChange={(e) => setMaterialId(e.target.value)}
          style={{ marginRight: '0.5rem', width: '80px' }}
        />
        <input
          type="date"
          placeholder="Préstamo inicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Préstamo fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="">-- Estado --</option>
          <option value="pendiente">pendiente</option>
          <option value="devuelto">devuelto</option>
          <option value="atrasado">atrasado</option>
        </select>
        <input
          type="number"
          placeholder="Multa min"
          value={multaMin}
          onChange={(e) => setMultaMin(e.target.value)}
          style={{ marginRight: '0.5rem', width: '80px' }}
        />
        <input
          type="number"
          placeholder="Multa max"
          value={multaMax}
          onChange={(e) => setMultaMax(e.target.value)}
          style={{ marginRight: '0.5rem', width: '80px' }}
        />

        <button onClick={handleExportCSV} style={{ marginLeft: '1rem' }}>
          Exportar CSV
        </button>
      </div>

      <PrestamoList data={paginatedData} />

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
