import { useState } from 'react';

export const RoomFilters = ({ onFilterChange, zona }) => {
    const [filters, setFilters] = useState({
        propertyType: '',
        priceRange: 0,
        zona: [],
        valoracion: [],
    });

    const handleFilterChange = (category, value) => {
        const newFilters = {
            ...filters,
            [category]: value,
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleZonaChange = (zona) => {
        const newZona = filters.zona.includes(zona)
            ? filters.zona.filter((item) => item !== zona)
            : [...filters.zona, zona]; // Si la zona ya está seleccionada, la eliminamos, sino la agregamos

        handleFilterChange('zona', newZona);
    };

    const handleValoracionChange = (valoracion) => {
        const newValoracion = filters.valoracion.includes(valoracion)
            ? filters.valoracion.filter((val) => val !== valoracion)
            : [...filters.valoracion, valoracion];

        handleFilterChange('valoracion', newValoracion);
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
                        {zona && zona.length > 0 ? (
                            zona.map(({ zona }) => (
                                <label key={zona} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="opacity-0 absolute w-0 h-0"
                                        checked={filters.zona.includes(zona)}
                                        onChange={() => handleZonaChange(zona)}
                                    />
                                    <span className={`text-sm ${filters.zona.includes(zona) ? 'font-semibold' : ''}`}>
                                        {zona}
                                    </span>
                                </label>
                            ))
                        ) : (
                            <div>No hay zonas disponibles</div>
                        )}
                    </div>
                </div>

                {/* Valoración Filter */}
                <div className="w-full">
                    <div className="space-y-4 lg:space-y-6">
                        {/* Valoración Filter */}
                        <div className="p-4">
                            <h3 className="font-medium mb-2 text-sm lg:text-base">Valoración</h3>
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((valoracion) => (
                                    <label
                                        key={valoracion}
                                        className="flex items-center justify-start gap-4 p-2 hover:bg-gray-50 rounded cursor-pointer relative"
                                    >
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute w-0 h-0"
                                            checked={filters.valoracion.includes(valoracion)}
                                            onChange={() => handleValoracionChange(valoracion)}
                                        />
                                        <div className="flex gap-1">
                                            {[...Array(valoracion)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-yellow-400 ${filters.valoracion.includes(valoracion) ? 'font-semibold' : ''}`}
                                                    style={{ fontSize: '1.25rem' }}
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
            </div>
        </div>
    );
};