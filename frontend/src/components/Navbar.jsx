import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/materiales" style={{ marginRight: '1rem' }}>Materiales</Link>
      <Link to="/usuarios" style={{ marginRight: '1rem' }}>Usuarios</Link>
      <Link to="/prestamos" style={{ marginRight: '1rem' }}>Préstamos</Link>
      <Link to="/reportes/materiales" style={{ marginRight: '1rem' }}>Reportes</Link>
    </nav>
  );
}
