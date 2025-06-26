import { useEffect, useState } from 'react';
import { getHistorialPromocionByCuarto } from '@/infrastructure/services/puntos.service';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PAGE_SIZE = 8;

const HistoryModal = ({ visible, onClose, cuartoId }) => {
  const [historial, setHistorial] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!cuartoId || !visible) return;
      try {
        const res = await getHistorialPromocionByCuarto(cuartoId);
        setHistorial(res?.historial || []);
        setPage(1); // Reiniciar a la primera página al abrir
      } catch (err) {
        console.error('Error al cargar historial:', err);
      }
    };
    fetchHistorial();
  }, [cuartoId, visible]);

  if (!visible) return null;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const totalPages = Math.ceil(historial.length / PAGE_SIZE);
  const currentData = historial.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg w-[90%] max-w-lg">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">HISTORIAL</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">F. Inicial de Prom.</th>
              <th className="px-4 py-2">F. Final de Prom.</th>
              <th className="px-4 py-2">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((h, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{h.nombre_plan}</td>
                <td className="px-4 py-2">{formatDate(h.fecha_inicio)}</td>
                <td className="px-4 py-2">{formatDate(h.fecha_fin)}</td>
                <td className="px-4 py-2">{h.puntos_utilizados} ptos.</td>
              </tr>
            ))}
            {historial.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">Sin historial.</td>
              </tr>
            )}
          </tbody>
        </table>

        {historial.length > PAGE_SIZE && (
          <div className="flex justify-center items-center gap-4 py-3 border-t">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`text-gray-600 hover:text-black ${page === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
              title="Anterior"
            >
              <FaArrowLeft />
            </button>
            <span className="text-sm text-gray-700">Página {page} de {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`text-gray-600 hover:text-black ${page === totalPages ? 'opacity-30 cursor-not-allowed' : ''}`}
              title="Siguiente"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
