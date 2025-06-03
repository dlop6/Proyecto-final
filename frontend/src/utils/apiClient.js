

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function getJSON(path, params = {}) {
  // path: "/materiales", "/usuarios", etc.
  const url = new URL(API_BASE_URL + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });
  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(err.detail || "Error al obtener datos");
  }
  return res.json();
}

export async function postJSON(path, body) {
  const res = await fetch(API_BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(err.detail || "Error en creación");
  }
  return res.json();
}

export async function putJSON(path, body) {
  const res = await fetch(API_BASE_URL + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(err.detail || "Error en actualización");
  }
  return res.json();
}

export async function deleteJSON(path) {
  const res = await fetch(API_BASE_URL + path, {
    method: "DELETE",
  });
  if (res.status === 204) {
    return;
  }
  const err = await res.json().catch(() => ({ detail: "Error desconocido" }));
  throw new Error(err.detail || "Error en eliminación");
}
