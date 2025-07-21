import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/presentation/contexts/AuthContext';
import HomeSection from '@/presentation/sections/HomeSection';

export default function HomePage() {
  const { handleGoogleLogin, user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('token=')) {
      handleGoogleLogin().finally(() => {
        window.history.replaceState(null, '', '/home');
      });
    }
  }, [location.search, handleGoogleLogin]);

  if (loading) {
    return <p className="text-center mt-10">Cargando usuario...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HomeSection user={user || null} />
      </main>
    </div>
  );
}
