import './App.css';
import HomePage from './pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import ContactPage from './pages/ContacPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/room/*' element={<RoomPage />} />
      <Route path='/contact' element={<ContactPage />} />
    </Routes>
  );
}

export default App;
