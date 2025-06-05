// src/features/reportes/ReportePrestamosPage.jsx
import React, { useState } from "react";
import FilterPanel from "../../components/FilterPanel";
import ReportTable from "../../components/ReportTable";
import Pagination from "../../components/Pagination";
import { getReportePrestamos, downloadReportePrestamosCsv } from "../../services/api/reportesApi";

export default function ReportePrestamosPage() {
  const [filters, setFilters] = useState({
    usuario_id: "",
    material_id: "",
    fecha_prestamo_inicio: "",
    fecha_prestamo_fin: "",
    estado: "",
    multa_min: "",
    multa_max: ""
  });
  const [page, setPage] = useState(1);
  const perPage = 50;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplyFilters = () => {
    setLoading(true);
    getReportePrestamos(filters, page, perPage)
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const handleDownloadCsv = () => {
    downloadReportePrestamosCsv(filters)
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte_prestamos.csv");
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
      <h1>Reporte de Préstamos</h1>

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
              handleApplyFilters();
            }}
          />
          <button onClick={handleDownloadCsv}>Exportar CSV</button>
        </>
      )}
    </div>
  );
}
