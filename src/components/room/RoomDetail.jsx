import { useParams } from 'react-router-dom';
import { CARDS_DATA } from '../../models/cards';
import { IconBath } from '../../assets/icons/icon-bath';
import { IconBed } from '../../assets/icons/icon-bed';
import { IconLocation } from '../../assets/icons/icon-location';
import { IconParking } from '../../assets/icons/icon-parking';
import { IconWifi } from '../../assets/icons/icon-wifi';
import { Link } from 'react-router-dom';
import { RoomCard } from './RoomCard';

export const RoomDetail = () => {
  const { id } = useParams();
  const room = CARDS_DATA.find(room => room.id === parseInt(id));

  // Get 6 similar rooms
  const similarRooms = CARDS_DATA.filter(r => r.id !== parseInt(id)).slice(0, 6);

  if (!room) return <div>Room not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="flex gap-2 mb-8 h-96">
        <div className="w-2/3 relative">
          <img src={room.image} alt={room.type} className="w-full h-full object-cover rounded-l-lg" />
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
            <span className="text-xl">‹</span>
          </button>
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          <img src={room.image} alt="" className="h-1/2 object-cover" />
          <img src={room.image} alt="" className="h-1/2 object-cover rounded-tr-lg" />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
            <span className="text-xl">›</span>
          </button>
        </div>
      </div>

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
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{room.type} en {room.location}</h1>
          <p className="text-gray-600">{room.address}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">
            <span className="text-lg">S/</span>{room.price}
            <span className="text-lg text-gray-600">/Mes</span>
          </div>
          <button className="bg-blue-600 text-white px-8 py-2 rounded-md mt-2">
            Añadir a Favoritos
          </button>
          <button className="w-full bg-gray-800 text-white px-8 py-2 rounded-md mt-2">
            Compartir
          </button>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Tipo</p>
          <p className="font-semibold">{room.type}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Dimensiones</p>
          <p className="font-semibold">{room.dimensions}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Piso</p>
          <p className="font-semibold">{room.floor || '1er piso'}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Cuarto</p>
          <p className="font-semibold">{room.roomNumber || '102'}</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información adicional</h2>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(room.additionalInfo || {}).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium capitalize">{key}:</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Servicios</h2>
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

      {/* Map */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
        <div className="h-64 bg-gray-200 rounded-lg">
          {/* Add your map component here */}
        </div>
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

      {/* Owner Information */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div>
            <h3 className="font-semibold">{room.homeOwner}</h3>
            <p className="text-gray-600">Partner Verificado</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button className="flex items-center gap-2 text-gray-600">
            <span>📞</span> Llamar
          </button>
          <button className="flex items-center gap-2 text-gray-600">
            <span>💬</span> WhatsApp
          </button>
          <button className="flex items-center gap-2 text-gray-600">
            <span>✉️</span> Email
          </button>
        </div>
      </div>
    </div>
  );
};