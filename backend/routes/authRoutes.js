const router = require('express').Router();
const db = require('../config/db');

// ✅ RUTA DE LOGIN CORREGIDA
router.post('/login', async (req, res) => {
    const { dni, password } = req.body;

    // Validación básica de entrada
    if (!dni || !password) {
        return res.status(400).json({ success: false, msg: "DNI y Contraseña son requeridos" });
    }

    try {
        // Usamos CAST para asegurar que MariaDB compare los datos como texto, 
        // evitando errores si el DNI en la tabla es de tipo numérico.
        const query = `
            SELECT id, dni, nombre_completo AS nombre, rol 
            FROM usuarios 
            WHERE CAST(dni AS CHAR) = ? 
            AND CAST(password AS CHAR) = ?
        `;
        
        const [rows] = await db.query(query, [String(dni).trim(), String(password).trim()]);

        if (rows.length > 0) {
            // Si hay coincidencia, devolvemos los datos del usuario
            res.json({ 
                success: true, 
                user: rows[0] 
            });
        } else {
            // Si no hay coincidencia, error 401 (No autorizado)
            res.status(401).json({ 
                success: false, 
                msg: "DNI o Contraseña incorrectos" 
            });
        }
    } catch (err) {
        console.error("❌ Error en el query de login:", err);
        res.status(500).json({ 
            success: false, 
            msg: "Error interno del servidor al intentar conectar con la base de datos" 
        });
    }
});

// ✅ RUTA PARA OBTENER TODOS LOS USUARIOS (Usada en AdminPanel.jsx)
router.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, dni, nombre, rol FROM usuarios');
        res.json(rows);
    } catch (err) {
        console.error("❌ Error al obtener usuarios:", err);
        res.status(500).json({ msg: "Error al obtener la lista de usuarios" });
    }
});

module.exports = router;