import { IconInstragram } from '../assets/icons/icon-instragram';
import { IconWhatsapp } from '../assets/icons/icon-whatsapp';
import { IconApple } from '../assets/icons/icon-apple';
import { IconFacebook } from '../assets/icons/icon-facebook';
import { IconPlayStore } from '../assets/icons/icon-play-store';

export default function Footer() {
  return (
    <footer className='bg-secondary-dark'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <div className='flex flex-wrap justify-around gap-8 text-white'>
          {/* Company Info */}
          <div className='w-[45%] lg:w-auto space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-xl font-bold'>U Stay</h1>
              <p className='text-sm text-white/80'>
                "Tu espacio seguro, cerca de todo lo que necesitas."
              </p>
            </div>
            <div className='space-y-2'>
              <p className='font-semibold'>U Stay - Oficina Central</p>
              <p className='text-sm text-white/80'>
                Calle Ejemplo 123, Ciudad Universitaria, Ciudad XYZ, País
              </p>
            </div>
            <div className='space-y-2'>
              <div className='flex gap-2'>
                <p className='font-semibold'>Tel:</p>
                <p className='text-white/80'>+123 456 7890</p>
              </div>
              <div className='flex gap-2'>
                <p className='font-semibold'>Email:</p>
                <p className='text-white/80'>contacto@ustay.com</p>
              </div>
            </div>
            <div className='space-y-1'>
              <h1 className='font-semibold'>Horario de atención:</h1>
              <p className='text-sm text-white/80'>
                Lunes a Viernes: 9:00 AM - 6:00 PM
              </p>
              <p className='text-sm text-white/80'>
                Sábados: 10:00 AM - 2:00 PM
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='w-[45%] lg:w-auto space-y-6'>
            <div className='space-y-3'>
              <h1 className='text-lg font-semibold'>Enlaces rápidos</h1>
              <nav className='flex flex-col space-y-2'>
                <a
                  href='#'
                  className='text-sm sm:text-base text-white/80 hover:text-white transition-colors'>
                  Términos y Condiciones
                </a>
                <a
                  href='#'
                  className='text-sm sm:text-base text-white/80 hover:text-white transition-colors'>
                  Política de Privacidad
                </a>
                <a
                  href='#'
                  className='text-sm sm:text-base text-white/80 hover:text-white transition-colors'>
                  Preguntas Frecuentes (FAQ)
                </a>
                <a
                  href='#'
                  className='text-sm sm:text-base text-white/80 hover:text-white transition-colors'>
                  Mapa del Sitio
                </a>
                <a
                  href='#'
                  className='text-sm sm:text-base text-white/80 hover:text-white transition-colors'>
                  Libro de reclamaciones
                </a>
              </nav>
            </div>
            <div className='flex gap-4'>
              <nav className='flex flex-wrap gap-4'>
                <IconFacebook className='w-8 h-8' />
                <IconWhatsapp className='w-8 h-8' />
                <IconInstragram className='w-8 h-8' />
                <IconApple className='w-8 h-8' />
              </nav>
            </div>
          </div>

          {/* App Download */}
          <div className='w-full lg:w-auto lg:flex lg:justify-end'>
            <div className='space-y-4 flex flex-col items-center lg:items-end'>
              <h1 className='text-lg font-semibold'>Descarga la app</h1>
              <div className='flex gap-4 '>
                <IconApple className='w-8 h-8 text-gray-400' />
                <IconPlayStore className='w-8 h-8 text-gray-400' />
              </div>
              <div>
                {/* Add your QR code or app preview image here */}
                IMG
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='mx-30 border-t border-white/10'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='space-y-2 text-sm text-white/80'>
            <p className='font-semibold'>
              © 2025 U Stay. Todos los derechos reservados.
            </p>
            <p>
              U Stay S.A.C. - Calle Ejemplo 123, Ciudad Universitaria, Ciudad
              XYZ, País
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
