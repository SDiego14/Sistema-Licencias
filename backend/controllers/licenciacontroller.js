const db = require('../config/db');

const solicitarLicencia = async (req, res) => {
    const { usuario_id, tipo, fecha_inicio, fecha_fin } = req.body;

    if (!usuario_id || !tipo || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ msg: 'Faltan datos para crear la solicitud' });
    }

    try {
        await db.query(
            'INSERT INTO solicitudes (usuario_id, tipo_licencia, fecha_inicio, fecha_fin, estado, fecha_creacion) VALUES (?, ?, ?, ?, ?, NOW())',
            [usuario_id, tipo, fecha_inicio, fecha_fin, 'Pendiente']
        );

        res.json({ success: true, msg: 'Solicitud registrada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPendientes = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT s.id, u.nombre, u.apellido, u.dni, s.tipo_licencia, s.fecha_inicio, s.fecha_fin, s.estado
             FROM solicitudes s
             JOIN usuarios u ON s.usuario_id = u.id
             WHERE s.estado = 'Pendiente'
             ORDER BY s.fecha_creacion DESC`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTodas = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT s.id, u.nombre, u.apellido, u.dni, s.tipo_licencia, s.fecha_inicio, s.fecha_fin, s.estado
             FROM solicitudes s
             JOIN usuarios u ON s.usuario_id = u.id
             ORDER BY s.fecha_creacion DESC`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({ msg: 'Debe enviar un estado válido' });
    }

    try {
        const [result] = await db.query(
            'UPDATE solicitudes SET estado = ? WHERE id = ?',
            [estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        res.json({ success: true, msg: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { solicitarLicencia, obtenerPendientes, obtenerTodas, actualizarEstado };