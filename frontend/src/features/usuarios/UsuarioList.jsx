// src/features/usuarios/UsuarioList.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function UsuarioList({ items }) {
  return (
    <table>
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
        {items.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{u.rol}</td>
            <td>{u.fecha_registro}</td>
            <td>
              <Link to={`/usuarios/${u.id}`}>Ver</Link>{" | "}
              <Link to={`/usuarios/${u.id}/editar`}>Editar</Link>{" | "}
              <button onClick={() => {
                // deleteUsuario(u.id) y refrescar
              }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
