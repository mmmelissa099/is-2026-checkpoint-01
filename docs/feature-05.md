## Feature 05 — Panel de Monitoreo con Portainer

Esta feature se encargó de implementar el panel de monitoreo de la aplicación usando Portainer, con el objetivo de visualizar y administrar los contenedores del proyecto desde una interfaz web, sin depender exclusivamente de la terminal.

### Objetivo

El objetivo principal fue integrar Portainer dentro de Docker Compose para facilitar la observabilidad del entorno, validar el estado de los servicios del stack y dejar una configuración persistente y reproducible para todo el equipo.

### Archivos involucrados

- 'docker-compose.yml'
- 'README.md'

### Decisiones de diseño

Siguiendo lo indicado por la consigna, se utilizó Portainer sin Dockerfile propio y se configuró directamente en Docker Compose.

Además, se decidió reemplazar la imagen versionada dinámicamente por una versión fija:

- antes: 'image: portainer/portainer-ce:latest'
- ahora: 'image: portainer/portainer-ce:2.39.1'

Esta decisión se tomó para cumplir con la buena práctica de usar versiones fijas en lugar de 'latest', mejorar la reproducibilidad entre entornos y evitar cambios inesperados por actualizaciones automáticas de la imagen.

También se mantuvieron los montajes obligatorios para el correcto funcionamiento del servicio:

- socket Docker: '/var/run/docker.sock:/var/run/docker.sock'
- volumen persistente: 'portainer_data:/data'

De esta manera, Portainer puede comunicarse con el daemon de Docker y conservar su configuración entre reinicios.

### Buenas prácticas aplicadas

- uso de imagen fija ('2.39.1') en lugar de 'latest'
- configuración del servicio en 'docker-compose.yml' sin Dockerfile adicional
- montaje de volumen persistente para conservar configuración del panel
- integración con el daemon Docker mediante el socket del host
- definición de límites de recursos en Docker Compose

### Pruebas realizadas

Se probó el servicio 'portainer' dentro del stack con Docker Compose y se verificó que:

- Portainer levantara correctamente en el puerto configurado
- el acceso web respondiera en 'http://localhost:9000'
- en el primer ingreso se pudiera crear el usuario administrador
- se pudiera seleccionar y conectar el entorno local de Docker
- se visualizaran los contenedores del proyecto en estado operativo

### Observaciones

La modificación de 'latest' a '2.39.1' se incorporó específicamente para alinear la feature con el criterio de buenas prácticas de la consigna, priorizando estabilidad y consistencia en las ejecuciones del equipo.

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
