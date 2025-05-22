import { useState, useEffect } from 'react';
import { updateProperty, getPropertyById } from '@/infrastructure/services/property.service';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert'; // Importa el Alert

const EditProperty = ({ property: propFromProps = {}, onClose, onSuccess }) => {
    const { id } = useParams();
    const [property, setProperty] = useState(propFromProps);

    useEffect(() => {
        if (!propFromProps.id && id) {
            getPropertyById(id).then(data => setProperty(data.propiedad));
        }
    }, [id, propFromProps]);

    const [nombre, setNombre] = useState(property.nombre || property.descripcion || '');
    const [direccion, setDireccion] = useState(property.direccion || property.direccion_completa || '');
    const [n_pisos, setNPisos] = useState(property.n_pisos || 1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false); // Nuevo estado para la alerta
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const updated = {
                nombre,
                direccion,
                n_pisos: parseInt(n_pisos)
            };
            await updateProperty(property.propiedad_id, updated);
            setShowAlert(true); // Mostrar alerta de éxito
            setTimeout(() => {
                setShowAlert(false);
                navigate('/IMS/property'); // Redirigir después de la alerta
            }, 1800);
            if (onSuccess) onSuccess({ ...property, ...updated });
            // No llamar onClose aquí, ya que redirigimos
        } catch (error) {
            setError('Error al actualizar la propiedad', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded  relative">
            {showAlert && (
                <Alert
                    message="Propiedad actualizada correctamente"
                    onClose={() => setShowAlert(false)}
                    type="success"
                />
            )}
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                    if (onClose) onClose();
                    else navigate('/IMS/property');
                }}
            >✕</button>
            <h1 className="text-2xl font-bold mb-4">Editar Propiedad</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Nombre</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Dirección</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">N° de Pisos</label>
                    <input
                        type="number"
                        min="1"
                        className="w-full border rounded px-3 py-2"
                        value={n_pisos}
                        onChange={e => setNPisos(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button
                    type="submit"
                    className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
};

export default EditProperty;