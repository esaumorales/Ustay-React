import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import BACKGROUNDMODAL from '@/presentation/assets/img/background-modal.webp';
import { recoverPassword, verifyRecoveryCode, changePassword } from '@/infrastructure/services/recoverPassword.service';


const ModalRecoverPassword = ({
    isOpen,
    onClose,
    onSwitchToRegister,
    onSwitchToLogin,
}) => {
    if (!isOpen) return null;

    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Paso 1: enviar código al correo
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await recoverPassword(email);
            setStep(2);
            setMessage('Código enviado a tu correo');
        } catch (err) {
            setError(err.message || 'Error al enviar el correo');
        } finally {
            setLoading(false);
        }
    };

    // Paso 2: verificar código
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const codeStr = code.join('');
            await verifyRecoveryCode(email, codeStr);
            setStep(3);
            setMessage('Código verificado. Ahora cambia tu contraseña');
        } catch (err) {
            setError(err.message || 'Código incorrecto');
        } finally {
            setLoading(false);
        }
    };

    // Paso 3: cambiar contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            const codeStr = code.join('');
            await changePassword(email, codeStr, password);
            setMessage('Contraseña actualizada correctamente');
            setStep(1);
            onClose();
            onSwitchToLogin();
        } catch (err) {
            setError(err.message || 'Error al actualizar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white shadow-md w-full max-w-3xl relative flex overflow-hidden">
                {/* Imagen lateral */}
                <div className="w-1/2 hidden md:block relative">
                    <img
                        src={BACKGROUNDMODAL}
                        alt="fotoModal"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                {/* Formulario */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center flex-row-reverse w-full justify-between">
                            <button
                                onClick={() => {
                                    onClose();
                                    onSwitchToLogin();
                                }}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ←
                            </button>
                            <h1 className="text-xl font-semibold">Recuperar Contraseña</h1>
                        </div>
                    </div>

                    {step === 1 && (
                        <>
                            <h2 className="text-lg font-medium mb-6 flex justify-center">
                                Ingrese correo
                            </h2>
                            <form className="space-y-4" onSubmit={handleSendEmail}>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="ejem: correo@gmail.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium"
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar'}
                                </button>
                                {message && <div className="text-green-600 text-center">{message}</div>}
                                {error && <div className="text-red-600 text-center">{error}</div>}
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-lg font-medium mb-6 flex justify-center">
                                Verificación de código
                            </h2>
                            <p className="text-sm text-gray-500 mb-4 text-center">
                                Ingrese el código que se envió a su correo
                            </p>
                            <form className="space-y-4" onSubmit={handleVerifyCode}>
                                <div className="flex justify-center gap-2">
                                    {code.map((c, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            maxLength={1}
                                            className="w-10 h-10 text-center border border-gray-300 rounded"
                                            value={c}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                const newCode = [...code];
                                                newCode[i] = val;
                                                setCode(newCode);
                                                // Auto-focus siguiente input
                                                if (val && i < code.length - 1) {
                                                    document.getElementById(`code-input-${i + 1}`)?.focus();
                                                }
                                            }}
                                            id={`code-input-${i}`}
                                            required
                                        />
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium"
                                    disabled={loading}
                                >
                                    {loading ? 'Verificando...' : 'Verificar'}
                                </button>
                                <button
                                    type="button"
                                    className="w-full bg-gray-600 text-white py-3 rounded-lg mt-2"
                                    onClick={handleSendEmail}
                                    disabled={loading}
                                >
                                    Volver a enviar código
                                </button>
                                {message && <div className="text-green-600 text-center">{message}</div>}
                                {error && <div className="text-red-600 text-center">{error}</div>}
                            </form>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="text-lg font-medium mb-2 flex justify-center">
                                Cambiar Contraseña
                            </h2>
                            <ul className="text-xs text-gray-500 mb-4 list-disc pl-5">
                                <li>Tener como mínimo 8 caracteres.</li>
                                <li>Tener al menos una mayúscula, número y símbolos.</li>
                                <li>No contener sus nombres, apellidos o fecha de cumpleaños.</li>
                            </ul>
                            <form className="space-y-4" onSubmit={handleChangePassword}>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nueva contraseña"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium"
                                    disabled={loading}
                                >
                                    {loading ? 'Actualizando...' : 'Actualizar'}
                                </button>
                                {message && <div className="text-green-600 text-center">{message}</div>}
                                {error && <div className="text-red-600 text-center">{error}</div>}
                            </form>
                        </>
                    )}

                    {/* Acceso con Google y registro */}
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[0.5px] w-full bg-gray-300"></div>
                            <p className="text-sm text-gray-500 whitespace-nowrap">Accede con</p>
                            <div className="h-[0.5px] w-full bg-gray-300"></div>
                        </div>
                        <button className="w-full bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                            <FcGoogle size={20} />
                            <span className="font-medium">Google</span>
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    onSwitchToRegister();
                                }}
                                className="text-orange-500 hover:underline font-medium"
                            >
                                Regístrate
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRecoverPassword;
