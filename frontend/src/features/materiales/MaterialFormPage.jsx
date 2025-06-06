// src/features/materiales/MaterialFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import materialesMock from '../../services/mock/materialesMock';

export default function MaterialFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidadTotal, setCantidadTotal] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  useEffect(() => {
    if (id) {
      const mat = materialesMock.find((m) => String(m.id) === id);
      if (mat) {
        setTitulo(mat.titulo);
        setAutor(mat.autor);
        setCategoria(mat.categoria);
        setCantidadTotal(mat.cantidad_total);
        setFechaPublicacion(mat.fecha_publicacion);
        setDescripcion(mat.descripcion || '');
        setUbicacion(mat.ubicacion);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !titulo.trim() ||
      !autor.trim() ||
      !categoria.trim() ||
      !cantidadTotal ||
      !fechaPublicacion ||
      !ubicacion.trim()
    ) {
      alert('Por favor llena todos los campos obligatorios.');
      return;
    }
    if (Number(cantidadTotal) < 1) {
      alert('Cantidad total debe ser al menos 1.');
      return;
    }

    const formData = {
      id: id || '(nuevo)',
      titulo: titulo.trim(),
      autor: autor.trim(),
      categoria: categoria.trim(),
      cantidad_total: Number(cantidadTotal),
      cantidad_disponible: id ? undefined : Number(cantidadTotal),
      fecha_publicacion: fechaPublicacion,
      descripcion: descripcion.trim(),
      ubicacion: ubicacion.trim(),
    };

    if (id) {
      console.log('Actualizando material:', formData);
      alert(`Material ID ${id} actualizado (simulado).`);
    } else {
      console.log('Creando material nuevo:', formData);
      alert('Material creado (simulado).');
    }

    navigate('/materiales');
  };

  return (
    <div className="container">
      <h1 className="page-title">{id ? 'Editar Material' : 'Crear Material'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título*:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label>Autor*:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Categoría*:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Cantidad Total*:</label>
          <input
            type="number"
            value={cantidadTotal}
            onChange={(e) => setCantidadTotal(e.target.value)}
            min={1}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Publicación*:</label>
          <input
            type="date"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ubicación*:</label>
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button
            type="button"
            onClick={() => navigate('/materiales')}
            className="btn-cancel"
            style={{ marginLeft: '0.5rem' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
