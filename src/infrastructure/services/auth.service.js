import { API_URL, headers } from '../config/api.config';

export class AuthService {
  static async login(credentials) {
    try {
      const formattedCredentials = {
        correo_electronico: credentials.email,
        contrasena: credentials.password,
      };

      console.log('Credenciales formateadas:', formattedCredentials);

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

      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId); // Almacena el userId

      console.log(
        'Inicio de sesión exitoso, token y userId guardados:',
        token,
        userId
      );
      console.log('USERID', userId);

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

      console.log('Intentando registro con:', formattedUserData);
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
