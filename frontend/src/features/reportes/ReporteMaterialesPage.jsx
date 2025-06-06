// src/features/reportes/ReporteMaterialesPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import materialesMock from '../../services/mock/materialesMock';

export default function ReporteMaterialesPage() {
  const navigate = useNavigate();

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
    const header = [
      'id',
      'titulo',
      'autor',
      'categoria',
      'cantidad_total',
      'cantidad_disponible',
      'fecha_publicacion'
    ];
    const rows = filtered.map((m) => [
      m.id,
      `"${m.titulo}"`,
      `"${m.autor}"`,
      `"${m.categoria}"`,
      m.cantidad_total,
      m.cantidad_disponible,
      `"${m.fecha_publicacion}"`
    ]);

    let csvContent = header.join(',') + '\r\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reporte_materiales.csv');
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Seguro que deseas eliminar el material ID ${id}?`)) {
      const index = materialesMock.findIndex((m) => m.id === id);
      if (index !== -1) materialesMock.splice(index, 1);
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        setCurrentPage((p) => p); // fuerza re-render
      }
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Reporte de Materiales</h1>

      <button onClick={() => navigate('/materiales/crear')} style={{ marginBottom: '1rem' }}>
        Crear Material
      </button>

      {/* Panel de filtros */}
      <div className="filter-panel">
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          placeholder="Fecha inicio"
          value={fechaInicio}
          onChange={(e) => {
            setFechaInicio(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          value={fechaFin}
          onChange={(e) => {
            setFechaFin(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Cant. min"
          value={cantidadMin}
          onChange={(e) => {
            setCantidadMin(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Cant. max"
          value={cantidadMax}
          onChange={(e) => {
            setCantidadMax(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button onClick={handleExportCSV}>Exportar CSV</button>
      </div>

      {/* Tabla con acciones */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th>Total</th>
            <th>Disponible</th>
            <th>Publicación</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((mat) => (
            <tr key={mat.id}>
              <td>{mat.id}</td>
              <td>{mat.titulo}</td>
              <td>{mat.autor}</td>
              <td>{mat.categoria}</td>
              <td>{mat.cantidad_total}</td>
              <td>{mat.cantidad_disponible}</td>
              <td>{mat.fecha_publicacion}</td>
              <td>{mat.ubicacion}</td>
              <td>
                <Link to={`/materiales/${mat.id}`} style={{ marginRight: '0.5rem' }}>
                  Ver
                </Link>
                <Link to={`/materiales/editar/${mat.id}`} style={{ marginRight: '0.5rem' }}>
                  Editar
                </Link>
                <button onClick={() => handleDelete(mat.id)}>Eliminar</button>
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
