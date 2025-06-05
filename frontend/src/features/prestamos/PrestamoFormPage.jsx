// src/features/prestamos/PrestamoFormPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPrestamoById, createPrestamo, updatePrestamo } from "../../services/api/prestamosApi";

export default function PrestamoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    usuario_id: "",
    material_id: "",
    fecha_prestamo: "",
    fecha_devolucion: "",
    notas: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPrestamoById(id)
      .then((res) => {
        setFormValues({
          usuario_id: res.usuario_id,
          material_id: res.material_id,
          fecha_prestamo: res.fecha_prestamo,
          fecha_devolucion: res.fecha_devolucion,
          notas: res.notas || ""
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
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
        await updatePrestamo(id, formValues);
      } else {
        await createPrestamo(formValues);
      }
      navigate("/prestamos");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Préstamo" : "Crear Préstamo"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Usuario ID:
          <input
            type="number"
            name="usuario_id"
            value={formValues.usuario_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Material ID:
          <input
            type="number"
            name="material_id"
            value={formValues.material_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Fecha Préstamo:
          <input
            type="date"
            name="fecha_prestamo"
            value={formValues.fecha_prestamo}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Fecha Devolución:
          <input
            type="date"
            name="fecha_devolucion"
            value={formValues.fecha_devolucion}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Notas:
          <textarea
            name="notas"
            value={formValues.notas}
            onChange={handleChange}
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
