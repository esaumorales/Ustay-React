import { RightArrowIcon } from '@/presentation/assets/icons/icon-rightArrow';
import BACKGROUNDPARTNER from '@/presentation/assets/img/background-partner.webp';
import LOGOMUNI from '@/presentation/assets/img/logo_lurigancho_chosica.webp';
import LOGOUPEU from '@/presentation/assets/img/logo_upeu.webp';
import LOGOSUNAT from '@/presentation/assets/img/logo_sunat.webp';

import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div>
      <div className='flex items-center flex-col bg-[#EFF6FF] py-8'>
        <div>
          <span className='text-xl font-bold'>
            Ellos confian en nosotros o Certificado por....
          </span>
        </div>
        <div className='flex gap-8 items-center'>
          <img src={LOGOMUNI} alt="Logo_Municipalidad_Lurigancho" className='w-full h-full' />
          <img src={LOGOUPEU} alt="Logo_UPeU" className='w-full h-full'  />
          <img src={LOGOSUNAT} alt="Logo_Sunat" className='w-full h-full'  />
        </div>
      </div>
      <div className='relative min-h-[83vh] w-screen h-screen'>
        <div className='flex flex-col lg:flex-row items-center h-full'>
          <div className='w-full lg:w-[55%] h-[300px] lg:h-full'>
            <img
              src={BACKGROUNDPARTNER}
              alt='img partner'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full h-full lg:w-[45%] px-16 space-y-10 bg-secondary'>
            <div className='flex items-center gap-2'>
              <p className='text-gray-400 text-sm md:text-base font-medium mt-8'>
                Conviertete en Partner
              </p>
            </div>
            <div>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
                PUBLICA TUS HABITACIONES DE FORMA SIMPLE, ORGANIZADA Y SEGURA.
              </h2>
            </div>
            <hr className='text-gray-800' />
            <div>
              <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-xl'>
                Sé parte de nuestra comunidad de aliados y publica habitaciones
                disponibles a través de una plataforma pensada para brindar claridad,
                confianza y orden. Te ofrecemos una manera simple y estructurada de
                mostrar tus espacios a quienes los necesitan.
              </p>
            </div>
            <div>
              <Link to="/ascendPartner">
                <button className='w-full sm:w-auto bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-sm flex items-center justify-center sm:justify-start gap-3 hover:shadow-lg transition-all duration-300'>
                  <span>Conocer más</span>
                  <RightArrowIcon className='w-5 h-5' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}