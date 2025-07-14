import { API_URL } from '@/infrastructure/config/api.config';

export const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No autorizado: token no encontrado');
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const response = await fetch(`${API_URL}/usuario/perfil`, { headers });
  
    const data = await response.json();
  
    if (!response.ok) {
      // Puedes mostrar mensaje detallado del backend si lo hay
      throw new Error(data.message || 'No se pudo obtener el perfil');
    }
  
    return data; // contiene { user, message }
  };
  