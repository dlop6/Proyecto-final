// src/features/usuarios/UsuarioFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usuariosMock from '../../services/mock/usuariosMock';

export default function UsuarioFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('estudiante');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (id) {
      const usr = usuariosMock.find((u) => String(u.id) === id);
      if (usr) {
        setNombre(usr.nombre);
        setEmail(usr.email);
        setRol(usr.rol);
        setTelefono(usr.telefono || '');
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre.trim() || !email.trim() || !rol) {
      alert('Por favor llena todos los campos obligatorios.');
      return;
    }
    // Validar formato básico de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingresa un email válido.');
      return;
    }

    const formData = {
      id: id || '(nuevo)',
      nombre: nombre.trim(),
      email: email.trim(),
      rol,
      telefono: telefono.trim(),
      fecha_registro: id ? undefined : new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    if (id) {
      console.log('Actualizando usuario:', formData);
      alert(`Usuario ID ${id} actualizado (simulado).`);
    } else {
      console.log('Creando usuario nuevo:', formData);
      alert('Usuario creado (simulado).');
    }

    navigate('/usuarios');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Nombre*:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '300px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Email*:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '300px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Rol*:
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="estudiante">estudiante</option>
              <option value="bibliotecario">bibliotecario</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Teléfono:
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={{ marginLeft: '0.5rem', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          <button
            type="button"
            onClick={() => navigate('/usuarios')}
            style={{ marginLeft: '0.5rem' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
