import { useState } from 'react';
import { CARDS_DATA } from '@/models/cards';
import { RoomCard } from './RoomCard';
import { RoomFilters } from './RoomFilters/RoomFilters';

const RoomList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRooms, setFilteredRooms] = useState(CARDS_DATA);
    const roomsPerPage = 9;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); 
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const handleFilterChange = (filters) => {
        let result = [...CARDS_DATA];

        if (filters.propertyType) {
            result = result.filter(card => card.type === filters.propertyType);
        }

        if (filters.priceRange) {
            result = result.filter(card => parseInt(card.price) <= filters.priceRange);
        }

        if (filters.zona) {
            result = result.filter(card => card.location === filters.zona);
        }

        if (filters.rating > 0) {
            result = result.filter(card => card.rating === filters.rating);
        }

        setFilteredRooms(result);
        setCurrentPage(1);
    };

    return (
        // Update the main container to be responsive
        <div className='flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-32'>
            {/* Make aside responsive */}
            <aside className='w-full lg:w-64 lg:flex-shrink-0'>
                <h2 className='text-xl lg:text-2xl font-bold mb-4'>Nuestras Inmobiliarias</h2>
                <p className='font-semibold mb-4'>Filtrar por</p>
                <RoomFilters onFilterChange={handleFilterChange} />
            </aside>

            {/* Right Column - Cards */}
            <div className='flex-1'>
                <div className='flex justify-start mb-4 flex-col gap-4'>
                    <div>
                        <span className='font-semibold text-lg lg:text-xl'>Ordenar por:</span>
                    </div>
                    {/* Make buttons container responsive */}
                    <div className='flex flex-wrap items-center gap-2'>
                        <button className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                            Precio Alto <span className='text-xs'>↑</span>
                        </button>
                        <button className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                            Precio Bajo <span className='text-xs'>↓</span>
                        </button>
                        <button className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                            Valoración Alta <span className='text-xs'>↑</span>
                        </button>
                        <button className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                            Valoración Baja <span className='text-xs'>↓</span>
                        </button>
                    </div>
                </div>

                {/* Make grid responsive */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
                    {currentRooms.map((room) => (
                        <RoomCard key={room.id} {...room} />
                    ))}
                </div>

                {/* Pagination remains centered */}
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
