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
- **Backend API**:
  - Health: http://localhost:5000/api/health
  - Info: http://localhost:5000/api/info
  - Team: http://localhost:5000/api/team
- **Portainer**: http://localhost:9000

## Documentación

- [Feature 01 - Infraestructura](docs/feature-01.md)  
- [Feature 02 - Frontend](docs/feature-02.md)  
- [Feature 03 - Backend](docs/feature-03.md)  
- [Feature 04 - Database](docs/feature-04.md)  
- [Feature 05 - Portainer](docs/feature-05.md)  


## Feature 05

### Paso a paso

1. Levantar servicios con: docker compose up -d --build
2. Abrir Portainer en el navegador: `http://localhost:9000`   
3. Primer ingreso: crear usuario administrador priorizando credenciales seguras (si ya existe, iniciar sesión con las credenciales conocidas).
4. Entrar al entorno local: **Local** (Docker environment).
5. Ir a **Containers** y abrir algún contenedor, ejemplo el contenedor del backend.
6. Entrar en la sección **Stats** con un `i` para ver consumo en tiempo real (CPU, memoria, red e I/O).


### Evidencias

![Paso1](./docs/img/portainerExample1.png)

![Paso2](./docs/img/portainerExample2.png)

![Paso3](./docs/img/portainerExample3.png)

![Paso4](./docs/img/portainerExample4.png)

![Paso5](./docs/img/portainerExample5.png)
