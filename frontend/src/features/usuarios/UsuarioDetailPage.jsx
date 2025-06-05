// src/features/usuarios/UsuarioDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsuarioById } from "../../services/api/usuariosApi";

export default function UsuarioDetailPage() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsuarioById(id)
      .then((res) => setUsuario(res))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalle usuario...</p>;
  if (error) return <p>Error al cargar detalle</p>;

  return (
    <div>
      <h1>Detalle Usuario #{usuario.id}</h1>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>
      <p><strong>Fecha Registro:</strong> {usuario.fecha_registro}</p>
      {usuario.telefono && <p><strong>Teléfono:</strong> {usuario.telefono}</p>}

      <Link to={`/usuarios/${id}/editar`}>Editar</Link> |{" "}
      <Link to="/usuarios">Volver a la lista</Link>
    </div>
  );
}
