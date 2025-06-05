// src/features/prestamos/PrestamoListPage.jsx
import React, { useState } from "react";
import { usePrestamos } from "./hooks/usePrestamos";
import PrestamoList from "./PrestamoList";
import Pagination from "../../components/Pagination";

export default function PrestamoListPage() {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, loading, error } = usePrestamos(page, perPage);

  if (loading) return <p>Cargando préstamos...</p>;
  if (error) return <p>Error al cargar préstamos</p>;

  return (
    <div>
      <h1>Lista de Préstamos</h1>
      <PrestamoList items={data.items} />

      <Pagination
        currentPage={data.current_page}
        totalPages={data.total_pages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
