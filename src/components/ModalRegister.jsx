import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import BACKGROUNDMODAL from '../assets/img/background-modal.webp';

const ModalRegister = ({ isOpen, onClose, onSwitchToLogin }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'
            onClick={handleBackdropClick}
        >
            <div className='bg-white rounded-xl shadow-md w-full max-w-4xl relative flex overflow-hidden'>
                {/* Left side - Form */}
                <div className='w-full md:w-1/2 p-6'>
                    <button onClick={onClose} className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'>
                        ✕
                    </button>
                    <h2 className='text-xl font-semibold mb-4 text-center'>Registrarse</h2>
                    <form className='space-y-4'>
                        <div>
                            <input
                                type='text'
                                placeholder='Nombre'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Apellido Paterno'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Apellido Materno'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div>
                            <input
                                type='email'
                                placeholder='Correo'
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
                        <div>
                            <input
                                type='password'
                                placeholder='Repetir contraseña'
                                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300'
                            />
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2' />
                            <span className='text-sm'>Acepto los Términos y Condiciones</span>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-[#333] transition-colors'
                        >
                            Registrarse
                        </button>
                    </form>
                    <div className='mt-4 text-center'>
                        <p className='text-sm text-gray-600'>¿Ya tienes una cuenta?
                            <button
                                onClick={() => {
                                    onClose();
                                    onSwitchToLogin();
                                }}
                                className='text-orange-500 hover:underline ml-1'
                            >
                                Inicia Sesión
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
                {/* Right side - Image */}
                <div className='w-1/2 hidden md:block'>
                    <img
                        src={BACKGROUNDMODAL}
                        alt='fotoModal'
                        className='w-full h-full object-cover'
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalRegister;