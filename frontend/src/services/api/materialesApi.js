// src/services/api/materialesApi.js
import apiClient from "../../utils/apiClient";

export const getMateriales = async (page = 1, perPage = 20) => {
  const response = await apiClient.get("/materiales", {
    params: { page, per_page: perPage }
  });
  return response.data; // { total_items, total_pages, current_page, per_page, items }
};

export const getMaterialById = async (id) => {
  const response = await apiClient.get(`/materiales/${id}`);
  return response.data; // { id, titulo, autor, ... }
};

export const createMaterial = async (materialData) => {
  const response = await apiClient.post("/materiales", materialData);
  return response.data; // objeto del material creado
};

export const updateMaterial = async (id, materialData) => {
  const response = await apiClient.put(`/materiales/${id}`, materialData);
  return response.data; // objeto del material actualizado
};

export const deleteMaterial = async (id) => {
  await apiClient.delete(`/materiales/${id}`);
  // Si no devuelve cuerpo, con esto basta
};
