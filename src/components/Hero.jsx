import { RightArrowIcon } from '../assets/icons/icon-rightArrow';
import BACKGROUND from '../assets/img/background.webp';

export default function Hero() {
  return (
    <main className='relative h-screen'>
      <div className='absolute inset-0 z-0'>
        <img
          src={BACKGROUND}
          alt='Background'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='relative z-10 flex flex-col items-center justify-center pt-24 text-center px-4'>
        <div className='max-w-2xl'>
          <h1 className='text-5xl font-bold mb-4'>
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
            <button className='bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 py-2 rounded-full flex items-center gap-2'>
              Busca ahora
              <RightArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
