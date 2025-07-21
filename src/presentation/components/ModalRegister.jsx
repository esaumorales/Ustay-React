import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import BACKGROUNDMODAL from '@/presentation/assets/img/background-modal.webp';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { AuthService } from '@/infrastructure/services/auth.service';
import { useNavigate } from 'react-router-dom';
import SuccessAnimation from './common/SuccessAnimation';

const ModalRegister = ({ isOpen, onClose, onSwitchToLogin }) => {
    const { register, login, loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!acceptTerms) {
            setError('Debes aceptar los términos y condiciones');
            return;
        }

        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const newUserData = {
            nombre: formData.get('nombre'),
            apellido_pa: formData.get('apellido_pa'),
            apellido_ma: formData.get('apellido_ma'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            setIsSubmitting(true);
            await register(newUserData);
            setUserData(newUserData);
            setEmail(newUserData.email);
            setStep(2);
            setMessage('Se ha enviado un código de verificación a tu correo');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setMessage('');

        try {
            const codeStr = code.join('');
            await AuthService.verifyEmail(email, codeStr);

            await login({ email: userData.email, password: userData.password });

            setMessage('Correo verificado exitosamente. Redirigiendo...');
            setStep('success');
        } catch (err) {
            setError(err.message || 'Código incorrecto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await loginWithGoogle();
            setStep('success');
        } catch (err) {
            setError('Error al registrar con Google', err);
        }
    };

    useEffect(() => {
        if (step === 'success') {
            const timer = setTimeout(() => {
                onClose();
                navigate('/home');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [step, onClose, navigate]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'
            onClick={handleBackdropClick}>
            <div className='bg-white shadow-md w-full max-w-4xl relative flex overflow-hidden'>
                <div className='w-full md:w-1/2 p-6'>
                    <button onClick={onClose}
                        className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'>
                        ✕
                    </button>

                    {step === 'success' ? (
                        <SuccessAnimation message="¡Registro exitoso!" />
                    ) : step === 1 ? (
                        <>
                            <h1 className='font-semibold'>Registrarse</h1>
                            <h2 className='text-2xl font-semibold mb-4 text-center'>Registrarse con su Correo</h2>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
                            )}

                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input type='text' name='nombre' placeholder='Nombre' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <input type='text' name='apellido_pa' placeholder='Apellido Paterno' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <input type='text' name='apellido_ma' placeholder='Apellido Materno' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <input type='email' name='email' placeholder='Correo' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <input type='password' name='password' placeholder='Contraseña' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <input type='password' name='confirmPassword' placeholder='Repetir contraseña' required className='w-full px-3 py-2 border border-gray-200 rounded-lg' />
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='mr-2'
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span className='text-sm'>Acepto los Términos y Condiciones</span>
                                </div>
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-[#333] disabled:opacity-50'
                                >
                                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                                </button>
                            </form>

                            <div className='mt-4 text-center'>
                                <p className='text-sm text-gray-600'>¿Ya tienes una cuenta?
                                    <button onClick={() => { onClose(); onSwitchToLogin(); }}
                                        className='text-orange-500 hover:underline ml-1'>
                                        Inicia Sesión
                                    </button>
                                </p>
                            </div>

                            <div className='mt-4'>
                                <button
                                    className='w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-200'
                                    onClick={handleGoogleRegister}
                                >
                                    <FcGoogle size={20} />
                                    Acceder con Google
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-medium mb-6 flex justify-center">Verificación de código</h2>
                            <p className="text-sm text-gray-500 mb-4 text-center">
                                Ingrese el código de 6 dígitos que se envió a su correo
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
                                                if (val && i < code.length - 1) {
                                                    document.getElementById(`code-input-${i + 1}`)?.focus();
                                                }
                                            }}
                                            id={`code-input-${i}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Verificando...' : 'Verificar'}
                                </button>
                                {message && <div className="text-green-600 text-center">{message}</div>}
                                {error && <div className="text-red-600 text-center">{error}</div>}
                            </form>
                        </>
                    )}
                </div>

                <div className='w-1/2 hidden md:block'>
                    <img src={BACKGROUNDMODAL} alt='fotoModal' className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default ModalRegister;
