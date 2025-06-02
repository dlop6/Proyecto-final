// src/features/usuarios/UsuarioList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function UsuarioList({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rol</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fecha Registro</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.nombre}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.rol}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.fecha_registro}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <Link to={`/usuarios/${user.id}`} style={{ marginRight: '8px' }}>Ver</Link>
              <Link to={`/usuarios/editar/${user.id}`} style={{ marginRight: '8px' }}>Editar</Link>
              <button
                onClick={() => alert(`Eliminar usuario ID ${user.id}`)}
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
