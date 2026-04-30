const mysql = require('mysql2/promise'); // Usamos la versión promise directamente
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306, // Forzamos el puerto que muestra Laragon
    user: 'root',
    password: '', 
    database: 'sist_licencias',
    waitForConnections: true,
    connectionLimit: 10,
    // Esto maneja la autenticación de MariaDB de forma moderna
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;