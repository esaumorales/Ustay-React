import React, { useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import {
    FaWifi, FaCar, FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaRegHeart,
    FaTint, FaBolt, FaLock, FaFire, FaBroom, FaTshirt
} from "react-icons/fa";

const amenityIcons = [
    { key: 'bed', icon: <FaBed /> },
    { key: 'bath', icon: <FaBath /> },
    { key: 'wifi', icon: <FaWifi /> },
    { key: 'agua', icon: <FaTint /> },
    { key: 'luz', icon: <FaBolt /> },
    { key: 'seguridad', icon: <FaLock /> },
    { key: 'calefaccion', icon: <FaFire /> },
    { key: 'limpieza', icon: <FaBroom /> },
    { key: 'garage', icon: <FaCar /> },
    { key: 'lavanderia', icon: <FaTshirt /> },
    { key: 'parking', icon: <FaCar /> },
    { key: 'location', icon: <FaMapMarkerAlt /> }
];

const WideRoomCard = ({ image, title, location, price, periodo, valoracion, destacado, amenities, publisher, onClick }) => {
    const ROOM = '@/presentation/assets/img/room.png';
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <div onClick={onClick} className="flex bg-white overflow-hidden cursor-pointer shadow hover:shadow-lg">
            <div className="relative w-1/3 h-40">
                {destacado && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">DESTACADO</span>
                )}
                <img src={image || ROOM} alt={title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
                    S/{price} <span className="text-xs">/{periodo}</span>
                </div>
            </div>

            <div className="flex flex-col justify-between p-4 w-2/3">
                <div>
                    <h3 className="text-base font-semibold mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{location}</p>

                    {amenityIcons.some(({ key }) => amenities[key]) && (
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {amenityIcons.map(({ key, icon }) =>
                                amenities[key] && <IconCircle key={key} icon={icon} />
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm gap-1 text-gray-600">
                        <span className="text-yellow-500">{valoracion}</span> ★
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IoPersonCircleOutline className="w-5 h-5" />
                        <span>Publicado por {publisher}</span>
                    </div>

                    <button onClick={toggleFavorite}>
                        {isFavorite ? (
                            <FaHeart className="text-red-500 text-lg" />
                        ) : (
                            <FaRegHeart className="text-gray-500 text-lg" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const IconCircle = ({ icon }) => (
    <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
        {icon}
    </div>
);

export default WideRoomCard;
