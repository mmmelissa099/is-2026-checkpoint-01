# IS-2026 Checkpoint 01 - TeamBoard App

## Integrantes y Roles
| Nombre | Legajo | Feature | Servicio |
|--------|--------|---------|----------|
| Melissa Braunstein | 33535 | Feature 01 | Coordinador |
| Pilar Wagner | 33514 | Feature 02 | Frontend |
| Santiago Gonzales D'Angelo | 33211 | Feature 03 | Backend |
| Maria Pia Porzio | 33243 | Feature 04 | Database |
| Leandro Andres Noval | 32201 | Feature 05 | Portainer |

## Cómo ejecutar el proyecto
1. Clonar el repositorio.
2. Crear el archivo `.env` basado en `.env.example`.
3. Ejecutar:
   ```bash
   docker compose up -d --build
   ```

## Servicios
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:5000
- **Portainer**: http://localhost:9000


# Feature 01: Coordinación y Estructura Base

Esta documentación detalla las tareas realizadas para la Feature 01 del proyecto, centrada en la coordinación del equipo, la estructuración de la arquitectura de contenedores y la definición de estándares de calidad.

## 1. Estructura del Proyecto

```text
/
├── backend/                 # Lógica de la API (Python)
│   ├── Dockerfile           # Configuración de imagen del backend
│   ├── main.py              # Punto de entrada de la aplicación
│   └── requirements.txt     # Dependencias del proyecto
│
├── database/                # Persistencia y Esquemas
│   └── init.sql             # Script de creación de tablas y vista 'members'
│
├── frontend/                # Interfaz de Usuario
│   ├── Dockerfile           # Configuración de imagen del servidor web
│   ├── index.html           # Estructura principal
│   └── src/                 # Código fuente (JS, CSS)
│
├── .env                     # Variables locales (NO SUBIR AL REPO)
├── .env.example             # Plantilla de configuración para el equipo
├── .gitignore               # Exclusión de archivos sensibles y temporales
├── docker-compose.yml       # Orquestador maestro de servicios y redes
└── README.md                # Documentación principal y guía de inicio### Componentes y Documentos

```
## 2. GitFlow elegido:

* **Por Features**: Se eligió este GitFlow para facilitar los Pull Request y los merges. Debido a la simpleza del proyecto se consideró innecesario sumar rama development, ya que cada participante pudo organizarse y trabajar ordenadamente en su respectiva rama la feature que le correspondía.

## 3. Métricas de Calidad y Estándares

Para garantizar la robustez del sistema, se implementaron las siguientes métricas y configuraciones:

| Estándar | Práctica | Archivo | Explicación |
| :--- | :--- | :--- | :--- |
| Seguridad y Aislamiento | Aislamiento de Red |`docker-compose.yml` | La base de datos no expone puertos al host (0.0.0.0) |
| Seguridad y Aislamiento | Variables de entorno |`.env` |No se incluyen credenciales en el código fuente |
| Healthcare | Orden de encendido |`docker-compose.yml` |Se utiliza `depends_on` con condiciones de salud (`service_healthy`). El Frontend no inicia hasta que el Backend está listo, y este espera a la base de datos.|
| Healthcare | Monitoreo |`docker-compose.yml` |Cada servicio cuenta con un test de salud (`curl` para el backend y `pg_isready` para la base de datos)|
| Gestión de Recursos | Límites de Hardware |`docker-compose.yml` |Se han definido límites estrictos de CPU (0.25 - 0.5) y Memoria (256M - 512M) por contenedor para evitar el agotamiento de recursos en el host |


