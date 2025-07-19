import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageGallery = ({ images = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative w-full mb-4">
            <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary bg-opacity-80 text-white p-2 "
            >
                <FaChevronLeft />
            </button>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-1 cursor-grab active:cursor-grabbing scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-120 h-110 overflow-hidden"
                        style={{ scrollSnapAlign: 'start' }}
                    >
                        <img
                            src={img.url_imagen || img.foto || img}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary bg-opacity-80 text-white p-2 "
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default ImageGallery;
