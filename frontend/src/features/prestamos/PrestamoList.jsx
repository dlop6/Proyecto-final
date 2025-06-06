// src/features/prestamos/PrestamoList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function PrestamoList({ data }) {
  return (
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
        {data.map((pr) => (
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
              <button onClick={() => alert(`Eliminar préstamo ID ${pr.id}`)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
