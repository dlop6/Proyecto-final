// src/services/api/reportesApi.js
import apiClient from "../../utils/apiClient";

// Para reportes paginados que devuelven JSON
export const getReporteMateriales = async (filtros, page = 1, perPage = 50) => {
  const response = await apiClient.get("/reportes/materiales", {
    params: { ...filtros, page, per_page: perPage }
  });
  return response.data; // { total_items, total_pages, current_page, per_page, items }
};

export const getReportePrestamos = async (filtros, page = 1, perPage = 50) => {
  const response = await apiClient.get("/reportes/prestamos", {
    params: { ...filtros, page, per_page: perPage }
  });
  return response.data;
};

export const getReporteGeneral = async (filtros, page = 1, perPage = 50) => {
  const response = await apiClient.get("/reportes/general", {
    params: { ...filtros, page, per_page: perPage }
  });
  return response.data;
};

// Para descargar CSV (respuesta Blob)
export const downloadReporteMaterialesCsv = async (filtros) => {
  const response = await apiClient.get("/reportes/materiales", {
    params: { ...filtros, export: "csv" },
    responseType: "blob"
  });
  return response.data; // Blob
};

export const downloadReportePrestamosCsv = async (filtros) => {
  const response = await apiClient.get("/reportes/prestamos", {
    params: { ...filtros, export: "csv" },
    responseType: "blob"
  });
  return response.data;
};

export const downloadReporteGeneralCsv = async (filtros) => {
  const response = await apiClient.get("/reportes/general", {
    params: { ...filtros, export: "csv" },
    responseType: "blob"
  });
  return response.data;
};
