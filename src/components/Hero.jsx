import { RightArrowIcon } from '../assets/icons/icon-rightArrow';
import BACKGROUND from '../assets/img/background.webp';

export default function Hero() {
  return (
    <main className='relative h-screen'>
      <div className='absolute inset-0 z-0'>
        <img
          src={BACKGROUND}
          alt='Background'
          className='w-full h-full object-fill'
        />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center h-fit text-center pt-16  sm:px-6 lg:px-8'>
        <div className='max-w-xs sm:max-w-lg md:max-w-2xl mx-auto'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black'>
            Asegura tu cuarto, asegura tu seguridad con UStay
          </h1>
          <div className='mb-6'>
            <p className='text-md'>
              Encuentra tu hogar ideal con U Stay: cuartos seguros, accesibles y
              cerca de tu universidad, con todo lo que necesitas para estudiar y
              vivir tranquilo.
            </p>
          </div>
          <div className='flex justify-center'>
            <button className='bg-gradient-to-r from-secondary to-secondary-dark text-white px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-300'>
              <span className='text-sm sm:text-base'>Busca ahora</span>
              <RightArrowIcon className='w-4 h-4 sm:w-5 sm:h-5' />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
