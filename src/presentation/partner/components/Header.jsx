import { IconLogo } from '@/presentation/assets/icons/icon-logo'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='bg-[#111827] shadow-sm border-t-1'>
            <div className='m-4 flex justify-between items-center text-white'>
                <div className='flex items-center'>
                    <IconLogo className='h-12 w-12' />
                    <span className='text-4xl font-logo'>IMS</span>
                </div>
                <Link 
                to='/home'
                >
                <button className='border border-white rounded px-3 py-1 hover:bg-white hover:text-black transition-colors'>
                    Ir a vista de usuario
                </button>
                </Link>
            </div>
        </div>
    )
}