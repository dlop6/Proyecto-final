import { getJSON, postJSON, putJSON, deleteJSON } from '../../utils/apiClient';

export async function fetchMateriales(page = 1, per_page = 20) {
  return getJSON('/materiales', { page, per_page });
}

export async function fetchMaterialById(id) {
  return getJSON(`/materiales/${id}`);
}

export async function createMaterial(data) {
  return postJSON('/materiales', data);
}

export async function updateMaterial(id, data) {
  return putJSON(`/materiales/${id}`, data);
}

export async function deleteMaterial(id) {
  return deleteJSON(`/materiales/${id}`);
}
