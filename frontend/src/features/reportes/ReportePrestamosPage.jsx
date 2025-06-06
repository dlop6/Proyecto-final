// src/features/reportes/ReportePrestamosPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import prestamosMock from '../../services/mock/prestamosMock';

export default function ReportePrestamosPage() {
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    if (window.confirm(`¿Eliminar préstamo ID ${id}?`)) {
      const index = prestamosMock.findIndex((p) => p.id === id);
      if (index !== -1) prestamosMock.splice(index, 1);
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        setCurrentPage((p) => p);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Reporte de Préstamos</h1>

      <button onClick={() => navigate('/prestamos/crear')} style={{ marginBottom: '1rem' }}>
        Crear Préstamo
      </button>

      {/* Panel de filtros */}
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
          placeholder="Préstamo inicio"
          value={fechaInicio}
          onChange={(e) => {
            setFechaInicio(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          placeholder="Préstamo fin"
          value={fechaFin}
          onChange={(e) => {
            setFechaFin(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setMultaMin(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Multa max"
          value={multaMax}
          onChange={(e) => {
            setMultaMax(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button onClick={handleExportCSV}>Exportar CSV</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario ID</th>
            <th>Usuario Nombre</th>
            <th>Material ID</th>
            <th>Material Título</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
            <th>Multa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((pr) => (
            <tr key={pr.id}>
              <td>{pr.id}</td>
              <td>{pr.usuario_id}</td>
              <td>{pr.usuario_nombre}</td>
              <td>{pr.material_id}</td>
              <td>{pr.material_titulo}</td>
              <td>{pr.fecha_prestamo}</td>
              <td>{pr.fecha_devolucion}</td>
              <td>{pr.estado}</td>
              <td>{pr.multa}</td>
              <td>
                <Link to={`/prestamos/${pr.id}`} style={{ marginRight: '0.5rem' }}>
                  Ver
                </Link>
                <Link to={`/prestamos/editar/${pr.id}`} style={{ marginRight: '0.5rem' }}>
                  Editar
                </Link>
                <button onClick={() => handleDelete(pr.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
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
