import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Brayan Orihuela',
            rol: 'Partner',
            avatar: '/ruta/avatar-choro.png',
            background: '/ruta/bg-choro.jpg',
            testimony: 'Publicar en UStay fue súper fácil. Gracias a la plataforma, mis habitaciones se alquilan más rápido y sin complicaciones.'
        },
        {
            name: 'Luis Ponce',
            rol: 'Partner',
            avatar: '/ruta/avatar-luis.png',
            background: '/ruta/bg-luis.jpg',
            testimony: 'Me gusta que todo esté bien organizado. Los estudiantes que llegan a mi cuarto ya saben qué esperar. Es confiable.'
        },
        {
            name: 'Alvaro Maguiña',
            rol: 'Partner',
            avatar: '/ruta/avatar-alvaro.png',
            background: '/ruta/bg-alvaro.jpg',
            testimony: 'Nunca había tenido tantas consultas en tan poco tiempo. Es una excelente forma de dar visibilidad a mis cuartos.'
        },
        {
            name: 'Esau Morales',
            rol: 'Partner',
            avatar: '/ruta/avatar-esau.png',
            background: '/ruta/bg-esau.jpg',
            testimony: 'El proceso de publicación es muy sencillo y rápido. Me encanta cómo se conectan con los interesados.'
        }
    ];

    return (
        <div className='my-12 max-w-6xl mx-auto'>
            <div className='text-center mb-10'>
                <span className='text-primary uppercase tracking-widest'>Testimonios</span>
                <h1 className='font-bold text-3xl md:text-4xl mt-2'>RESEÑAS DE NUESTROS PARTNERS</h1>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md relative mx-auto w-80">
                            <img
                                src={item.background}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="absolute top-44 left-1/2 transform -translate-x-1/2">
                                <div className='flex  w-18 h-18 rounded-full border-4 border-white items-center text-center'>
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl px-4 pt-12 pb-6 text-center mt-6 mx-2 shadow-sm">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <span className="text-sm text-gray-500">{item.rol}</span>
                                <p className="mt-3 text-sm text-gray-700">{item.testimony}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
