import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';
import { fetchPlanesPromocion } from '@/infrastructure/services/puntos.service';
import LOGOROOM from '@/presentation/assets/img/room.png';
import Alert from '@/presentation/components/common/Alert'; // ✅ Importado

const SidebarRight = ({
  visible,
  room,
  onClose,
  onActivate,
  userPoints = 0
}) => {
  const [planes, setPlanes] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: 'success', visible: false }); // ✅ Estado para alertas

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, visible: true });
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  useEffect(() => {
    if (visible) {
      fetchPlanesPromocion().then((res) => {
        setPlanes(res.planes);
      });
    }
  }, [visible]);

  useEffect(() => {
    const plan = planes.find((p) => p.plan_id === Number(selectedPlanId));
    setSelectedPlan(plan || null);
  }, [selectedPlanId, planes]);

  if (!visible || !room) return null;

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-orange-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );

  const formatFecha = (fecha) =>
    fecha.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const fechaInicio = new Date();
  const fechaFin = selectedPlan
    ? new Date(fechaInicio.getTime() + selectedPlan.duracion_dias * 86400000)
    : null;

  const handleActivate = () => {
    if (!selectedPlan) {
      showAlert('Seleccione un plan antes de continuar.', 'error'); // ✅ Alert visual
      return;
    }
    onActivate(selectedPlan.plan_id); // Esto se enviará al padre
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {alert.visible && (
        <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
      )}

      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <aside className="absolute top-0 right-0 w-[420px] h-full bg-white shadow-lg p-6 z-30 overflow-y-auto text-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">Promocionar inmueble</h2>
          <button onClick={onClose} className="text-xl leading-none">×</button>
        </div>

        <p className="text-xs text-gray-500 mb-3">Detalles del inmueble</p>
        <div className="flex items-start gap-3 border-b-1 px-3 py-2 border-gray-400">
          <img
            src={room.fotos?.[0] || LOGOROOM}
            alt={room.nombre}
            className="w-16 h-16 object-cover rounded-md"
            draggable="false"
          />
          <div className="flex-1 space-y-0.5">
            <p className="text-sm font-semibold leading-tight line-clamp-1">{room.nombre}</p>
            <p className="text-xs text-gray-500 leading-tight line-clamp-2">{room.propiedad?.direccion}</p>
            <p className="text-[11px] text-gray-500">Cuarto</p>
            <div className="flex justify-between items-center pt-0.5">
              <p className="text-sm font-bold">
                <sup className="text-[10px]">S/</sup>{room.precio}
                <span className="text-[11px] font-normal text-gray-400"> /Mes</span>
              </p>
              <div className="flex gap-0.5">{renderStars(room.valoracion)}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Plan</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring"
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
          >
            <option value="">Seleccione</option>
            {planes.map((plan) => (
              <option key={plan.plan_id} value={plan.plan_id}>
                {plan.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 pt-4 space-y-2">
          <h3 className="text-center font-medium text-sm mb-2">Coste de publicación</h3>
          <div className="flex justify-between">
            <span className="text-gray-500">Tus puntos:</span>
            <span className="font-semibold">{userPoints} ptos.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Se usarán:</span>
            <span className="font-semibold text-red-500">
              {selectedPlan?.costo_puntos ?? '-'} ptos.
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">F. Inicial de prom.:</span>
            <span className="font-medium">{fechaInicio ? formatFecha(fechaInicio) : '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">F. Final de prom.:</span>
            <span className="font-medium">{fechaFin ? formatFecha(fechaFin) : '-'}</span>
          </div>
        </div>

        <button
          onClick={handleActivate}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-md hover:bg-gray-800 transition text-sm font-medium"
        >
          Activar plan <FiZap className="w-4 h-4" />
        </button>
      </aside>
    </div>
  );
};

export default SidebarRight;
