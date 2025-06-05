// src/features/usuarios/UsuarioFormPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioById, createUsuario, updateUsuario } from "../../services/api/usuariosApi";

export default function UsuarioFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    rol: "estudiante",
    telefono: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getUsuarioById(id)
      .then((res) => {
        setFormValues({
          nombre: res.nombre,
          email: res.email,
          rol: res.rol,
          telefono: res.telefono || ""
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
        await updateUsuario(id, formValues);
      } else {
        await createUsuario(formValues);
      }
      navigate("/usuarios");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Usuario" : "Crear Usuario"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Rol:
          <select name="rol" value={formValues.rol} onChange={handleChange} required>
            <option value="estudiante">Estudiante</option>
            <option value="bibliotecario">Bibliotecario</option>
          </select>
        </label>
        <br />

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formValues.telefono}
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
