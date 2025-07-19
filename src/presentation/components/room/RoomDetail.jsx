import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRoomById, fetchRooms } from '@/infrastructure/services/room.service';
import { addFavorite, getFavorites } from '@/infrastructure/services/favorite.service';
import { IoLocationSharp, IoPersonCircleOutline } from "react-icons/io5";
import { PiHouseLineLight, PiStarThin } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { CiAt } from "react-icons/ci";
import { FaBolt, FaBroom, FaCar, FaFire, FaLock, FaTint, FaTshirt, FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'swiper/css';
import WideRoomCard from './WideRoomCard';
import ROOM from '@/presentation/assets/img/room.png';
import Alert from '@/presentation/components/common/Alert';
import MapSelector from '@/presentation/partner/components/MapSelector';
import ImageGallery from '../common/ImageCarousel';
import { shuffleArray } from '@/presentation/utils/arrayHelpers';

const SPECS = [
  {
    name: 'Tipo',
    value: room => room.tipo_cuarto
  },
  {
    name: 'Dimensiones',
    value: room => room.dimensiones || '2.5 x 3.5m'
  },
  {
    name: 'Piso',
    value: room => room.n_piso || '1er piso'
  },
  {
    name: 'Número',
    value: room => room.n_cuarto || '102'
  }
];

const getAmenitiesFromRoom = (room) => ({
  wifi: room.servicios?.some(s => s.servicio === 'WiFi') || false,
  agua: room.servicios?.some(s => s.servicio === 'Agua') || false,
  luz: room.servicios?.some(s => s.servicio === 'Luz') || false,
  seguridad: room.servicios?.some(s => s.servicio === 'Seguridad') || false,
  calefaccion: room.servicios?.some(s => s.servicio === 'Calefacción') || false,
  limpieza: room.servicios?.some(s => s.servicio === 'Limpieza') || false,
  garage: room.servicios?.some(s => s.servicio === 'Garage') || false,
  lavanderia: room.servicios?.some(s => s.servicio === 'Lavandería') || false,
  parking: room.servicios?.some(s => s.servicio === 'Garage' || s.servicio === 'Parking') || false,
});


export const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [similarRooms, setSimilarRooms] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const loadRoom = async () => {

      try {
        const roomData = await fetchRoomById(id);
        setRoom({
          ...roomData.cuarto,
          servicios: roomData.servicios,
          fotos: roomData.fotos || [], // aseguramos que fotos sea array
        });

        const roomsData = await fetchRooms();

        const rooms = roomsData.cuartos;



        if (Array.isArray(rooms)) {
          const shuffled = shuffleArray(rooms.filter(r => r.cuarto_id !== parseInt(id)));
          setSimilarRooms(shuffled.slice(0, 6));
        } else {
          console.error('Rooms data is not an array:', rooms);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };


    const fetchUserFavorites = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const favoritesData = await getFavorites(userId);
          setUserFavorites(favoritesData.favoritos || []);
        } catch (error) {
          console.error('Error fetching user favorites:', error);
        }
      }
    };

    loadRoom();
    fetchUserFavorites();
  }, [id]);

  const handleAddFavorite = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const alreadyFavorite = userFavorites.some(fav => fav.cuarto_id === parseInt(id));
    if (alreadyFavorite) {
      setNotificationMsg("Este cuarto ya está en tus favoritos.");
      setNotificationType("warning");
      setShowNotification(true);
      return;
    }

    try {
      await addFavorite(userId, id);
      setNotificationMsg("Añadido a favoritos");
      setNotificationType("success");
      setShowNotification(true);
      const favoritesData = await getFavorites(userId);
      setUserFavorites(favoritesData.favoritos || []);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      {showNotification && (
        <Alert message={notificationMsg} onClose={() => setShowNotification(false)} type={notificationType} />
      )}
      <div className="flex gap-2 mb-8 h-108">
        {/* Image Gallery */}
        <div className="flex flex-row w-full">
          <div className="flex justify-center w-full">
            <ImageGallery images={room.fotos} />
          </div>
        </div>
      </div>

      {/* Two Column */}
      <div className='flex justify-between mx-12'>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className='bg-white rounded-lg p-2 mb-2'>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4 ">
              <Link to='/home'>
                <span className="text-orange-500">Inicio</span>
                <span>›</span>
              </Link>
              <Link to='/room'>
                <span className="text-orange-500">Cuarto</span>
                <span>›</span>
              </Link>
              <span className="text-gray-600">{room.tipo_cuarto} en {room.direccion_propiedad}</span>
            </div>

            {/* Title and Price Section */}
            <div className="flex my-4 w-full">
              <div className='space-y-4'>
                <div>
                  <h1 className="text-2xl font-semibold mb-2">{room.tipo_cuarto} en {room.direccion_propiedad}</h1>
                </div>
                <div className='flex flex-row justify-between text-gray-400'>
                  <div className='flex items-center'>
                    <IoLocationSharp className='w-4 h-4' />
                    <p>{room.direccion_propiedad}</p>
                  </div>
                  <div>
                    <span className='text-sm'>{room.valoracion}</span>
                    <span className='text-yellow-400'>★</span>
                  </div>
                </div>
                <hr className='text-gray-300 w-208' />
                <div className='flex flex-wrap wrap-break-word'>
                  <div className='w-208 text-gray-400'>
                    <p>{room.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className='grid grid-cols-4 gap-4 mb-2'>
            {SPECS.map(({ name, value }) => (
              <div key={name} className="text-center item p-4 bg-white rounded-lg ">
                <p className="text-gray-600">{name}</p>
                <p className="font-semibold">{value(room)}</p>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="flex bg-white rounded-lg p-6 mb-2 gap-4">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 w-32">
                Información adicional
              </h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className='text-gray-600 text-[14px]'>
              {room.informacion_adicional.split('\n').map((line, index) => (
                <p key={index} className="mb-1">{line}</p>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="flex rounded-lg p-6 mb-2 gap-4 bg-white">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 w-32">Servicios</h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[14px] w-full">
              {Array.isArray(room.servicios) && room.servicios.length > 0 ? room.servicios.map(servicio => (
                <div key={servicio.servicio_id} className="flex items-center gap-2">
                  {/* Show icon based on service type */}
                  {servicio.servicio === 'WiFi' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaWifi className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Agua' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaTint className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Luz' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaBolt className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Seguridad' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaLock className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Calefacción' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaFire className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Limpieza' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaBroom className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Garage' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaCar className="w-4 h-4" />
                    </span>
                  )}
                  {servicio.servicio === 'Lavandería' && (
                    <span className="w-8 h-8 flex items-center justify-center">
                      <FaTshirt className="w-4 h-4" /> {/* Icono para Lavandería */}
                    </span>
                  )}
                  {/* Add other service icons here if necessary */}

                  <div >
                    <span className="text-gray-600 font-semibold">{servicio.servicio}:</span>
                    <span className="text-gray-600"> {servicio.descripcion || "Sin descripción"}</span>
                  </div>
                </div>
              )) : <p>Aún no agregado</p>}
            </div>
          </div>


          {/* Mapa */}
          <div className="bg-white rounded-lg p-6 mb-2">
            <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
            {room.latitud && room.longitud ? (
              <MapSelector
                selectedCoords={{ lat: parseFloat(room.latitud), lng: parseFloat(room.longitud) }}
                readOnly={true}
              />
            ) : (
              <div className="h-64 flex items-center justify-center bg-gray-200 rounded-lg">
                <p>No se especificó ubicación</p>
              </div>
            )}
          </div>


          {/* House Rules */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Reglas de la casa</h2>
            <ul className="space-y-2">
              {room.reglas.split(',').map((rule, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {rule.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side panel */}
        <div className='bg-white h-fit'>
          <div>
            <div className="text-start bg-secondary p-4">
              <div className="text-3xl font-normal text-white">
                <span className="text-lg">S/</span>{room.precio}
                <span className="text-lg">/{room.periodo}</span>
              </div>
              <button onClick={handleAddFavorite} className="w-full bg-transparent text-white px-8 py-2 border mt-2">
                Añadir a Favoritos
              </button>
              <button className="w-full bg-transparent text-white px-8 py-2 border mt-2">
                Compartir
              </button>
            </div>
          </div>

          <div className='flex flex-col w-full h-full my-2 p-4 space-y-2'>
            <div className='space-y-2 mx-3'>
              <div className='flex items-center gap-1 text-gray-600 after:content-["Verificado"] after:text-amber-300 after:m-2 '>
                <IoPersonCircleOutline className='w-5 h-5 text-gray-500' />
                <p>{room.partner.nombre}</p>
                <p>{room.partner.apellido}</p>
              </div>
              <div className='text-gray-500'>
                <button className='flex gap-2 border border-gray-500 rounded-sm items-center justify-center p-1 w-full'>
                  <PiHouseLineLight className='w-4 h-4' />
                  <p>Información de la casa</p>
                </button>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center p-5 text-gray-500 bg-gray-100 gap-5'>
            <a href="/"><MdOutlinePhone className='w-5 h-5' /></a>
            <a href="/"><FaWhatsapp className='w-5 h-5' /></a>
            <a href="/"><CiAt className='w-5 h-5' /></a>
          </div>

          <div className='py-2 bg-background'></div>
          <div className='flex py-5 justify-around gap-4 items-center'>
            <div>
              <span>Tu reseña</span>
            </div>
            <div className='flex gap-1'>
              <PiStarThin size={12} className='text-amber-500' />
              <PiStarThin size={12} className='text-amber-500' />
              <PiStarThin size={12} className='text-amber-500' />
              <PiStarThin size={12} className='text-amber-500' />
              <PiStarThin size={12} className='text-amber-500' />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Rooms Section */}
      <div className="mx-37">
        <h2 className="text-2xl font-semibold mb-6">Recomendaciones similares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {similarRooms.map(similarRoom => (
            <WideRoomCard
              key={similarRoom.cuarto_id}
              image={
                similarRoom.fotos && similarRoom.fotos.length > 0
                  ? (similarRoom.fotos[0].url_imagen || similarRoom.fotos[0].foto || similarRoom.fotos[0])
                  : ROOM
              }
              title={similarRoom.nombre}
              location={similarRoom.direccion_propiedad}
              price={similarRoom.precio}
              periodo={similarRoom.periodo}
              valoracion={similarRoom.valoracion}
              destacado={similarRoom.destacado}
              amenities={getAmenitiesFromRoom(similarRoom)}
              publisher={`${similarRoom.partner ? `${similarRoom.partner.nombre} ${similarRoom.partner.apellido}` : 'Unknown Publisher'}`}
              onClick={() => navigate(`/room/${similarRoom.cuarto_id}`)}
            />

          ))}
        </div>
      </div>
    </div>
  );
};
