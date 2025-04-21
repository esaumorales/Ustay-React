import './App.css';
import HomePage from './pages/HomePage';
import {Navigate, Route, Routes} from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import ContactPage from './pages/ContacPage';
import FavoritePage from './pages/FavoritePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <>
        <Header/>
        <Routes>
            <Route path='/'
                element={
                    <Navigate
                to='/home'
                replace/>
                }/>
            <Route path='/home'
                element={<HomePage/>}/>
            <Route path='/room/*'
                element={<RoomPage/>}/>
            <Route path='/contact'
                element={<ContactPage/>}/>
            <Route path='/favorite'
                element={<FavoritePage/>}/>
        </Routes>
        <Footer className='mt-auto' />
        </>
    );
}

export default App;
