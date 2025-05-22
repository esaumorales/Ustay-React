import { useEffect, useState } from 'react';
import PropertyHeader from '../components/PropertyHeader';
import RegisterProperty from '../components/room/RegisterProperty';
import PropertyRoomCard from '../components/room/PropertyRoomCard';
import { getPropertiesByPartner } from '@/infrastructure/services/property.service';

export default function PropertyContent() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

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

    return (
        <div>
            <div>
                <PropertyHeader
                    title="Propiedades"
                    descripcion="Registra tu propiedad, verifícalo y empieza a publicar los inmuebles que hay dentro de este."
                />
            </div>
            {!showRegister && (
                <div className="flex justify-end mt-2 mr-6">
                    <button
                        className="border px-4 py-2 rounded bg-white hover:bg-gray-100 shadow text-black font-semibold"
                        onClick={() => setShowRegister(true)}
                    >
                        Registrar +
                    </button>
                </div>
            )}
            {showRegister ? (
                <RegisterProperty
                    onClose={() => setShowRegister(false)}
                    hasProperties={properties && properties.length > 0}
                />
            ) : loading ? (
                <div className="text-center my-8">Cargando propiedades...</div>
            ) : properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-items-center mt-8">
                    {properties.map((property, idx) => (
                        <PropertyRoomCard
                            key={property.propiedad_id || idx}
                            id={property.propiedad_id}
                            image={property.imagen || undefined}
                            name={property.nombre || property.direccion || 'Propiedad'}
                            direccion_completa={property.direccion_completa}
                            n_pisos={property.n_pisos}
                            descripcion={property.descripcion}
                            floors={property.n_pisos}
                            estado_verificacion={property.estado_verificacion || "No verificado"}
                            
                        />
                    ))}
                </div>
            ) : (
                <RegisterProperty
                    onClose={() => setShowRegister(false)}
                    hasProperties={false}
                />
            )}
        </div>
    );
}