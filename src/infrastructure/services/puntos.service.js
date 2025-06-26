import { API_URL } from '@/infrastructure/config/api.config';

// ✅ Obtener puntos actuales del usuario
export const fetchUserPoints = async (usuarioId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/saldo/${usuarioId}`, { headers });
  if (!response.ok) {
    throw new Error('No se pudo obtener el saldo de puntos');
  }
  return response.json(); // { puntos: 80 }
};

// ✅ Obtener historial de recargas y promociones
export const fetchPuntosHistorial = async (usuarioId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/historial/${usuarioId}`, { headers });
  if (!response.ok) {
    throw new Error('No se pudo obtener el historial');
  }
  return response.json(); 
};

// ✅ Recargar puntos
export const recargarPuntos = async ({ usuario_id, monto_soles, puntos_obtenidos }) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/recargar`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ usuario_id, monto_soles, puntos_obtenidos }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'No se pudo recargar puntos');
  }

  return response.json();
};

// ✅ Obtener lista de planes
export const fetchPlanesPromocion = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/planes`, { headers });

  if (!response.ok) {
    throw new Error('No se pudieron obtener los planes');
  }

  return response.json();
};

// ✅ Activar promoción en un cuarto
export const activarPromocion = async ({ usuario_id, cuarto_id, plan_id }) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/promocionar`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ usuario_id, cuarto_id, plan_id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'No se pudo activar la promoción');
  }

  return response.json();
};

export const cancelarPromocion = async (promocion_id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/cancelar-promocion`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ promocion_id }), // 👈 Asegúrate que va así
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al cancelar promoción');
  }

  return response.json();
};

export const getHistorialPromocionByCuarto = async (cuarto_id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/puntos/historial/cuarto/${cuarto_id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener historial');
  }

  return response.json(); // { historial: [...] }
};
