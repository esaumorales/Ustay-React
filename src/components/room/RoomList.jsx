import { useState } from 'react';
import { CARDS_DATA } from '../../models/cards';
import { RoomCard } from './RoomCard';
import { RoomFilters } from './RoomFilters/RoomFilters';

const RoomList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rooms] = useState(CARDS_DATA);
    const roomsPerPage = 9;

    // Calculate rooms for current page
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Calculate total pages
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='flex gap-8 px-32'>
            {/* Left Column - Filters */}
            <aside className='w-64 flex-shrink-0'>
                <h2 className='text-2xl font-bold mb-4'>Nuestras Inmobiliarias</h2>
                <p className='font-semibold mb-4'>Filtrar por</p>
                <RoomFilters />
            </aside>

            {/* Right Column - Cards */}
            <div className='flex-1'>
                <div className='flex justify-start mb-4 flex-col gap-4'>
                    <div>
                        <span className='font-semibold text-xl'>Ordenar por:</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className='px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm flex items-center gap-1'>
                            Precio Alto <span className='text-xs'>↑</span>
                        </button>
                        <button className='px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm flex items-center gap-1'>
                            Precio Bajo <span className='text-xs'>↓</span>
                        </button>
                        <button className='px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm flex items-center gap-1'>
                            Valoración Alta <span className='text-xs'>↑</span>
                        </button>
                        <button className='px-4 py-1.5 rounded-full bg-white border border-gray-300 text-sm flex items-center gap-1'>
                            Valoración Baja <span className='text-xs'>↓</span>
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-6'>
                    {currentRooms.map((room) => (
                        <RoomCard key={room.id} {...room} />
                    ))}
                </div>

                <div className='flex justify-center mt-8 gap-2'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-gray-200' : 'hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomList;