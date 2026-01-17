# PRUEBA - Aplicación Full Stack

Aplicación web con frontend en React y backend en Node.js.

## 📋 Requisitos Previos

- Node.js
- npm

##  Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd PRUEBA
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

### 3. Configurar el Frontend
```bash
cd frontend
npm install
```

##  Ejecución

### Ejecutar el Backend

Desde la carpeta `backend`:
```bash
npm start
```

El servidor backend estará disponible en `http://localhost:3000` (o el puerto configurado en `server.js`).

### Ejecutar el Frontend

Desde la carpeta `frontend`:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

##  Scripts Disponibles

### Backend

- `npm start` - Inicia el servidor backend

### Frontend

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter de código

##  Tecnologías

### Backend
- Node.js
- Express (probablemente)

### Frontend
- React 19.2.0
- Vite 7.2.4
- Tailwind CSS 4.1.18
- Lucide React (iconos)

##  Estructura del Proyecto
```
PRUEBA/
├── backend/
│   ├── node_modules/
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js
```

##  Desarrollo

Para trabajar en el proyecto, se recomienda abrir dos terminales:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

##  Notas

- Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend
- Verifica que los puertos configurados no estén siendo utilizados por otras aplicaciones
- Revisa el archivo `vite.config.js` si necesitas configurar el proxy para las peticiones al backend

