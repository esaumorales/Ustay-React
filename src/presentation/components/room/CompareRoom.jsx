import React from 'react';
import { useAuth } from '@/presentation/contexts/AuthContext';

const CompareRoom = ({ rooms }) => {
    const { isAuthenticated } = useAuth();

    console.log(rooms)

    if (!isAuthenticated) {
        return (
            <div className='text-center'>
                <p>No estás autorizado para ver esta información.</p>
                <p>Por favor, inicia sesión.</p>
            </div>
        );
    }

    if (!rooms || rooms.length === 0) {
        return <div>No hay cuartos seleccionados para comparar.</div>;
    }

    return (
        <div className="overflow-x-auto mx-64">
            <h2 className="text-2xl font-bold mb-6 text-center">Comparar cuartos</h2>
            <table className="min-w-full bg-white rounded-lg shadow mx-auto">
                <tbody>
                    {/* FOTOS */}
                    <tr>
                        <th className="text-left p-3 font-semibold w-48">Imágenes</th>
                        {rooms.map((room, idx) => {
                            const imagen = Array.isArray(room.fotos) && room.fotos.length > 0
                                ? (typeof room.fotos[0] === 'string' ? room.fotos[0] : room.fotos[0].url_imagen)
                                : "https://res.cloudinary.com/demo/image/upload/sample.jpg";

                            return (
                                <td key={idx} className="p-3 text-center">
                                    <img
                                        src={imagen}
                                        alt={room.tipo_cuarto}
                                        className="w-full h-40 object-cover rounded mb-4"
                                    />
                                </td>
                            );
                        })}
                    </tr>

                    {/* TITULO */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Título</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">{room.tipo_cuarto}</td>
                        ))}
                    </tr>

                    {/* DESCRIPCION */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Descripción</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">{room.descripcion}</td>
                        ))}
                    </tr>

                    {/* UBICACION */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Ubicación</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">{room.direccion_propiedad}</td>
                        ))}
                    </tr>

                    {/* PRECIO */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Precio</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">S/. {room.precio}</td>
                        ))}
                    </tr>

                    {/* SERVICIOS */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Servicios</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">
                                <ul className="list-inside">
                                    {room.servicios && room.servicios.length > 0
                                        ? room.servicios.map((servicio, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-600">
                                                <span className="text-gray-600 font-semibold">{servicio.servicio}:</span>
                                                <span className="text-gray-600">{servicio.descripcion}</span>
                                            </li>
                                        ))
                                        : <span>No hay servicios disponibles</span>
                                    }
                                </ul>
                            </td>
                        ))}
                    </tr>

                    {/* REGLA DE LA CASA */}
                    <tr>
                        <th className="text-left p-3 font-semibold">Reglas de la casa</th>
                        {rooms.map((room, idx) => (
                            <td key={idx} className="p-3 text-center">
                                <ul className="list-inside">
                                    {(Array.isArray(room.reglas) ? room.reglas : room.reglas.split(',')).map((regla, i) => (
                                        <li key={i} className="gap-1">
                                            {regla.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CompareRoom;