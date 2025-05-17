import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@/infrastructure/services/auth.service';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('token');
    });
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        let isSubscribed = true;
        
        const loadProfile = async () => {
            if (token) {
                try {
                    const response = await AuthService.getProfile(token);
                    
                    if (!isSubscribed) return;
                    
                    if (response && response.user) {
                        const userData = response.user;
                        setUser(userData);
                        setIsAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(userData));
                    } else {
                        throw new Error('Datos de usuario no válidos');
                    }
                } catch (error) {
                    console.error('Error al cargar perfil:', error);
                    if (isSubscribed) {
                        logout();
                    }
                }
            }
        };

        loadProfile();
        
        return () => {
            isSubscribed = false;
        };
    }, [token]);

    const login = async (credentials) => {
        try {
            const response = await AuthService.login(credentials);
            
            if (!response || !response.token || !response.usuario) {
                throw new Error('Respuesta inválida del servidor');
            }
            
            const userData = {
                usuario_id: response.usuario.id,
                rol_id: response.usuario.rol,
                nombre: response.usuario.nombre,
                correo_electronico: response.usuario.correo
            };
            
            setToken(response.token);
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return response;
        } catch (error) {
            console.error('Error durante el login:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        try {
            if (!userData || !userData.email || !userData.password) {
                throw new Error('Datos de registro incompletos');
            }

            const response = await AuthService.register(userData);
            
            if (!response) {
                throw new Error('Error en el registro: No se recibió respuesta del servidor');
            }
            
            return response;
        } catch (error) {
            console.error('Error durante el registro:', error);
            throw new Error(error.message || 'Error en el registro. Por favor, intenta de nuevo.');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            token,
            login,
            register,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Cambiar la exportación del hook useAuth
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export { useAuth };