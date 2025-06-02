#!/usr/bin/env bash
# Script para crear la estructura mínima (sin autenticación ni extras) de Proyecto4

# ----------------------
# Carpeta base
# ----------------------
mkdir -p Proyecto4
cd Proyecto4 || exit

# ----------------------
# Archivos raíz
# ----------------------
touch .gitignore
touch README.md

# ----------------------
# Carpeta docs
# ----------------------
mkdir -p docs
touch docs/API_CONTRACT.md
touch docs/schema.sql
touch docs/data.sql
touch docs/vistas.sql
touch docs/triggers.sql
touch docs/funciones.sql
touch docs/er_diagram.png
touch docs/reflexion.md

# ----------------------
# Carpeta backend
# ----------------------
mkdir -p backend
touch backend/requirements.txt
touch backend/.env.example

mkdir -p backend/src

# CRUDs y reportes
mkdir -p backend/src/api
touch backend/src/api/materiales_routes.py
touch backend/src/api/materiales_reportes.py
touch backend/src/api/usuarios_routes.py
touch backend/src/api/prestamos_routes.py
touch backend/src/api/reportes_routes.py

# Configuración y conexión a BD (sin security.py)
mkdir -p backend/src/core
touch backend/src/core/database.py
touch backend/src/core/config.py

# Modelos (20+ archivos) + custom_types.py
mkdir -p backend/src/models
touch backend/src/models/author.py
touch backend/src/models/category.py
touch backend/src/models/material.py
touch backend/src/models/material_copy.py
touch backend/src/models/publisher.py
touch backend/src/models/user.py
touch backend/src/models/loan.py
touch backend/src/models/loan_detail.py
touch backend/src/models/tag.py
touch backend/src/models/material_tag.py
touch backend/src/models/role.py
touch backend/src/models/location.py
touch backend/src/models/material_location.py
touch backend/src/models/fine.py
touch backend/src/models/reservation.py
touch backend/src/models/author_material.py
touch backend/src/models/publisher_material.py
touch backend/src/models/custom_types.py

# Esquemas Pydantic
mkdir -p backend/src/schemas
touch backend/src/schemas/material_schema.py
touch backend/src/schemas/user_schema.py
touch backend/src/schemas/loan_schema.py
touch backend/src/schemas/report_schema.py
touch backend/src/schemas/__init__.py

# Scripts SQL puros
mkdir -p backend/src/sql
touch backend/src/sql/schema.sql
touch backend/src/sql/data.sql
touch backend/src/sql/vistas.sql
touch backend/src/sql/triggers.sql
touch backend/src/sql/funciones.sql

# Utilitarios mínimos (paginación y CSV)
mkdir -p backend/src/utils
touch backend/src/utils/pagination.py
touch backend/src/utils/csv_helper.py
touch backend/src/utils/__init__.py

# Archivo principal
touch backend/src/main.py

# ----------------------
# Carpeta frontend
# ----------------------
mkdir -p frontend
touch frontend/package.json
touch frontend/.env.example

# Recursos públicos
mkdir -p frontend/public
touch frontend/public/index.html
touch frontend/public/favicon.ico

# Carpeta src
mkdir -p frontend/src

# Imágenes e íconos
mkdir -p frontend/src/assets
touch frontend/src/assets/logo.png
touch frontend/src/assets/export.svg

# Estilos: reset + CSS Modules
mkdir -p frontend/src/styles
touch frontend/src/styles/globals.css
touch frontend/src/styles/Material.module.css
touch frontend/src/styles/Prestamo.module.css
touch frontend/src/styles/Usuario.module.css
touch frontend/src/styles/Reportes.module.css

# Utilitarios mínimos (API client y CSV)
mkdir -p frontend/src/utils
touch frontend/src/utils/apiClient.js
touch frontend/src/utils/csvUtils.js

# Componentes reutilizables de reportes
mkdir -p frontend/src/components
touch frontend/src/components/FilterPanel.jsx
touch frontend/src/components/ReportTable.jsx
touch frontend/src/components/ExportButton.jsx

# Features (CRU Ds) divididos por dominio
mkdir -p frontend/src/features/materiales
touch frontend/src/features/materiales/MaterialCard.jsx
touch frontend/src/features/materiales/MaterialList.jsx
touch frontend/src/features/materiales/MaterialForm.jsx
touch frontend/src/features/materiales/MaterialListPage.jsx
touch frontend/src/features/materiales/MaterialDetailPage.jsx
touch frontend/src/features/materiales/MaterialFormPage.jsx

mkdir -p frontend/src/features/prestamos
touch frontend/src/features/prestamos/PrestamoCard.jsx
touch frontend/src/features/prestamos/PrestamoList.jsx
touch frontend/src/features/prestamos/PrestamoForm.jsx
touch frontend/src/features/prestamos/PrestamoListPage.jsx
touch frontend/src/features/prestamos/PrestamoFormPage.jsx

mkdir -p frontend/src/features/usuarios
touch frontend/src/features/usuarios/UsuarioCard.jsx
touch frontend/src/features/usuarios/UsuarioList.jsx
touch frontend/src/features/usuarios/UsuarioForm.jsx
touch frontend/src/features/usuarios/UsuarioListPage.jsx
touch frontend/src/features/usuarios/UsuarioFormPage.jsx

# Servicios API y mocks
mkdir -p frontend/src/services/api
touch frontend/src/services/api/materialesApi.js
touch frontend/src/services/api/prestamosApi.js
touch frontend/src/services/api/usuariosApi.js
touch frontend/src/services/api/reportesApi.js

mkdir -p frontend/src/services/mock
touch frontend/src/services/mock/materialesMock.js
touch frontend/src/services/mock/prestamosMock.js
touch frontend/src/services/mock/usuariosMock.js

# Rutas y punto de arranque
touch frontend/src/App.jsx
touch frontend/src/index.jsx
touch frontend/src/routes.jsx

echo "Estructura mínima (sin autenticación ni extras) de Proyecto4 creada."
