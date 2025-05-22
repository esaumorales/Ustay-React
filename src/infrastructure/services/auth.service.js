import { API_URL, headers } from '../config/api.config';

export class AuthService {
  // Función para iniciar sesión con Google
  static loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
  }

  // Función para manejar el callback de Google
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
      const userId = data.usuario.id; // Asegúrate de que esto esté correcto

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Almacena el userId


      return data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      // Formatear los datos del usuario para coincidir con el backend
      const formattedUserData = {
        nombre: userData.nombre,
        apellido_pa: userData.apellido_pa,
        apellido_ma: userData.apellido_ma,
        correo_electronico: userData.email,
        contrasena: userData.password,
        rol_id: 1, // Asumiendo que 1 es para usuarios normales
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

      return data;
    } catch (error) {
      console.error('Error detallado:', error);
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
