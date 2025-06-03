import './App.css';
import HomePage from './presentation/pages/HomePage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RoomPage from './presentation/pages/RoomPage';
import ContactPage from './presentation/pages/ContacPage';
import FavoritePage from './presentation/pages/FavoritePage';
import Header from './presentation/components/Header';
import Footer from './presentation/components/Footer';
import Error404Page from './presentation/pages/Error404Page';
import { AuthProvider, useAuth } from '@/presentation/contexts/AuthContext';
import IMSPage from './presentation/partner/pages/IMSPage';
import Error404PageIMS from './presentation/partner/pages/Error404PageIMS';
import PartnerHeader from './presentation/partner/components/Header';
import PartnerNavbar from './presentation/partner/components/Navbar';
import Dashboard from '@/presentation/partner/content/DashboardContent'
import Property from '@/presentation/partner/content/PropertyContent'
import Room from '@/presentation/partner/content/RoomContent'
import Promotion from '@/presentation/partner/content/PromotionContent'
import Security from '@/presentation/partner/content/SecurityContent'
import Support from '@/presentation/partner/content/SupportContent'
// Add this import for EditProperty
import EditProperty from '@/presentation/partner/components/property/EditProperty';
import EditRoom from './presentation/partner/components/room/EditRoom';
import AscendPartner from './presentation/components/AscendPartner';

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // o spinner de carga

  const rolId = user?.rol_id;
  const path = location.pathname;

  // Mostrar Header/Footer si no hay usuario o si rol_id está en [1, 2, 3]
  const showHeaderFooter = !user || (rolId && [1, 2, 3].includes(rolId));

  // Ocultar Header/Footer en /IMS solo para rol_id 2
  const hideHeaderFooterInIMS = rolId === 2 && path.startsWith('/IMS');

  const displayHeaderFooter = showHeaderFooter && !hideHeaderFooterInIMS;

  // Permitir acceso a IMS solo a rol_id 2
  const canAccessIMS = rolId === 2;

  return (
    <>
      {displayHeaderFooter && <Header />}
      {rolId === 2 && path.startsWith('/IMS') && <PartnerHeader />}
      {rolId === 2 && path.startsWith('/IMS') && <PartnerNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/room/*" element={<RoomPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/favorite" element={<FavoritePage />} />

        {/* Ascend Partner */}
        <Route path="/ascendPartner" element={<AscendPartner />} />
        

        {canAccessIMS ? (
          <>
            <Route path="/IMS" element={<IMSPage />} />
            <Route path="/IMS/dashboard" element={<Dashboard />} />
            <Route path="/IMS/property" element={<Property />} />
            <Route path="/IMS/property/editar-propiedad/:id" element={<EditProperty />} />
            <Route path="/IMS/room/editar-cuarto/:id" element={<EditRoom />} />
            <Route path="/IMS/room" element={<Room />} />
            <Route path="/IMS/promotion" element={<Promotion />} />
            <Route path="/IMS/security" element={<Security />} />
            <Route path="/IMS/support" element={<Support />} />
            <Route path="/IMS/*" element={<Error404PageIMS />} />
          </>
        ) : (
          <Route path="/IMS/*" element={<Navigate to="/home" replace />} />
        )}

        {/* Ruta catch-all general para otras rutas */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
      {displayHeaderFooter && <Footer className="mt-auto" />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
