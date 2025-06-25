import { API_URL } from '@/infrastructure/config/api.config';

const getTokenHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// 🏘️ Obtener todas las propiedades
export const getAllProperties = async () => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad`, { headers });
  if (!response.ok) throw new Error('Error al obtener todas las propiedades');
  return await response.json();
};

// 🔍 Obtener propiedad por ID
export const getPropertyById = async (id) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/${id}`, { headers });
  if (!response.ok) throw new Error('Error al obtener la propiedad');
  return await response.json();
};

// 🔍 Obtener propiedad por UUID
export const getPropertyByUuid = async (uuid) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/uuid/${uuid}`, { headers });
  if (!response.ok) throw new Error('Error al obtener la propiedad por UUID');
  return await response.json();
};

// 🛏️ Obtener cuartos por partner ID
export const getRoomsByPartner = async (partnerId) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/partnerRoom/${partnerId}`, { headers });
  if (!response.ok) throw new Error('Error al obtener cuartos del partner');
  return await response.json();
};

// 🏢 Obtener propiedades por partner ID
export const getPropertiesByPartner = async (partnerId) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/partner/${partnerId}`, { headers });
  if (!response.ok) throw new Error('Error al obtener propiedades del partner');
  return await response.json();
};

// ➕ Crear propiedad
export const createProperty = async (propertyData) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad`, {
    method: 'POST',
    headers,
    body: JSON.stringify(propertyData),
  });
  if (!response.ok) throw new Error('Error al crear la propiedad');
  return await response.json();
};

// ✏️ Actualizar propiedad por ID
export const updateProperty = async (id, propertyData) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/propiedad-edit/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(propertyData),
  });
  if (!response.ok) throw new Error('Error al actualizar la propiedad');
  return await response.json();
};

// ✏️ Actualizar propiedad por UUID
export const updatePropertyByUuid = async (uuid, propertyData) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/uuid/${uuid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(propertyData),
  });
  if (!response.ok) throw new Error('Error al actualizar la propiedad por UUID');
  return await response.json();
};

// ❌ Eliminar propiedad por ID
export const deleteProperty = async (id) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error('Error al eliminar la propiedad');
  return await response.json();
};

// ❌ Eliminar propiedad por UUID
export const deletePropertyByUuid = async (uuid) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/propiedad/uuid/${uuid}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error('Error al eliminar la propiedad por UUID');
  return await response.json();
};

// 🔍 Obtener cuarto por UUID (nuevo)
export const getRoomByUuid = async (uuid) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/uuid/${uuid}`, { headers });
  if (!response.ok) throw new Error('Error al obtener el cuarto por UUID');
  return await response.json();
};

// ❌ Eliminar cuarto por ID
export const deleteRoom = async (id) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error('Error al eliminar el cuarto');
  return await response.json();
};

// ❌ Eliminar cuarto por UUID
export const deleteRoomByUuid = async (uuid) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/uuid/${uuid}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error('Error al eliminar el cuarto por UUID');
  return await response.json();
};

// ✏️ Actualizar cuarto por ID
export const updateRoom = async (id, roomData) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(roomData),
  });
  if (!response.ok) throw new Error('Error al actualizar el cuarto');
  return await response.json();
};

// ✏️ Actualizar cuarto por UUID
export const updateRoomByUuid = async (uuid, roomData) => {
  const headers = getTokenHeaders();
  const response = await fetch(`${API_URL}/cuarto/uuid/${uuid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(roomData),
  });
  if (!response.ok) throw new Error('Error al actualizar el cuarto por UUID');
  return await response.json();
};
