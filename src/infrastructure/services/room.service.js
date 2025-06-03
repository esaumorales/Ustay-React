import { API_URL } from '@/infrastructure/config/api.config';

export const fetchRooms = async () => {
    const headers = {
        'Content-Type': 'application/json'
    };

    const response = await fetch(`${API_URL}/cuarto`, { headers });
    if (!response.ok) {
        throw new Error('No se pudieron obtener los cuartos');
    }
    return response.json();
};

export const fetchRoomById = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No autorizado: token no encontrado');

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

export const compareRooms = async (ids) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No autorizado: token no encontrado');

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

export const deleteRoom = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No autorizado: token no encontrado');
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    const response = await fetch(`${API_URL}/cuarto/${id}`, {
      method: 'DELETE',
      headers
    });
  
    if (!response.ok) {
      throw new Error('No se pudo eliminar el cuarto');
    }
  
    return response.json();
  };
  