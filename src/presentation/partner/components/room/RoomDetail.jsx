import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRoomById, fetchRooms } from '@/infrastructure/services/room.service';
import { addFavorite, getFavorites } from '@/infrastructure/services/favorite.service';
import { IoLocationSharp, IoPersonCircleOutline } from 'react-icons/io5';
import { PiHouseLineLight, PiStarThin } from 'react-icons/pi';
import { MdOutlinePhone } from 'react-icons/md';
import { CiAt } from 'react-icons/ci';
import {
    FaBolt,
    FaBroom,
    FaCar,
    FaFire,
    FaLock,
    FaTint,
    FaTshirt,
    FaWhatsapp,
} from 'react-icons/fa';
import { IconWifi as FaWifi } from '@/presentation/assets/icons/icon-wifi';
import MAP from '@/presentation/assets/img/background-map.png';
import ROOM from '@/presentation/assets/img/room.png';
import Alert from '@/presentation/components/common/Alert';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import WideRoomCard from './WideRoomCard.jsx';

/* ---------- Specs helpers ---------- */
const SPECS = [
    { name: 'Tipo', value: (room) => room.tipo_cuarto },
    { name: 'Dimensiones', value: (room) => room.dimensiones || '—' },
    { name: 'Piso', value: (room) => room.n_piso || '—' },
    { name: 'Número', value: (room) => room.n_cuarto || '—' },
];

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [similarRooms, setSimilarRooms] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const [notificationType, setNotificationType] = useState('success');
    const [userFavorites, setUserFavorites] = useState([]);

    /* ---------- Cargar cuarto ---------- */
    useEffect(() => {
        const loadRoom = async () => {
            try {
                const roomData = await fetchRoomById(id);
                setRoom({
                    ...roomData.cuarto,
                    servicios: roomData.servicios,
                    fotos: roomData.fotos || [],
                });

                const roomsRes = await fetchRooms();
                const allRooms = roomsRes.cuartos || [];
                setSimilarRooms(
                    allRooms.filter((r) => r.cuarto_id !== Number(id)).slice(0, 6)
                );
            } catch (err) {
                console.error('Error fetching room', err);
            }
        };

        const loadFavorites = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;
            try {
                const favRes = await getFavorites(userId);
                setUserFavorites(favRes.favoritos || []);
            } catch (err) {
                console.error('Error fetching favorites', err);
            }
        };

        loadRoom();
        loadFavorites();
    }, [id]);

    /* ---------- Favoritos ---------- */
    const handleAddFavorite = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const alreadyFav = userFavorites.some(
            (fav) => fav.cuarto_id === Number(id)
        );
        if (alreadyFav) {
            setNotificationMsg('Este cuarto ya está en tus favoritos.');
            setNotificationType('warning');
            setShowNotification(true);
            return;
        }

        try {
            await addFavorite(userId, id);
            setNotificationMsg('Añadido a favoritos');
            setNotificationType('success');
            setShowNotification(true);

            const favRes = await getFavorites(userId);
            setUserFavorites(favRes.favoritos || []);
        } catch (err) {
            console.error('Error add favorite', err);
        }
    };

    if (!room) return <div className="text-center py-10">Room not found</div>;

    return (
        <div className="pb-20">
            {/* Notificación */}
            {showNotification && (
                <Alert
                    message={notificationMsg}
                    onClose={() => setShowNotification(false)}
                    type={notificationType}
                />
            )}

            {/* ---------- Galería ---------- */}
            <div className="flex gap-2 mb-8 h-108">
                <Swiper
                    grabCursor
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={3}
                    modules={[Autoplay]}
                    className="flex w-full"
                >
                    {room.fotos.length ? (
                        room.fotos.map((f, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={f.url_imagen}
                                    alt={room.tipo_cuarto}
                                    className="h-full w-full object-cover"
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className="h-full flex items-center justify-center bg-gray-300">
                                <p>No imagen</p>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* ---------- Body (2 cols) ---------- */}
            <div className="flex justify-between mx-12 gap-4">
                {/* ----- Left column ----- */}
                <div className="max-w-4xl w-full">
                    {/* Breadcrumb + Intro */}
                    <div className="bg-white rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-2 text-sm mb-4">
                            <Link to="/home" className="text-orange-500">
                                Inicio
                            </Link>
                            <span>›</span>
                            <Link to="/room" className="text-orange-500">
                                Cuarto
                            </Link>
                            <span>›</span>
                            <span className="text-gray-600">
                                {room.tipo_cuarto} en {room.direccion_propiedad}
                            </span>
                        </div>

                        {/* Title & desc */}
                        <h1 className="text-2xl font-semibold mb-1">
                            {room.tipo_cuarto} en {room.direccion_propiedad}
                        </h1>

                        <div className="flex items-center text-gray-400 mb-2">
                            <IoLocationSharp className="w-4 h-4 mr-1" />
                            {room.direccion_propiedad}
                            <div className="ml-auto flex items-center gap-1">
                                <span>{room.valoracion || '—'}</span>
                                <span className="text-yellow-400">★</span>
                            </div>
                        </div>

                        <hr className="my-2" />

                        <p className="text-gray-600">{room.descripcion}</p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-4 gap-4 mb-2">
                        {SPECS.map(({ name, value }) => (
                            <div key={name} className="text-center bg-white p-4 rounded-lg">
                                <p className="text-gray-600">{name}</p>
                                <p className="font-semibold">{value(room)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Información adicional */}
                    {room.informacion_adicional && (
                        <div className="flex bg-white rounded-lg p-6 mb-2 gap-4">
                            <h2 className="text-xl font-semibold w-32">Información adicional</h2>
                            <span className="block w-px bg-gray-300"></span>
                            <div className="text-gray-600 text-sm">
                                {room.informacion_adicional.split('\n').map((l, i) => (
                                    <p key={i}>{l}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Servicios */}
                    <div className="flex bg-white rounded-lg p-6 mb-2 gap-4">
                        <h2 className="text-xl font-semibold w-32">Servicios</h2>
                        <span className="block w-px bg-gray-300"></span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm w-full">
                            {room.servicios.length ? (
                                room.servicios.map((s) => (
                                    <div key={s.servicio_id} className="flex items-center gap-2">
                                        {/* Iconos */}
                                        {s.servicio === 'WiFi' && <FaWifi />}
                                        {s.servicio === 'Agua' && <FaTint />}
                                        {s.servicio === 'Luz' && <FaBolt />}
                                        {s.servicio === 'Seguridad' && <FaLock />}
                                        {s.servicio === 'Calefacción' && <FaFire />}
                                        {s.servicio === 'Limpieza' && <FaBroom />}
                                        {s.servicio === 'Garage' && <FaCar />}
                                        {s.servicio === 'Lavandería' && <FaTshirt />}

                                        <span className="font-semibold">{s.servicio}:</span>
                                        <span>{s.descripcion || 'Sin descripción'}</span>
                                    </div>
                                ))
                            ) : (
                                <p>Aún no agregado</p>
                            )}
                        </div>
                    </div>

                    {/* Mapa */}
                    <div className="bg-white rounded-lg p-6 mb-2">
                        <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                        <img src={MAP} alt="mapa" className="w-full h-64 object-cover rounded-lg" />
                    </div>

                    {/* Reglas */}
                    {room.reglas && (
                        <div className="bg-white rounded-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Reglas de la casa</h2>
                            <ul className="space-y-2">
                                {room.reglas.split(',').map((rule, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                        {rule.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* ----- Right panel ----- */}
                <aside className="bg-white h-fit w-80 shrink-0">
                    <div className="bg-secondary p-4 text-center text-white">
                        <div className="text-3xl font-normal">
                            <span className="text-lg">S/</span>
                            {room.precio}
                            <span className="text-lg">/{room.periodo}</span>
                        </div>
                        <button
                            onClick={handleAddFavorite}
                            className="w-full border px-8 py-2 mt-2"
                        >
                            Añadir a Favoritos
                        </button>
                        <button className="w-full border px-8 py-2 mt-2">Compartir</button>
                    </div>

                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                            <IoPersonCircleOutline className="w-5 h-5 text-gray-500" />
                            {room.partner.nombre} {room.partner.apellido}
                        </div>
                        <button className="w-full border border-gray-500 rounded-sm py-1 text-gray-500 flex items-center justify-center gap-2">
                            <PiHouseLineLight className="w-4 h-4" />
                            Información de la casa
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-5 p-5 bg-gray-100 text-gray-500">
                        <MdOutlinePhone className="w-5 h-5" />
                        <FaWhatsapp className="w-5 h-5" />
                        <CiAt className="w-5 h-5" />
                    </div>

                    <div className="py-2 bg-background" />
                    <div className="flex py-4 justify-around items-center">
                        <span>Tu reseña</span>
                        <div className="flex gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <PiStarThin key={i} size={14} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* ---------- Similares ---------- */}
            <div className="mx-36">
                <h2 className="text-2xl font-semibold my-6">Recomendaciones similares</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {similarRooms.map((r) => (
                        <WideRoomCard
                            key={r.cuarto_id}
                            image={
                                r.fotos?.length ? r.fotos[0].url_imagen : ROOM
                            }
                            title={r.nombre}
                            location={r.direccion_propiedad}
                            price={r.precio}
                            periodo={r.periodo}
                            valoracion={r.valoracion}
                            destacado={r.destacado}
                            amenities={{
                                wifi: r.servicios?.some((s) => s.servicio === 'WiFi'),
                                parking: r.servicios?.some((s) => s.servicio === 'Parking'),
                                bed: true,
                                bath: true,
                                location: true,
                            }}
                            publisher={`${r.partner?.nombre || ''} ${r.partner?.apellido || ''
                                }`}
                            onClick={() => navigate(`/room/${r.cuarto_id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
