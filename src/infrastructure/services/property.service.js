import { API_URL } from '@/infrastructure/config/api.config';

const getTokenHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autorizado: token no encontrado');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getAllProperties = async () => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad`, { headers });
    if (!response.ok) throw new Error('Error al obtener todas las propiedades');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener todas las propiedades:', error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad/${id}`, { headers });
    if (!response.ok) throw new Error('Error al obtener la propiedad');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    throw error;
  }
};

export const getPropertiesByPartner = async (partnerId) => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad/partner/${partnerId}`, { headers });
    if (!response.ok) throw new Error('Error al obtener propiedades del partner');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener propiedades del partner:', error);
    throw error;
  }
};

export const createProperty = async (propertyData) => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad`, {
      method: 'POST',
      headers,
      body: JSON.stringify(propertyData)
    });
    if (!response.ok) throw new Error('Error al crear la propiedad');
    return await response.json();
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    throw error;
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad/propiedad-edit/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(propertyData)
    });
    if (!response.ok) throw new Error('Error al actualizar la propiedad');
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar la propiedad:', error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const headers = getTokenHeaders();
    const response = await fetch(`${API_URL}/propiedad/${id}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Error al eliminar la propiedad');
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar la propiedad:', error);
    throw error;
  }
};
