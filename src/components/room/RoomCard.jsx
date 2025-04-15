import { IconBath } from '../../assets/icons/icon-bath';
import { IconBed } from '../../assets/icons/icon-bed';
import { IconLocation } from '../../assets/icons/icon-location';
import { IconParking } from '../../assets/icons/icon-parking';
import { IconWifi } from '../../assets/icons/icon-wifi';

export const RoomCard = ({ image, type, location, price }) => {
  return (
    <div className='bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform w-full'>
      <div className='relative h-56 overflow-hidden'>
        <img
          src={image}
          alt={type}
          className='w-full h-full object-cover transition-transform duration-500 ease-out'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-start mb-3'>
          <div>
            <h3 className='font-semibold text-lg text-gray-900'>{type}</h3>
            <p className='text-sm text-gray-600'>{location}</p>
          </div>
          <div className='text-right'>
            <div className='flex items-baseline gap-0.5'>
              <span className='text-sm font-medium text-gray-600'>S/.</span>
              <span className='font-bold text-2xl text-gray-900'>{price}</span>
            </div>
            <p className='text-xs text-gray-500'>mes</p>
          </div>
        </div>

        <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
          <div className='flex gap-4'>
            <IconWifi className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
            <IconParking className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
            <IconBed className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
            <IconBath className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
            <IconLocation className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
          </div>
          <button className='bg-gray-900 rounded-full p-2 hover:bg-gray-800 transition-all duration-300 hover:scale-110'>
            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};