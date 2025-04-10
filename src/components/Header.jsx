import { Link } from 'react-router-dom';
import { IconLogo } from '../assets/icons/icon-logo';

export default function Header() {
  return (
    <header className='mt-4'>
      <div className='flex justify-around items-center'>
        <div className='flex flex-wrap items-center'>
          <IconLogo className='w-10 h-10' />
          <p className='text-3xl font-medium'>Stay</p>
        </div>
        <div className='flex gap-4 px-4 py-3 rounded-3xl bg-secondary'>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-2 rounded-xl'>
            Home
          </Link>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-2 rounded-xl'>
            Encuentra Tu cuarto
          </Link>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-2 rounded-xl'>
            Nosotros
          </Link>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-2 rounded-xl'>
            Asociados
          </Link>
        </div>
        <div className='flex gap-4'>
          <button>Iniciar Sesion</button>
          <button className='rouded-xl border border-secondary rounded-xl p-1'>
            ¡Registrate Ahora!
          </button>
        </div>
      </div>
    </header>
  );
}
