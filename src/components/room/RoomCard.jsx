import { useNavigate } from 'react-router-dom';
import { IconBath } from '@/assets/icons/icon-bath';
import { IconBed } from '@/assets/icons/icon-bed';
import { IconLocation } from '@/assets/icons/icon-location';
import { IconParking } from '@/assets/icons/icon-parking';
import { IconWifi } from '@/assets/icons/icon-wifi';

export const RoomCard = ({
  id,
  image,
  type,
  location,
  price,
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
    const result = []
    const { wifi, parking, bed, bath, location } = amenities
    
    if(wifi) result.push(IconWifi)
    if(parking) result.push(IconParking)
    if(bed) result.push(IconBed)
    if(bath) result.push(IconBath)
    if(location) result.push(IconLocation)
    
    return result
  }

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
            src={image}
            alt={type}
            className='w-full h-full object-cover transition-transform duration-500 ease-out'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
        </div>
        <div className='absolute mt-[-32px] mx-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-baseline text-white'>
              <span className='text-sm font-medium'>S/.</span>
              <span className='font-light text-xl'>{price}</span>
              <span className='text-sm text-white ml-1'>/Mes</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <h3 className='font-medium text-lg mb-1'>{type}</h3>
        <p className='text-gray-600 text-sm mb-2'>{location}</p>

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
            <button className='w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-all duration-300'>
              <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};