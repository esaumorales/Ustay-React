import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { useModal } from '@/presentation/hooks/useModal';
import ModalLogin from '@/presentation/components/ModalLogin';
import RoomDetail from '@/presentation/components/room/RoomDetail'; // Cambiado a importación por defecto

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const loginModal = useModal();

    if (!isAuthenticated) {
        loginModal.openModal();
        return (
            <>
                <Navigate to="/home" />
                <ModalLogin 
                    isOpen={loginModal.isOpen}
                    onClose={loginModal.closeModal}
                />
            </>
        );
    }

    return children;
}

// En tus rutas
const router = createBrowserRouter([
    // ... existing code ...
    {
        path: '/room/:id',
        element: (
            <ProtectedRoute>
                <RoomDetail />
            </ProtectedRoute>
        )
    },
    // ... existing code ...
]);

export default router;