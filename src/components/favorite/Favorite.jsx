import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { TbArrowsExchange2 } from 'react-icons/tb';

const Favorite = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Favoritos</h2>
                <button className="px-3 py-1.5 text-sm text-gray-400 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    Comparar
                    <TbArrowsExchange2 className="text-lg rotate-90" />
                </button>
            </div>

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
                        <tr>
                            <td colSpan="6" className="py-16 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <BsInfoCircle className="text-2xl text-gray-400" />
                                    <span className="text-sm">No hay favoritos</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Favorite;
