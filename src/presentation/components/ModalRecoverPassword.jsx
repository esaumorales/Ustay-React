import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import BACKGROUNDMODAL from '@/presentation/assets/img/background-modal.webp';
import { recoverPassword, verifyRecoveryCode, changePassword } from '@/infrastructure/services/recoverPassword.service';
import SuccessAnimation from './common/SuccessAnimation';

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
    const [success, setSuccess] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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
            setSuccess(true);
            setTimeout(() => {
                onClose();
                onSwitchToLogin();
            }, 3000);
        } catch (err) {
            setError(err.message || 'Error al actualizar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4" onClick={handleBackdropClick}>
            <div className="bg-white shadow-md w-full max-w-3xl relative flex overflow-hidden">
                <div className="w-1/2 hidden md:block relative">
                    <img src={BACKGROUNDMODAL} alt="fotoModal" className="w-full h-full object-cover object-center" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => { onClose(); onSwitchToLogin(); }} className="text-gray-400 hover:text-gray-600 text-2xl">←</button>
                        <h1 className="text-xl font-semibold">Recuperar Contraseña</h1>
                    </div>

                    {success ? (
                        <SuccessAnimation message="¡Contraseña actualizada exitosamente!" />
                    ) : (
                        <>
                            {step === 1 && (
                                <>
                                    <h2 className="text-lg font-medium mb-6 flex justify-center">Ingrese correo</h2>
                                    <form className="space-y-4" onSubmit={handleSendEmail}>
                                        <input type="email" placeholder="ejem: correo@gmail.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                                        <button type="submit" className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333]" disabled={loading}>
                                            {loading ? 'Enviando...' : 'Enviar'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 className="text-lg font-medium mb-6 flex justify-center">Verificación de código</h2>
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
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <button type="submit" className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333]" disabled={loading}>
                                            {loading ? 'Verificando...' : 'Verificar'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2 className="text-lg font-medium mb-2 flex justify-center">Cambiar Contraseña</h2>
                                    <form className="space-y-4" onSubmit={handleChangePassword}>
                                        <input type="password" placeholder="Nueva contraseña" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        <input type="password" placeholder="Confirmar contraseña" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                        <button type="submit" className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333]" disabled={loading}>
                                            {loading ? 'Actualizando...' : 'Actualizar'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {(message || error) && <div className={`mt-4 text-center ${error ? 'text-red-600' : 'text-green-600'}`}>{message || error}</div>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalRecoverPassword;
