// src/features/reportes/ReporteGeneralPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import eventsMock from '../../services/mock/eventsMock';

export default function ReporteGeneralPage() {
  const navigate = useNavigate();

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

  const handleDelete = (eventoId) => {
    if (window.confirm(`¿Eliminar evento ID ${eventoId}?`)) {
      const index = eventsMock.findIndex((e) => e.evento_id === eventoId);
      if (index !== -1) eventsMock.splice(index, 1);
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        setCurrentPage((p) => p);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Reporte General de Actividad</h1>

      <button onClick={() => navigate('/eventos/crear')} style={{ marginBottom: '1rem' }}>
        Crear Evento
      </button>

      <div className="filter-panel">
        <input
          type="number"
          placeholder="Usuario ID"
          value={usuarioId}
          onChange={(e) => {
            setUsuarioId(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Material ID"
          value={materialId}
          onChange={(e) => {
            setMaterialId(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          placeholder="Evento inicio"
          value={fechaInicio}
          onChange={(e) => {
            setFechaInicio(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          placeholder="Evento fin"
          value={fechaFin}
          onChange={(e) => {
            setFechaFin(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={tipoEvento}
          onChange={(e) => {
            setTipoEvento(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">-- Tipo Evento --</option>
          <option value="prestamo">prestamo</option>
          <option value="devolucion">devolucion</option>
          <option value="reserva">reserva</option>
          <option value="pago_multa">pago_multa</option>
        </select>

        <button onClick={handleExportCSV}>Exportar CSV</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Evento ID</th>
            <th>Usuario ID</th>
            <th>Usuario Nombre</th>
            <th>Material ID</th>
            <th>Material Título</th>
            <th>Tipo Evento</th>
            <th>Fecha Evento</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((e) => (
            <tr key={e.evento_id}>
              <td>{e.evento_id}</td>
              <td>{e.usuario_id}</td>
              <td>{e.usuario_nombre}</td>
              <td>{e.material_id}</td>
              <td>{e.material_titulo}</td>
              <td>{e.tipo_evento}</td>
              <td>{e.fecha_evento}</td>
              <td>{e.notas}</td>
              <td>
                <Link to={`/eventos/${e.evento_id}`} style={{ marginRight: '0.5rem' }}>
                  Ver
                </Link>
                <Link to={`/eventos/editar/${e.evento_id}`} style={{ marginRight: '0.5rem' }}>
                  Editar
                </Link>
                <button onClick={() => handleDelete(e.evento_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
