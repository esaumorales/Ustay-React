import { API_URL } from '@/infrastructure/config/api.config';

export const fetchRooms = async () => {
    const token = localStorage.getItem('authToken'); // O sessionStorage.getItem('authToken')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(`${API_URL}/cuarto/`, { headers });
    if (!response.ok) {
        throw new Error('No se pudieron obtener los cuartos');
    }
    return response.json();
};

// Add the fetchRoomById function
export const fetchRoomById = async (id) => {
    const token = localStorage.getItem('authToken'); // Ensure token is declared before use
    console.log('Token:', token); // For debugging purposes
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    
    const response = await fetch(`${API_URL}/cuarto/${id}`, { headers });
    if (!response.ok) {
        throw new Error('No se pudo obtener el cuarto');
    }
    return response.json();
};

// Añadir la función para comparar cuartos
export const compareRooms = async (ids) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(`${API_URL}/cuarto/compare?ids=${ids.join(',')}`, { headers });
    if (!response.ok) {
        throw new Error('No se pudo comparar los cuartos');
    }
    return response.json();
};