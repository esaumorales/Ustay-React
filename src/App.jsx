import './App.css';
import HomePage from './presentation/pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import RoomPage from './presentation/pages/RoomPage';
import ContactPage from './presentation/pages/ContacPage';
import FavoritePage from './presentation/pages/FavoritePage';
import Header from './presentation/components/Header';
import Footer from './presentation/components/Footer';
import Error404Page from './presentation/pages/Error404Page';
import { AuthProvider } from '@/presentation/contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path='/'
                    element={
                        <Navigate to='/home' replace />
                    } />
                <Route path='/home'
                    element={<HomePage />} />
                <Route path='/room/*'
                    element={<RoomPage />} />
                <Route path='/contact'
                    element={<ContactPage />} />
                <Route path='/favorite'
                    element={<FavoritePage />} />
                {/* -------------- */}
                <Route path='*'
                    element={<Error404Page />} />
            </Routes>
            <Footer className='mt-auto' />
        </AuthProvider>
    );
}

export default App;
