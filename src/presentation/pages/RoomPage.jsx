import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/presentation/contexts/AuthContext';
import RoomSection from '@/presentation/sections/RoomSection';

export default function RoomPage() {
  const { handleGoogleLogin, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('token=')) {
      handleGoogleLogin();
      // Opcional: limpiar la URL para no mostrar el token
      window.history.replaceState(null, '', '/room');
    }
  }, [location.search, handleGoogleLogin]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <RoomSection user={user || null} />
      </main>
    </div>
  );
}
