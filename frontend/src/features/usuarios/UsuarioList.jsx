// src/features/usuarios/UsuarioList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function UsuarioList({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Fecha Registro</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>{user.rol}</td>
            <td>{user.fecha_registro}</td>
            <td>
              <Link to={`/usuarios/${user.id}`} style={{ marginRight: '0.5rem' }}>
                Ver
              </Link>
              <Link to={`/usuarios/editar/${user.id}`} style={{ marginRight: '0.5rem' }}>
                Editar
              </Link>
              <button onClick={() => alert(`Eliminar usuario ID ${user.id}`)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
