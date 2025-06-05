// src/features/reportes/ReporteMaterialesPage.jsx
import React, { useState } from "react";
import FilterPanel from "../../components/FilterPanel";
import ReportTable from "../../components/ReportTable";
import Pagination from "../../components/Pagination";
import { getReporteMateriales, downloadReporteMaterialesCsv } from "../../services/api/reportesApi";

export default function ReporteMaterialesPage() {
  // Filtros iniciales vacíos
  const [filters, setFilters] = useState({
    autor_id: "",
    categoria_id: "",
    fecha_publicacion_inicio: "",
    fecha_publicacion_fin: "",
    cantidad_min: "",
    cantidad_max: ""
  });
  const [page, setPage] = useState(1);
  const perPage = 50;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplyFilters = () => {
    setLoading(true);
    getReporteMateriales(filters, page, perPage)
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const handleDownloadCsv = () => {
    downloadReporteMaterialesCsv(filters)
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte_materiales.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p>Error al cargar reporte</p>;

  return (
    <div>
      <h1>Reporte de Materiales</h1>

      {/* Panel de filtros (5 campos mínimos) */}
      <FilterPanel
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onApply={handleApplyFilters}
      />

      {data && (
        <>
          <ReportTable items={data.items} />

          <Pagination
            currentPage={data.current_page}
            totalPages={data.total_pages}
            onPageChange={(newPage) => {
              setPage(newPage);
              handleApplyFilters(); // recargar con nueva página
            }}
          />

          <button onClick={handleDownloadCsv}>Exportar CSV</button>
        </>
      )}
    </div>
  );
}
