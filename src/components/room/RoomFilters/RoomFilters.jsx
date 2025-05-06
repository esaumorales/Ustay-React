import { useState } from 'react';

export const RoomFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        propertyType: '',
        priceRange: 0,
        zona: '',
        rating: 0
    });

    const handleFilterChange = (category, value) => {
        const newFilters = {
            ...filters,
            [category]: value
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className='w-full'>
            <div className='space-y-4 lg:space-y-6'>
                {/* Property Type Filter */}
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h3 className='font-medium mb-2 text-sm lg:text-base'>Tipo de Propiedad</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2'>
                        <label className='flex items-center p-2 hover:bg-gray-50 rounded'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={filters.propertyType === 'Cuartos'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Cuartos' : '')}
                            />
                            <span className='text-sm'>Cuartos</span>
                        </label>
                        <label className='flex items-center p-2 hover:bg-gray-50 rounded'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={filters.propertyType === 'Departamento'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Departamento' : '')}
                            />
                            <span className='text-sm'>Departamento</span>
                        </label>
                    </div>
                </div>

                {/* Zona Filter */}
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h3 className='font-medium mb-2 text-sm lg:text-base'>Zona</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2'>
                        {['La Era', 'El Inti', 'San Francisco', 'La Alameda'].map((zona) => (
                            <label key={zona} className='flex items-center p-2 hover:bg-gray-50 rounded'>
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={filters.zona === zona}
                                    onChange={(e) => handleFilterChange('zona', e.target.checked ? zona : '')}
                                />
                                <span className='text-sm'>{zona}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h3 className='font-medium mb-2 text-sm lg:text-base'>Valoración</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2'>
                        {[4, 3, 2, 1].map((rating) => (
                            <label key={rating} className='flex items-center p-2 hover:bg-gray-50 rounded'>
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={filters.rating === rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.checked ? rating : 0)}
                                />
                                <span className='flex text-sm'>
                                    {[...Array(rating)].map((_, i) => (
                                        <span key={i} className='text-yellow-400'>★</span>
                                    ))}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h3 className='font-medium mb-2 text-sm lg:text-base'>Precios</h3>
                    <div className='space-y-4'>
                        <input
                            type='range'
                            min='0'
                            max='1000'
                            value={filters.priceRange}
                            onChange={(e) => handleFilterChange('priceRange', parseInt(e.target.value))}
                            className='w-full accent-blue-500'
                        />
                        <div className='flex justify-between text-sm text-gray-600'>
                            <span>S/. 0</span>
                            <span>S/. {filters.priceRange}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};