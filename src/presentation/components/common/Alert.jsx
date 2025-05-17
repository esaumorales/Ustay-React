import { useEffect } from 'react';

const Alert = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-2 bg-green-400 text-white py-1 px-4 rounded shadow-lg animate-pulse">
            {message}
        </div>
    );
};

export default Alert;