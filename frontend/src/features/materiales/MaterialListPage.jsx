// src/features/materiales/MaterialListPage.jsx
import React, { useState } from "react";
import { useMateriales } from "./hooks/useMateriales";
import MaterialList from "./MaterialList";
import Pagination from "../../components/Pagination"; // Asumo que tienes un componente genérico de paginación

export default function MaterialListPage() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, loading, error } = useMateriales(page, perPage);

  if (loading) return <p>Cargando materiales...</p>;
  if (error) return <p>Error al cargar materiales</p>;

  return (
    <div>
      <h1>Lista de Materiales</h1>
      <MaterialList items={data.items} />

      {/* Paginación */}
      <Pagination
        currentPage={data.current_page}
        totalPages={data.total_pages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
