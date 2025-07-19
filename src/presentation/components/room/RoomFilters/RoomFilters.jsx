import { useState } from 'react';
import { Range } from 'react-range';

export const RoomFilters = ({ onFilterChange = () => {}, zona = [] }) => {
    const [filters, setFilters] = useState({
        propertyType: '',
        priceRange: [150, 550],
        periodo: '',
        zona: [],
        valoracion: [],
    });

    const handleFilterChange = (category, value) => {
        const newFilters = { ...filters, [category]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleZonaChange = (zonaValue) => {
        const newZona = filters.zona.includes(zonaValue)
            ? filters.zona.filter(z => z !== zonaValue)
            : [...filters.zona, zonaValue];
        handleFilterChange('zona', newZona);
    };

    const handleValoracionChange = (valor) => {
        const newValoracion = filters.valoracion.includes(valor)
            ? filters.valoracion.filter(v => v !== valor)
            : [...filters.valoracion, valor];
        handleFilterChange('valoracion', newValoracion);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-bold mb-2">Tipos</h3>
                <div className="space-y-1">
                    {['Departamento', 'Minidepartamento', 'Cuartos'].map(tipo => (
                        <div
                            key={tipo}
                            className={`cursor-pointer ${filters.propertyType === tipo ? 'font-semibold' : ''}`}
                            onClick={() => handleFilterChange('propertyType', filters.propertyType === tipo ? '' : tipo)}
                        >
                            {tipo}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-2">Precios</h3>
                <Range
                    step={10}
                    min={0}
                    max={1000}
                    values={filters.priceRange}
                    onChange={(values) => handleFilterChange('priceRange', values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="h-1 bg-secondary relative mt-4 mb-4"
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, index, isDragged }) => (
                        <div {...props} className="flex flex-col items-center">
                            <span className="text-xs font-bold mb-1">{filters.priceRange[index]}</span>
                            <div
                                className={`w-1 h-6 ${isDragged ? 'bg-orange-600' : 'bg-orange-500'}`}
                            />
                        </div>
                    )}
                />
            </div>

            <div>
                <h3 className="font-bold mb-2">Periodo</h3>
                <div className="space-y-1">
                    {['Semanal', 'Mensual', 'Ciclo'].map(period => (
                        <div
                            key={period}
                            className={`cursor-pointer ${filters.periodo === period ? 'font-semibold' : ''}`}
                            onClick={() => handleFilterChange('periodo', filters.periodo === period ? '' : period)}
                        >
                            {period}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-2">Zona</h3>
                <div className="space-y-1">
                    {zona.length > 0 ? zona.map(({ zona: z }) => (
                        <div
                            key={z}
                            className={`cursor-pointer ${filters.zona.includes(z) ? 'font-semibold' : ''}`}
                            onClick={() => handleZonaChange(z)}
                        >
                            {z}
                        </div>
                    )) : <div>No hay zonas disponibles</div>}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-2">Valoración</h3>
                <div className="space-y-1">
                    {[1, 2, 3, 4, 5].map(val => (
                        <div
                            key={val}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleValoracionChange(val)}
                        >
                            <span>({val})</span>
                            <div>
                                {Array.from({ length: val }).map((_, i) => (
                                    <span key={i} className="text-secondary">★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
