```text
/
├── backend/                 # Lógica de la API (Python)
│   ├── Dockerfile 
          # Configuración de imagen del backend    
│
│

├── database/                # Persistencia y Esquemas
│   └── init.sql             # Script de creación de tablas y vista 'members'
│    
├── frontend/                # Interfaz de Usuario
│   ├── Dockerfile           # Configuración de imagen del servidor web
│   ├├  index.html           # Estructura principal
│   └└── src/                 # Código fuente (JS, CSS)
│    
├── .env                     # Variables locales (NO SUBIR AL REPO)
├── .envenv.example             # Plantilla de configuración para el equipo
├── .gi.gitignore               # Exclusión de archivos sensibles y temporales
├── docdocker-compose.yml       # Orquestador maestro de servicios y redes
└── README.md                # Documentación principal y guía de inicio### Componentes y Documentos

```
