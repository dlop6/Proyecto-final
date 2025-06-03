// src/routes.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Materiales
import MaterialListPage from './features/materiales/MaterialListPage';
import MaterialDetailPage from './features/materiales/MaterialDetailPage';
import MaterialFormPage from './features/materiales/MaterialFormPage';

// Usuarios
import UsuarioListPage from './features/usuarios/UsuarioListPage';
import UsuarioDetailPage from './features/usuarios/UsuarioDetailPage';
import UsuarioFormPage from './features/usuarios/UsuarioFormPage';

// Préstamos
import PrestamoListPage from './features/prestamos/PrestamoListPage';
import PrestamoDetailPage from './features/prestamos/PrestamoDetailPage';
import PrestamoFormPage from './features/prestamos/PrestamoFormPage';

// Reportes
import ReporteMaterialesPage from './features/reportes/ReporteMaterialesPage';
import ReportePrestamosPage from './features/reportes/ReportePrestamosPage';
import ReporteGeneralPage from './features/reportes/ReporteGeneralPage';

export default function RoutesConfig() {
return (
  <Routes>
    <Route path="/" element={<Navigate to="/materiales" />} />

    {/* CRUD Materiales */}
    <Route path="/materiales" element={<MaterialListPage />} />
    <Route path="/materiales/crear" element={<MaterialFormPage />} />
    <Route path="/materiales/editar/:id" element={<MaterialFormPage />} />
    <Route path="/materiales/:id" element={<MaterialDetailPage />} />

    {/* CRUD Usuarios */}
    <Route path="/usuarios" element={<UsuarioListPage />} />
    <Route path="/usuarios/crear" element={<UsuarioFormPage />} />
    <Route path="/usuarios/editar/:id" element={<UsuarioFormPage />} />
    <Route path="/usuarios/:id" element={<UsuarioDetailPage />} />

    {/* CRUD Préstamos */}
    <Route path="/prestamos" element={<PrestamoListPage />} />
    <Route path="/prestamos/crear" element={<PrestamoFormPage />} />
    <Route path="/prestamos/editar/:id" element={<PrestamoFormPage />} />
    <Route path="/prestamos/:id" element={<PrestamoDetailPage />} />

    {/* Reportes */}
    <Route path="/reportes/materiales" element={<ReporteMaterialesPage />} />
    <Route path="/reportes/prestamos" element={<ReportePrestamosPage />} />
    <Route path="/reportes/general" element={<ReporteGeneralPage />} />

    <Route path="*" element={<Navigate to="/materiales" />} />
  </Routes>
);
}
