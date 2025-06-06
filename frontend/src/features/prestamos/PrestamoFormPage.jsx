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
    if (!usuarioId || !materialId || !fechaPrestamo || !fechaDevolucion) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (new Date(fechaDevolucion) < new Date(fechaPrestamo)) {
      alert('La fecha de devolución no puede ser anterior a la fecha de préstamo.');
      return;
    }

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
    <div className="container">
      <h1 className="page-title">{id ? 'Editar Préstamo' : 'Crear Préstamo'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario*:</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
          >
            <option value="">-- Selecciona usuario --</option>
            {usuariosMock.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} (ID {u.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Material*:</label>
          <select
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
          >
            <option value="">-- Selecciona material --</option>
            {materialesMock.map((m) => (
              <option key={m.id} value={m.id}>
                {m.titulo} (ID {m.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha Préstamo*:</label>
          <input
            type="date"
            value={fechaPrestamo}
            onChange={(e) => setFechaPrestamo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Fecha Devolución*:</label>
          <input
            type="date"
            value={fechaDevolucion}
            onChange={(e) => setFechaDevolucion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Notas:</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button
            type="button"
            onClick={() => navigate('/prestamos')}
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
