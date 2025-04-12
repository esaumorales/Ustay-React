import { useState } from 'react';
import { IconBath } from '../assets/icons/icon-bath';
import { IconBed } from '../assets/icons/icon-bed';
import { IconLocation } from '../assets/icons/icon-location';
import { IconParking } from '../assets/icons/icon-parking';
import { IconWifi } from '../assets/icons/icon-wifi';
import useCarousel from '../hooks/useCarousel';
import FotoEjemplo from '../assets/img/room.png';

export default function Carousel() {
  const [items] = useState([
    {
      id: 1,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul ',
      price: '230',
    },
    {
      id: 2,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr.  Gonzales',
      price: '230',
    },
    {
      id: 3,
      image: FotoEjemplo,
      type: 'Departamento',
      location: ' Raul Gonzales',
      price: '230',
    },
    {
      id: 4,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '23',
    },
    {
      id: 5,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '20',
    },
    {
      id: 6,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '30',
    },
    {
      id: 8,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '30',
    },
    {
      id: 5,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '20',
    },
    {
      id: 6,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '30',
    },
    {
      id: 8,
      image: FotoEjemplo,
      type: 'Departamento',
      location: 'Pnr. Raul Gonzales',
      price: '30',
    },
  ]);

  const { currentIndex, nextSlide, prevSlide, goToSlide } = useCarousel(items);

  const visibleItems = [
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
  ];

  return (
    <div className='relative max-w-7xl mx-auto px-4 overflow-hidden  '>
      <div className='flex gap-6 justify-center items-center transition-transform duration-500 ease-out'>
        {visibleItems.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform
              ${
                idx === 1
                  ? 'w-96 scale-105 z-10'  // Aumentado de w-80 a w-96
                  : 'w-80 opacity-90 border border-b-amber-600 border-b-3'  // Aumentado de w-72 a w-80
              }
              hover:opacity-100`}>
            <div
              className={`relative ${
                idx === 1 ? 'h-72' : 'h-56'  // Aumentado de h-56 a h-72 para el medio, y h-52 a h-56 para los lados
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
                  <p className='text-sm text-gray-600'>{item.location}</p>
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
            className={`transition-all duration-300 ${
              index === 2
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
