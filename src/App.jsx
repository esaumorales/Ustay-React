import './App.css';
import HomePage from './pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />

      <Route path='/home' element={<HomePage />} />
      

      {/* Ruta por defecto (ejemplo: 404) */}
      {/* <Route path='*' element={<Navigate to='/home' replace />} /> */}
    </Routes>
  );
}

export default App;
