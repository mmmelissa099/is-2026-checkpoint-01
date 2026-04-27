## Feature 03 — Backend con Flask

Esta feature se encargó de implementar el backend de la aplicación utilizando Flask, con el objetivo de exponer una API REST que permita consultar la información del equipo almacenada en la base de datos.

### Objetivo

El objetivo principal fue desarrollar una API simple pero funcional, integrarla con Docker Compose y dejar preparada una estructura que permita la comunicación entre el frontend y la base de datos.

### Archivos involucrados

```text
backend/
├── app.py            # Lógica principal de la API
├── requirements.txt  # Dependencias del proyecto
├── Dockerfile        # Configuración de la imagen del backend
└── .dockerignore     # Exclusión de archivos innecesarios
```

### Decisiones de diseño

Se optó por utilizar Flask como framework para el backend por su simplicidad y facilidad de integración.

Se definieron tres endpoints principales:

- `/api/health`: permite verificar que el backend esté funcionando correctamente.
- `/api/info`: devuelve información básica del servicio.
- `/api/team`: consulta la base de datos y devuelve los integrantes del equipo.

Para la conexión con PostgreSQL se utilizó la librería `psycopg2`, leyendo las credenciales desde variables de entorno para evitar hardcodear información sensible.

Se decidió utilizar la vista `members` definida en la base de datos en lugar de consultar directamente las tablas, con el fin de simplificar la lógica del backend y evitar realizar joins complejos en cada consulta.

Además, se utilizó `gunicorn` como servidor WSGI para ejecutar la aplicación dentro del contenedor, en lugar del servidor de desarrollo de Flask.

### Buenas prácticas aplicadas

- uso de variables de entorno para la configuración de la base de datos
- separación de dependencias mediante `requirements.txt`
- uso de imagen base `python:3.12-slim`
- ejecución del contenedor con usuario no-root
- implementación de `HEALTHCHECK`
- uso de `.dockerignore`
- habilitación de CORS para comunicación con el frontend

### Pruebas realizadas

Se realizaron pruebas tanto a nivel de API como de integración con Docker:

- verificación del endpoint `/api/health`
- verificación del endpoint `/api/info`
- ejecución del backend con `gunicorn` dentro del contenedor
- validación de conexión con PostgreSQL
- prueba del endpoint `/api/team` contra la vista `members`
- pruebas con `curl` y navegador
- validación de CORS para requests desde otro puerto

### Observaciones

Durante el desarrollo, el endpoint `/api/team` no pudo ser validado completamente en una primera instancia debido a la falta de disponibilidad de la base de datos. Una vez integrada la base mediante Docker Compose, se validó el flujo completo entre backend y PostgreSQL.

Se incorporó CORS para permitir la comunicación entre frontend y backend en distintos puertos, algo necesario en entornos de desarrollo.
