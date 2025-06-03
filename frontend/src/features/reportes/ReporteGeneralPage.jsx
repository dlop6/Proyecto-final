// src/features/reportes/ReporteGeneralPage.jsx

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import eventsMock from '../../services/mock/eventsMock';

export default function ReporteGeneralPage() {
  // Filtros
  const [usuarioId, setUsuarioId] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const filtrarEventos = () => {
    return eventsMock.filter((e) => {
      if (usuarioId && e.usuario_id !== Number(usuarioId)) return false;
      if (materialId && e.material_id !== Number(materialId)) return false;
      if (fechaInicio && e.fecha_evento < fechaInicio) return false;
      if (fechaFin && e.fecha_evento > fechaFin) return false;
      if (tipoEvento && e.tipo_evento !== tipoEvento) return false;
      return true;
    });
  };

  const filtered = filtrarEventos();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    const header = [
      'evento_id',
      'usuario_id',
      'usuario_nombre',
      'material_id',
      'material_titulo',
      'tipo_evento',
      'fecha_evento',
      'notas'
    ];
    const rows = filtered.map((e) => [
      e.evento_id,
      e.usuario_id,
      `"${e.usuario_nombre}"`,
      e.material_id,
      `"${e.material_titulo}"`,
      e.tipo_evento,
      `"${e.fecha_evento}"`,
      `"${e.notas}"`
    ]);

    let csvContent = header.join(',') + '\r\n';
   rows.forEach((row) => {
    csvContent += row.join(',') + '\r\n';
  });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte_general.csv');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Reporte General de Actividad</h1>

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
          placeholder="Evento inicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          placeholder="Evento fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <select
          value={tipoEvento}
          onChange={(e) => setTipoEvento(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="">-- Tipo Evento --</option>
          <option value="prestamo">prestamo</option>
          <option value="devolucion">devolucion</option>
          <option value="reserva">reserva</option>
          <option value="pago_multa">pago_multa</option>
        </select>

        <button onClick={handleExportCSV} style={{ marginLeft: '1rem' }}>
          Exportar CSV
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Evento ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Material ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Material Título</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tipo Evento</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Evento</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Notas</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((e) => (
            <tr key={e.evento_id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.evento_id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.usuario_id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.usuario_nombre}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.material_id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.material_titulo}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.tipo_evento}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.fecha_evento}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
