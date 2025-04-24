import { useParams } from 'react-router-dom';
import { CARDS_DATA } from '@/models/cards';
import { MdHomeWork } from "react-icons/md";
import { IoLocationSharp, IoPersonCircleOutline } from "react-icons/io5";
import { PiHouseLineLight } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { CiAt } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IconWifi } from '@/assets/icons/icon-wifi';
import { Link } from 'react-router-dom';
import { RoomCard } from './RoomCard';
import MAP from '@/assets/img/background-map.png';


const SPECS = [
  {
    name: 'Tipo',
    value: room => room.type
  },
  {
    name: 'Dimensiones',
    value: room => room.dimensions || '2.5 x 3.5m'
  },
  {
    name: 'Piso',
    value: room => room.floor || '1er piso'
  },
  {
    name: 'Número',
    value: room => room.roomNumber || '102'
  }
]
export const RoomDetail = () => {
  const { id } = useParams();
  const room = CARDS_DATA.find(room => room.id === parseInt(id));

  // Get 6 similar rooms
  const similarRooms = CARDS_DATA.filter(r => r.id !== parseInt(id)).slice(0, 6);

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      <div className="flex gap-2 mb-8 h-96">
        {/* Image Gallery */}
        <div className="flex flex-row w-full relative gap-4">
          <img src={room.image} alt={room.type} className="w-full h-full object-cover" />
          <img src={room.image} alt="" className="w-full h-full object-cover" />
          <img src={room.image} alt="" className="w-full h-full  object-cover " />
        </div>
      </div>
      {/* Two Colum */}
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
            <span className="text-gray-600">{room.type} en {room.location}</span>
          </div>

          {/* Title and Price Section */}
          <div className="flex justify-between items-start my-8">
            <div className='space-y-4'>
              <h1 className="text-2xl font-semibold mb-2">{room.type} en {room.location}</h1>
              <p className="text-gray-600">{room.address}</p>
              <div className='flex flex-row justify-between text-gray-400'>
                <div className='flex items-center '>
                  <IoLocationSharp className='w-4 h-4' />
                  <p>Lurigancho, Ñaña, San Francisco, 14 - 13</p></div>
                <div>
                  <span className='text-sm'>{room.rating}</span>
                  <span className='text-yellow-400'>★</span>
                </div>

              </div>
              <hr className='text-gray-300' />
              <div className='max-w-full text-gray-400'>
                <p>Cuarto acogedor y amueblado con servicios básicos, ideal para estudiantes
                  o personas que buscan un espacio tranquilo. Cuenta con una cama individual,
                  un ropero para almacenamiento y suficiente espacio para estudiar o relajarse.
                  El cuarto tiene acceso a luz natural y ventilación, y está ubicado en una zona
                  segura y accesible.</p>
              </div>
            </div>
          </div>
          {/* Specs  */}
          <div className='grid grid-cols-4 gap-4 mb-8'>
            {SPECS.map(({ name, value }) => (
              <div key={name} className="text-center item p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">{name}</p>
                <p className="font-semibold">{value(room)}</p>
              </div>
            ))}
          </div>
          {/* Additional Information */}
          <div className=" flex bg-white rounded-lg shadow p-6 mb-8 gap-4">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 w-32">
                Información adicional
              </h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className='text-gray-600'>
              <p className=" mb-4">{room.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(room.additionalInfo || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-medium capitalize">{key}:</span>
                    <span className="">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Services */}
          <div className="flex rounded-lg shadow p-6 mb-8 gap-4">
            <div className='flex gap-8'>
              <h2 className="text-xl font-semibold mb-4 w-32">Servicios</h2>
              <span className='block w-[1px] h-full bg-gray-300'></span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(room.services || {}).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <IconWifi className="w-4 h-4" />
                  </span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
            <div className="h-64 bg-gray-200 rounded-lg">
              <img src={MAP} alt="" />
            </div>
          </div>
          {/* House Rules */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Reglas de la casa</h2>
            <ul className="space-y-2">
              {room.houseRules?.map((rule, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          {/* Similar Rooms Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Recomendaciones similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarRooms.map(similarRoom => (
                <RoomCard key={similarRoom.id} {...similarRoom} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div>
            {/* Send and Favorite */}
            <div className="text-start bg-secondary p-4">
              <div className="text-3xl font-normal text-white">
                <span className="text-lg">S/</span>{room.price}
                <span className="text-lg">/Mes</span>
              </div>
              <button className="w-full bg-transparent text-white px-8 py-2  border mt-2">
                Añadir a Favoritos
              </button>
              <button className="w-full bg-transparent text-white px-8 py-2  border mt-2">
                Compartir
              </button>
            </div>
          </div>

          {/* Property Details Grid  and Owner*/}
          <div className='flex flex-col w-full h-full my-2 p-4 space-y-2 '>
            <div className='space-y-2 mx-3 '>
              <div className='flex flex-wrap items-center gap-2'>
                <IoPersonCircleOutline className='w-5 h-5 text-gray-500' />
                <p className='font-semibold text-xl'>
                  {room.homeOwner}
                </p>
              </div>
              <div>
                <p className='text-gray-600 after:content-["Verificado"] after:text-amber-300 after:m-2' >
                  Partner
                </p>
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
              <a href="/"><FaWhatsapp className='w-5 h-5' /></a>
              <a href="/"><CiAt className='w-5 h-5' /></a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};