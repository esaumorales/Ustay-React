import { MdOutlineModeEdit } from 'react-icons/md';
import { PiTrash } from 'react-icons/pi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert';
import { deleteRoom } from '@/infrastructure/services/room.service';

const statusStyles = {
    "No disponible": "text-red-600",
    "Disponible": "text-green-600"
};

const statusButton = {
    "No disponible": {
        label: "No disponible",
        className: "bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
    },
    "Disponible": {
        label: "Disponible",
        className: "bg-green-500 text-white px-4 py-1 rounded"
    }
};

const getShortDescription = (desc) => {
    if (!desc) return "Cuarto";
    const words = desc.trim().split(" ");
    return words.slice(0, 4).join(" ");
};

const RoomCard = ({
    id,
    foto = null,
    nombre = "Cuarto 1",
    description = "Descripción del cuarto",
    tipo_cuarto = "Cuarto",
    precio = 0,
    periodo = "Mensual",
    estado = "Disponible",
    onDeleted,
    roomData
}) => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [room] = useState({
        id,
        foto,
        nombre,
        description,
        tipo_cuarto,
        precio,
        periodo,
        estado,
        ...roomData
    });

    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation();
        setShowConfirm(false);
        setLoading(true);
        try {
            await deleteRoom(room.id);
            if (onDeleted) onDeleted(room.id);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1800);
        } catch (error) {
            alert('Error al eliminar el cuarto: ' + (error.message || error));
        } finally {
            setLoading(false);
        }
    };

    const goToDetail = () => {
        if (!loading) navigate(`/IMS/room/${room.id}`);
    };

    return (
        <div
            onClick={goToDetail}
            className="bg-white shadow-sm overflow-hidden w-80 min-w-[20rem] max-w-[20rem] m-auto opacity-100 mb-4 cursor-pointer hover:shadow-md transition"
        >
            {showAlert && (
                <Alert
                    message="Cuarto eliminado correctamente"
                    onClose={() => setShowAlert(false)}
                    type="success"
                />
            )}

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg">¿Estás seguro de eliminar este cuarto?</p>
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowConfirm(false);
                                }}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <img
                src={room.foto || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}
                alt={room.description || "Cuarto"}
                className="w-full h-40 object-cover"
            />

            <div className="p-4 ">
                <div className="font-semibold text-lg mb-1 flex justify-center">{getShortDescription(room.nombre)}</div>
                <div className="text-sm mb-1">
                    <span className="font-semibold">Tipo:</span> {room.tipo_cuarto}
                </div>
                <div className="text-sm mb-1">
                    <span className="font-semibold">Precio:</span> {room.precio}
                </div>
                <div className="text-sm mb-1">
                    <span className="font-semibold">Periodo:</span> {room.periodo}
                </div>
                <div className="flex gap-2 mb-2 justify-between items-center">
                    <div className="flex gap-3">
                        <button
                            className="border px-2 py-1 rounded hover:bg-gray-100"
                            title="Editar"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/IMS/room/editar-cuarto/${room.id}`);
                            }}
                            disabled={loading}
                        >
                            <MdOutlineModeEdit />
                        </button>
                        <button
                            className="border px-2 py-1 rounded hover:bg-gray-100"
                            title="Eliminar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowConfirm(true);
                            }}
                            disabled={loading}
                        >
                            <PiTrash />
                        </button>
                    </div>
                    <div>
                        <button
                            className={statusButton[room.estado]?.className || "bg-gray-300 text-white px-4 py-1 rounded cursor-not-allowed"}
                            disabled
                        >
                            {statusButton[room.estado]?.label || "Desconocido"}
                        </button>
                    </div>
                </div>
                <hr className="my-2 text-gray-500" />
                <div className={`mt-2 text-sm font-semibold flex justify-center gap-2 ${statusStyles[room.estado] || "text-gray-600"}`}>
                    <span className="text-gray-800">Estado:</span>
                    <span>{room.estado}</span>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
