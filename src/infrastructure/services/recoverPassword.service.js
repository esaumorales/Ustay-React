import { API_URL } from '@/infrastructure/config/api.config';

// Enviar código de recuperación al correo
export const recoverPassword = async (correo_electronico) => {
  try {
    const response = await fetch(`${API_URL}/usuario/recover-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo_electronico }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar el correo de recuperación');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Verificar el código recibido por correo
export const verifyRecoveryCode = async (correo_electronico, code) => {
  try {
    const response = await fetch(`${API_URL}/usuario/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo_electronico, code }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar el código');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Cambiar contraseña tras verificar código
export const changePassword = async (correo_electronico, code, nuevaContrasena) => {
  try {
    const response = await fetch(`${API_URL}/usuario/change-password`, { // <-- Ruta corregida aquí
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo_electronico, code, nuevaContrasena }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al cambiar la contraseña');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
