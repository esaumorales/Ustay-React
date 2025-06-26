import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const PAGE_SIZE = 8

const RecargaHistorialModal = ({ visible, onClose, historial = [] }) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (visible) setPage(1) // Reiniciar paginación al abrir
  }, [visible])

  if (!visible) return null

  const totalPages = Math.ceil(historial.length / PAGE_SIZE)
  const currentData = historial.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded shadow-md">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="font-semibold text-base">Historial de Recargas</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {historial.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Aún no has recargado puntos.</p>
        ) : (
          <ul className="text-sm text-gray-700 divide-y px-4">
            {currentData.map((r, i) => (
              <li key={i} className="py-2">
                <div className="flex justify-between">
                  <span className="font-medium">S/. {r.monto_soles}</span>
                  <span className="text-xs text-gray-500">
                    {DateTime.fromISO(r.fecha_recarga, { zone: 'utc' })
                      .setZone('America/Lima')
                      .toFormat('dd/MM/yyyy hh:mm a')}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {r.puntos_obtenidos} puntos obtenidos
                </p>
              </li>
            ))}
          </ul>
        )}

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
  )
}

export default RecargaHistorialModal
