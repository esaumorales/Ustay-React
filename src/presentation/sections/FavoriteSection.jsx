import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Favorite from '@/presentation/components/favorite/Favorite';


export const FavoriteSection = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, []);

    return (
        <div className='min-h-screen flex flex-col'>
            {isLoggedIn ? (
                <div className='flex-1'>
                    {/* Aquí va el contenido de la sección de favoritos */}
                    <h1>Tus Favoritos</h1>
                    {/* Añade aquí el contenido que deseas mostrar a los usuarios logueados */}
                </div>
            ) : (
                <div className='flex justify-center items-center h-full'>
                    <FaUserCircle className='text-6xl text-gray-400' />
                    <p className='text-xl text-gray-600 ml-4'>Por favor, inicia sesión para ver tus favoritos.</p>
                </div>
            )}
        </div>
    );
};

return (
    <div className='py-16 px-24 min-h-screen'>
        <h1>Tus Favoritos</h1>
        <Favorite />
    </div>
);
};