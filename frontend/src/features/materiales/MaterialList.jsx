// src/features/materiales/MaterialList.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Material.module.css"; // tu CSS Module

export default function MaterialList({ items }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Categoría</th>
          <th>Disponible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((mat) => (
          <tr key={mat.id}>
            <td>{mat.id}</td>
            <td>{mat.titulo}</td>
            <td>{mat.autor}</td>
            <td>{mat.categoria}</td>
            <td>{mat.cantidad_disponible}</td>
            <td>
              <Link to={`/materiales/${mat.id}`}>Ver</Link>{" | "}
              <Link to={`/materiales/${mat.id}/editar`}>Editar</Link>{" | "}
              <button onClick={() => {
                // Aquí podrías llamar a deleteMaterial(mat.id) y luego refrescar la lista
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
