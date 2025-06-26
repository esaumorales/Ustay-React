import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { FaRegCreditCard, FaHistory, FaQuestionCircle, FaArrowRight, FaTimes } from 'react-icons/fa'
import { fetchPuntosHistorial, fetchUserPoints, recargarPuntos } from '@/infrastructure/services/puntos.service'
import Modal from '../components/Modal'
import RecargaHistorialModal from './RecargaHistorialModal'
const PointsHeader = () => {
  const [mostrarDeposito, setMostrarDeposito] = useState(false)
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [monto, setMonto] = useState('')
  const [historial, setHistorial] = useState([])
  const [cargandoHistorial, setCargandoHistorial] = useState(false)
  const [puntos, setPuntos] = useState(0)
  const [ultimaRecargaReal, setUltimaRecargaReal] = useState('')

  const toggleDeposito = () => {
    setMostrarDeposito(!mostrarDeposito)
    setMonto('')
  }

  const abrirHistorial = async () => {
    setMostrarHistorial(true)
    setCargandoHistorial(true)
    try {
      const userId = localStorage.getItem('userId')
      const data = await fetchPuntosHistorial(userId)
      const recargas = data?.recargas || []
      setHistorial(recargas)
    } catch (error) {
      console.error('Error al obtener historial:', error)
      setHistorial([])
    } finally {
      setCargandoHistorial(false)
    }
  }

  const obtenerPuntos = async () => {
    try {
      const usuarioId = localStorage.getItem('userId')
      if (!usuarioId) return
      const data = await fetchUserPoints(usuarioId)
      setPuntos(data.puntos || 0)
      if (data.ultimaRecarga) {
        const formateada = DateTime
          .fromISO(data.ultimaRecarga, { zone: 'utc' })
          .setZone('America/Lima')
          .toFormat('dd/MM/yyyy hh:mm a')
        setUltimaRecargaReal(formateada)
      } else {
        setUltimaRecargaReal('—')
      }
    } catch (error) {
      console.error('Error al obtener puntos:', error)
      setPuntos(0)
      setUltimaRecargaReal('—')
    }
  }

  useEffect(() => {
    obtenerPuntos()
  }, [])

  const handleEnviar = async () => {
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) return

    try {
      const usuario_id = localStorage.getItem('userId')
      if (!usuario_id) throw new Error('Usuario no identificado')

      const monto_soles = parseFloat(monto)
      const puntos_obtenidos = Math.floor(monto_soles * 2)

      const { fecha_recarga } = await recargarPuntos({
        usuario_id,
        monto_soles,
        puntos_obtenidos,
      })

      if (fecha_recarga) {
        const formateada = DateTime
          .fromISO(fecha_recarga, { zone: 'utc' })
          .setZone('America/Lima')
          .toFormat('dd/MM/yyyy hh:mm a')
        setUltimaRecargaReal(formateada)
      }

      obtenerPuntos()
      alert(`Recarga exitosa: S/. ${monto_soles} → ${puntos_obtenidos} ptos.`)
      abrirHistorial()
    } catch (error) {
      console.error('Error al recargar puntos:', error)
      alert(error.message || 'Error al recargar puntos')
    } finally {
      toggleDeposito()
    }
  }

  return (
    <div className="border rounded-md mb-6">
      <div className="bg-slate-900 text-white text-sm px-4 py-2 flex items-center gap-2">
        <FaRegCreditCard />
        <span>Sistema de Puntos de USTAY</span>
      </div>

      <div className="flex flex-wrap justify-between items-start p-4 text-sm">
        <div>
          <p className="mb-1">
            <span className="text-gray-600">Tus Puntos:</span>{' '}
            <strong>{puntos} ptos.</strong>
          </p>
          <button
            onClick={abrirHistorial}
            className="border text-xs px-3 py-1 rounded flex items-center gap-2"
          >
            <FaHistory /> VER HISTORIAL
          </button>
        </div>

        <div className="text-sm text-gray-700">
          <p className="font-semibold mb-1">COSTE DE CREDITOS</p>
          <p>S/. 15.00 = <strong>30 ptos.</strong></p>
          <p>S/. 5.00 = <strong>6 ptos.</strong></p>
          <div className="mt-1 text-xs text-gray-500">
            <p className="flex items-center gap-1">
              <FaQuestionCircle /> ¿Para qué sirve los créditos?
            </p>
            <p className="flex items-center gap-1">
              <FaQuestionCircle /> ¿Qué planes hay?
            </p>
          </div>
        </div>

        <div className="text-end">
          <p className="text-xs text-gray-500 mb-1">Depositar:</p>

          {!mostrarDeposito && (
            <button
              onClick={toggleDeposito}
              className="bg-white border rounded px-3 py-1 flex items-center gap-2 text-xs shadow-sm hover:bg-gray-50"
            >
              DEPOSITE AQUÍ <img src="/visa.png" alt="visa" className="h-4" />
            </button>
          )}

          {mostrarDeposito && (
            <div className="flex mt-1 gap-1">
              <input
                type="number"
                className="border px-2 py-1 text-sm rounded w-20"
                placeholder="0"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
              <button
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
                title="Enviar"
                onClick={handleEnviar}
              >
                <FaArrowRight />
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
                title="Cancelar"
                onClick={toggleDeposito}
              >
                <FaTimes />
              </button>
            </div>
          )}

          <p className="text-[11px] text-gray-400 mt-1">
            Ult. depósito: {ultimaRecargaReal || '—'}
          </p>
        </div>
      </div>

      {/* Modal original simple */}
      {mostrarHistorial && historial.length <= 8 && (
        <Modal title="Historial de Recargas" onClose={() => setMostrarHistorial(false)}>
          {cargandoHistorial ? (
            <p className="text-center py-4">Cargando...</p>
          ) : historial.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Aún no has recargado puntos.</p>
          ) : (
            <ul className="text-sm text-gray-700 divide-y">
              {historial.map((r, i) => (
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
        </Modal>
      )}

      {/* Modal nuevo con paginación si hay más de 8 recargas */}
      {mostrarHistorial && historial.length > 8 && (
        <RecargaHistorialModal
          visible={mostrarHistorial}
          onClose={() => setMostrarHistorial(false)}
          historial={historial}
        />
      )}
    </div>
  )
}

export default PointsHeader