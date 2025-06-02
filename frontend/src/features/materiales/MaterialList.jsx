// src/features/materiales/MaterialList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function MaterialList({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Título</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Autor</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Categoría</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Disponible</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Publicación</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ubicación</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((mat) => (
          <tr key={mat.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.titulo}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.autor}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.categoria}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.cantidad_total}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.cantidad_disponible}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.fecha_publicacion}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mat.ubicacion}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <Link to={`/materiales/${mat.id}`} style={{ marginRight: '8px' }}>Ver</Link>
              <Link to={`/materiales/editar/${mat.id}`} style={{ marginRight: '8px' }}>Editar</Link>
              <button
                onClick={() => alert(`Eliminar material ID ${mat.id}`)}
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
