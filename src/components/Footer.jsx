export default function Footer() {
  return (
    <footer className='bg-secondary-dark'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white'>
          {/* Company Info */}
          <div className='space-y-6'>
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
              <p className='text-sm text-white/80'>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p className='text-sm text-white/80'>Sábados: 10:00 AM - 2:00 PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-6'>
            <div className='space-y-3'>
              <h1 className='text-lg font-semibold'>Enlaces rápidos</h1>
              <nav className='flex flex-col space-y-2'>
                <a href="#" className='text-white/80 hover:text-white transition-colors'>Términos y Condiciones</a>
                <a href="#" className='text-white/80 hover:text-white transition-colors'>Política de Privacidad</a>
                <a href="#" className='text-white/80 hover:text-white transition-colors'>Preguntas Frecuentes (FAQ)</a>
                <a href="#" className='text-white/80 hover:text-white transition-colors'>Mapa del Sitio</a>
                <a href="#" className='text-white/80 hover:text-white transition-colors'>Libro de reclamaciones</a>
              </nav>
            </div>
            <div className='flex gap-4'>
              {/* Add your social media icons here */}
              ICONS
            </div>
          </div>

          {/* App Download */}
          <div className='lg:flex lg:justify-end'>
            <div className='space-y-4'>
              <h1 className='text-lg font-semibold'>Descarga la app</h1>
              <div className='flex gap-4'>
                {/* Add your app store icons here */}
                ICONS
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
      <div className='border-t border-white/10'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='space-y-2 text-sm text-white/80'>
            <p className='font-semibold'>
              © 2025 U Stay. Todos los derechos reservados.
            </p>
            <p>
              U Stay S.A.C. - Calle Ejemplo 123, Ciudad Universitaria, Ciudad XYZ,
              País
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
