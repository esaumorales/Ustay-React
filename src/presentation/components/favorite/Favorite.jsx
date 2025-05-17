import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '@/infrastructure/services/favorite.service';
import FavoriteTable from './FavoriteTable';
import defaultRoomImg from '@/presentation/assets/img/room.png'; // Importa la imagen por defecto
import { FiAlertCircle } from "react-icons/fi";
import { useAuth } from '@/presentation/contexts/AuthContext';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const { isAuthenticated } = useAuth();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!isAuthenticated) {
            setFavorites([]);
            return;
        }
        const fetchFavorites = async () => {
            if (userId) {
                try {
                    const favoritesData = await getFavorites(userId);
                    // Mapea los datos del backend al formato esperado por la tabla
                    const mappedFavorites = (favoritesData.favoritos || []).map(fav => ({
                        id: fav.favorito_id,
                        thumbnail: fav.image || defaultRoomImg, // Usa imagen por defecto si no hay
                        address: fav.direccion_propiedad,
                        partner: fav.partner || 'No especificado', // Ajusta si tienes el dato
                        type: fav.nombre_cuarto,
                        price: `S/ ${fav.precio}/Mes`
                    }));
                    setFavorites(mappedFavorites);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, [isAuthenticated, userId]);

    const handleDeleteFavorite = async (favoriteId) => {
        try {
            await removeFavorite(favoriteId);
            setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
        } catch (error) {
            console.error('Error eliminando favorito:', error);
        }
    };

    return (
        <div className="">
            <h2 className="text-xl font-medium mb-4">Favoritos</h2>
            {favorites && favorites.length === 0 ? (
                <div className='flex items-center text-center flex-col gap-2'>
                    <p className="text-sm text-center text-gray-500"> 
                        <FiAlertCircle size={14} />
                    </p>
                    <p className="text-sm text-center text-gray-500">No tienes favoritos agregados.</p>
                </div>
            ) : (
                <FavoriteTable favorites={favorites} onDelete={handleDeleteFavorite} />
            )}
        </div>
    );
};

export default Favorite;
