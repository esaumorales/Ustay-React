export const RoomFilters = () => {
    return (
        <div>
            <div className='space-y-6'>
                {/* Casa/Inmobiliaria Filter */}
                <div>
                    <label className='flex items-center'>
                        <input type='checkbox' className='mr-2' />
                        <span >Casa</span>
                    </label>
                    <div className='space-y-2'>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Inmobiliaria</span>
                        </label>
                    </div>
                </div>

                {/* Tipos Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Tipos</h3>
                    <div className='space-y-2'>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Departamento</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Minidepartamento</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Cuarto</span>
                        </label>
                    </div>
                </div>

                {/* Precios Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Precios</h3>
                    <div className='space-y-4'>
                        <input
                            type='range'
                            min='0'
                            max='99'
                            className='w-full accent-blue-500'
                        />
                        <div className='flex justify-between text-sm text-gray-600'>
                            <span>S/. 0</span>
                            <span>S/. 99</span>
                        </div>
                    </div>
                </div>

                {/* Periodo Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Periodo</h3>
                    <div className='space-y-2'>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Semanal</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Mensual</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Ciclo</span>
                        </label>
                    </div>
                </div>

                {/* Zona Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Zona</h3>
                    <div className='space-y-2'>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>La Era</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>El Inti</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>San Francisco</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>La Alameda</span>
                        </label>
                        <label className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span>Tulipanes</span>
                        </label>
                    </div>
                </div>

                {/* Valoración Filter */}
                <div>
                    <h3 className='font-medium mb-2'>Valoración</h3>
                    <div className='space-y-2'>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className='flex items-center'>
                                <input type='checkbox' className='mr-2' />
                                <span className='flex'>
                                    {[...Array(rating)].map((_, i) => (
                                        <span key={i} className='text-yellow-400'>★</span>
                                    ))}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};