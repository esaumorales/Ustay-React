import './App.css';
import HomePage from './pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import ContactPage from './pages/ContacPage';
import { RoomDetail } from './components/room/RoomDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />

      <Route path='/home' element={<HomePage />} />

      <Route path='/room' element={<RoomPage />} />

      <Route path='/contact' element={<ContactPage />} />

      {/* ---------------- */}

      <Route path="/room/:id" element={<RoomDetail />} />

      {/* Ruta por defecto (ejemplo: 404) */}
      {/* <Route path='*' element={<Navigate to='/home' replace />} /> */}
    </Routes>
  );
}

export default App;
