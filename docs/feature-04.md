## Feature 04: Base de Datos con PostgreSQL

Esta feature se encargó de implementar la base de datos de la aplicación usando PostgreSQL, con el objetivo de almacenar la información del equipo y dejarla disponible para que el backend pudiera consultarla correctamente.

### 1. Objetivo

El objetivo principal fue armar una base de datos inicial funcional y dejar preparada una estructura que no solo sirviera para este checkpoint, sino que también fuera más ordenada y escalable a futuro.

### 2. Archivos involucrados

- `database/init.sql`

### 3. Decisiones de diseño

En vez de usar una sola tabla con toda la información mezclada, se decidió separar la base en tres tablas:

- `integrantes`: guarda los datos personales de cada integrante (`legajo`, `nombre`, `apellido`)
- `estados`: guarda los posibles estados de cada asignación (`Activo`, `Inactivo`, `En Proceso`, `Pendiente`)
- `member_features`: relaciona a cada integrante con su feature, servicio y estado

Esta decisión se tomó para seguir buenas prácticas de modelado, evitar repetir información innecesariamente y dejar una estructura más clara y escalable. De esta manera, un mismo integrante puede tener más de una feature sin duplicar sus datos personales, y la base queda mejor preparada para futuras ampliaciones.

También se creó una vista `members`, pensada para simplificar el trabajo del backend. Aunque internamente la información está separada en varias tablas, la vista devuelve los datos ya unificados (`nombre`, `apellido`, `legajo`, `feature`, `servicio`, `estado`). Así, la API puede consultar la información de forma más simple, sin tener que repetir joins complejos en cada consulta.

### 4. Buenas prácticas aplicadas

- inicialización automática de la base mediante `init.sql`
- diseño relacional más ordenado y escalable

### 5. Pruebas realizadas

Se probó el servicio `database` de forma aislada con Docker Compose y se verificó que:

- PostgreSQL levantara correctamente
- `init.sql` se ejecutara sin errores
- se crearan las tablas y la vista
- la consulta esperada por el backend devolviera los datos correctamente
- se pudieran insertar nuevos integrantes, agregar nuevas features y actualizar estados

### 6. Observaciones

Durante el desarrollo se llegó a modificar `.env.example` para dejar más claras las variables de entorno necesarias para la conexión entre backend y base de datos, con la intención de servir como guía para la configuración local del equipo.

Sin embargo, después se consideró que no era lo más correcto incluir ese cambio dentro de esta feature, ya que `.env.example` forma parte de la configuración general del proyecto y no específicamente de la lógica de base de datos.

Es importante aclarar que los valores incluidos eran solo orientativos: no eran las credenciales reales del archivo `.env` local ni se usaron como configuración efectiva durante las pruebas. Por ese motivo, el cambio fue retirado del PR y las credenciales reales quedaron únicamente en el `.env` local, que no se subió al repositorio.

Por otro lado, se asignaron distintos estados a las features de forma intencional, a modo de ejemplo, para que en la tabla de la aplicación pudiera verse cómo se visualizaría cada uno de ellos. La idea no fue reflejar necesariamente una situación real del equipo, sino facilitar la prueba visual del funcionamiento completo entre base de datos, backend y frontend.

Finalmente, se tuvo en cuenta que los cambios realizados en `database/init.sql` solo se reflejan automáticamente cuando la base se inicializa desde cero. Por eso, si el proyecto ya fue levantado anteriormente en la misma máquina y se quiere volver a cargar la versión actual del script, lo recomendable es ejecutar:

```bash
docker compose down -v
docker compose up -d --build
```

