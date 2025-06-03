## Base URL

```
http://<HOST>:<PORT>/api
```

dependiendo de donde corra el  backend, que quede tipo:  `localhost:8000`,  `http://localhost:8000/api`.

---

## 1. CRUD  Materiales

### 1.1. (GET /materiales)

- **Ruta:**
    
    ```
    GET /api/materiales
    ```
    
- **Query Params (opcionales):**
    
    - `page` (integer, mínimo 1; por defecto 1)
        
    - `per_page` (integer, mínimo 1; por defecto 20)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "total_items": 1000,
      "total_pages": 50,
      "current_page": 1,
      "per_page": 20,
      "items": [
        {
          "id": 21,
          "titulo": "La ciudad y los perros",
          "autor": "Mario Vargas Llosa",
          "categoria": "Novela",
          "cantidad_total": 5,
          "cantidad_disponible": 3,
          "fecha_publicacion": "1962-03-12",
          "ubicacion": "Estante A3"
        },
        {
          "id": 22,
          "titulo": "Rayuela",
          "autor": "Julio Cortázar",
          "categoria": "Ficción",
          "cantidad_total": 4,
          "cantidad_disponible": 2,
          "fecha_publicacion": "1963-06-28",
          "ubicacion": "Estante B1"
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si `page < 1` o `per_page < 1`:
        
        ```json
        { "detail": "Parámetro inválido: page y per_page deben ser ≥ 1" }
        ```
        

---

### 1.2. Obtener Detalle de un Material (GET /materiales/{id})

- **Ruta:**
    
    ```
    GET /api/materiales/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del material)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 21,
      "titulo": "La ciudad y los perros",
      "autor": "Mario Vargas Llosa",
      "categoria": "Novela",
      "cantidad_total": 5,
      "cantidad_disponible": 3,
      "fecha_publicacion": "1962-03-12",
      "descripcion": "Primera novela destacada de Vargas Llosa.",
      "ubicacion": "Estante A3"
    }
    ```
    
- **Errores :**
    
    - `404 Not Found` si no existe material con ese `id`:
        
        ```json
        { "detail": "Material no encontrado" }
        ```
        

---

### 1.3. Crear   Material (POST /materiales)

- **Ruta:**
    
    ```
    POST /api/materiales
    ```
    
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio):**
    
    ```json
    {
      "titulo": "Don Quijote de la Mancha",
      "autor_id": 1,
      "categoria_id": 3,
      "cantidad_total": 7,
      "fecha_publicacion": "1605-01-16",
      "descripcion": "Clásico de la literatura española.",
      "ubicacion": "Estante C2"
    }
    ```
    
    - `titulo` (string, requerido, máximo 200 caracteres)
        
    - `autor_id` (integer, requerido; debe existir en `authors`)
        
    - `categoria_id` (integer, requerido; debe existir en `categories`)
        
    - `cantidad_total` (integer, requerido; ≥ 1)
        
    - `fecha_publicacion` (string `YYYY-MM-DD`, requerido)
        
    - `descripcion` (string, opcional)
        
    - `ubicacion` (string, requerido)
        
- **Respuesta JSON (201 Created):**
    
    ```json
    {
      "id": 101,
      "titulo": "Don Quijote de la Mancha",
      "autor_id": 1,
      "categoria_id": 3,
      "cantidad_total": 7,
      "cantidad_disponible": 7,
      "fecha_publicacion": "1605-01-16",
      "descripcion": "Clásico de la literatura española.",
      "ubicacion": "Estante C2"
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si falta campo obligatorio o viola restricción (p.ej. `cantidad_total < 1` o `titulo` demasiado largo):
        
        ```json
        { "detail": "cantidad_total debe ser ≥ 1" }
        ```
        
    - `404 Not Found` si `autor_id` o `categoria_id` no existen:
        
        ```json
        { "detail": "Autor no existe" }
        ```
        

---

### 1.4. Actualizar  (PUT /materiales/{id})

- **Ruta:**
    
    ```
    PUT /api/materiales/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del material a actualizar)
        
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio):**
    
    - Puede incluir cualquiera de estos campos (al menos uno debe estar presente):
        
        ```json
        {
          "titulo": "Nuevo Título",
          "autor_id": 2,
          "categoria_id": 4,
          "cantidad_total": 8,
          "fecha_publicacion": "1962-03-12",
          "descripcion": "Descripción actualizada",
          "ubicacion": "Estante D4"
        }
        ```
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 21,
      "titulo": "La ciudad y los perros",
      "autor_id": 7,
      "categoria_id": 4,
      "cantidad_total": 8,
      "cantidad_disponible": 5,        
      "fecha_publicacion": "1962-03-12",
      "descripcion": "Primera novela destacada de Vargas Llosa.",
      "ubicacion": "Estante D4"
    }
    ```
    
- **Errores posibles:**
    
    - `400 Bad Request` si JSON inválido o viola restricciones:
        
        ```json
        { "detail": "cantidad_total debe ser ≥ 1" }
        ```
        
    - `404 Not Found` si no existe material con ese `id`:
        
        ```json
        { "detail": "Material no encontrado" }
        ```
        

---

### 1.5. Eliminar  Material (DELETE /materiales/{id})

- **Ruta:**
    
    ```
    DELETE /api/materiales/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del material a eliminar)
        
- **Respuesta exitosa:**
    
    - **204 No Content** (sin cuerpo)
        
- **Errores :**
    
    - `404 Not Found` si no existe material con ese `id`:
        
        ```json
        { "detail": "Material no encontrado" }
        ```
        

---

## 2. CRUD de Usuarios

### 2.1. Listar Usuarios (GET /usuarios)

- **Ruta:**
    
    ```
    GET /api/usuarios
    ```
    
- **Query Params (opcionales):**
    
    - `page` (integer, mínimo 1; por defecto 1)
        
    - `per_page` (integer, mínimo 1; por defecto 20)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "total_items": 250,
      "total_pages": 13,
      "current_page": 1,
      "per_page": 20,
      "items": [
        {
          "id": 1,
          "nombre": "María López",
          "email": "maria.lopez@example.com",
          "rol": "estudiante",
          "fecha_registro": "2024-09-15"
        },
        {
          "id": 2,
          "nombre": "Juan Pérez",
          "email": "juan.perez@example.com",
          "rol": "bibliotecario",
          "fecha_registro": "2024-01-10"
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si `page < 1` o `per_page < 1`.
        

---

### 2.2. Obtener  Usuario (GET /usuarios/{id})

- **Ruta:**
    
    ```
    GET /api/usuarios/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del usuario)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 1,
      "nombre": "María López",
      "email": "maria.lopez@example.com",
      "rol": "estudiante",
      "fecha_registro": "2024-09-15",
      "telefono": "555-1234"
    }
    ```
    
- **Errores :**
    
    - `404 Not Found` si no existe usuario con ese `id`:
        
        ```json
        { "detail": "Usuario no encontrado" }
        ```
        

---

### 2.3.  (POST /usuarios)

- **Ruta:**
    
    ```
    POST /api/usuarios
    ```
    
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio):**
    
    ```json
    {
      "nombre": "Carlos Mendoza",
      "email": "carlos.mendoza@example.com",
      "rol": "estudiante",
      "telefono": "555-9876"
    }
    ```
    
    - `nombre` (string, requerido)
        
    - `email` (string, requerido; formato válido; único en BD)
        
    - `rol` (string, requerido; enum: `"estudiante"` o `"bibliotecario"`)
        
    - `telefono` (string, opcional)
        
- **Respuesta JSON (201 Created):**
    
    ```json
    {
      "id": 251,
      "nombre": "Carlos Mendoza",
      "email": "carlos.mendoza@example.com",
      "rol": "estudiante",
      "fecha_registro": "2025-06-01",
      "telefono": "555-9876"
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si falta campo obligatorio o `email` duplicado:
        
        ```json
        { "detail": "Email ya registrado" }
        ```
        

---

### 2.4.   (PUT /usuarios/{id})

- **Ruta:**
    
    ```
    PUT /api/usuarios/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del usuario a actualizar)
        
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio; al menos un campo):**
    
    ```json
    {
      "nombre": "Nuevo Nombre",
      "email": "nuevo.email@example.com",
      "rol": "bibliotecario",
      "telefono": "555-0000"
    }
    ```
    
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 1,
      "nombre": "María López",
      "email": "maria.lopez@example.com",
      "rol": "estudiante",
      "fecha_registro": "2024-09-15",
      "telefono": "555-4321"
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si JSON inválido o `email` duplicado (en otro usuario):
        
        ```json
        { "detail": "Email ya registrado" }
        ```
        
    - `404 Not Found` si no existe usuario con ese `id`:
        
        ```json
        { "detail": "Usuario no encontrado" }
        ```
        

---

### 2.5.  (DELETE /usuarios/{id})

- **Ruta:**
    
    ```
    DELETE /api/usuarios/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del usuario a eliminar)
        
- **Respuesta exitosa:**
    
    - **204 No Content** (sin cuerpo)
        
- **Errores posibles:**
    
    - `404 Not Found` si no existe usuario con ese `id`:
        
        ```json
        { "detail": "Usuario no encontrado" }
        ```
        

---

## 3. CRUD de Préstamos

### 3.1.  (GET /prestamos)

- **Ruta:**
    
    ```
    GET /api/prestamos
    ```
    
- **Query Params (opcionales):**
    
    - `page` (integer, mínimo 1; por defecto 1)
        
    - `per_page` (integer, mínimo 1; por defecto 20)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "total_items": 500,
      "total_pages": 25,
      "current_page": 1,
      "per_page": 20,
      "items": [
        {
          "id": 1,
          "usuario_id": 3,
          "usuario_nombre": "María López",
          "material_id": 21,
          "material_titulo": "La ciudad y los perros",
          "fecha_prestamo": "2025-05-20",
          "fecha_devolucion": "2025-05-27",
          "estado": "pendiente",
          "multa": 0
        },
        {
          "id": 2,
          "usuario_id": 5,
          "usuario_nombre": "Carlos Mendoza",
          "material_id": 22,
          "material_titulo": "Rayuela",
          "fecha_prestamo": "2025-05-18",
          "fecha_devolucion": "2025-05-25",
          "estado": "devuelto",
          "multa": 0
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Errores :**
    
    - `400 Bad Request` si `page < 1` o `per_page < 1`.
        

---

### 3.2.  (GET /prestamos/{id})

- **Ruta:**
    
    ```
    GET /api/prestamos/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del préstamo)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 1,
      "usuario_id": 3,
      "usuario_nombre": "María López",
      "material_id": 21,
      "material_titulo": "La ciudad y los perros",
      "fecha_prestamo": "2025-05-20",
      "fecha_devolucion": "2025-05-27",
      "estado": "pendiente",
      "multa": 0,
      "notas": "Solicitado en sala de lectura"
    }
    ```
    
- **Errores :**
    
    - `404 Not Found` si no existe préstamo con ese `id`:
        
        ```json
        { "detail": "Préstamo no encontrado" }
        ```
        

---

### 3.3. (POST /prestamos)

- **Ruta:**
    
    ```
    POST /api/prestamos
    ```
    
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio):**
    
    ```json
    {
      "usuario_id": 3,
      "material_id": 21,
      "fecha_prestamo": "2025-06-01",
      "fecha_devolucion": "2025-06-08",
      "notas": "Rápido"
    }
    ```
    
    - `usuario_id` (integer, requerido; debe existir en `users`)
        
    - `material_id` (integer, requerido; debe existir en `materials`)
        
    - `fecha_prestamo` (string `YYYY-MM-DD`, requerido)
        
    - `fecha_devolucion` (string `YYYY-MM-DD`, requerido; ≥ `fecha_prestamo`)
        
    - `notas` (string, opcional)
        
- **Respuesta JSON (201 Created):**
    
    ```json
    {
      "id": 501,
      "usuario_id": 3,
      "usuario_nombre": "María López",
      "material_id": 21,
      "material_titulo": "La ciudad y los perros",
      "fecha_prestamo": "2025-06-01",
      "fecha_devolucion": "2025-06-08",
      "estado": "pendiente",
      "multa": 0,
      "notas": "Rápido"
    }
    ```
    
- **Erroresposibles:**
    
    - `400 Bad Request` si `fecha_devolucion < fecha_prestamo` o `cantidad_disponible = 0`:
        
        ```json
        { "detail": "Material no disponible para préstamo" }
        ```
        
    - `404 Not Found` si `usuario_id` o `material_id` no existen:
        
        ```json
        { "detail": "Recurso referenciado no existe" }
        ```
        

---

### 3.4.  (PUT /prestamos/{id})

- **Ruta:**
    
    ```
    PUT /api/prestamos/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del préstamo)
        
- **Headers:**
    
    ```
    Content-Type: application/json
    ```
    
- **Body JSON (obligatorio; al menos un campo):**
    
    ```json
    {
      "fecha_devolucion": "2025-06-09",
      "estado": "devuelto",
      "notas": "Entregado con retraso"
    }
    ```
    
    - `fecha_devolucion` (string `YYYY-MM-DD`, opcional; validar ≥ fecha_prestamo)
        
    - `estado` (string opcional; enum: `"pendiente"`, `"devuelto"`, `"atrasado"`)
        
    - `notas` (string, opcional)
        
- **Respuesta JSON (200 OK):**
    
    ```json
    {
      "id": 501,
      "usuario_id": 3,
      "usuario_nombre": "María López",
      "material_id": 21,
      "material_titulo": "La ciudad y los perros",
      "fecha_prestamo": "2025-06-01",
      "fecha_devolucion": "2025-06-09",
      "estado": "devuelto",
      "multa": 0,
      "notas": "Entregado con retraso"
    }
    ```
    
- **Errores:**
    
    - `400 Bad Request` si intenta cambiar de “devuelto” a “pendiente” o si `fecha_devolucion < fecha_prestamo`:
        
        ```json
        { "detail": "Actualización inválida" }
        ```
        
    - `404 Not Found` si no existe préstamo con ese `id`:
        
        ```json
        { "detail": "Préstamo no encontrado" }
        ```
        

---

### 3.5.  (DELETE /prestamos/{id})

- **Ruta:**
    
    ```
    DELETE /api/prestamos/{id}
    ```
    
- **Path Param (obligatorio):**
    
    - `id` (integer; ID del préstamo)
        
- **Respuesta exitosa:**
    
    - **204 No Content** (sin cuerpo)
        
- **Errores posibles:**
    
    - `404 Not Found` si no existe préstamo con ese `id`:
        
        ```json
        { "detail": "Préstamo no encontrado" }
        ```
        

---

## 4. Reportes y Exportación a CSV

### 4.1. Reporte de Materiales (GET /reportes/materiales)

- **Ruta:**
    
    ```
    GET /api/reportes/materiales
    ```
    
- **Query Params (filtros, todos opcionales):**
    
    1. `autor_id` (integer)
        
    2. `categoria_id` (integer)
        
    3. `fecha_publicacion_inicio` (string `YYYY-MM-DD`)
        
    4. `fecha_publicacion_fin` (string `YYYY-MM-DD`)
        
    5. `cantidad_min` (integer, ≥ 0)
        
    6. `cantidad_max` (integer, ≥ 0)
        
    7. `export` (string; si `"csv"` devuelve CSV, sino JSON paginado)
        
    8. `page` (integer, para JSON; mínimo 1; por defecto 1)
        
    9. `per_page` (integer, para JSON; mínimo 1; por defecto 50)
        
- **Comportamiento:**
    
    - Si `export=csv` se devuelve un archivo CSV con todos los registros que cumplan filtros (sin paginar).
        
    - Si no, se devuelve JSON paginado.
        
- **Respuesta JSON (200 OK) si no es CSV:**
    
    ```json
    {
      "total_items": 120,
      "total_pages": 3,
      "current_page": 1,
      "per_page": 50,
      "items": [
        {
          "id": 45,
          "titulo": "1984",
          "autor": "George Orwell",
          "categoria": "Ficción",
          "cantidad_total": 10,
          "cantidad_disponible": 4,
          "fecha_publicacion": "1949-06-08"
        },
        {
          "id": 46,
          "titulo": "Rebelión en la granja",
          "autor": "George Orwell",
          "categoria": "Ficción",
          "cantidad_total": 8,
          "cantidad_disponible": 2,
          "fecha_publicacion": "1945-08-17"
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Respuesta CSV (200 OK) si `export=csv`:**
    
    - **Headers:**
        
        ```
        Content-Type: text/csv
        Content-Disposition: attachment; filename="reporte_materiales.csv"
        ```
        
    - **Cuerpo (cada línea termina con `\r\n`):**
        
        ```
        id,titulo,autor,categoria,cantidad_total,cantidad_disponible,fecha_publicacion\r\n
        45,"1984","George Orwell","Ficción",10,4,"1949-06-08"\r\n
        46,"Rebelión en la granja","George Orwell","Ficción",8,2,"1945-08-17"\r\n
        …
        ```
        
- **Errores :**
    
    - `400 Bad Request` si filtros mal formados (p.ej. fecha_inicio > fecha_fin):
        
        ```json
        { "detail": "Filtro inválido" }
        ```
        

---

### 4.2. Reporte prestamos (GET /reportes/prestamos)

- **Ruta:**
    
    ```
    GET /api/reportes/prestamos
    ```
    
- **Query Params (filtros, todos opcionales):**
    
    1. `usuario_id` (integer)
        
    2. `material_id` (integer)
        
    3. `fecha_prestamo_inicio` (string `YYYY-MM-DD`)
        
    4. `fecha_prestamo_fin` (string `YYYY-MM-DD`)
        
    5. `estado` (string; enum: `"pendiente"`, `"devuelto"`, `"atrasado"`)
        
    6. `multa_min` (number, ≥ 0)
        
    7. `multa_max` (number, ≥ 0)
        
    8. `export` (string; si `"csv"`, devuelve CSV)
        
    9. `page` (integer, para JSON; mínimo 1; por defecto 1)
        
    10. `per_page` (integer, para JSON; mínimo 1; por defecto 50)
        
- **Comportamiento:**
    
    - Si `export=csv`, retorna CSV de todos los préstamos que cumplan filtros.
        
    - Si no, retorna JSON paginado.
        
- **Respuesta JSON (200 OK) si no es CSV:**
    
    ```json
    {
      "total_items": 80,
      "total_pages": 2,
      "current_page": 1,
      "per_page": 50,
      "items": [
        {
          "id": 10,
          "usuario_id": 3,
          "usuario_nombre": "María López",
          "material_id": 45,
          "material_titulo": "1984",
          "fecha_prestamo": "2025-02-10",
          "fecha_devolucion": "2025-02-17",
          "estado": "devuelto",
          "multa": 0
        },
        {
          "id": 11,
          "usuario_id": 3,
          "usuario_nombre": "María López",
          "material_id": 46,
          "material_titulo": "Rebelión en la granja",
          "fecha_prestamo": "2025-03-05",
          "fecha_devolucion": "2025-03-12",
          "estado": "pendiente",
          "multa": 0
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Respuesta CSV (200 OK) si `export=csv`:**
    
    - **Headers:**
        
        ```
        Content-Type: text/csv
        Content-Disposition: attachment; filename="reporte_prestamos.csv"
        ```
        
    - **Cuerpo (cada línea termina con `\r\n`):**
        
        ```
        id,usuario_id,usuario_nombre,material_id,material_titulo,fecha_prestamo,fecha_devolucion,estado,multa\r\n
        10,3,"María López",45,"1984","2025-02-10","2025-02-17","devuelto",0\r\n
        11,3,"María López",46,"Rebelión en la granja","2025-03-05","2025-03-12","pendiente",0\r\n
        …
        ```
        
- **Errores posibles:**
    
    - `400 Bad Request` si filtros inválidos (p.ej. `fecha_inicio > fecha_fin`):
        
        ```json
        { "detail": "Filtro inválido" }
        ```
        

---

### 4.3. (GET /reportes/general)

- **Ruta:**
    
    ```
    GET /api/reportes/general
    ```
    
- **Query Params (filtros, todos opcionales):**
    
    1. `usuario_id` (integer)
        
    2. `material_id` (integer)
        
    3. `fecha_evento_inicio` (string `YYYY-MM-DD`)
        
    4. `fecha_evento_fin` (string `YYYY-MM-DD`)
        
    5. `tipo_evento` (string; enum: `"prestamo"`, `"devolucion"`, `"reserva"`, `"pago_multa"`)
        
    6. `export` (string; si `"csv"`, devuelve CSV)
        
    7. `page` (integer, para JSON; mínimo 1; por defecto 1)
        
    8. `per_page` (integer, para JSON; mínimo 1; por defecto 50)
        
- **Comportamiento:**
    
    - Si `export=csv`, retorna CSV completo.
        
    - Si no, retorna JSON paginado.
        
- **Respuesta JSON (200 OK) si no es CSV:**
    
    ```json
    {
      "total_items": 150,
      "total_pages": 3,
      "current_page": 1,
      "per_page": 50,
      "items": [
        {
          "evento_id": 1001,
          "usuario_id": 3,
          "usuario_nombre": "María López",
          "material_id": 45,
          "material_titulo": "1984",
          "tipo_evento": "prestamo",
          "fecha_evento": "2025-05-20",
          "notas": "Préstamo realizado en línea"
        },
        {
          "evento_id": 1002,
          "usuario_id": 3,
          "usuario_nombre": "María López",
          "material_id": 45,
          "material_titulo": "1984",
          "tipo_evento": "devolucion",
          "fecha_evento": "2025-05-27",
          "notas": "Devolución puntual"
        }
        // …hasta per_page objetos…
      ]
    }
    ```
    
- **Respuesta CSV (200 OK) si `export=csv`:**
    
    - **Headers:**
        
        ```
        Content-Type: text/csv
        Content-Disposition: attachment; filename="reporte_general.csv"
        ```
        
    - **Cuerpo (cada línea termina con `\r\n`):**
        
        ```
        evento_id,usuario_id,usuario_nombre,material_id,material_titulo,tipo_evento,fecha_evento,notas\r\n
        1001,3,"María López",45,"1984","prestamo","2025-05-20","Préstamo realizado en línea"\r\n
        1002,3,"María López",45,"1984","devolucion","2025-05-27","Devolución puntual"\r\n
        …
        ```
        
- **Errores posibles:**
    
    - `400 Bad Request` si filtros inválidos (p.ej. `fecha_inicio > fecha_fin`):
        
        ```json
        { "detail": "Filtro inválido" }
        ```
        

---

## 5.  Validación y Errores

- **con todos los endpoints que reciban JSON en el body (POST/PUT):**
    
    - si falta un campo obligatorio o el tipo es incorrecto →  
        **400 Bad Request** con JSON:
        
        ```json
        { "detail": "Explicación breve del error" }
        ```
        
    - Si intenta crear o actualizar referencias (`autor_id`, `categoria_id`, `usuario_id`, `material_id`) que no existan →  
        **404 Not Found**:
        
        ```json
        { "detail": "Recurso referenciado no existe" }
        ```
        
    - Si viola una restricción de base de datos (por ejemplo, `cantidad_total < 1` o un `CHECK` que impide `fecha_devolucion < fecha_prestamo`) →  
        **400 Bad Request** con JSON de detalle.
        
- **Para todos los endpoints que usan `{id}` en la ruta:**
    
    - Si no existe ese `{id}` →  
        **404 Not Found** con JSON:
        
        ```json
        { "detail": "Recurso no encontrado" }
        ```
        
- **Para las peticiones de CSV (`?export=csv`):**
    
    - Si la consulta no arroja filas, aún devuelve el CSV con solo la cabecera y nada más, con código **200 OK**.
        

---

## 6. las tablas/ntidades

como son 20, las que vamos a manejar son: 

1. **authors** (`id`, `nombre`)
    
2. **categories** (`id`, `nombre`)
    
3. **materials**
    
    - Campos: `id`, `titulo`, `autor_id` (FK→authors), `categoria_id` (FK→categories),  
        `cantidad_total`, `cantidad_disponible`, `fecha_publicacion`, `descripcion`, `ubicacion`
        
4. **material_copies** (`id`, `material_id` (FK→materials), `estado`, `fecha_adquisicion`)
    
5. **locations** (`id`, `nombre`)
    
6. **material_location** (`id`, `material_copy_id` (FK→material_copies), `location_id` (FK→locations), `fecha_movimiento`)
    
7. **tags** (`id`, `nombre`)
    
8. **material_tag** (`material_id` (FK→materials), `tag_id` (FK→tags))
    
9. **publishers** (`id`, `nombre`, `direccion`)
    
10. **publisher_material** (`publisher_id` (FK→publishers), `material_id` (FK→materials))
    
11. **users** (`id`, `nombre`, `email`, `rol_id` (FK→roles), `fecha_registro`, `telefono`)
    
12. **roles** (`id`, `nombre_rol`)
    
13. **loans**
    
    - Campos: `id`, `usuario_id` (FK→users), `material_id` (FK→materials),  
        `fecha_prestamo`, `fecha_devolucion`, `estado`, `multa`, `notas`
        
14. **loan_details** (`id`, `loan_id` (FK→loans), `detalle`, `fecha`)
    
15. **fines** (`id`, `loan_id` (FK→loans), `monto`, `fecha_pago`)
    
16. **reservations** (`id`, `usuario_id` (FK→users), `material_id` (FK→materials), `fecha_reserva`, `fecha_expiracion`, `estado`)
    
17. **reservation_details** (`id`, `reservation_id` (FK→reservations), `fecha_cambio`, `tipo_cambio`)
    
18. **author_material** (`author_id` (FK→authors), `material_id` (FK→materials))
    
19. **reservation_history** (historial de reservas: campos similares a `reservations` con timestamp)
    
20. **events** (`evento_id`, `usuario_id` (FK→users), `material_id` (FK→materials), `tipo_evento`, `fecha_evento`, `notas`)
    

> **Nota:**
> 
> - las tablas de cruce (`*_tag`, `*_material`, etc.) cumplen los requisitos de relaciones N:M.
>     
> - las tablas de “copia” e “historial” (`material_copies`, `loan_details`, `reservation_details`, `reservation_history`, etc.) aportan atributos multivaluados y derivados.
>     
> - Cada modelo SQLAlchemy en `backend/src/models/*.py`
>     
> - hay que ponerle `CHECK`, `NOT NULL`, `UNIQUE` y tipos personalizados (por ejemplo, enum `estado` en préstamos).
>     

---

## 7. resumido: 

1. **CORS configurado** para recibir peticiones desde el frontend (`http://localhost:5173`).
    
2. **Prefijo `/api`** en todos los routers.
    
3.  las 20 tablas de arriba, con sus relaciones y restricciones, implementadas en `schema.sql` y modelos SQLAlchemy.
    
4. **Rutas y validaciones** exactamente según el contrato de cada sección (materiales, usuarios, préstamos, reportes).
    
5. **Paginación** uniforme (`page` + `per_page`) en listados.
    
6. **Formatos JSON** y **status codes** (200, 201, 204, 400, 404) tal como se especifica.
    
7. **Exportación CSV** en endpoints de reportes cuando `?export=csv` esté presente, con saltos `\r\n` y `Content-Disposition`.
    