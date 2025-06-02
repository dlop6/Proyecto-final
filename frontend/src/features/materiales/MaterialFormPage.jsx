// src/features/materiales/MaterialFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import materialesMock from '../../services/mock/materialesMock';

export default function MaterialFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado para cada campo del formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidadTotal, setCantidadTotal] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  // Si existe `id`, estamos en modo EDICIÓN; cargamos los valores desde el mock
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

    // Validaciones mínimas
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
      cantidad_disponible: id ? undefined : Number(cantidadTotal), // en edición no cambiamos disponible
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

    // Después de “guardar”, volvemos al listado
    navigate('/materiales');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{id ? 'Editar Material' : 'Crear Material'}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Título*:
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '300px' }}
              maxLength={200}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Autor*:
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Categoría*:
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Cantidad Total*:
            <input
              type="number"
              value={cantidadTotal}
              onChange={(e) => setCantidadTotal(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '80px' }}
              min={1}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Fecha de Publicación*:
            <input
              type="date"
              value={fechaPublicacion}
              onChange={(e) => setFechaPublicacion(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '400px', height: '80px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Ubicación*:
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button
            type="button"
            onClick={() => navigate('/materiales')}
            style={{ marginLeft: '0.5rem' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
