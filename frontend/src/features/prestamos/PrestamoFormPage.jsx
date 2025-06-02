// src/features/prestamos/PrestamoFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import prestamosMock from '../../services/mock/prestamosMock';
import usuariosMock from '../../services/mock/usuariosMock';
import materialesMock from '../../services/mock/materialesMock';

export default function PrestamoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuarioId, setUsuarioId] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [notas, setNotas] = useState('');

  // En edición, precargar datos
  useEffect(() => {
    if (id) {
      const pr = prestamosMock.find((p) => String(p.id) === id);
      if (pr) {
        setUsuarioId(pr.usuario_id);
        setMaterialId(pr.material_id);
        setFechaPrestamo(pr.fecha_prestamo);
        setFechaDevolucion(pr.fecha_devolucion);
        setNotas(pr.notas || '');
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!usuarioId || !materialId || !fechaPrestamo || !fechaDevolucion) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    // Validar que fechaDevolucion >= fechaPrestamo
    if (new Date(fechaDevolucion) < new Date(fechaPrestamo)) {
      alert('La fecha de devolución no puede ser anterior a la fecha de préstamo.');
      return;
    }

    // Obtener nombres (solo para mock)
    const usuario = usuariosMock.find((u) => u.id === Number(usuarioId));
    const material = materialesMock.find((m) => m.id === Number(materialId));
    const formData = {
      id: id || '(nuevo)',
      usuario_id: Number(usuarioId),
      usuario_nombre: usuario ? usuario.nombre : '—',
      material_id: Number(materialId),
      material_titulo: material ? material.titulo : '—',
      fecha_prestamo: fechaPrestamo,
      fecha_devolucion: fechaDevolucion,
      estado: id ? prestamosMock.find((p) => String(p.id) === id).estado : 'pendiente',
      multa: id ? prestamosMock.find((p) => String(p.id) === id).multa : 0,
      notas: notas.trim(),
    };

    if (id) {
      console.log('Actualizando préstamo:', formData);
      alert(`Préstamo ID ${id} actualizado (simulado).`);
    } else {
      console.log('Creando préstamo nuevo:', formData);
      alert('Préstamo creado (simulado).');
    }

    navigate('/prestamos');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{id ? 'Editar Préstamo' : 'Crear Préstamo'}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Usuario*:
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="">-- Selecciona usuario --</option>
              {usuariosMock.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} (ID {u.id})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Material*:
            <select
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="">-- Selecciona material --</option>
              {materialesMock.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.titulo} (ID {m.id})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Fecha Préstamo*:
            <input
              type="date"
              value={fechaPrestamo}
              onChange={(e) => setFechaPrestamo(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Fecha Devolución*:
            <input
              type="date"
              value={fechaDevolucion}
              onChange={(e) => setFechaDevolucion(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Notas:
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '400px', height: '80px' }}
            />
          </label>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button
            type="button"
            onClick={() => navigate('/prestamos')}
            style={{ marginLeft: '0.5rem' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
