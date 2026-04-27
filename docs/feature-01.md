# Feature 01 — Coordinación y Estructura Base

## Objetivo

El objetivo de esta feature fue establecer las bases del proyecto, tanto a nivel técnico como organizativo, asegurando un entorno de trabajo ordenado, consistente y alineado entre todos los integrantes del equipo.

## Alcance del rol

El rol de coordinación incluyó:

- Definir la estructura inicial del repositorio  
- Establecer convenciones de trabajo  
- Coordinar el desarrollo de las distintas features  
- Revisar, aprobar e integrar los Pull Requests del equipo  

## Estructura Inicial del proyecto

```text
/
├── backend/
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
│
├── database/
│
├── portainer/
│
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── README.md
│
└── docs/
    ├── feature-01.md
    ├── feature-02.md
    ├── feature-03.md
    ├── feature-04.md
    └── feature-05.md
```

Esta estructura permite una clara separación de responsabilidades y facilita la escalabilidad del proyecto.

## Gestión de ramas (GitFlow)

Se adoptó un flujo de trabajo basado en ramas por feature:

- Cada integrante trabajó en su propia rama (`feature/xx`)  
- La rama `main` se utilizó como rama estable  
- La integración se realizó mediante Pull Requests  

Esto permitió trabajar en paralelo de forma ordenada y reducir conflictos.

## Revisión de código e integración

Como parte del rol de coordinación se realizaron las siguientes tareas:

- Revisión de Pull Requests de cada integrante  
- Validación de cumplimiento de requisitos de cada feature  
- Verificación de integración entre frontend, backend y base de datos  
- Resolución de conflictos de merge  
- Aprobación y merge de cambios a la rama principal  

## Buenas prácticas aplicadas

- Uso de `.env` para manejo de variables sensibles  
- Inclusión de `.env.example` como guía de configuración  
- Configuración de `.gitignore` para excluir archivos innecesarios  
- Uso de `docker-compose.yml` como orquestador central  
- Estandarización de la estructura del proyecto  

## Resultados

Se estableció una base sólida y consistente que permitió al equipo desarrollar sus features de manera independiente, asegurando una correcta integración final del sistema.

