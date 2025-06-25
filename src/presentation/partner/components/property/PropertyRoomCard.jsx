import { MdOutlineModeEdit } from 'react-icons/md';
import { PiTrash } from 'react-icons/pi';
import { deleteProperty, deletePropertyByUuid } from '@/infrastructure/services/property.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert';

const statusStyles = {
  'No verificado': 'text-red-600',
  Pendiente: 'text-gray-600',
  Verificado: 'text-green-600',
};

const statusButton = {
  'No verificado': {
    label: 'Verificar',
    className: 'bg-black text-white px-4 py-1 rounded hover:bg-gray-700',
  },
  Pendiente: {
    label: 'Pendiente',
    className: 'bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed',
  },
  Verificado: {
    label: 'Verificado',
    className: '',
  },
};

const normalizeStatus = (s) => {
  if (!s) return 'No verificado';
  const v = s.toLowerCase();
  if (v === 'aprobada') return 'Verificado';
  if (v === 'pendiente' || v.includes('revisión')) return 'Pendiente';
  if (v === 'rechazada') return 'No verificado';
  return 'No verificado';
};

const short = (d) =>
  d ? d.trim().split(' ').slice(0, 2).join(' ') : 'Propiedad';

const PropertyRoomCard = ({
  id,
  foto = null,
  descripcion = 'Propiedad',
  nombre,
  direccion_completa,
  n_pisos = 1,
  estado_verificacion = 'no verificado',
  onDeleted,
  propertyData,
}) => {
  const [property] = useState({
    id,
    foto,
    descripcion,
    nombre,
    direccion_completa,
    n_pisos,
    estado_verificacion,
    ...propertyData,
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const status = normalizeStatus(property.estado_verificacion);

  /* ---------- Navegar al detalle ---------- */
  const goToDetail = () => {
    if (!loading) navigate(`/IMS/property/${property.uuid || property.id}`);
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowConfirm(false);
    setLoading(true);
    try {
      if (property.uuid) {
        await deletePropertyByUuid(property.uuid);
      } else {
        await deleteProperty(property.id);
      }
      onDeleted?.(property.id);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1800);
    } catch (err) {
      alert('Error al eliminar la propiedad', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={goToDetail}
      className="bg-white rounded-lg overflow-hidden w-80 min-w-[20rem] max-w-[20rem] m-auto mb-4 cursor-pointer hover:shadow-md transition"
    >
      {/* Alert */}
      {showAlert && (
        <Alert
          message="Propiedad eliminada correctamente"
          onClose={() => setShowAlert(false)}
          type="success"
        />
      )}

      {/* Confirm */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-lg">
              ¿Estás seguro de eliminar esta propiedad?
            </p>
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

      {/* Imagen */}
      <img
        src={
          property.foto ||
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
        }
        alt={property.descripcion}
        className="w-full h-40 object-cover"
        draggable="false"
      />

      {/* Info */}
      <div className="p-4">
        <div className="font-semibold text-lg mb-1 text-center">
          {short(property.descripcion)}
        </div>
        <div className="text-sm mb-1">
          <span className="font-semibold">Dirección:</span>{' '}
          {property.direccion_completa}
        </div>
        <div className="text-sm mb-2">
          <span className="font-semibold">N° Pisos:</span> {property.n_pisos}
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-3">
            <button
              className="border px-2 py-1 rounded hover:bg-gray-100"
              title="Editar"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/IMS/property/editar-propiedad/${property.uuid || property.id}`);
              }}
              disabled={loading || status === 'Pendiente'}
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
              disabled={
                loading || status === 'Pendiente' || status === 'Verificado'
              }
            >
              <PiTrash />
            </button>
          </div>

          {/* Verificar / pendiente */}
          {status !== 'Verificado' && (
            <button
              className={statusButton[status].className}
              onClick={(e) => {
                e.stopPropagation();
                if (status === 'No verificado') alert('Verificación pendiente');
              }}
              disabled={loading || status !== 'No verificado'}
            >
              {statusButton[status].label}
            </button>
          )}
        </div>

        <hr className="my-2" />

        <div
          className={`mt-2 text-sm font-semibold flex justify-center gap-2 ${statusStyles[status]}`}
        >
          <span className="text-gray-800">Estado:</span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyRoomCard;
