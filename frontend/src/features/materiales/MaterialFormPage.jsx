// src/features/materiales/MaterialFormPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialById, createMaterial, updateMaterial } from "../../services/api/materialesApi";

export default function MaterialFormPage() {
  const { id } = useParams(); // si existe, estamos en modo “editar”
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    titulo: "",
    autor_id: "",
    categoria_id: "",
    cantidad_total: "",
    fecha_publicacion: "",
    descripcion: "",
    ubicacion: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si “id” existe, carga datos previos
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMaterialById(id)
      .then((res) => {
        setFormValues({
          titulo: res.titulo,
          autor_id: res.autor_id,           // suponiendo que el backend devuelve autor_id
          categoria_id: res.categoria_id,   // igual para categoría
          cantidad_total: res.cantidad_total,
          fecha_publicacion: res.fecha_publicacion,
          descripcion: res.descripcion,
          ubicacion: res.ubicacion
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        // modo editar
        await updateMaterial(id, formValues);
      } else {
        // modo crear
        await createMaterial(formValues);
      }
      navigate("/materiales");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Material" : "Crear Material"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Autor ID:
          <input
            type="number"
            name="autor_id"
            value={formValues.autor_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Categoría ID:
          <input
            type="number"
            name="categoria_id"
            value={formValues.categoria_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Cantidad Total:
          <input
            type="number"
            name="cantidad_total"
            value={formValues.cantidad_total}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
        <br />

        <label>
          Fecha Publicación:
          <input
            type="date"
            name="fecha_publicacion"
            value={formValues.fecha_publicacion}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Ubicación:
          <input
            type="text"
            name="ubicacion"
            value={formValues.ubicacion}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
