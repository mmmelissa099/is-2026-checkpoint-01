## Feature 02 — Frontend con HTML, CSS y JavaScript

Esta feature se encargó de implementar el frontend de la aplicación, utilizando HTML, CSS y JavaScript, con el objetivo de mostrar la información del equipo en el navegador y consumir los datos desde el backend.

### Objetivo

El objetivo principal fue desarrollar una interfaz web simple pero funcional que permita visualizar los integrantes del equipo en una tabla dinámica, integrarla con Docker Compose y establecer la comunicación con el backend mediante requests HTTP.

### Archivos involucrados

```text
frontend/
├── Dockerfile              # Configuración de la imagen del frontend
├── .dockerignore           # Exclusión de archivos innecesarios
└── html/
   ├── index.html          # Estructura principal de la página
   ├── styles.css          # Estilos visuales de la aplicación
   └── app.js              # Lógica de consumo de API y renderizado dinámico
```

### Decisiones de diseño

Se optó por utilizar HTML, CSS y JavaScript puro, sin frameworks, para mantener la simplicidad del frontend y enfocarse en la integración con el backend.

El diseño visual se resolvió con CSS puro, separando los estilos en un archivo independiente (`styles.css`), con el objetivo de mantener una mejor organización del código, facilitar el mantenimiento y permitir la reutilización de estilos.

La página utiliza el servidor HTTP incluido en Python (`python3 -m http.server`), evitando la necesidad de configurar servidores más complejos.

El archivo `app.js` realiza una solicitud al endpoint `/api/team` mediante `fetch()`, obteniendo los datos en formato JSON y construyendo dinámicamente la tabla en el DOM.

Se implementó un indicador visual del estado del backend, permitiendo informar al usuario si el servicio está disponible o no.

Para el manejo de los estados de cada integrante, se implementó un proceso de normalización de los valores recibidos desde el backend, con el objetivo de desacoplar el frontend del formato exacto de los datos.

A partir de estos valores normalizados, se definió un mapeo hacia clases CSS específicas para los estados conocidos (Activo, En proceso, Pendiente, Inactivo).

Adicionalmente, se incorporó un estilo por defecto (`badge-default`) que se aplica automáticamente cuando el estado recibido no coincide con ninguno de los contemplados. Esto permite que la aplicación continúe funcionando correctamente ante la incorporación de nuevos estados sin necesidad de modificar el frontend.

### Buenas prácticas aplicadas

- separación de responsabilidades (HTML, CSS y JavaScript en archivos distintos)
- uso de `fetch()` para consumo de API REST
- renderizado dinámico del contenido en el DOM
- normalización de datos para evitar dependencia de formato
- uso de mapeo de estados con fallback para tolerancia a cambios
- desacoplamiento parcial entre frontend y backend
- uso de clases CSS reutilizables (badges)
- uso de imagen base liviana `python:3.12-slim`
- uso de servidor HTTP simple sin dependencias externas
- uso de `.dockerignore`

### Pruebas realizadas

Se realizaron pruebas tanto del frontend de forma aislada como integrado con Docker:

- ejecución del frontend con `python3 -m http.server`
- verificación de carga de `index.html` en el navegador
- prueba del consumo de API mediante `fetch()`
- validación del renderizado dinámico de la tabla
- verificación del indicador de estado del backend
- pruebas visuales de los distintos estados (badges y colores)
- validación del comportamiento ante diferencias de formato (mayúsculas, espacios)
- validación del estilo por defecto ante estados no contemplados
- prueba de integración completa con backend mediante Docker Compose
- validación del manejo de errores cuando el backend no responde

### Observaciones

Durante el desarrollo se presentaron problemas de CORS al consumir el backend desde el frontend en distintos puertos. Esto fue resuelto mediante la configuración correspondiente en el backend.

Inicialmente se evaluó utilizar un mapeo directo de estados sin normalización, pero esto generaba dependencia del formato exacto definido en la base de datos. Por este motivo, se optó por incorporar un paso de normalización que permite manejar variaciones como mayúsculas, minúsculas y espacios.

Además, se incorporó un mecanismo de fallback visual mediante `badge-default`, lo que garantiza que la interfaz no se rompa ante la aparición de nuevos estados no contemplados.

El frontend quedó preparado para adaptarse a cambios en los datos sin requerir modificaciones, mostrando siempre el valor original del estado junto con un estilo visual apropiado.


