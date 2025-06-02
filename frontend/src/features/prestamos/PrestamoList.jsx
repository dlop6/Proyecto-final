// src/features/prestamos/PrestamoList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function PrestamoList({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario Nombre</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Material ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Material Título</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Préstamo</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Devolución</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Estado</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Multa</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((pr) => (
          <tr key={pr.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.usuario_id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.usuario_nombre}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.material_id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.material_titulo}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.fecha_prestamo}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.fecha_devolucion}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.estado}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{pr.multa}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <Link to={`/prestamos/${pr.id}`} style={{ marginRight: '8px' }}>Ver</Link>
              <Link to={`/prestamos/editar/${pr.id}`} style={{ marginRight: '8px' }}>Editar</Link>
              <button
                onClick={() => alert(`Eliminar préstamo ID ${pr.id}`)}
                style={{ cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
