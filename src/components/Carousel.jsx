import { useState } from 'react';
import { IconBath } from '@/assets/icons/icon-bath';
import { IconBed } from '@/assets/icons/icon-bed';
import { IconLocation } from '@/assets/icons/icon-location';
import { IconParking } from '@/assets/icons/icon-parking';
import { IconWifi } from '@/assets/icons/icon-wifi';
import useCarousel from '@/hooks/useCarousel';
import { CARDS_DATA } from '@/models/cards';

export default function NewCarousel() {
  const [items] = useState(CARDS_DATA || []);

  const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel(items);

  // More thorough safety checks
  if (!items || !Array.isArray(items) || items.length < 3) {
    console.log('Not enough items for carousel:', items);
    return null;
  }

  // Ensure all required properties exist
  const validItems = items.filter(item => 
    item && 
    typeof item === 'object' && 
    'id' in item && 
    'image' in item &&
    'type' in item &&
    'homeOwner' in item &&
    'price' in item
  );

  if (validItems.length < 3) {
    console.log('Not enough valid items for carousel');
    return null;
  }

  const visibleItems = [
    validItems[currentIndex % validItems.length],
    validItems[(currentIndex + 1) % validItems.length],
    validItems[(currentIndex + 2) % validItems.length],
  ];

  return (
    <div className='relative max-w-7xl mx-auto px-4 overflow-hidden  '>
      <div className='flex gap-6 justify-center items-center transition-transform duration-500 ease-out'>
        {visibleItems.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform
              ${idx === 1
                ? 'w-96 scale-105 z-10'
                : 'w-80 opacity-90 border border-b-amber-600 border-b-3'
              }
              hover:opacity-100`}>
            <div
              className={`relative ${idx === 1 ? 'h-72' : 'h-56'
                } overflow-hidden`}>
              <img
                src={item.image}
                alt={`Room ${item.id}`}
                className='w-full h-full object-cover transition-transform duration-500 ease-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500'></div>
            </div>

            <div className='p-4 border-b-amber-600 border-b-3'>
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3 className='font-semibold text-lg text-gray-900'>
                    {item.type}
                  </h3>
                  <p className='text-sm text-gray-600'>{item.homeOwner}</p>
                </div>
                <div className='text-right'>
                  <div className='flex items-baseline gap-0.5'>
                    <span className='text-sm font-medium text-gray-600'>
                      S/.
                    </span>
                    <span className='font-bold text-2xl text-gray-900'>
                      {item.price}
                    </span>
                  </div>
                  <p className='text-xs text-gray-500'>mes</p>
                </div>
              </div>

              <div className='flex justify-between items-center pt-3 border-t border-gray-100 '>
                <div className='flex gap-4 '>
                  <IconWifi className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
                  <IconParking className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
                  <IconBed className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
                  <IconBath className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
                  <IconLocation className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors' />
                </div>
                <button
                  className='bg-gray-900 rounded-full p-2 hover:bg-gray-800 transition-all duration-300 hover:scale-110'
                  aria-label='Add to favorites'>
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center gap-4 mt-8'>
        <button
          onClick={prevSlide}
          className='text-gray-400 hover:text-gray-600'
          aria-label='Previous group'
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${index === 2
                ? 'rotate-45 bg-secondary w-2 h-2'
                : 'bg-gray-300 hover:bg-gray-400 w-1.5 h-1.5 rounded-full'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <button
          onClick={nextSlide}
          className='text-gray-400 hover:text-gray-600'
          aria-label='Next group'
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
