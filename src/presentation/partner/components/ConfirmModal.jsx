// components/ConfirmModal.jsx
import { FaShieldAlt } from 'react-icons/fa'

const ConfirmModal = ({ visible, onClose, onConfirm, title, message, confirmLabel = 'Confirmar' }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 text-lg font-semibold">×</button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <FaShieldAlt className="text-xl" />
          </div>
        </div>
        <h2 className="text-base font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 flex items-center gap-1"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
