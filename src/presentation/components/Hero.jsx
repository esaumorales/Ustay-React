import { RightArrowIcon } from '@/presentation/assets/icons/icon-rightArrow';
import BACKGROUND from '@/presentation/assets/img/background.webp';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <main className='relative h-screen flex flex-col'>
      <div className='relative z-10 flex flex-col items-center justify-center h-fit text-center pt-16  sm:px-6 lg:px-8'>
        <div className='max-w-xs sm:max-w-lg md:max-w-2xl mx-auto '>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black'>
            Asegura tu cuarto, asegura tu seguridad con UStay
          </h1>
          <div className='mb-6 mt-6'>
            <p className='text-md'>
              Encuentra tu hogar ideal con U Stay: cuartos seguros, accesibles y
              cerca de tu universidad, con todo lo que necesitas para estudiar y
              vivir tranquilo.
            </p>
          </div>
        </div>
        <div className='flex justify-center w-full px-4 '>
          <Link
            to='/room'
            className='w-full sm:w-auto bg-gradient-to-r from-secondary to-secondary-dark text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300'>
            <span>Busca ahora</span>
            <RightArrowIcon className='w-5 h-5' />
          </Link>
        </div>
      </div>
      <div className='relative'>
        <img
          src={BACKGROUND}
          alt='Background'
          className='w-full h-full object-fill'
        />
        <div className='absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent'></div>
      </div>
    </main>
  );
}
