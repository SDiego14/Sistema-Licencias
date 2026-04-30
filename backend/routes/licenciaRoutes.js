const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importante para las consultas directas
const { 
    solicitarLicencia, 
    obtenerPendientes, 
    actualizarEstado 
} = require('../controllers/licenciacontroller');

// 1. Ruta para que el EMPLEADO cree una solicitud
router.post('/', solicitarLicencia);

// 2. Ruta para que el ADMIN vea pendientes (usando controlador)
router.get('/pendientes', obtenerPendientes);

// 3. Ruta para que el SUPERVISOR vea TODAS las licencias
// La unificamos para evitar el error de ruta duplicada
router.get('/todas', async (req, res) => {
    try {
        // Cambiamos 'solicitudes' por 'licencias' para que coincida con HeidiSQL
        const query = `
            SELECT l.*, u.nombre, u.apellido 
            FROM licencias l 
            JOIN usuarios u ON l.usuario_id = u.id 
            ORDER BY l.fecha_solicitud DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error en /todas:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 4. Ruta para actualizar estado (Aprobar/Rechazar)
// He dejado la que coincide con la llamada del SupervisorView.jsx anterior
router.put('/estado/:id', async (req, res) => {
    const { estado } = req.body; 
    const { id } = req.params;
    try {
        await db.query('UPDATE solicitudes SET estado = ? WHERE id = ?', [estado, id]);
        res.json({ success: true, msg: `Licencia ${estado}` });
    } catch (error) {
        console.error("Error al actualizar estado:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 5. Mantenemos esta por si el controlador la usa en otras vistas
router.put('/:id/estado', actualizarEstado);

module.exports = router;