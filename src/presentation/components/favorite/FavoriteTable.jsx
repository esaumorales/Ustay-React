import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { BiLinkAlt,  } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';


const FavoriteTable = ({ favorites, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentFavorites = favorites.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(favorites.length / itemsPerPage);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Genera los botones de paginación: 1 2 3 ... N
    const renderPageNumbers = () => {
        let pages = [];
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3];
            } else if (currentPage > 3 && currentPage < totalPages) {
                pages = [1, currentPage - 1, currentPage];
            }
            // El último siempre
            if (!pages.includes(totalPages)) {
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages.map((page) =>
            page === 'ellipsis' ? (
                <span key="ellipsis" className="px-1">...</span>
            ) : (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-8 h-8 rounded transition ${currentPage === page
                            ? 'bg-gray-200 font-bold'
                            : 'bg-transparent'
                        }`}
                >
                    {page}
                </button>
            )
        );
    };

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
                    {currentFavorites.map(favorite => (
                        <tr key={favorite.id}>
                            <td className="py-2 px-4">
                                <img src={favorite.thumbnail} alt="Miniatura" className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="py-2 px-4">{favorite.address}</td>
                            <td className="py-2 px-4">{favorite.partner}</td>
                            <td className="py-2 px-4">{favorite.type}</td>
                            <td className="py-2 px-4">{favorite.price}</td>
                            <td className="py-2 px-4">
                                <div className="flex gap-4">
                                    <button
                                        className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50"
                                        onClick={() => onDelete(favorite.id)}
                                    >
                                        <MdDeleteOutline size={14} />
                                    </button>
                                    <button className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50">
                                        <BiLinkAlt size={14} />
                                    </button>
                                    <button className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50">
                                        <FiArrowRight size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginador con máximo 3 botones y ... */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="p-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
                    >
                        <BsChevronLeft />
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
                    >
                        <BsChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FavoriteTable;