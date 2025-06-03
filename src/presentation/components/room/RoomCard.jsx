import { useNavigate } from 'react-router-dom';
import { IconBath } from '@/presentation/assets/icons/icon-bath';
import { IconBed } from '@/presentation/assets/icons/icon-bed';
import { IconLocation } from '@/presentation/assets/icons/icon-location';
import { IconParking } from '@/presentation/assets/icons/icon-parking';
import { IconWifi } from '@/presentation/assets/icons/icon-wifi';

import ROOM from '@/presentation/assets/img/room.png';

export const RoomCard = ({
  id,
  image,
  type,
  location,
  price,
  periodo,
  rating = 4,
  destacado = false,
  amenities = {
    wifi: false,
    parking: false,
    bed: false,
    bath: false,
    location: false,
  }
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/room/${id}`);
  };

  const getAmenities = (amenities) => {
    const result = [];
    const { wifi, parking, bed, bath, location } = amenities;

    if (wifi) result.push(IconWifi);
    if (parking) result.push(IconParking);
    if (bed) result.push(IconBed);
    if (bath) result.push(IconBath);
    if (location) result.push(IconLocation);

    return result;
  };

  return (
    <div
      onClick={handleCardClick}
      className='bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform w-full cursor-pointer hover:scale-[1.02]'
    >
      <div>
        <div className='relative h-56 overflow-hidden'>
          {destacado && (
            <div className='absolute top-2 left-2 z-10'>
              <span className='bg-green-500 text-white px-2 py-1 text-sm font-medium rounded'>
                DESTACADO
              </span>
            </div>
          )}
          <img
            src={image || ROOM}  // IMPORTANTE: image debe ser string URL válida o undefined
            alt={type}
            className='w-full h-full object-cover transition-transform duration-500 ease-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
        </div>
        <div className='absolute mt-[-32px] mx-2'>
          <div className='flex justify-between items-center '>
            <div className='flex items-baseline text-white '>
              <span className='text-sm font-medium'>S/.</span>
              <span className='font-light text-xl'>{price}</span>
              <span className='text-sm text-white ml-1'>/{periodo}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <h3 className='font-medium text-lg mb-1'>{type}</h3>
        <p className='text-gray-600 text-sm mb-2'>{location}</p>
        {/* <p className='text-gray-600 text-sm mb-2'>Disponibilidad: {disponibilidad === 1 ? 'No Disponible' : 'Disponible'}</p> */}

        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>{rating}</span>
            <span className='text-yellow-400'>★</span>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              {getAmenities(amenities).map((Icon, index) => (
                <div key={index} className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center'>
                  <Icon className='w-4 h-4 text-gray-600' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Ejemplo de uso ---
// const exampleRoom = {
//   cuarto_id: 1,
//   fotos: [{ url_imagen: 'https://ejemplo.com/imagen1.jpg' }],
//   tipo_cuarto: 'Doble',
//   direccion_propiedad: 'Av. Siempre Viva 123',
//   precio: 120,
//   periodo: 'noche',
//   rating: 4.5,
//   destacado: true,
//   servicios: [{ servicio: 'WiFi' }, { servicio: 'Parking' }],
// };

// <RoomCard
//   id={exampleRoom.cuarto_id}
//   image={exampleRoom.fotos && exampleRoom.fotos.length > 0 ? exampleRoom.fotos[0].url_imagen : undefined}
//   type={exampleRoom.tipo_cuarto}
//   location={exampleRoom.direccion_propiedad}
//   price={exampleRoom.precio}
//   periodo={exampleRoom.periodo}
//   rating={exampleRoom.rating}
//   destacado={exampleRoom.destacado}
//   amenities={{
//     wifi: exampleRoom.servicios.some(s => s.servicio === 'WiFi'),
//     parking: exampleRoom.servicios.some(s => s.servicio === 'Parking'),
//     bed: true,
//     bath: true,
//     location: true,
//   }}
// />
