import React, { useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaWifi, FaCar, FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaRegHeart } from "react-icons/fa"; // Importando iconos de react-icons

const WideRoomCard = ({ image, title, location, price, periodo, rating, destacado, amenities, publisher, onClick }) => {
    const ROOM = '@/presentation/assets/img/room.png'; // Ruta de la imagen predeterminada
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (event) => {
        event.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="flex overflow-hidden cursor-pointer bg-white" onClick={onClick}>
            <div className="relative w-1/3">
                {destacado && <span className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1">DESTACADO</span>}
                <img src={image || ROOM} alt={title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 text-white p-2">
                    <span>S/{price}/{periodo}</span>
                </div>
            </div>
            <div className="flex flex-col justify-between p-4 w-2/3">
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-600">{location}</p>
                    <div className="flex items-center gap-2 mt-2">
                        {amenities.wifi && <FaWifi />}
                        {amenities.parking && <FaCar />}
                        {amenities.bed && <FaBed />}
                        {amenities.bath && <FaBath />}
                        {amenities.location && <FaMapMarkerAlt />}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-yellow-500">{rating} ★</span>
                </div>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-2">
                        <IoPersonCircleOutline className="w-5 h-5 text-gray-500" />
                        <span>Publicado por {publisher}</span>
                    </div>
                    <button onClick={toggleFavorite} className="mt-2">
                        {isFavorite ? <FaHeart className="text-red-500  p-1 rounded-4xl border" /> : <FaRegHeart className="text-gray-500 p-1 rounded-4xl border" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WideRoomCard;