import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {useModal} from '@/hooks/useModal'
import ModalRecoverPassword from './ModalRecoverPassword';
import BACKGROUNDMODAL from '@/assets/img/background-modal.webp';

const ModalLogin = ({isOpen, onClose, onSwitchToRegister}) => {
    if (!isOpen) return null;
    
    const recoverModal = useModal();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // If recover modal is open, don't show login modal
    if (recoverModal.isOpen) {
        return (
            <ModalRecoverPassword 
                isOpen={recoverModal.isOpen}
                onClose={() => {
                    recoverModal.closeModal();
                    onClose();
                }}
                onSwitchToRegister={onSwitchToRegister}
                onSwitchToLogin={() => {
                    recoverModal.closeModal();
                }}
            />
        );
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'
            onClick={handleBackdropClick}>
            {/* Rest of the login modal content */}
            <div className='bg-white shadow-md w-full max-w-3xl relative flex overflow-hidden'>
                {/* Left side - Image */}
                <div className='w-1/2 hidden md:block relative'>
                    <img src={BACKGROUNDMODAL}
                        alt='fotoModal'
                        className='w-full h-full object-cover object-center'/>
                </div>

                {/* Right side - Form */}
                <div className='w-full md:w-1/2 p-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-xl font-semibold'>Iniciar Sesión</h1>
                        <button onClick={onClose}
                            className='text-gray-400 hover:text-gray-600'>
                            ✕
                        </button>
                    </div>

                    <h2 className='text-2xl font-medium text-center mb-6'>Ingresar</h2>

                    <form className='space-y-4'>
                        <div>
                            <input type='email' placeholder='Correo E-mail' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'/>
                        </div>
                        <div>
                            <input type='password' placeholder='Contraseña' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'/>
                        </div>
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center'>
                                <input type='checkbox' className='mr-2 accent-blue-500'/>
                                <span className='text-sm text-gray-600'>Recuérdame</span>
                            </label>
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    recoverModal.openModal();
                                }}
                                className='text-orange-500 font-normal'
                            >
                                ¿Se te olvidó la contraseña?
                            </button>
                        </div>
                        <button type='submit' className='w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium'>
                            Ingresar
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <div className='flex items-center justify-center gap-4 mb-4'>
                            <div className='h-[0.5px] w-full bg-gray-300'></div>
                            <p className='text-sm text-gray-500 whitespace-nowrap'>Accede con</p>
                            <div className='h-[0.5px] w-full bg-gray-300'></div>
                        </div>
                        <button className='w-full bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200 transition-colors'>
                            <FcGoogle size={20}/>
                            <span className='font-medium'>Google</span>
                        </button>
                    </div>

                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>
                            ¿No tienes una cuenta?{' '}
                            <button onClick={
                                    () => {
                                        onClose();
                                        onSwitchToRegister();
                                    }
                                }
                                className='text-orange-500 hover:underline font-medium'>
                                Regístrate
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
