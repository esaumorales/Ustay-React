import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { fetchRooms } from '@/infrastructure/services/room.service';
import ROOM from '@/presentation/assets/img/room.png';

const Carrousel = ({ filters }) => {
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

    const filteredItems = items.filter(item => {
        if (filters.propertyType && item.tipo !== filters.propertyType) return false;
        if (filters.priceRange === 'low' && item.precio > 300) return false;
        if (filters.conPension && !item.pension) return false;
        if (filters.valoracion?.length && !filters.valoracion.includes(item.valoracion)) return false;

        return true;
    });

    if (!filteredItems.length) return <p className='text-center text-gray-500'>No se encontraron resultados.</p>;

    return (
        <div className='relative max-w-7xl  py-8'>
            <Swiper
                spaceBetween={16}
                slidesPerView={'auto'}
                grabCursor={true}
                modules={[Pagination, Navigation, Autoplay]}
                className='!overflow-visible'
            >
                {filteredItems.map((item) => (
                    <SwiperSlide key={item.cuarto_id} style={{ width: '18rem' }}>
                        <div className='rounded-lg shadow hover:shadow-md transition overflow-hidden bg-white'>
                            <div className='relative h-64'>
                                <img
                                    src={item.fotos.length > 0 ? item.fotos[0] : ROOM}
                                    alt={`Cuarto ${item.nombre}`}
                                    className='w-full h-full object-cover'
                                />
                                <span className='absolute top-2 left-2 bg-yellow-400 text-xs font-bold text-white px-2 py-0.5 rounded'>DESTACADO</span>
                            </div>

                            <div className='p-4'>
                                <p className='text-xs text-orange-600 mb-1'>Vicente Gutierrez</p>
                                <h3 className='text-base font-medium text-gray-900 mb-1'>{item.nombre}</h3>
                                <div className='flex justify-between'>
                                    <div className='text-center'>
                                        <p className='text-gray-900 font-bold text-lg'>S/. {Number(item.precio).toFixed(2)}</p>
                                    </div>
                                    <button className='flex items-center gap-1 bg-gray-200 text-black text-sm font-medium rounded-2xl px-3 py-1 hover:bg-gray-300' >
                                        <AiOutlineEye className='w-5 h-5 text-black' />
                                        Ver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carrousel;