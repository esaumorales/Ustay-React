export default function Footer() {
  return (
    <footer className='bg-secondary-dark'>
      <div className=' flex justify-between mx-32 my-8 text-white'>
        <div className='flex flex-wrap gap-16'>
          <div className='flex flex-col gap-2'>
            <div>
              <h1 className='font-bold'>U Stay</h1>
              <p className='font-light'>
                "Tu espacio seguro, cerca de todo lo que necesitas."
              </p>
            </div>
            <div>
              <p className='font-semibold'>U Stay - Oficina Central</p>
              <p className='font-light'>
                Calle Ejemplo 123, Ciudad Universitaria, Ciudad XYZ, País
              </p>
            </div>
            <div className='flex gap-2'>
              <p className='font-semibold'>Tel:</p>
              <p className='font-light'>+123 456 7890</p>
            </div>
            <div className='flex gap-2'>
              <p className='font-semibold'>Email:</p>
              <p className='font-light'>contacto@ustay.com</p>
            </div>
            <div>
              <h1 className='font-semibold'>Horario de atención:</h1>
              <p className='font-light'>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p className='font-light'>Sábados: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
          <div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <h1>Enlaces rápidos</h1>
                <p>Términos y Condiciones</p>
                <p>Política de Privacidad</p>
                <p>Preguntas Frecuentes (FAQ)</p>
                <p>Mapa del Sitio</p>
                <p>Libro de reclamaciones</p>
              </div>
              <div>ICONS</div>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <div>
            <div className='flex flex-col  place-items-end'>
              <h1 className='font-semibold'>Descarga la app</h1>
              <div>ICONS</div>
              <div>IMG</div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-32 my-4'>
        <div>
          <hr className='text-gray-400' />
        </div>
        <div className='text-white'>
          <p className='font-semibold'>
            © 2025 U Stay. Todos los derechos reservados.
          </p>
          <p className='font-light'>
            U Stay S.A.C. - Calle Ejemplo 123, Ciudad Universitaria, Ciudad XYZ,
            País
          </p>
        </div>
      </div>
    </footer>
  );
}
