import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { fetchRooms } from '@/infrastructure/services/room.service'; // Importa el servicio
import { RoomCard } from './RoomCard';
import { RoomFilters } from './RoomFilters/RoomFilters';
import { MdCompare, MdOutlineGridView, MdOutlineMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import ROOM from '@/presentation/assets/img/room.png';

const RoomList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderRooms, setOrderRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [objectFilter, setObjectFilter] = useState({
        propertyType: '',
        priceRange: 0,
        zona: [],
        valoracion: [],
    });
    const roomsPerPage = 9;

    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 
    const [zones, setZones] = useState([]); // Almacenamos las zonas

    useEffect(() => {
        const loadRooms = async () => {
            setLoading(true);
            setError(false);
            try {
                const rooms = await fetchRooms();
                if (!rooms?.cuartos?.length) {
                    setError(true);
                    setOrderRooms([]);
                    setFilteredRooms([]);
                } else {
                    setOrderRooms(rooms.cuartos);
                    setFilteredRooms(rooms.cuartos);
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError(true);
                setOrderRooms([]);
                setFilteredRooms([]);
            } finally {
                setLoading(false);
            }
        };

        const loadZones = async () => {
            try {
                const rooms = await fetchRooms();
                // Extraer zonas únicas de los cuartos
                const uniqueZones = [...new Set(rooms.cuartos.map(room => room.zona))]
                    .filter(zona => zona) // Filtrar zonas vacías
                    .map(zona => ({ zona })); // Formatear como objeto con propiedad zona
                setZones(uniqueZones);
            } catch (error) {
                console.error('Error fetching zones:', error);
            }
        };

        loadRooms();
        loadZones();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const handleFilterChange = (filters) => {
        let result = [...orderRooms];
        setObjectFilter(filters);
    
        if (filters.propertyType) {
            result = result.filter(card => card.tipo_cuarto === filters.propertyType);
        }
    
        if (filters.priceRange) {
            result = result.filter(card => parseFloat(card.precio) <= filters.priceRange);
        }
    
        // Filtrar por zonas seleccionadas
        if (filters.zona && filters.zona.length > 0) {
            result = result.filter(card => 
                card.zona && filters.zona.some(z => card.zona.includes(z))
            );
        }
    
        if (filters.valoracion.length > 0) {
            result = result.filter(card => 
                filters.valoracion.some(val => Math.floor(card.valoracion) === val) // Filtrar por valoraciones
            );
        }
    
        setFilteredRooms(result);
        setCurrentPage(1);  // Restablecer la página cuando se cambian los filtros
    };

    const handleOrderRoom = (category, value) => {
        const multiA = value === 'asc' ? 1 : -1;
        const multiB = value === 'asc' ? -1 : 1;

        orderRooms.sort((a, b) => (a[category] * multiA) + (b[category] * multiB));

        handleFilterChange(objectFilter);
    };

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectMode, setSelectMode] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        const filtered = orderRooms.filter(room =>
            room.tipo_cuarto.toLowerCase().includes(e.target.value.toLowerCase()) ||
            room.direccion_propiedad.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredRooms(filtered);
    };

    const handleSelectRoom = (roomId) => {
        setSelectedRooms(prev => {
            if (prev.includes(roomId)) {
                return prev.filter(id => id !== roomId);
            }
            if (prev.length < 2) {
                return [...prev, roomId];
            }
            return prev;
        });
    };

    const handleCompare = () => {
        if (!selectMode) {
            setSelectMode(true);
            setSelectedRooms([]); // Limpia selección anterior
        } else if (selectedRooms.length === 2) {
            navigate(`/room/compare?ids=${selectedRooms.join(',')}`);
        }
    };

    if (loading || error) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-32'>
            <aside className='w-full lg:w-64 lg:flex-shrink-0'>
                <h2 className='text-xl lg:text-2xl font-bold mb-4'>Nuestras Inmobiliarias</h2>
                <p className='font-semibold mb-4'>Filtrar por</p>
                <RoomFilters
                    onFilterChange={handleFilterChange}
                    zona={zones}
                />
            </aside>

            <div className='flex-1'>
                <div className='flex justify-between'>
                    <div className='mb-4 flex flex-col gap-4'>
                        <div>
                            <span className='font-semibold text-lg lg:text-xl'>Ordenar por:</span>
                        </div>
                        <div className='flex flex-wrap items-center gap-2'>
                            <button onClick={() => handleOrderRoom('precio', 'desc')} className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Precio Alto <span className='text-xs'>↑</span>
                            </button>
                            <button onClick={() => handleOrderRoom('precio', 'asc')} className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Precio Bajo <span className='text-xs'>↓</span>
                            </button>
                            <button onClick={() => handleOrderRoom('valoracion', 'desc')} className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Valoración Alta <span className='text-xs'>↑</span>
                            </button>
                            <button onClick={() => handleOrderRoom('valoracion', 'asc')} className='px-3 lg:px-4 py-1.5 rounded-full bg-white border border-gray-300 text-xs lg:text-sm flex items-center gap-1'>
                                Valoración Baja <span className='text-xs'>↓</span>
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-end flex-col mb-4 gap-4'>
                        <div className="flex items-center gap-6">
                            <div className='flex'>
                                <div className="flex items-center gap-2">
                                    <button className="border-2 border-orange-500 rounded-sm p-1">
                                        <MdOutlineGridView className="text-orange-500" size={16} />
                                    </button>
                                    <button className="border-2 border-gray-400 rounded-sm p-1">
                                        <MdOutlineMenu className="text-gray-700" size={16} />
                                    </button>
                                </div>
                                <div className="border-l h-6 border-gray-300 mx-2"></div>
                                <button className={`flex items-center border rounded-sm px-3 py-1 gap-2 text-gray-500  ${selectMode && selectedRooms.length === 2 ? 'bg-orange-500 text-white' : ''}`}
                                    onClick={handleCompare}
                                    disabled={selectMode && selectedRooms.length !== 2}>
                                    <span>Comparar</span>
                                    <MdCompare size={16} />
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            {showSearch ? (
                                <input
                                    type="text"
                                    className="w-52 px-4 focus:outline-none  bg-white text-gray-700 placeholder-gray-400 transition-all duration-300"
                                    placeholder="Buscar..."
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onBlur={() => setShowSearch(false)}
                                    autoFocus
                                />
                            ) : (
                                <CiSearch
                                    className="w-5 h-5 ml-4 cursor-pointer"
                                    onClick={() => setShowSearch(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
                    {currentRooms.map((room) => (
                        <div key={room.cuarto_id} className="relative">
                            {selectMode && (
                                <input
                                    type="checkbox"
                                    checked={selectedRooms.includes(room.cuarto_id)}
                                    onChange={() => handleSelectRoom(room.cuarto_id)}
                                    className="absolute top-2 right-2 z-20 w-5 h-5 accent-orange-500"
                                    disabled={!selectedRooms.includes(room.cuarto_id) && selectedRooms.length === 2}
                                />
                            )}
                            <RoomCard
                                id={room.cuarto_id}
                                image={room.fotos.length > 0 ? room.fotos[0] : ROOM}
                                type={room.tipo_cuarto}
                                location={room.direccion_propiedad}
                                price={room.precio}
                                periodo={room.periodo}
                                valoracion={room.valoracion}
                                destacado={room.destacado || false}
                                amenities={{
                                    wifi: true,
                                    parking: true,
                                    bed: true,
                                    bath: true,
                                    location: true
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mt-8 gap-2'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
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
