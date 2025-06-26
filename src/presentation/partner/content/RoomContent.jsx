import { useState, useEffect } from 'react';
import PropertyHeader from '../components/PropertyHeader';
import RoomCard from '../components/room/RoomCard';
import {
  getRoomsByPartner,
  getPropertiesByPartner
} from '@/infrastructure/services/property.service';
import RegisterRoom from '../components/room/RegisterRoom';
import Paginator from '@/presentation/partner/common/Paginator';

const PAGE_SIZE = 6;

export default function RoomContent() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const partnerId = localStorage.getItem('userId');
        if (!partnerId) {
          setRooms([]);
          setPropiedades([]);
          setLoading(false);
          return;
        }

        const [roomsData, propiedadesData] = await Promise.all([
          getRoomsByPartner(partnerId),
          getPropertiesByPartner(partnerId)
        ]);

        const cuartos = roomsData.cuartos || [];
        const propiedadesRaw = propiedadesData.propiedades || [];

        setRooms(cuartos);

        const propsFormatted = propiedadesRaw.map((p) => ({
          id: p.propiedad_id,
          direccion:
            p.direccion || p.direccion_completa || `Propiedad ${p.propiedad_id}`
        }));

        setPropiedades(propsFormatted);

        if (!propiedadSeleccionada && propsFormatted.length > 0) {
          setPropiedadSeleccionada(propsFormatted[0].id);
        }
      } catch (error) {
        console.error('Error al cargar cuartos o propiedades:', error);
        setRooms([]);
        setPropiedades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const updatedRooms = rooms.filter((room) => room.cuarto_id !== id);
    setRooms(updatedRooms);

    const lastPage = Math.ceil(updatedRooms.length / PAGE_SIZE) || 1;
    if (currentPage > lastPage) setCurrentPage(lastPage);
  };

  const filteredRooms = propiedadSeleccionada
    ? rooms.filter((room) => room.propiedad_id === propiedadSeleccionada)
    : rooms;

  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className='mb-4'>
      <PropertyHeader
        title='Cuartos'
        descripcion='Registra tu propiedad, verifícalo y empieza a publicar los inmuebles que hay dentro de este.'
      />

      {!showRegister && (
        <div className='flex justify-between mt-2 mx-22'>
          <div>
            <select
              name='property'
              id='property'
              className='border p-2 rounded-md'
              value={propiedadSeleccionada || ''}
              onChange={(e) => {
                const value = e.target.value;
                setPropiedadSeleccionada(value === '' ? null : Number(value));
                setCurrentPage(1);
              }}
            >
              <option value=''>Todas las propiedades</option>
              {propiedades.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.direccion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className='border px-4 py-2 rounded bg-white hover:bg-gray-100 shadow text-black font-semibold'
              onClick={() => {
                if (!propiedadSeleccionada) {
                  alert('Selecciona una propiedad antes de registrar un cuarto');
                  return;
                }
                setShowRegister(true);
              }}
            >
              Registrar Cuarto +
            </button>
          </div>
        </div>
      )}

      {showRegister ? (
        <RegisterRoom
          onClose={() => setShowRegister(false)}
          hasRooms={rooms.length > 0}
          propiedadId={propiedadSeleccionada} // ✅ se pasa correctamente
        />
      ) : loading ? (
        <div className='text-center my-8'>Cargando cuartos...</div>
      ) : filteredRooms.length === 0 ? (
        <div className='text-center my-8'>
          No hay cuartos registrados para esta propiedad.
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
            {paginatedRooms.map((cuarto) => (
              <RoomCard
                key={cuarto.cuarto_id}
                id={cuarto.cuarto_id}
                foto={cuarto.foto || cuarto.foto_propiedad}
                nombre={cuarto.nombre}
                descripcion={cuarto.descripcion}
                tipo_cuarto={cuarto.tipo_cuarto}
                periodo={cuarto.periodo || 'No especificado'}
                estado={
                  cuarto.disponibilidad === 1 ? 'Disponible' : 'No disponible'
                }
                precio={cuarto.precio}
                estado_verificacion={
                  cuarto.propiedad?.estado_verificacion || 'No disponible'
                }
                onDeleted={handleDelete}
              />
            ))}
          </div>

          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
