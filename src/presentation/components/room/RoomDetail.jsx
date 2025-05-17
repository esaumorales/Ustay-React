import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRoomById, fetchRooms } from '@/infrastructure/services/room.service';
import { addFavorite } from '@/infrastructure/services/favorite.service'; // Importa el servicio
import { IoLocationSharp, IoPersonCircleOutline } from "react-icons/io5";
import { PiHouseLineLight } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { CiAt } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IconWifi } from '@/presentation/assets/icons/icon-wifi';
import { Link } from 'react-router-dom';
import MAP from '@/presentation/assets/img/background-map.png';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import WideRoomCard from './WideRoomCard'; 
import ROOM from '@/presentation/assets/img/room.png';
import Alert from '@/presentation/components/common/Alert'; // Importa el componente Alert

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

export const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [similarRooms, setSimilarRooms] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await fetchRoomById(id);
        setRoom({
          ...roomData.cuarto,
          servicios: roomData.servicios
        });

        const roomsData = await fetchRooms();
        const rooms = roomsData.cuartos;
        if (Array.isArray(rooms)) {
          setSimilarRooms(rooms.filter(r => r.cuarto_id !== parseInt(id)).slice(0, 6));
        } else {
          console.error('Rooms data is not an array:', rooms);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    loadRoom();
  }, [id]);
  const handleAddFavorite = async () => {
    const userId = localStorage.getItem('userId'); // Asegúrate de que el userId esté almacenado en localStorage
    console.log('userId:', userId); // Agrega este log para verificar el valor de userId
    if (!userId) {
        console.error('User not logged in');
        return;
    }

    try {
        await addFavorite(userId, id); // Cambia para pasar userId y cuartoId directamente
        setShowNotification(true); // Muestra la notificación
    } catch (error) {
        console.error('Error adding favorite:', error);
    }
};

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      {showNotification && (
        <Alert message="Añadido a favoritos" onClose={() => setShowNotification(false)} />
      )}
      <div className="flex gap-2 mb-8 h-108">
        {/* Image Gallery */}
        <div className="flex flex-row w-full">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            autoplay={{
              delay: 3000,
            }}
            slidesPerView={3}
            modules={[EffectCoverflow, Autoplay]}
            className='flex justify-center items-center'>
            {Array.isArray(room?.fotos) ? room.fotos.map((image, index) =>
              <SwiperSlide key={index}>
                <img src={image} alt={room.tipo_cuarto} className="h-full w-full block object-cover " />
              </SwiperSlide>
            ) : <p>No images available</p>}
          </Swiper>
        </div>
      </div>
      {/* Two Column */}
      <div className='flex justify-between mx-12'>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
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
          <div className="flex justify-between items-start my-8">
            <div className='space-y-4'>
              <h1 className="text-2xl font-semibold mb-2">{room.tipo_cuarto} en {room.direccion_propiedad}</h1>
              <p className="text-gray-600">{room.direccion_propiedad}</p>
              <div className='flex flex-row justify-between text-gray-400'>
                <div className='flex items-center '>
                  <IoLocationSharp className='w-4 h-4' />
                  <p>{room.direccion_propiedad}</p></div>
                <div>
                  <span className='text-sm'>{room.rating}</span>
                  <span className='text-yellow-400'>★</span>
                </div>
              </div>
              <hr className='text-gray-300' />
              <div className='max-w-full text-gray-400'>
                <p>{room.descripcion}</p>
              </div>
            </div>
          </div>
          {/* Specs */}
          <div className='grid grid-cols-4 gap-4 mb-8'>
            {SPECS.map(({ name, value }) => (
              <div key={name} className="text-center item p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">{name}</p>
                <p className="font-semibold">{value(room)}</p>
              </div>
            ))}
          </div>
          {/* Additional Information */}
          <div className="flex bg-white rounded-lg shadow p-6 mb-8 gap-4">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 w-32">
                Información adicional
              </h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className='text-gray-600 text-[14px]'>
              {room.informacion_adicional.split('\n').map((line, index) => (
                <p key={index} className="mb-1">{line}</p>
              ))
              }
            </div>
          </div>

          {/* Services */}
          <div className="flex rounded-lg shadow p-6 mb-8 gap-4">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 w-32">Servicios</h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[14px] w-full">
              {Array.isArray(room?.servicios) && room.servicios.length > 0 ? room.servicios.map(servicio => (
                <div key={servicio.servicio_id} className="flex items-center gap-2">
                  <span className="w-8 h-8  flex items-center justify-center">
                    <IconWifi className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-gray-600 font-semibold">{servicio.servicio}:</span>
                    <span className="text-gray-600"> {servicio.descripcion}</span>
                  </div>
                </div>
              )) : <p>Aun no agregado</p>}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {/* Map */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
              <div className="h-64 bg-gray-200 rounded-lg ">
                <img src={MAP} alt="" className='w-full h-full object-cover rounded-xl' />
              </div>
            </div>
            {/* House Rules */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
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
          {/* Similar Rooms Section */}
        </div>

        <div>
          <div>
            {/* Send and Favorite */}
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

          {/* Property Details Grid and Owner */}
          <div className='flex flex-col w-full h-full my-2 p-4 space-y-2 '>
            <div className='space-y-2 mx-3 '>
              <div className='flex items-center gap-1 text-gray-600 after:content-["Verificado"] after:text-amber-300 after:m-2'>
                <IoPersonCircleOutline className='w-5 h-5 text-gray-500' />
                <p>
                  {room.partner.nombre}
                </p>
                <p>{room.partner.apellido}</p>
              </div>
              <div className='text-gray-500 '>
                <button className='flex  gap-2 border border-gray-500 rounded-sm items-center justify-center p-1 w-full '>
                  <PiHouseLineLight className='w-4 h-4' />
                  <p>Información de la casa</p>
                </button>
              </div>
            </div>
            <div className='flex items-center justify-center p-5 text-gray-500 bg-gray-100 gap-5'>
              <a href="/"> <MdOutlinePhone className='w-5 h-5' /> </a>
              <a href="/"> <FaWhatsapp className='w-5 h-5' /></a>
              <a href="/"> <CiAt className='w-5 h-5' /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-37">
        <h2 className="text-2xl font-semibold mb-6">Recomendaciones similares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {similarRooms.map(similarRoom => (
            <WideRoomCard
              key={similarRoom.cuarto_id}
              image={similarRoom.fotos && similarRoom.fotos.length > 0 ? similarRoom.fotos[0] : ROOM} // Use a default image if none are available
              title={similarRoom.nombre}
              location={similarRoom.direccion_propiedad}
              price={similarRoom.precio}
              periodo={similarRoom.periodo}
              rating={similarRoom.rating}
              destacado={similarRoom.destacado}
              amenities={{
                wifi: similarRoom.servicios && similarRoom.servicios.some(s => s.servicio === 'WiFi'),
                parking: similarRoom.servicios && similarRoom.servicios.some(s => s.servicio === 'Parking'),
                bed: true,
                bath: true,
                location: true
              }}
              publisher={`${similarRoom.partner ? `${similarRoom.partner.nombre} ${similarRoom.partner.apellido}` : 'Unknown Publisher'}`}
              onClick={() => navigate(`/room/${similarRoom.cuarto_id}`)} // Use navigate to redirect
            />
          ))}
        </div>
      </div>
    </div>
  );
};