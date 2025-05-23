import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Favorite from '@/presentation/components/favorite/Favorite';
import { useAuth } from '@/presentation/contexts/AuthContext';

export const FavoriteSection = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setIsLoggedIn(isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, []);

    return (
        <div className='py-16 px-24 min-h-screen flex flex-col'>
            {isLoggedIn ? (
                <>
                    <Favorite />
                </>
            ) : (
                <div className='flex justify-center items-center h-full'>
                    <FaUserCircle className='text-6xl text-gray-400' />
                    <p className='text-xl text-gray-600 ml-4'>Por favor, inicia sesión para ver tus favoritos.</p>
                </div>
            )}
        </div>
    );
};