Sistema de Gestión de Licencias - Ley 4.067
Este sistema permite la carga, seguimiento y administración de licencias para el personal de Vialidad, facilitando la supervisión por parte de los administradores y la transparencia para los agentes.

🚀 Funcionalidades Principales
Registro de Agentes: Carga de datos personales (DNI, Nombre, Apellido, Legajo).

Gestión de Licencias: Formulario dinámico para solicitar licencias anuales, por enfermedad, maternidad, etc.

Cálculo Automático: El sistema calcula automáticamente la cantidad de días solicitados entre fechas.

Panel de Control: Historial de trámites con estados en tiempo real (PENDIENTE/APROBADO).

🛠️ Tecnologías Utilizadas
Frontend: React.js, Axios, React Router.

Backend: Node.js, Express.

Base de Datos: MariaDB (gestionada con Laragon/HeidiSQL).

🔧 Instalación y Configuración
1. Clonar el repositorio
Bash
git clone https://github.com/SDiego14/Sistema-Licencias.git
cd Sistema-Licencias
2. Configurar el Backend
Entrá a la carpeta backend.

Instalá las dependencias: npm install.

Configurá tu conexión a MariaDB (aseguráte de tener Laragon activo).

Iniciá el servidor: node server.js (debería correr en el puerto 5000).

3. Configurar el Frontend
Entrá a la carpeta frontend.

Instalá las dependencias: npm install.

Iniciá la aplicación: npm start.

⚠️ Notas Importantes para Colaboradores
Base de Datos: Antes de iniciar, importá el script SQL incluido en la carpeta /database para tener la estructura de tablas lista.

Errores Comunes: Si ves un error de "Faltan datos", revisá que el objeto enviado desde el frontend coincida con los campos dni_agente y nombre_agente de la tabla.

Cómo subir este archivo a tu GitHub ahora:
Una vez que crees el archivo en tu PC, ejecutá estos comandos en la terminal:

git add README.md

git commit -m "Agregado archivo README informativo"

git push origin main
