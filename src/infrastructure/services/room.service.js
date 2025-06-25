import { API_URL } from '@/infrastructure/config/api.config';

// 🏘️ Obtener todos los cuartos
export const fetchRooms = async () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_URL}/cuarto`, { headers });
  if (!response.ok) {
    throw new Error('No se pudieron obtener los cuartos');
  }
  return response.json();
};

// 🔍 Obtener cuarto por ID numérico (original)
export const fetchRoomById = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/cuarto/${id}`, { headers });
  if (!response.ok) {
    throw new Error('No se pudo obtener el cuarto');
  }
  return response.json();
};

// 🔍 Obtener cuarto por UUID (nuevo)
export const fetchRoomByUuid = async (uuid) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_URL}/cuarto/uuid/${uuid}`, { headers });
  if (!response.ok) {
    throw new Error('No se pudo obtener el cuarto por UUID');
  }
  return response.json();
};

// 📊 Comparar cuartos por ID
export const compareRooms = async (ids) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${API_URL}/cuarto/compare?ids=${ids.join(',')}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error('No se pudo comparar los cuartos');
  }
  return response.json();
};

// ❌ Eliminar cuarto por ID (original)
export const deleteRoom = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/cuarto/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el cuarto');
  }

  return response.json();
};

// ❌ Eliminar cuarto por UUID (nuevo)
export const deleteRoomByUuid = async (uuid) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/cuarto/uuid/${uuid}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar el cuarto por UUID');
  }

  return response.json();
};

// ➕ Crear cuarto
export const createRoom = async (roomData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/cuarto`, {
    method: 'POST',
    headers,
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear el cuarto');
  }

  return response.json();
};

export const fetchRecargas = async (usuarioId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/recarga/${usuarioId}`, { headers });

  if (!response.ok) {
    throw new Error('No se pudo obtener el historial de recargas');
  }

  return response.json(); // Devuelve un arreglo con { monto, fecha, ... }
};
