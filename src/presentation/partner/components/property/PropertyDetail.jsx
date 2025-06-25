import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPropertyById } from '@/infrastructure/services/property.service';
import MAP from '@/presentation/assets/img/background-map.png';
import WideRoomCard from '@/presentation/components/room/WideRoomCard';
import ROOM from '@/presentation/assets/img/room.png';

const PropertyRoomDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.propiedad);
      } catch (err) {
        console.error('Error loading property', err);
      }
    };
    load();
  }, [id]);

  if (!property) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <h1 className="text-2xl font-semibold mt-4">
        {property.direccion_completa}
      </h1>

      <img
        src={property.foto || ROOM}
        alt={property.descripcion}
        className="w-full h-80 object-cover rounded-lg my-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">N° Pisos</p>
          <p className="font-semibold">{property.n_pisos}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Zona</p>
          <p className="font-semibold">{property.zona}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Verificación</p>
          <p className="font-semibold">{property.estado_verificacion}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Reglas</p>
          <p className="font-semibold">{property.reglas}</p>
        </div>
      </div>

      {property.descripcion && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Descripción</h2>
          <p className="text-gray-700">{property.descripcion}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Ubicación</h2>
        <img
          src={MAP}
          alt="map"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Cuartos en esta propiedad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {property.cuartos.map((cuarto) => (
            <WideRoomCard
              key={cuarto.cuarto_id}
              image={ROOM}
              title={cuarto.nombre}
              location={property.direccion_completa}
              price={cuarto.precio}
              periodo={cuarto.periodo}
              valoracion={cuarto.valoracion}
              destacado={false}
              amenities={{
                wifi: true,
                parking: true,
                bed: true,
                bath: true,
                location: true,
              }}
              publisher={`${property.nombre_partner} ${property.apellido_partner}`}
              onClick={() => navigate(`/IMS/property/${cuarto.cuarto_id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyRoomDetail;
