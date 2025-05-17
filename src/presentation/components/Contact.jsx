import { RightArrowIcon } from '@/presentation/assets/icons/icon-rightArrow';
import BACKGROUNDPARTNER from '@/presentation/assets/img/background-partner.webp';

export default function Contact() {
  return (
    <div className='relative w-full min-h-[83vh] bg-white my-4'>
      <div className='flex flex-col lg:flex-row items-center h-full'>
        <div className='w-full lg:w-[55%] h-[300px] lg:h-full'>
          <img
            src={BACKGROUNDPARTNER}
            alt='img partner'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='w-full lg:w-[45%] px-4 md:px-8 lg:px-16 py-8 space-y-6 lg:space-y-8 bg-white lg:ml-[-240px] lg:p-8'>
          <div className='flex items-center gap-2'>
            <p className='text-secondary text-sm md:text-base font-medium font-bold'>
              Llego tu momento
            </p>
          </div>
          <div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
              Se nuestro partner
            </h2>
          </div>
          <div>
            <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-xl'>
              Conviértete en nuestro partner y accede a una amplia gama de
              beneficios exclusivos. Publica y promociona nuestros servicios de
              alquiler de habitaciones y departamentos y sé parte de una alianza
              estratégica que impulsará tus servicios de alojamiento.
            </p>
          </div>
          <div>
            <button className='w-full sm:w-auto bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full flex items-center justify-center sm:justify-start gap-3 hover:shadow-lg transition-all duration-300'>
              <span>Conocer más</span>
              <RightArrowIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
