import { MdOutlineModeEdit } from 'react-icons/md';
import { PiTrash } from 'react-icons/pi';
import { deleteProperty } from '@/infrastructure/services/property.service';
import { useState } from 'react';
import EditProperty from './EditProperty'; // Importa el componente de edición
import { useNavigate } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert'; // Asegúrate de importar tu componente Alert

const statusStyles = {
    "No verificado": "text-red-600",
    "Pendiente": "text-gray-600",
    "Verificado": "text-green-600"
};

const statusButton = {
    "No verificado": {
        label: "Verificar",
        className: "bg-black text-white px-4 py-1 rounded hover:bg-gray-700"
    },
    "Pendiente": {
        label: "Pendiente",
        className: "bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
    },
    "Verificado": {
        label: "Verificado",
        className: ""
    }
};

const normalizeStatus = (estado_verificacion) => {
    if (!estado_verificacion) return "No verificado";
    const estado = estado_verificacion.toLowerCase();
    if (estado === "aprobada") return "Verificado";
    if (estado === "pendiente" || estado === "en revisión") return "Pendiente";
    if (estado === "rechazada") return "No verificado";
    return "No verificado";
};

const getShortDescription = (desc) => {
    if (!desc) return "Propiedad";
    const words = desc.trim().split(" ");
    return words.slice(0, 2).join(" ");
};

const PropertyRoomCard = ({
    id,
    foto = null,
    descripcion = "Propiedad 1",
    nombre = "Cuarto 1",
    direccion_completa = "Bernard Balaguer 217, Ñaña, Provin...",
    n_pisos = 3,
    estado_verificacion = "no verificado",
    onDeleted,
    propertyData // <-- Opcional: para pasar todos los datos originales
}) => {
    const [loading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false); 
    const [property, setProperty] = useState({
        id,
        foto,
        descripcion,
        nombre,
        direccion: direccion_completa,
        n_pisos,
        estado_verificacion,
        ...propertyData
    });
    const [showAlert, setShowAlert] = useState(false); 
    const [showConfirm, setShowConfirm] = useState(false); 

    const navigate = useNavigate(); 

    const status = normalizeStatus(property.estado_verificacion);

    const handleVerify = () => {
        alert('Funcionalidad de verificación aún no implementada.');
    };

    const handleDelete = async () => {
        setShowConfirm(false);
        setLoading(true);
        try {
            await deleteProperty(property.id);
            if (onDeleted) onDeleted(property.id);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1800);
        } catch (error) {
            alert('Error al eliminar la propiedad', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClose = () => {
        setShowEdit(false);
    };

    const handleEditSuccess = (updatedProperty) => {
        setShowEdit(false);
        setProperty(updatedProperty);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden w-80 min-w-[20rem] max-w-[20rem] m-auto opacity-100 mb-4">
            {showAlert && (
                <Alert
                    message="Propiedad eliminada correctamente"
                    onClose={() => setShowAlert(false)}
                    type="success"
                />
            )}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg">¿Estás seguro de eliminar esta propiedad?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <img
                src={property.foto || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}
                alt={property.descripcion || "Propiedad"}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <div className="font-semibold text-lg mb-1 flex justify-center">{getShortDescription(property.descripcion)}</div>
                <div className="text-sm mb-1">
                    <span className="font-semibold">Dirección:</span> {property.direccion || property.direccion_completa}
                </div>
                <div className="text-sm mb-2">
                    <span className="font-semibold">N° Pisos:</span> {property.n_pisos}
                </div>
                <div className="flex gap-2 mb-2 justify-between items-center">
                    <div className='flex gap-3'>
                        <button
                            className="border px-2 py-1 rounded hover:bg-gray-100"
                            title="Editar"
                            onClick={() => navigate(`/IMS/property/editar-propiedad/${property.id}`)}
                            disabled={loading || status === "Pendiente"}
                        >
                            <span role="img" aria-label="edit">
                                <MdOutlineModeEdit />
                            </span>
                        </button>
                        <button
                            className="border px-2 py-1 rounded hover:bg-gray-100"
                            title="Eliminar"
                            onClick={() => setShowConfirm(true)}
                            disabled={loading || status === "Pendiente" || status === "Verificado"}
                        >
                            <span role="icon" aria-label="delete">
                                <PiTrash />
                            </span>
                        </button>
                    </div>
                    <div>
                        {status !== "Verificado" && (
                            <button
                                className={statusButton[status].className}
                                onClick={status === "No verificado" ? handleVerify : undefined}
                                disabled={loading || status !== "No verificado"}
                            >
                                {statusButton[status].label}
                            </button>
                        )}
                    </div>
                </div>
                <hr className="my-2 text-gray-500" />
                <div className={`mt-2 text-sm font-semibold flex justify-center gap-2 ${statusStyles[status]}`}>
                    <span className='text-gray-800'>Estado:</span>
                    <span> {status}</span>
                </div>
            </div>
            {showEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <EditProperty
                        property={property}
                        onClose={handleEditClose}
                        onSuccess={handleEditSuccess}
                    />
                </div>
            )}
        </div>
    );
};

export default PropertyRoomCard;
