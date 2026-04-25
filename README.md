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

# Feature 04: Base de Datos con PostgreSQL

Esta feature se encargó de implementar la base de datos de la aplicación usando PostgreSQL, con el objetivo de almacenar la información del equipo y dejarla disponible para que el backend pudiera consultarla correctamente.

## 1. Objetivo

El objetivo principal fue armar una base de datos inicial funcional y dejar preparada una estructura que no solo sirviera para este checkpoint, sino que también fuera más ordenada y escalable a futuro.

## 2. Archivos involucrados

- `database/init.sql`

## 3. Decisiones de diseño

En vez de usar una sola tabla con toda la información mezclada, se decidió separar la base en tres tablas:

- `integrantes`: guarda los datos personales de cada integrante (`legajo`, `nombre`, `apellido`)
- `estados`: guarda los posibles estados de cada asignación (`Activo`, `Inactivo`, `En Proceso`, `Pendiente`)
- `member_features`: relaciona a cada integrante con su feature, servicio y estado

Esta decisión se tomó para seguir buenas prácticas de modelado, evitar repetir información innecesariamente y dejar una estructura más clara y escalable. De esta manera, un mismo integrante puede tener más de una feature sin duplicar sus datos personales, y la base queda mejor preparada para futuras ampliaciones.

También se creó una vista `members`, pensada para simplificar el trabajo del backend. Aunque internamente la información está separada en varias tablas, la vista devuelve los datos ya unificados (`nombre`, `apellido`, `legajo`, `feature`, `servicio`, `estado`). Así, la API puede consultar la información de forma más simple, sin tener que repetir joins complejos en cada consulta.

## 4. Buenas prácticas aplicadas

- inicialización automática de la base mediante `init.sql`
- diseño relacional más ordenado y escalable

## 5. Pruebas realizadas

Se probó el servicio `database` de forma aislada con Docker Compose y se verificó que:

- PostgreSQL levantara correctamente
- `init.sql` se ejecutara sin errores
- se crearan las tablas y la vista
- la consulta esperada por el backend devolviera los datos correctamente
- se pudieran insertar nuevos integrantes, agregar nuevas features y actualizar estados

## 6. Observaciones

Durante el desarrollo se llegó a modificar `.env.example` para dejar más claras las variables de entorno necesarias para la conexión entre backend y base de datos, con la intención de servir como guía para la configuración local del equipo.

Sin embargo, después se consideró que no era lo más correcto incluir ese cambio dentro de esta feature, ya que `.env.example` forma parte de la configuración general del proyecto y no específicamente de la lógica de base de datos.

Es importante aclarar que los valores incluidos eran solo orientativos: no eran las credenciales reales del archivo `.env` local ni se usaron como configuración efectiva durante las pruebas. Por ese motivo, el cambio fue retirado del PR y las credenciales reales quedaron únicamente en el `.env` local, que no se subió al repositorio.
