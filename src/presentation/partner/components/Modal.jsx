const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md shadow-md w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-sm">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
  
  export default Modal
  