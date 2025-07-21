import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useModal } from '@/presentation/hooks/useModal';
import ModalRecoverPassword from './ModalRecoverPassword';
import BACKGROUNDMODAL from '@/presentation/assets/img/background-modal.webp';
import { useAuth } from '@/presentation/contexts/AuthContext';
import SuccessAnimation from './common/SuccessAnimation';
import { useNavigate } from 'react-router-dom';

export default function ModalLogin({ isOpen, onClose, onSwitchToRegister }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState('login');
    const recoverModal = useModal();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(credentials);
            setStep('success');
        } catch (error) {
            setError(error.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            setStep('success');
        } catch (err) {
            console.error('Error al iniciar sesión con Google:', err);
            setError('Error al iniciar sesión con Google');
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
    }, [step, navigate, onClose]);

    if (!isOpen) return null;

    if (recoverModal.isOpen) {
        return (
            <ModalRecoverPassword
                isOpen={recoverModal.isOpen}
                onClose={() => {
                    recoverModal.closeModal();
                    onClose();
                    setStep('login');
                }}
                onSwitchToRegister={onSwitchToRegister}
                onSwitchToLogin={() => recoverModal.closeModal()}
            />
        );
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'>
            <div className='bg-white shadow-md w-full max-w-3xl relative flex overflow-hidden'>
                <div className='w-1/2 hidden md:block relative'>
                    <img
                        src={BACKGROUNDMODAL}
                        alt='fotoModal'
                        className='w-full h-full object-cover object-center'
                    />
                </div>

                <div className='w-full md:w-1/2 p-8 relative'>
                    {step === 'success' ? (
                        <SuccessAnimation message="¡Inicio de sesión exitoso!" />
                    ) : (
                        <>
                            <div className='flex justify-between items-center mb-6'>
                                <h1 className='text-xl font-semibold'>Iniciar Sesión</h1>
                                <button onClick={() => { onClose(); setStep('login'); }}
                                    className='text-gray-400 hover:text-gray-600'>✕
                                </button>
                            </div>

                            <h2 className='text-2xl font-medium text-center mb-6'>Ingresar</h2>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input
                                    type='email'
                                    name='email'
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    placeholder='Correo E-mail'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                                    required
                                />
                                <input
                                    type='password'
                                    name='password'
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder='Contraseña'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                                    required
                                />

                                <div className='flex items-center justify-between'>
                                    <label className='flex items-center'>
                                        <input type='checkbox' className='mr-2 accent-blue-500' />
                                        <span className='text-sm text-gray-600'>Recuérdame</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => recoverModal.openModal()}
                                        className='text-orange-500 font-normal'
                                    >
                                        ¿Se te olvidó la contraseña?
                                    </button>
                                </div>

                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
                                >
                                    {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                                </button>
                            </form>

                            <div className='mt-6 text-center'>
                                <div className='flex items-center justify-center gap-4 mb-4'>
                                    <div className='h-[0.5px] w-full bg-gray-300'></div>
                                    <p className='text-sm text-gray-500 whitespace-nowrap'>Accede con</p>
                                    <div className='h-[0.5px] w-full bg-gray-300'></div>
                                </div>
                                <button
                                    className='w-full bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200 transition-colors'
                                    onClick={handleGoogleSignIn}
                                >
                                    <FcGoogle size={20} />
                                    <span className='font-medium'>Google</span>
                                </button>
                            </div>

                            <div className='mt-6 text-center'>
                                <p className='text-sm text-gray-600'>
                                    ¿No tienes una cuenta?{' '}
                                    <button
                                        onClick={() => {
                                            onClose();
                                            onSwitchToRegister();
                                            setStep('login');
                                        }}
                                        className='text-orange-500 hover:underline font-medium'
                                    >
                                        Regístrate
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
