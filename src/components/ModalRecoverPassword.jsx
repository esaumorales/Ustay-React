import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import BACKGROUNDMODAL from '@/assets/img/background-modal.webp';

const ModalRecoverPassword = ({isOpen, onClose, onSwitchToRegister, onSwitchToLogin}) => {
    if (!isOpen) 
        return null;
    


    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4'
            onClick={handleBackdropClick}>
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
                        <div className="flex items-center flex-row-reverse w-full justify-between">
                            <button onClick={
                                    () => {
                                        onClose();
                                        onSwitchToLogin();
                                    }
                                }
                                className="text-gray-400 hover:text-gray-600 text-2xl">
                                ←
                            </button>
                            <h1 className='text-xl font-semibold'>Recuperar Contraseña</h1>
                        </div>
                    </div>

                    <h2 className='text-lg font-medium mb-6  flex justify-center'>Ingrese correo</h2>
                    <form className='space-y-4'>
                        <div>
                            <input type='email' placeholder='ejem: correo@gmail.com' className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'/>
                        </div>
                        <button type='submit' className='w-full bg-[#1a1a1a] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium'>
                            Enviar
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
                                    (e) => {
                                        e.preventDefault();
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

export default ModalRecoverPassword;
