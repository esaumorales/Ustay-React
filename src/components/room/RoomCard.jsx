import { IconBath } from '../../assets/icons/icon-bath';
import { IconBed } from '../../assets/icons/icon-bed';
import { IconLocation } from '../../assets/icons/icon-location';
import { IconParking } from '../../assets/icons/icon-parking';
import { IconWifi } from '../../assets/icons/icon-wifi';

export const RoomCard = ({ 
  image, 
  type, 
  location, 
  price, 
  rating = 4,
  destacado = true,
  amenities = {
    wifi: true,
    parking: true,
    bed: true,
    bath: true,
    location: true
  }
}) => {
  return (
    <div className='bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform w-full'>
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

      <div className='p-4'>
        <h3 className='font-medium text-lg mb-1'>{type}</h3>
        <p className='text-gray-600 text-sm mb-2'>{location}</p>
        
        <div className='flex items-center gap-1 mb-3'>
          <span className='text-sm'>{rating}</span>
          <span className='text-yellow-400'>★</span>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex items-baseline'>
            <span className='text-sm font-medium'>S/.</span>
            <span className='font-bold text-xl'>{price}</span>
            <span className='text-sm text-gray-500 ml-1'>/Mes</span>
          </div>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex gap-2'>
            {[IconWifi, IconParking, IconBed, IconBath, IconLocation].map((Icon, index) => (
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
  );
};