import { useEffect } from 'react';

const Alert = ({ message, onClose, type = "success" }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    // Define los colores según el tipo de alerta
    const bgColor = type === "success"
        ? "bg-green-400"
        : type === "warning"
        ? "bg-yellow-400"
        : type === "error"
        ? "bg-red-500"
        : "bg-green-400";

    return (
        <div className={`fixed top-4 right-2 ${bgColor} text-white py-1 px-4 rounded shadow-lg animate-pulse`}>
            {message}
        </div>
    );
};

export default Alert;