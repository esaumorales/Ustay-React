// const API_URL = 'http://localhost:3000/favorito'; 
const API_URL = 'https://ustay-backend.up.railway.app/favorito'; 


// Obtener favoritos del usuario
export const getFavorites = async (userId) => {
    const token = localStorage.getItem('authToken'); // O sessionStorage.getItem('authToken')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(`${API_URL}/usuario/${userId}`, { headers });
        if (!response.ok) {
            throw new Error('Error al obtener favoritos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        throw error;
    }
};

// Agregar un favorito
export const addFavorite = async (userId, cuartoId) => { 
    const token = localStorage.getItem('authToken'); // O sessionStorage.getItem('authToken')
    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
    }; 

    const favoriteData = { 
        usuario_id: userId, 
        cuarto_id: cuartoId 
    }; 

    try { 
        const response = await fetch(`${API_URL}`, { 
            method: 'POST', 
            headers, 
            body: JSON.stringify(favoriteData),
        }); 
        if (!response.ok) { 
            throw new Error('Error al agregar favorito'); 
        } 
        return await response.json(); 
    } catch (error) { 
        console.error('Error al agregar favorito:', error); 
        throw error; 
    } 
};

// Eliminar un favorito
export const removeFavorite = async (favoriteId) => {
    const token = localStorage.getItem('authToken'); // O sessionStorage.getItem('authToken')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await fetch(`${API_URL}/${favoriteId}`, { // Cambia la URL si es necesario
            method: 'DELETE',
            headers,
        });
        if (!response.ok) {
            throw new Error('Error al eliminar favorito');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
        throw error;
    }
};
