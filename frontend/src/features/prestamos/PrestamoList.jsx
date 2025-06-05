// src/features/prestamos/PrestamoList.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PrestamoList({ items }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Material</th>
          <th>Fecha Préstamo</th>
          <th>Fecha Devolución</th>
          <th>Estado</th>
          <th>Multa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.usuario_nombre}</td>
            <td>{p.material_titulo}</td>
            <td>{p.fecha_prestamo}</td>
            <td>{p.fecha_devolucion}</td>
            <td>{p.estado}</td>
            <td>{p.multa}</td>
            <td>
              <Link to={`/prestamos/${p.id}`}>Ver</Link>{" | "}
              <Link to={`/prestamos/${p.id}/editar`}>Editar</Link>{" | "}
              <button onClick={() => {
                // Llamar a deletePrestamo(p.id) y luego refrescar
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
