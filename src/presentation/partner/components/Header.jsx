import { IconLogo } from '@/presentation/assets/icons/icon-logo'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='bg-secondary shadow-sm h-18 flex justify-between text-white px-14'>
            <div className='flex items-center justify-center'>
                <IconLogo className='h-12 w-12' />
                <span className='text-4xl font-logo'>IMS</span>
            </div>
            <div className='flex items-center'>
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