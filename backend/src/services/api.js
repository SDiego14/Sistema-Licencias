import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const enviarSolicitud = async (datos) => {
    return await axios.post(`${API_URL}/licencias`, datos);
};