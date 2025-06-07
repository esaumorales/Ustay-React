import { useState, useEffect } from 'react';
import PropertyHeader from '../components/PropertyHeader';
import RoomCard from '../components/room/RoomCard';
import { getRoomsByPartner } from '@/infrastructure/services/property.service';
import RegisterRoom from '../components/room/RegisterRoom';

export default function RoomContent() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

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

  // Función para manejar la eliminación de un cuarto
  const handleDelete = (id) => {
    // Filtrar el cuarto eliminado de la lista
    setRooms(rooms.filter(room => room.cuarto_id !== id));
  };

  return (
    <div>
      <PropertyHeader
        title="Cuartos"
        descripcion="Registra tu propiedad, verifícalo y empieza a publicar los inmuebles que hay dentro de este."
      />

      <div>
        {!showRegister && (
          <div className="flex justify-end mt-2 mr-6">
            <button
              className="border px-4 py-2 rounded bg-white hover:bg-gray-100 shadow text-black font-semibold"
              onClick={() => setShowRegister(true)}
            >
              Registrar Cuarto +
            </button>
          </div>
        )}

        {showRegister ? (
          <RegisterRoom
            onClose={() => setShowRegister(false)}
            hasRooms={rooms.length > 0}
          />
        ) : loading ? (
          <div className="text-center my-8">Cargando propiedades...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center my-8">No hay cuartos registrados.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-8">
            {rooms.map((cuarto, idx) => (
              <RoomCard
                key={cuarto.cuarto_id || idx}
                id={cuarto.cuarto_id}
                foto={cuarto.foto || cuarto.foto_propiedad } // Asegúrate de que `foto` o `foto_propiedad` sea válida
                nombre={cuarto.nombre}
                descripcion={cuarto.descripcion}
                tipo_cuarto={cuarto.tipo_cuarto}
                periodo={cuarto.propiedad?.periodo || 'No especificado'}
                estado={cuarto.disponibilidad === 1 ? 'Disponible' : 'No disponible'}
                precio={cuarto.precio}
                estado_verificacion={cuarto.propiedad?.estado_verificacion || 'No disponible'}
                onDeleted={handleDelete}  // Pasa la función onDeleted
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
