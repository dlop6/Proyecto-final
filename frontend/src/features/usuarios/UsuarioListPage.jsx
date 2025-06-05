// src/features/usuarios/UsuarioListPage.jsx
import React, { useState } from "react";
import { useUsuarios } from "./hooks/useUsuarios";
import UsuarioList from "./UsuarioList";
import Pagination from "../../components/Pagination";

export default function UsuarioListPage() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, loading, error } = useUsuarios(page, perPage);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <UsuarioList items={data.items} />

      <Pagination
        currentPage={data.current_page}
        totalPages={data.total_pages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
