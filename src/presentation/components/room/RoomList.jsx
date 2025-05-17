import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { fetchRooms } from '@/infrastructure/services/room.service'; // Importa el servicio
import { RoomCard } from './RoomCard';
import { RoomFilters } from './RoomFilters/RoomFilters';
import { MdCompare } from 'react-icons/md';

import ROOM from '@/presentation/assets/img/room.png';

const RoomList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderRooms, setOrderRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [objectFilter, setObjectFilter] = useState({
        propertyType: '',
        priceRange: 0,
        zona: '',
        rating: 0
    });
    const roomsPerPage = 9;

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const rooms = await fetchRooms();
                setOrderRooms(rooms.cuartos);
                setFilteredRooms(rooms.cuartos);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        loadRooms();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const handleFilterChange = (filters = objectFilter) => {
        let result = [...orderRooms];
        setObjectFilter(filters)

        if (filters.propertyType) {
            result = result.filter(card => card.tipo_cuarto === filters.propertyType);
        }

        if (filters.priceRange) {
            result = result.filter(card => parseFloat(card.precio) <= filters.priceRange);
        }

        if (filters.zona) {
            result = result.filter(card => card.direccion_propiedad.includes(filters.zona));
        }

        if (filters.rating > 0) {
            result = result.filter(card => card.rating === filters.rating);
        }

        setFilteredRooms(result);
        setCurrentPage(1);
    };

    const handleOrderRoom = (category, value) => {
        const multiA = value === 'asc' ? 1 : -1;
        const multiB = value === 'asc' ? -1 : 1;

        orderRooms.sort((a, b) => (a[category] * multiA) + (b[category] * multiB));

        handleFilterChange();
    };

    return (
        <div className='flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-32'>
            <aside className='w-full lg:w-64 lg:flex-shrink-0'>
                <h2 className='text-xl lg:text-2xl font-bold mb-4'>Nuestras Inmobiliarias</h2>
                <p className='font-semibold mb-4'>Filtrar por</p>
                <RoomFilters onFilterChange={handleFilterChange} />
            </aside>

            <div className='flex-1'>
                <div className='flex justify-between '>
                    <div className=' mb-4 flex flex-col gap-4'>
                        <div>
                            <span className='font-semibold text-lg lg:text-xl'>Ordenar por:</span>
                        </div>
                        <div className='flex flex-wrap items-center gap-2'>
                            <button onClick={() => handleOrderRoom('precio', 'des')}
                                className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Precio Alto <span className='text-xs'>↑</span>
                            </button>
                            <button onClick={() => handleOrderRoom('precio', 'asc')}
                                className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Precio Bajo <span className='text-xs'>↓</span>
                            </button>
                            <button onClick={() => handleOrderRoom('rating', 'des')}
                                className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Valoración Alta <span className='text-xs'>↑</span>
                            </button>
                            <button onClick={() => handleOrderRoom('rating', 'asc')}
                                className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Valoración Baja <span className='text-xs'>↓</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end flex-col mb-4 gap-4'>
                        <div>
                            <button className='flex items-center border rounded-sm p-[1px]'>
                                <p>Comparar</p>
                                <MdCompare />
                            </button>
                        </div>
                        <div>
                            <CiSearch className='w-5 h-5' />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
                    {currentRooms.map((room) => (
                        <RoomCard
                            key={room.cuarto_id}
                            id={room.cuarto_id}
                            image={room.image || ROOM} // Usa una imagen por defecto si no hay imagen
                            type={room.tipo_cuarto}
                            location={room.direccion_propiedad}
                            price={room.precio}
                            periodo={room.periodo}
                            rating={4} // Puedes ajustar esto si tienes un valor de rating en tu API
                            destacado={room.destacado || false} // Ajusta según los datos de tu API
                            amenities={{
                                wifi: true, // Ajusta según los datos de tu API
                                parking: true, // Ajusta según los datos de tu API
                                bed: true, // Ajusta según los datos de tu API
                                bath: true, // Ajusta según los datos de tu API
                                location: true // Ajusta según los datos de tu API
                            }}
                        />
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
