// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/materiales" className={styles.link}>
        Materiales
      </Link>
      <Link to="/usuarios" className={styles.link}>
        Usuarios
      </Link>
      <Link to="/prestamos" className={styles.link}>
        Préstamos
      </Link>

      <span className={styles.span}>Reportes:</span>
      <Link to="/reportes/materiales" className={styles.link}>
        Materiales
      </Link>
      <Link to="/reportes/prestamos" className={styles.link}>
        Préstamos
      </Link>
      <Link to="/reportes/general" className={styles.link}>
        General
      </Link>
    </nav>
  );
}
