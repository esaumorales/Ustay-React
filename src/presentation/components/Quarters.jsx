import Carrousel from '@/presentation/user/components/NewCarrousel';
import { useState } from 'react';

export default function Quarters() {
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState('');

  const resetFilters = () => ({
    propertyType: '',
    priceRange: '',
    zona: [],
    valoracion: [],
    conPension: null,
  });

  const handleFilterChange = (category, value, filterKey) => {
    if (activeFilter === filterKey) {
      setFilters(resetFilters());
      setActiveFilter('');
    } else {
      setFilters({ ...resetFilters(), [category]: value });
      setActiveFilter(filterKey);
    }
  };

  const filterButtons = [
    { label: 'Cuartos destacados', category: 'propertyType', value: 'Cuartos', key: 'propertyType' },
    { label: 'Precio accesible', category: 'priceRange', value: 'low', key: 'priceRange' },
    { label: 'Con pensión', category: 'conPension', value: true, key: 'conPension' },
    { label: 'En casas mejor valoradas', category: 'valoracion', value: [5], key: 'valoracion' }
  ];

  return (
    <div className='flex justify-center text-center'>
      <div className='flex flex-col gap-4'>
        <div>
          <span className='text-gray-600 text-xl'>Nuestros inmuebles</span>
          <h1 className='text-4xl font-bold bg-gradient-to-l from-orange-400 via-orange-600 to-orange-800 bg-clip-text text-transparent'>Explora en nuestra amplia lista</h1>
        </div>

        <div className='flex justify-center gap-4 flex-wrap'>
          {filterButtons.map(({ label, category, value, key }) => (
            <button
              key={key}
              onClick={() => handleFilterChange(category, value, key)}
              className={`${activeFilter === key ? 'bg-orange-500 text-white' : 'bg-gray-200'} px-3 py-1 rounded-full hover:bg-gray-300`}
            >
              {label}
            </button>
          ))}
        </div>

        <div>
          <Carrousel filters={filters} />
        </div>
      </div>
    </div>
  );
}
