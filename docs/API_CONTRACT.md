---

## Base URL

```
http://<HOST>:<PORT>/api
```

---

## 1. CRUD de Materiales

### 1.1. Listar Materiales (paginado)

* **Ruta:**

  ```
  GET /materiales
  ```
* **Query Params (opcionales):**

  * `page` (integer, página actual, valor mínimo 1; por defecto 1)
  * `per_page` (integer, ítems por página, valor mínimo 1; por defecto 20)
* **Ejemplo de llamada:**

  ```
  GET /api/materiales?page=2&per_page=20
  ```
* **Respuesta (200 OK, JSON):**

  ```json
  {
    "total_items": 1000,
    "total_pages": 50,
    "current_page": 2,
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
      // … hasta 20 objetos …
    ]
  }
  ```

---

### 1.2. Obtener detalle de un Material

* **Ruta:**

  ```
  GET /materiales/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID único del material)
* **Ejemplo de llamada:**

  ```
  GET /api/materiales/21
  ```
* **Respuesta (200 OK, JSON):**

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
* **Errores posibles:**

  * `404 Not Found` si no existe un material con ese `id`.

    ```json
    { "detail": "Material no encontrado" }
    ```

---

### 1.3. Crear un nuevo Material

* **Ruta:**

  ```
  POST /materiales
  ```
* **Body (JSON, obligatorio):**

  ```json
  {
    "titulo": "Nombre del libro",
    "autor_id": 5,
    "categoria_id": 2,
    "cantidad_total": 10,
    "fecha_publicacion": "YYYY-MM-DD",
    "descripcion": "Descripción opcional",
    "ubicacion": "Estante X"
  }
  ```

  * `titulo` (string, required, máximo 200 caracteres)
  * `autor_id` (integer, required; referencia a tabla `author`)
  * `categoria_id` (integer, required; referencia a tabla `category`)
  * `cantidad_total` (integer, required, ≥ 1)
  * `fecha_publicacion` (string en formato ISO `YYYY-MM-DD`, required)
  * `descripcion` (string, opcional)
  * `ubicacion` (string, required; por ejemplo “Estante A3”)
* **Ejemplo de llamada:**

  ```
  POST /api/materiales
  Content-Type: application/json

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
* **Respuesta (201 Created, JSON):**

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
* **Errores posibles:**

  * `400 Bad Request` si falta un campo obligatorio o viola alguna restricción (p. ej., `cantidad_total < 1` o `titulo` demasiado largo).

    ```json
    { "detail": "cantidad_total debe ser ≥ 1" }
    ```
  * `404 Not Found` si `autor_id` o `categoria_id` no existen.

    ```json
    { "detail": "Autor no existe" }
    ```

---

### 1.4. Actualizar un Material existente

* **Ruta:**

  ```
  PUT /materiales/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del material a actualizar)
* **Body (JSON, obligatorio):**

  * Puede incluir **cualquiera** de los campos de creación, para modificar sólo esos (all fields optional excepto que al menos uno debe existir).

  ```json
  {
    "titulo": "Nuevo Título",
    "cantidad_total": 12,
    "descripcion": "Descripción actualizada"
  }
  ```
* **Ejemplo de llamada:**

  ```
  PUT /api/materiales/21
  Content-Type: application/json

  {
    "cantidad_total": 8,
    "ubicacion": "Estante D4"
  }
  ```
* **Respuesta (200 OK, JSON):**

  ```json
  {
    "id": 21,
    "titulo": "La ciudad y los perros",
    "autor_id": 7,
    "categoria_id": 4,
    "cantidad_total": 8,
    "cantidad_disponible": 5,        // ajustada si hubo préstamos
    "fecha_publicacion": "1962-03-12",
    "descripcion": "Primera novela destacada de Vargas Llosa.",
    "ubicacion": "Estante D4"
  }
  ```
* **Errores posibles:**

  * `400 Bad Request` si el JSON está mal formado o viola restricciones.
  * `404 Not Found` si no existe el material con ese `id`.

---

### 1.5. Eliminar (o desactivar) un Material

* **Ruta:**

  ```
  DELETE /materiales/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del material a eliminar)
* **Ejemplo de llamada:**

  ```
  DELETE /api/materiales/21
  ```
* **Respuesta exitosa (204 No Content):**

  * Sin cuerpo.
* **Errores posibles:**

  * `404 Not Found` si no existe el material con ese `id`.

---

## 2. CRUD de Usuarios

### 2.1. Listar Usuarios (paginado)

* **Ruta:**

  ```
  GET /usuarios
  ```
* **Query Params (opcionales):**

  * `page` (integer, página, por defecto 1)
  * `per_page` (integer, registros por página, por defecto 20)
* **Ejemplo de llamada:**

  ```
  GET /api/usuarios?page=1&per_page=20
  ```
* **Respuesta (200 OK, JSON):**

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
      // … hasta 20 objetos …
    ]
  }
  ```

---

### 2.2. Obtener detalle de un Usuario

* **Ruta:**

  ```
  GET /usuarios/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del usuario)
* **Ejemplo de llamada:**

  ```
  GET /api/usuarios/1
  ```
* **Respuesta (200 OK, JSON):**

  ```json
  {
    "id": 1,
    "nombre": "María López",
    "email": "maria.lopez@example.com",
    "rol": "estudiante",
    "fecha_registro": "2024-09-15",
    "telefono": "555-1234"        // campo opcional adicional
  }
  ```
* **Errores posibles:**

  * `404 Not Found` si no existe el usuario.

---

### 2.3. Crear un nuevo Usuario

* **Ruta:**

  ```
  POST /usuarios
  ```
* **Body (JSON, obligatorio):**

  ```json
  {
    "nombre": "Nombre Completo",
    "email": "correo@ejemplo.com",
    "rol": "estudiante",         // enum: ["estudiante", "bibliotecario"]
    "telefono": "555-6789"       // opcional
  }
  ```
* **Ejemplo de llamada:**

  ```
  POST /api/usuarios
  Content-Type: application/json

  {
    "nombre": "Carlos Mendoza",
    "email": "carlos.mendoza@example.com",
    "rol": "estudiante",
    "telefono": "555-9876"
  }
  ```
* **Respuesta (201 Created, JSON):**

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
* **Errores posibles:**

  * `400 Bad Request` si falta un campo obligatorio o `email` ya existe (UNIQUE).

    ```json
    { "detail": "Email ya registrado" }
    ```

---

### 2.4. Actualizar un Usuario existente

* **Ruta:**

  ```
  PUT /usuarios/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del usuario)
* **Body (JSON, obligatorio):**

  * Puede incluir cualquiera de los siguientes campos:

    ```json
    {
      "nombre": "Nuevo Nombre",
      "email": "nuevo.email@example.com",
      "rol": "bibliotecario",
      "telefono": "555-0000"
    }
    ```
* **Ejemplo de llamada:**

  ```
  PUT /api/usuarios/1
  Content-Type: application/json

  {
    "telefono": "555-4321"
  }
  ```
* **Respuesta (200 OK, JSON):**

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
* **Errores posibles:**

  * `400 Bad Request` si el JSON es inválido o `email` duplicado.
  * `404 Not Found` si no existe el usuario con ese `id`.

---

### 2.5. Eliminar (o desactivar) un Usuario

* **Ruta:**

  ```
  DELETE /usuarios/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del usuario)
* **Ejemplo de llamada:**

  ```
  DELETE /api/usuarios/1
  ```
* **Respuesta exitosa (204 No Content):**

  * Sin cuerpo.
* **Errores posibles:**

  * `404 Not Found` si no existe el usuario.

---

## 3. CRUD de Préstamos

### 3.1. Listar Préstamos (paginado)

* **Ruta:**

  ```
  GET /prestamos
  ```
* **Query Params (opcionales):**

  * `page` (integer, página, default 1)
  * `per_page` (integer, registros por página, default 20)
* **Ejemplo de llamada:**

  ```
  GET /api/prestamos?page=1&per_page=20
  ```
* **Respuesta (200 OK, JSON):**

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
        "estado": "pendiente",        // enum: ["pendiente", "devuelto", "atrasado"]
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
      // … hasta 20 objetos …
    ]
  }
  ```

---

### 3.2. Obtener detalle de un Préstamo

* **Ruta:**

  ```
  GET /prestamos/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del préstamo)
* **Ejemplo de llamada:**

  ```
  GET /api/prestamos/1
  ```
* **Respuesta (200 OK, JSON):**

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
* **Errores posibles:**

  * `404 Not Found` si no existe ese préstamo.

---

### 3.3. Crear un nuevo Préstamo

* **Ruta:**

  ```
  POST /prestamos
  ```
* **Body (JSON, obligatorio):**

  ```json
  {
    "usuario_id": 3,
    "material_id": 21,
    "fecha_prestamo": "2025-06-01",
    "fecha_devolucion": "2025-06-08",
    "notas": "Sin notas adicionales"
  }
  ```

  * `usuario_id` (integer, ID de usuario existente)
  * `material_id` (integer, ID de material existente)
  * `fecha_prestamo` (string ISO `YYYY-MM-DD`, required)
  * `fecha_devolucion` (string ISO `YYYY-MM-DD`, required, ≥ `fecha_prestamo`)
  * `notas` (string, opcional)
* **Ejemplo de llamada:**

  ```
  POST /api/prestamos
  Content-Type: application/json

  {
    "usuario_id": 3,
    "material_id": 21,
    "fecha_prestamo": "2025-06-01",
    "fecha_devolucion": "2025-06-08",
    "notas": "Rápido"
  }
  ```
* **Respuesta (201 Created, JSON):**

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
* **Errores posibles:**

  * `400 Bad Request` si `fecha_devolucion` < `fecha_prestamo`, o stock de material = 0 (trigger/validación falló).

    ```json
    { "detail": "Material no disponible para préstamo" }
    ```
  * `404 Not Found` si `usuario_id` o `material_id` no existen.

---

### 3.4. Actualizar un Préstamo (p. ej., marcar como devuelto)

* **Ruta:**

  ```
  PUT /prestamos/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del préstamo)
* **Body (JSON, obligatorio):**

  * Puede incluir cualquiera de estos campos:

    ```json
    {
      "fecha_devolucion": "2025-06-09",  // para extender devolución
      "estado": "devuelto",               // enum: ["pendiente","devuelto","atrasado"]
      "notas": "Entregado con retraso"
    }
    ```
* **Ejemplo de llamada:**

  ```
  PUT /api/prestamos/501
  Content-Type: application/json

  {
    "estado": "devuelto"
  }
  ```
* **Respuesta (200 OK, JSON):**

  ```json
  {
    "id": 501,
    "usuario_id": 3,
    "usuario_nombre": "María López",
    "material_id": 21,
    "material_titulo": "La ciudad y los perros",
    "fecha_prestamo": "2025-06-01",
    "fecha_devolucion": "2025-06-08",
    "estado": "devuelto",
    "multa": 0,
    "notas": "Rápido"
  }
  ```
* **Errores posibles:**

  * `400 Bad Request` si la actualización viola reglas (por ejemplo, pasar de “devuelto” a “pendiente”).
  * `404 Not Found` si no existe ese préstamo.

---

### 3.5. Eliminar (o cancelar) un Préstamo

* **Ruta:**

  ```
  DELETE /prestamos/{id}
  ```
* **Path Param (obligatorio):**

  * `id` (integer, ID del préstamo)
* **Ejemplo de llamada:**

  ```
  DELETE /api/prestamos/501
  ```
* **Respuesta exitosa (204 No Content):**

  * Sin cuerpo.
* **Errores posibles:**

  * `404 Not Found` si no existe ese préstamo.

---

## 4. Reportes

> **Nota:** Todos los endpoints de reporte aceptan un parámetro opcional
>
> ```
> export=csv
> ```
>
> Si `export=csv`, la respuesta será un archivo CSV (media type `text/csv`). Si no, devuelve JSON.

---

### 4.1. Reporte de Materiales

* **Ruta:**

  ```
  GET /reportes/materiales
  ```
* **Query Params (filtros, todos opcionales):**

  1. `autor_id` (integer)
  2. `categoria_id` (integer)
  3. `fecha_publicacion_inicio` (string `YYYY-MM-DD`)
  4. `fecha_publicacion_fin` (string `YYYY-MM-DD`)
  5. `cantidad_min` (integer, ≥ 0)
  6. `cantidad_max` (integer, ≥ 0)
  7. `export` (string, opcional; si vale `"csv"` devuelve CSV)
  8. `page` (integer, para paginar JSON)
  9. `per_page` (integer, para paginar JSON)
* **Ejemplo de llamada (JSON):**

  ```
  GET /api/reportes/materiales?autor_id=5&categoria_id=2&fecha_publicacion_inicio=1950-01-01&fecha_publicacion_fin=2000-12-31&page=1&per_page=50
  ```
* **Ejemplo de respuesta (200 OK, JSON):**

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
      // … hasta 50 objetos …
    ]
  }
  ```
* **Ejemplo de llamada (CSV):**

  ```
  GET /api/reportes/materiales?autor_id=5&categoria_id=2&fecha_publicacion_inicio=1950-01-01&export=csv
  ```
* **Ejemplo de respuesta (200 OK, text/csv):**

  ```
  id,titulo,autor,categoria,cantidad_total,cantidad_disponible,fecha_publicacion
  45,"1984","George Orwell","Ficción",10,4,"1949-06-08"
  46,"Rebelión en la granja","George Orwell","Ficción",8,2,"1945-08-17"
  …
  ```

---

### 4.2. Reporte de Préstamos

* **Ruta:**

  ```
  GET /reportes/prestamos
  ```
* **Query Params (filtros, todos opcionales):**

  1. `usuario_id` (integer)
  2. `material_id` (integer)
  3. `fecha_prestamo_inicio` (string `YYYY-MM-DD`)
  4. `fecha_prestamo_fin` (string `YYYY-MM-DD`)
  5. `estado` (string, enum: `"pendiente"`, `"devuelto"`, `"atrasado"`)
  6. `multa_min` (number, ≥ 0)
  7. `multa_max` (number, ≥ 0)
  8. `export` (string; si `"csv"` devuelve CSV)
  9. `page` (integer, para JSON)
  10. `per_page` (integer, para JSON)
* **Ejemplo de llamada (JSON):**

  ```
  GET /api/reportes/prestamos?usuario_id=3&fecha_prestamo_inicio=2025-01-01&fecha_prestamo_fin=2025-05-31&page=1&per_page=50
  ```
* **Ejemplo de respuesta (200 OK, JSON):**

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
      // … hasta 50 objetos …
    ]
  }
  ```
* **Ejemplo de llamada (CSV):**

  ```
  GET /api/reportes/prestamos?usuario_id=3&export=csv
  ```
* **Ejemplo de respuesta (200 OK, text/csv):**

  ```
  id,usuario_id,usuario_nombre,material_id,material_titulo,fecha_prestamo,fecha_devolucion,estado,multa
  10,3,"María López",45,"1984","2025-02-10","2025-02-17","devuelto",0
  11,3,"María López",46,"Rebelión en la granja","2025-03-05","2025-03-12","pendiente",0
  …
  ```

---

### 4.3. Reporte General de Actividad

* **Ruta:**

  ```
  GET /reportes/general
  ```
* **Query Params (filtros, todos opcionales):**

  1. `usuario_id` (integer)
  2. `material_id` (integer)
  3. `fecha_evento_inicio` (string `YYYY-MM-DD`)
  4. `fecha_evento_fin` (string `YYYY-MM-DD`)
  5. `tipo_evento` (string, enum: `"prestamo"`, `"devolucion"`)
  6. `export` (string; si `"csv"` devuelve CSV)
  7. `page` (integer, para JSON)
  8. `per_page` (integer, para JSON)
* **Ejemplo de llamada (JSON):**

  ```
  GET /api/reportes/general?fecha_evento_inicio=2025-05-01&fecha_evento_fin=2025-05-31&page=1&per_page=50
  ```
* **Ejemplo de respuesta (200 OK, JSON):**

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
      // … hasta 50 objetos …
    ]
  }
  ```
* **Ejemplo de llamada (CSV):**

  ```
  GET /api/reportes/general?tipo_evento=prestamo&export=csv
  ```
* **Ejemplo de respuesta (200 OK, text/csv):**

  ```
  evento_id,usuario_id,usuario_nombre,material_id,material_titulo,tipo_evento,fecha_evento,notas
  1001,3,"María López",45,"1984","prestamo","2025-05-20","Préstamo realizado en línea"
  1003,5,"Carlos Mendoza",22,"Rayuela","prestamo","2025-05-22","Solicitado en sala"
  …
  ```

---

## 5. Validaciones y Errores Generales

* **Para todos los endpoints que reciben JSON en el body (POST/PUT):**

  * Si falta un campo obligatorio o el tipo es incorrecto → `400 Bad Request` con JSON:

    ```json
    { "detail": "Explicación breve del error" }
    ```
  * Si intenta crear o actualizar con referencias (`autor_id`, `categoria_id`, `usuario_id`, `material_id`) que no existan → `404 Not Found`:

    ```json
    { "detail": "Recurso referenciado no existe" }
    ```
  * Si viola una restricción de base de datos (p. ej., `cantidad_total < 1`, o `CHECK` que impide `fecha_devolucion < fecha_prestamo`) → `400 Bad Request` con detalle.

* **Para todos los endpoints que usan `{id}` en la ruta:**

  * Si no existe ese `{id}` → `404 Not Found` con JSON:

    ```json
    { "detail": "Recurso no encontrado" }
    ```

* **Para las peticiones de CSV (`?export=csv`):**

  * Si la consulta no arroja filas, aún devuelve el CSV con solo la cabecera y nada más, con código `200 OK`.

---

## 6. Ejemplo de Respuesta de Error

```json
{
  "detail": "Material no disponible para préstamo"
}
```

```json
{
  "detail": "Usuario no existe"
}
```

```json
{
  "detail": "EMAIL must be unique"
}
```

---

> **IMPORTANTE:**
>
> * Los nombres de campos y rutas deben coincidir exactamente con este contrato.
> * Si un campo es de tipo fecha, usar siempre formato ISO 8601 (`YYYY-MM-DD`).
> * El frontend debe enviar `Content-Type: application/json` en todos los `POST` y `PUT`.
> * Para descargar CSV, agregar `&export=csv` a la URL y realizar la petición como `GET`. El servidor devolverá un encabezado HTTP:
>
>   ```
>   Content-Type: text/csv
>   Content-Disposition: attachment; filename="reporte.csv"
>   ```

---
