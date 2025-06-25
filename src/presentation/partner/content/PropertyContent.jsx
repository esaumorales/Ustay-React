import { useEffect, useState } from 'react';
import PropertyHeader from '../components/PropertyHeader';
import RegisterProperty from '../components/property/RegisterProperty';
import PropertyRoomCard from '../components/property/PropertyRoomCard';
import { getPropertiesByPartner } from '@/infrastructure/services/property.service';
import Paginator from '../common/Paginator';

const PAGE_SIZE = 6;

export default function PropertyContent() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const partnerId = localStorage.getItem('userId');
        if (!partnerId) {
          setProperties([]);
          setLoading(false);
          return;
        }
        const data = await getPropertiesByPartner(partnerId);
        setProperties(data.propiedades || []);
      } catch (error) {
        setProperties([error]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / PAGE_SIZE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <PropertyHeader
        title="Propiedades"
        descripcion="Registra tu propiedad, verifícalo y empieza a publicar los inmuebles que hay dentro de este."
      />

      {!showRegister && (
        <div className="flex justify-end mt-2 mr-6">
          <button
            className="border px-4 py-2 rounded bg-white hover:bg-gray-100 shadow text-black font-semibold"
            onClick={() => setShowRegister(true)}
          >
            Registrar Propiedad +
          </button>
        </div>
      )}

      {showRegister ? (
        <RegisterProperty
          onClose={() => setShowRegister(false)}
          hasProperties={properties.length > 0}
        />
      ) : loading ? (
        <div className="text-center my-8">Cargando propiedades...</div>
      ) : properties.length === 0 ? (
        <RegisterProperty
          onClose={() => setShowRegister(false)}
          hasProperties={false}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-items-center mt-8">
            {paginatedProperties.map((property, idx) => (
              <PropertyRoomCard
                key={property.propiedad_id || idx}
                id={property.propiedad_id}
                foto={property.foto}
                name={property.nombre || property.direccion || 'Propiedad'}
                direccion_completa={property.direccion_completa}
                n_pisos={property.n_pisos}
                descripcion={property.descripcion}
                floors={property.n_pisos}
                estado_verificacion={property.estado_verificacion || 'No verificado'}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
