import { useState } from 'react';
import { CARDS_DATA } from '../../../models/cards';

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
        <div>
            <div className='space-y-6'>
                {/* Property Type Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Tipo de Propiedad</h3>
                    <div className='space-y-2'>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={filters.propertyType === 'Cuartos'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Cuartos' : '')}
                            />
                            <span>Cuartos</span>
                        </label>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                className='mr-2'
                                checked={filters.propertyType === 'Departamento'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Departamento' : '')}
                            />
                            <span>Departamento</span>
                        </label>
                    </div>
                </div>

                {/* Zona Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Zona</h3>
                    <div className='space-y-2'>
                        {['La Era', 'El Inti', 'San Francisco', 'La Alameda'].map((zona) => (
                            <label key={zona} className='flex items-center'>
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={filters.zona === zona}
                                    onChange={(e) => handleFilterChange('zona', e.target.checked ? zona : '')}
                                />
                                <span>{zona}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Valoración</h3>
                    <div className='space-y-2'>
                        {[4, 3, 2, 1].map((rating) => (
                            <label key={rating} className='flex items-center'>
                                <input
                                    type='checkbox'
                                    className='mr-2'
                                    checked={filters.rating === rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.checked ? rating : 0)}
                                />
                                <span className='flex'>
                                    {[...Array(rating)].map((_, i) => (
                                        <span key={i} className='text-yellow-400'>★</span>
                                    ))}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Precios</h3>
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