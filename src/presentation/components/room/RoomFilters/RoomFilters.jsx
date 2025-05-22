import { useState } from 'react';

export const RoomFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        propertyType: '',
        priceRange: 0,
        zona: '',
        rating: 0,
    });

    const handleFilterChange = (category, value) => {
        const newFilters = {
            ...filters,
            [category]: value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="w-full">
            <div className="space-y-4 lg:space-y-6">
                {/* Property Type Filter */}
                <div className="p-4">
                    <h3 className="font-medium mb-2 text-sm lg:text-base">Tipo de Propiedad</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2">
                        <label className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer relative">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute w-0 h-0"
                                checked={filters.propertyType === 'Cuartos'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Cuartos' : '')}
                            />
                            <span className={`text-sm ${filters.propertyType === 'Cuartos' ? 'font-semibold' : ''}`}>
                                Cuartos
                            </span>
                        </label>

                        <label className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer relative">
                            <input
                                type="checkbox"
                                className="opacity-0 absolute w-0 h-0"
                                checked={filters.propertyType === 'Departamento'}
                                onChange={(e) => handleFilterChange('propertyType', e.target.checked ? 'Departamento' : '')}
                            />
                            <span className={`text-sm ${filters.propertyType === 'Departamento' ? 'font-semibold' : ''}`}>
                                Departamento
                            </span>
                        </label>
                    </div>
                </div>

                {/* Zona Filter */}
                <div className="p-4">
                    <h3 className="font-medium mb-2 text-sm lg:text-base">Zona</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-2">
                        {['La Era', 'El Inti', 'San Francisco', 'La Alameda'].map((zona) => (
                            <label
                                key={zona}
                                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer relative"
                            >
                                <input
                                    type="checkbox"
                                    className="opacity-0 absolute w-0 h-0"
                                    checked={filters.zona === zona}
                                    onChange={(e) => handleFilterChange('zona', e.target.checked ? zona : '')}
                                />
                                <span className={`text-sm ${filters.zona === zona ? 'font-semibold' : ''}`}>{zona}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Rating Filter */}
                <div className="p-4">
                    <h3 className="font-medium mb-2 text-sm lg:text-base">Valoración</h3>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label
                                key={rating}
                                className="flex items-center justify-start gap-4 p-2 hover:bg-gray-50 rounded cursor-pointer relative"
                            >
                                <div className={`text-sm ${filters.rating === rating ? 'font-semibold' : ''}`}>
                                    ({rating})
                                </div>
                                <input
                                    type="checkbox"
                                    className="opacity-0 absolute w-0 h-0"
                                    checked={filters.rating === rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.checked ? rating : 0)}
                                />
                                <div className="flex gap-1">
                                    {[...Array(rating)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-yellow-400 ${filters.rating === rating ? 'font-semibold' : ''}`}
                                            style={{ fontSize: '1.25rem' }} // Ajusta el tamaño si quieres
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
