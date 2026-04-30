const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Cambiado de '../config/db' a './config/db'
const authRoutes = require('./routes/authRoutes');
const licenciaRoutes = require('./routes/licenciaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Probar conexión al iniciar
db.query('SELECT 1')
    .then(() => console.log("✅ Conexión exitosa a MariaDB"))
    .catch(err => console.error("❌ Error de conexión:", err));

app.use('/api/auth', authRoutes);
app.use('/api/licencias', licenciaRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});