import { Outlet } from 'react-router-dom';
import Profile from '../components/profile/Profile';

export default function ProfilePage() {
    return (
        <div className='flex flex-row justify-between h-screen mt-8 mx-24 gap-8'>
            <div>
                <Profile />
            </div>
            <span className='block w-[1px]  bg-gray-700'></span>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}
