import { API_URL, headers } from '../config/api.config';

export class AuthService {
  static loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
  }

  static async handleGoogleCallback() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return null;

    localStorage.setItem('token', token);

    try {
      const response = await fetch(`${API_URL}/usuario/perfil`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener el perfil del usuario');

      const userData = await response.json();

      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.id || userData.usuario_id);
        localStorage.setItem('fotoGoogle', userData.foto_google);
        return userData;
      }

      return null;
    } catch (error) {
      console.error('Error al manejar el callback de Google:', error);
      throw error;
    }
  }

  static async login(credentials) {
    try {
      const formattedCredentials = {
        correo_electronico: credentials.email,
        contrasena: credentials.password,
      };

      const response = await fetch(`${API_URL}/usuario/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formattedCredentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error en la autenticación');
      }

      const data = await response.json();
      const token = data.token;
      const userId = data.usuario.id || data.usuario.usuario_id;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      return data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const formattedUserData = {
        nombre: userData.nombre,
        apellido_pa: userData.apellido_pa,
        apellido_ma: userData.apellido_ma,
        correo_electronico: userData.email,
        contrasena: userData.password,
        rol_id: 1,
      };

      const response = await fetch(`${API_URL}/usuario/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formattedUserData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // No guardamos el token aquí porque primero necesitamos verificar el correo
      return {
        success: true,
        message: data.message,
        email: formattedUserData.correo_electronico,
      };
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }

  static async verifyEmail(email, code) {
    try {
      const response = await fetch(`${API_URL}/usuario/verify-email`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          correo_electronico: email,
          codigo: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la verificación del correo');
      }

      // Guardar token y datos del usuario después de la verificación exitosa
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.usuario.id || data.usuario.usuario_id);
        localStorage.setItem('user', JSON.stringify(data.usuario));
      }

      return data;
    } catch (error) {
      console.error('Error en la verificación:', error);
      throw error;
    }
  }

  static async getProfile(token) {
    try {
      const response = await fetch(`${API_URL}/usuario/perfil`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el perfil');
      }

      return data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }
}
