import { Routes, Route } from 'react-router-dom';
import RoomList from '@/presentation/components/room/RoomList';
import { RoomDetail } from '@/presentation/components/room/RoomDetail';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { useModal } from '@/presentation/hooks/useModal';
import ModalLogin from '@/presentation/components/ModalLogin';
import CompareRoom from '@/presentation/components/room/CompareRoom';
import { useLocation } from 'react-router-dom';
import { fetchRoomById } from '@/infrastructure/services/room.service';
import { useState, useEffect } from 'react';

function ProtectedRoomDetail() {
  const { isAuthenticated } = useAuth();
  const loginModal = useModal();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Acceso Denegado
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Para ver los detalles de este cuarto, necesitas iniciar sesión primero o iniciar sesion.
        </p>
        <button
          onClick={loginModal.openModal}
          className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Iniciar Sesión
        </button>
        
        <ModalLogin 
          isOpen={loginModal.isOpen}
          onClose={loginModal.closeModal}
        />
      </div>
    );
  }

  return <RoomDetail />;
}

function CompareRoomPage() {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ids = params.get('ids')?.split(',').map(id => id.trim()).filter(Boolean) || [];
    if (ids.length === 0) {
      setRooms([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(ids.map(id => fetchRoomById(id).then(data => data.cuarto)))
      .then(setRooms)
      .finally(() => setLoading(false));
  }, [location.search]);

  if (loading) return <div>Cargando comparación...</div>;
  return <CompareRoom rooms={rooms} />;
}

export default function RoomSection() {
  return (
    <section className='min-h-screen my-8'>
      <Routes>
        <Route index element={<RoomList />} />
        <Route path=":id" element={<ProtectedRoomDetail />} />
        <Route path="compare" element={<CompareRoomPage />} />
      </Routes>
    </section>
  );
}
