import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService } from '@/infrastructure/services/auth.service';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!token);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate('/home');
  }, [navigate]);

  const loadProfile = useCallback(async (currentToken = token) => {
    setLoading(true);
    if (!currentToken) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.getProfile(currentToken);
      const userData = response.user || response.usuario || response;

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        if (userData.usuario_id || userData.id) {
          localStorage.setItem('userId', userData.usuario_id || userData.id);
        }
      } else {
        throw new Error('Datos de usuario no válidos');
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      if (user) logout();
    } finally {
      setLoading(false);
    }
  }, [token, user, logout]);

  useEffect(() => {
    loadProfile();
  }, [token, loadProfile]);

  const login = useCallback(async (credentials) => {
    try {
      const response = await AuthService.login(credentials);

      if (!response || !response.token || !response.usuario) {
        throw new Error('Respuesta inválida del servidor');
      }

      const userData = response.usuario;
      setToken(response.token);
      localStorage.setItem('token', response.token);

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.id || userData.usuario_id) {
        localStorage.setItem('userId', userData.id || userData.usuario_id);
      }

      return response;
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      if (!userData || !userData.email || !userData.password) {
        throw new Error('Datos de registro incompletos');
      }

      const response = await AuthService.register(userData);
      if (!response) throw new Error('Error en el registro');

      return response;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const response = await AuthService.handleGoogleCallback();
      if (response) {
        const { token: googleToken, usuario: userData } = response;

        if (!googleToken) {
          throw new Error('No se recibió token en el callback de Google');
        }

        setToken(googleToken);
        localStorage.setItem('token', googleToken);

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
          if (userData.usuario_id || userData.id) {
            localStorage.setItem('userId', userData.usuario_id || userData.id);
          }
        } else {
          await loadProfile(googleToken);
        }
      }
    } catch (error) {
      console.error('Error durante el login con Google:', error);
    }
  }, [loadProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        loading,
        login,
        register,
        logout,
        setToken,
        loginWithGoogle: AuthService.loginWithGoogle,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export { useAuth };
