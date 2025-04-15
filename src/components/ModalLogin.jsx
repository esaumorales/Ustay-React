import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import BACKGROUNDMODAL from '../assets/img/background-modal.webp';

const ModalLogin = ({ isOpen, onClose, onSwitchToRegister }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'
            onClick={handleBackdropClick}>
            <div className='bg-white rounded-xl shadow-md w-full max-w-3xl relative flex overflow-hidden'>
                {/* Left side - Image */}
                <div className='w-1/2 hidden md:block relative'>
                    <img
                        src={BACKGROUNDMODAL}
                        alt='fotoModal'
                        className='w-full h-[400px] object-cover object-center'
                    />
                </div>
                {/* Right side - Form */}
                <div className='w-full md:w-1/2 p-6'>
                    <button onClick={onClose} className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'>
                        ✕
                    </button>
                    <h1 className='font-semibold'>Iniciar Sesion</h1>
                    <h2 className='text-2xl font-semibold mb-4 text-center'>Ingresar</h2>
                    <form className='space-y-3'>
                        <div>
                            <input
                                type='email'
                                placeholder='Correo E-mail'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                placeholder='Contraseña'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center'>
                                <input type='checkbox' className='mr-2' />
                                <span className='text-sm'>Recuérdame</span>
                            </label>
                            <a href='#' className='text-sm text-blue-600 hover:underline'>¿Se te olvidó la contraseña?</a>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-[#333] transition-colors'
                        >
                            Ingresar
                        </button>
                    </form>
                    <div className='mt-4 text-center'>
                        <p className='text-sm text-gray-600'>¿No tienes una cuenta?
                            <button
                                onClick={() => {
                                    onClose();
                                    onSwitchToRegister();
                                }}
                                className='text-orange-500 hover:underline ml-1'
                            >
                                Regístrate
                            </button>
                        </p>
                    </div>
                    <div className='mt-4'>
                        <button className='w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors'>
                            <FcGoogle size={20} />
                            Acceder con Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
