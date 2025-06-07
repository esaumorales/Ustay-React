import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchRooms } from '@/infrastructure/services/room.service'; // Importa el servicio
import { IconBath } from '@/presentation/assets/icons/icon-bath';
import { IconBed } from '@/presentation/assets/icons/icon-bed';
import { IconLocation } from '@/presentation/assets/icons/icon-location';
import { IconParking } from '@/presentation/assets/icons/icon-parking';
import { IconWifi } from '@/presentation/assets/icons/icon-wifi';
import ROOM from '@/presentation/assets/img/room.png'; // Imagen por defecto

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Carrousel = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const rooms = await fetchRooms();
                setItems(rooms.cuartos);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        loadRooms();
    }, []);

    if (!items || !Array.isArray(items) || items.length === 0) {
        return null;
    }

    return (
        <div className='relative max-w-7xl mx-auto px-4 overflow-hidden'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 70,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className='mySwiper py-8'
            >
                {items.map((item) => (
                    <SwiperSlide key={item.cuarto_id}>
                        <div className='bg-white border border-gray-200 shadow-lg transition-all duration-500 ease-out transform hover:opacity-100 mx-auto w-100'>
                            <div className='relative h-80 overflow-hidden'>
                                <img
                                    src={item.fotos.length > 0 ? item.fotos[0] : ROOM}  // Si no hay fotos, usa la imagen predeterminada
                                    alt={`Cuarto ${item.nombre}`}
                                    className='w-full h-full object-cover transition-transform duration-500 ease-out'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                            </div>

                            <div className='p-4 border-b-amber-600 border-b-3'>
                                <div className='flex justify-between items-start mb-3'>
                                    <div>
                                        <h3 className='font-semibold text-lg text-gray-900'>{item.nombre}</h3>
                                        <p className='text-sm text-gray-600'>{item.descripcion}</p>
                                    </div>
                                    <div className='text-right'>
                                        <div className='flex items-baseline gap-0.5'>
                                            <span className='text-sm font-medium text-gray-600'>S/.</span>
                                            <span className='font-bold text-2xl text-gray-900'>{item.precio}</span>
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
                                    <button
                                        className='bg-gray-900 rounded-full p-2 hover:bg-gray-800 transition-all duration-300 hover:scale-110'
                                        aria-label='Add to favorites'
                                    >
                                        <svg
                                            className='w-4 h-4 text-white'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
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
                    </SwiperSlide>
                ))}
                <div className='mt-8'>
                    <div className='swiper-pagination'></div>
                </div>
            </Swiper>
        </div>
    );
};

export default Carrousel;
