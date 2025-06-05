// src/services/api/prestamosApi.js
import apiClient from "../../utils/apiClient";

export const getPrestamos = async (page = 1, perPage = 20) => {
  const response = await apiClient.get("/prestamos", {
    params: { page, per_page: perPage }
  });
  return response.data;
};

export const getPrestamoById = async (id) => {
  const response = await apiClient.get(`/prestamos/${id}`);
  return response.data;
};

export const createPrestamo = async (prestamoData) => {
  const response = await apiClient.post("/prestamos", prestamoData);
  return response.data;
};

export const updatePrestamo = async (id, prestamoData) => {
  const response = await apiClient.put(`/prestamos/${id}`, prestamoData);
  return response.data;
};

export const deletePrestamo = async (id) => {
  await apiClient.delete(`/prestamos/${id}`);
};
