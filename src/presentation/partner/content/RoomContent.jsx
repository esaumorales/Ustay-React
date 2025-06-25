import { useState, useEffect } from 'react';
import PropertyHeader from '../components/PropertyHeader';
import RoomCard from '../components/room/RoomCard';
import { getRoomsByPartner } from '@/infrastructure/services/property.service';
import RegisterRoom from '../components/room/RegisterRoom';
import Paginator from '@/presentation/partner/common/Paginator'; // 👈 ajusta el path si es necesario

const PAGE_SIZE = 6;

export default function RoomContent() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------- Cargar cuartos ---------- */
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const partnerId = localStorage.getItem('userId');
        if (!partnerId) {
          setRooms([]);
          setLoading(false);
          return;
        }
        const data = await getRoomsByPartner(partnerId);
        setRooms(data.cuartos || []);
      } catch (error) {
        console.error(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  /* ---------- Eliminar cuarto ---------- */
  const handleDelete = (id) => {
    const updatedRooms = rooms.filter(room => room.cuarto_id !== id);
    setRooms(updatedRooms);

    // Ajustar página si eliminamos el último item de la última página
    const lastPage = Math.ceil(updatedRooms.length / PAGE_SIZE) || 1;
    if (currentPage > lastPage) setCurrentPage(lastPage);
  };

  /* ---------- Paginación ---------- */
  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);
  const paginatedRooms = rooms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  /* ---------- UI ---------- */
  return (
    <div className='mb-4'>
      <PropertyHeader
        title="Cuartos"
        descripcion="Registra tu propiedad, verifícalo y empieza a publicar los inmuebles que hay dentro de este."
      />

      {/* Botón Registrar */}
      {!showRegister && (
        <div className="flex justify-between mt-2 mx-22">
          <div>
            <select name="property" id="property" className='border p-2 rounded-md'>
              <option value="Propiedad 1">Propiedad 1</option>
            </select>
          </div>
          <div>
            <button
              className="border px-4 py-2 rounded bg-white hover:bg-gray-100 shadow text-black font-semibold"
              onClick={() => setShowRegister(true)}
            >
              Registrar Cuarto +
            </button>
          </div>

        </div>
      )}

      {/* Registro nuevo cuarto */}
      {showRegister ? (
        <RegisterRoom
          onClose={() => setShowRegister(false)}
          hasRooms={rooms.length > 0}
        />
      ) : loading ? (
        <div className="text-center my-8">Cargando cuartos...</div>
      ) : rooms.length === 0 ? (
        <div className="text-center my-8">No hay cuartos registrados.</div>
      ) : (
        <>
          {/* Cuartos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {paginatedRooms.map((cuarto, idx) => (
              <RoomCard
                key={cuarto.cuarto_id || idx}
                id={cuarto.cuarto_id}
                foto={cuarto.foto || cuarto.foto_propiedad}
                nombre={cuarto.nombre}
                descripcion={cuarto.descripcion}
                tipo_cuarto={cuarto.tipo_cuarto}
                periodo={cuarto.propiedad?.periodo || 'No especificado'}
                estado={cuarto.disponibilidad === 1 ? 'Disponible' : 'No disponible'}
                precio={cuarto.precio}
                estado_verificacion={cuarto.propiedad?.estado_verificacion || 'No disponible'}
                onDeleted={handleDelete}
              />
            ))}
          </div>

          {/* Paginador reutilizable */}
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
