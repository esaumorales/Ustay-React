import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPropertyById } from '@/infrastructure/services/property.service';
import ROOM from '@/presentation/assets/img/room.png';
import MAP from '@/presentation/assets/img/background-map.png';

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
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda */}
      <div className="lg:col-span-2">
        {/* Galería */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <img src={ROOM} className="w-full h-40 object-cover rounded" alt="" />
          <img src={ROOM} className="w-full h-40 object-cover rounded" alt="" />
          <img src={ROOM} className="w-full h-40 object-cover rounded" alt="" />
        </div>

        {/* Info propiedad */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Propiedad de {property.nombre_partner} {property.apellido_partner}
          </h2>
          <p className="text-gray-600 mb-2">{property.direccion_completa}</p>
          <p className="text-sm text-gray-500 mb-4">
            A verificar los datos del propietario y su condición de titular del predio.
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div><strong>Teléfono:</strong> {property.telefono_partner}</div>
            <div><strong>Correo:</strong> {property.correo_partner}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Cant. Pisos</p>
              <p className="font-semibold text-lg">{property.n_pisos}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Cant. Cuartos</p>
              <p className="font-semibold text-lg">{property.n_cuarto}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Zona</p>
              <p className="font-semibold text-lg">{property.zona}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Verificación</p>
              <p className="font-semibold text-lg">{property.estado_verificacion}</p>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-6">
            <img src={MAP} alt="Mapa" className="w-full h-64 object-cover rounded" />
          </div>

          {/* Reglas */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Reglas de la casa</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {property.reglas}
            </p>
          </div>

          {/* Descripción */}
          {property.descripcion && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-gray-700">{property.descripcion}</p>
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha */}
      <div>
        {/* Botones */}
        <div className="bg-secondary text-white p-4 rounded-lg">
          <button
            onClick={() => navigate(`/IMS/property/editar-propiedad/${property.propiedad_id}`)}
            className="w-full mb-2 bg-white text-secondary py-2 rounded font-semibold"
          >
            Editar
          </button>
          <button className="w-full border border-white py-2 rounded">
            Compartir
          </button>
        </div>

        {/* Lista de cuartos */}
        <div className="mt-6 bg-white rounded shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Lista de cuartos ({property.cuartos.length})
          </h3>
          <ul className="space-y-4">
            {property.cuartos.map((cuarto) => (
              <li
                key={cuarto.cuarto_id}
                className="flex items-start gap-2 cursor-pointer"
                onClick={() => navigate(`/room/${cuarto.cuarto_id}`)}
              >
                <img src={ROOM} className="w-20 h-20 object-cover rounded" alt="cuarto" />
                <div>
                  <p className="font-semibold text-sm">{cuarto.nombre}</p>
                  <p className="text-xs text-gray-500">
                    S/.{cuarto.precio} • {cuarto.periodo}
                  </p>
                  <div className="flex text-yellow-400 text-xs">
                    {'★'.repeat(parseInt(cuarto.valoracion)) +
                      '☆'.repeat(5 - parseInt(cuarto.valoracion))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyRoomDetail;
