import React, { useEffect, useState } from 'react';
import { getFavorites } from '@/infrastructure/services/favorite.service';
import FavoriteTable from './FavoriteTable';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem('userId'); // Asegúrate de que el userId esté almacenado en localStorage
    const isLoggedIn = userId !== null; // Determina si el usuario está logueado

    useEffect(() => {
        const fetchFavorites = async () => {
            if (isLoggedIn) {
                try {
                    const favoritesData = await getFavorites(userId);
                    setFavorites(favoritesData);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, [userId, isLoggedIn]);

    return (
        <div className="">
            <h2 className="text-xl font-medium mb-4">Favoritos</h2>
            {!isLoggedIn ? (
                <p className="text-sm text-center text-gray-500">Por favor, inicie sesión para ver sus favoritos</p>
            ) : favorites.length === 0 ? (
                <p className="text-sm text-center text-gray-500">No hay favoritos</p>
            ) : (
                <FavoriteTable favorites={favorites} />
            )}
        </div>
    );
};

export default Favorite;
