# Arquitectura del Proyecto - LinaresVotaEnSegunda

Este documento describe la arquitectura y decisiones técnicas para el proyecto "LinaresVotaEnSegunda".

## 1. Estructura de Carpetas

La estructura de la carpeta `src/` está diseñada para mantener el proyecto ordenado y escalable, permitiendo la separación clara de responsabilidades:

- **`assets/`**: Archivos estáticos como imágenes.
- **`components/`**: Componentes reutilizables, aislados y genéricos (ej. `Header.jsx`, `Footer.jsx`, `Navbar.jsx`).
- **`config/`**: Archivos de configuración global (`appConfig.js`), como títulos, paletas de colores y variables globales que permiten modificar el comportamiento visual del app sin tocar código de UI.
- **`data/`**: Archivos `.json` (ej. `resultados-linares-2026.json`). Al no tener backend, este directorio actúa como nuestra base de datos en crudo.
- **`layouts/`**: Componentes que envuelven la estructura base de la aplicación. `MainLayout.jsx` define el cascarón que contiene la barra de navegación, el contenido y el pie de página.
- **`pages/`**: Componentes de nivel superior que actúan como vistas de rutas. Orquestan múltiples componentes más pequeños.

## 2. Flujo de Datos

Dado que la aplicación prescinde de base de datos y backend:
1. La información se almacena localmente en `src/data/resultados-linares-2026.json`.
2. Las páginas o un posible contexto (`React Context`) importarán este archivo.
3. Se transformará la data según el requerimiento y se inyectará como _props_ a componentes de presentación o gráficos de `Chart.js`.

## 3. Estrategia de Escalabilidad

- **Componentización**: Al mantener componentes pequeños (ej. tarjetas de indicadores en el dashboard), será sencillo añadir nuevas visualizaciones o reestructurar el layout.
- **Routing**: `react-router-dom` está preconfigurado con una estructura que permite escalar la cantidad de rutas y anidar componentes.
- **Performance**: Vite asegura un Hot Module Replacement (HMR) extremadamente rápido en desarrollo, y optimiza los _chunks_ de código durante el proceso de _build_ para que la carga en dispositivos móviles (iPhone) sea óptima.
- **UI Responsiva**: Se implementa un enfoque *Mobile-First* gracias a Tailwind CSS, con un Bottom Navbar para móviles y un Navbar superior tradicional para tablets/desktops.
