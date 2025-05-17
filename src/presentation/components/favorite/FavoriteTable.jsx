import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { TbArrowsExchange2 } from 'react-icons/tb';

const FavoriteTable = ({ favorites }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-sm text-gray-600">
                        <th className="py-2 px-4 text-left font-medium">Miniatura</th>
                        <th className="py-2 px-4 text-left font-medium">Dirección</th>
                        <th className="py-2 px-4 text-left font-medium">Partner</th>
                        <th className="py-2 px-4 text-left font-medium">Tipo</th>
                        <th className="py-2 px-4 text-left font-medium">Precio
                            <span className="text-xs">↕</span>
                        </th>
                        <th className="py-2 px-4 text-left font-medium">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map(favorite => (
                        <tr key={favorite.id}>
                            <td className="py-2 px-4">{favorite.thumbnail}</td>
                            <td className="py-2 px-4">{favorite.address}</td>
                            <td className="py-2 px-4">{favorite.partner}</td>
                            <td className="py-2 px-4">{favorite.type}</td>
                            <td className="py-2 px-4">{favorite.price}</td>
                            <td className="py-2 px-4">
                                <button className="text-red-500">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavoriteTable;