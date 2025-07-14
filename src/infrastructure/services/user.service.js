import { API_URL } from '@/infrastructure/config/api.config';

export const fetchProfile = async () => {
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No autorizado: token no encontrado');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_URL}/usuario/perfil`, { headers });

    if (!response.ok) {
        throw new Error('No se pudo obtener el perfil');
    }

    return response.json(); 
};
