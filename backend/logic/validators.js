// Función para calcular días según antigüedad (Art. 89)
const calcularDiasDisponibles = (fechaIngreso) => {
    const hoy = new Date();
    const ingreso = new Date(fechaIngreso);
    const antiguedadAnios = hoy.getFullYear() - ingreso.getFullYear();

    if (antiguedadAnios < 1) return 0; // Menos de 6 meses no corresponde (simplificado)
    if (antiguedadAnios <= 5) return 14;
    if (antiguedadAnios <= 10) return 21;
    if (antiguedadAnios <= 20) return 28;
    return 35;
};