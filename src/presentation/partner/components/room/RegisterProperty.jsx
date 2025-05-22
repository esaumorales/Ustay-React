import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { createProperty } from '@/infrastructure/services/property.service';
import { useAuth } from '@/presentation/contexts/AuthContext';

const RegisterProperty = ({ onClose, hasProperties }) => {
    const [step, setStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [address, setAddress] = useState('');
    const [reference, setReference] = useState('');
    // const [location, setLocation] = useState({ lat: '', lng: '' });
    const [floors, setFloors] = useState('');
    const [rules, setRules] = useState('');
    // const [nombre_partner, setAPartner] = useState('');
    // const [apellido_partner, setNPartner] = useState('');
    const [images, setImages] = useState([
        { name: "vista_fachada_01.jpg" },
        { name: "vista_fachada_02.jpg" },
        { name: "vista_fachada_03.jpg" }
    ]);
    const [registering, setRegistering] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const { user } = useAuth ? useAuth() : { user: null };

    const handleNext = () => {
        if (step === 1 && !termsAccepted) return;
        setStep(step + 1);
    };

    const handleBack = () => {
        if (step === 1) {
            if (hasProperties && typeof onClose === 'function') {
                onClose();
            }
        } else if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleAddImage = () => {
        setImages([...images, { name: `nueva_imagen_${images.length + 1}.jpg` }]);
    };

    const handleRemoveImage = (idx) => {
        setImages(images.filter((_, i) => i !== idx));
    };

    // Nueva función para enviar los datos al backend
    const handleRegisterProperty = async () => {
        setRegistering(true);
        setRegisterError('');
        try {
            const propertyData = {
                partner_id: user?.id || user?.usuario_id || localStorage.getItem('userId'),
                direccion: address,
                referencia: reference,
                n_pisos: floors ? parseInt(floors) : 1,
                reglas: rules,
                descripcion: '', // Puedes agregar un campo de descripción si lo tienes
                foto: images.length > 0 ? images[0].name : null,
                nombre_partner: user?.id || user?.usuario_id || localStorage.getItem('userName'),
                apellido_partner: user?.id || user?.apellido_pa || localStorage.getItem('userLastName'),
            };
            await createProperty(propertyData);
            setRegisterSuccess(true);
            setStep(5);
        } catch (error) {
            setRegisterError('Error al registrar la propiedad. Intenta de nuevo.', error);
        } finally {
            setRegistering(false);
        }
    };

    // Simulación de mapa
    const MapStep = () => (
        <div className="flex flex-col items-center">
            <img src="https://i.imgur.com/6Iej2c3.png" alt="Mapa" className="w-full max-w-xl rounded mb-2" />
            <div className="text-center text-sm text-gray-600">
                (lat: -11.9120, lng: -76.625 )
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto mt-2 bg-white">
            {/* Barra de progreso */}
            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="flex-1 h-1 mx-1 rounded"
                        style={{
                            background: n <= step ? "#ff914d" : "#e5e7eb"
                        }}
                    />
                ))}
            </div>
            <div className="text-sm text-orange-600 mb-2">{step} de 5</div>

            {/* Paso 1 */}
            {step === 1 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Registra tu propiedad con nosotros</h2>
                    <p className="text-center mb-4">
                        Bienvenido a UStay. Para comenzar a publicar tus cuartos en nuestra plataforma, es necesario registrar tu vivienda proporcionando información verídica y completa. Esta información será revisada cuidadosamente para asegurar que cumple con nuestros estándares de calidad y seguridad. Además, realizaremos una verificación de la propiedad para validar ciertos requisitos importantes como ubicación, estado del inmueble y servicios disponibles. Solo las viviendas que superen esta revisión podrán publicar cuartos en UStay, garantizando confianza y transparencia para todos los usuarios.
                    </p>
                    <div className="font-semibold text-center mt-4 mb-2">Gracias por confiar en UStay</div>
                    <div className="text-center mb-4">¡Registra tu propiedad y verifícalo para poder publicar tus inmuebles!</div>
                    <div className="text-center mb-2 underline font-semibold">Términos y condiciones de registro</div>
                    <div className="flex justify-center mb-4">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={e => setTermsAccepted(e.target.checked)}
                            />{" "}
                            He leído y acepto
                        </label>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                            disabled={step === 1}
                        >
                            Volver
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
                            onClick={handleNext}
                            disabled={!termsAccepted}
                        >
                            Iniciar registro
                        </button>
                    </div>
                </>
            )}

            {/* Paso 2 */}
            {step === 2 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Ingresa una dirección</h2>
                    <p className="text-center mb-4">
                        Por favor, ingresa la dirección exacta de tu vivienda junto con una referencia que facilite su ubicación. Esta información es importante para asegurar que la propiedad pueda ser verificada correctamente.
                    </p>
                    <div className="mb-4">
                        <label className="block mb-1">Dirección:</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: Raña, Urb. San Francisco"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Referencia:</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: Frente al vegetariano"
                            value={reference}
                            onChange={e => setReference(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
                            onClick={handleNext}
                            disabled={!address || !reference}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {/* Paso 3 */}
            {step === 3 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Ubica tu propiedad</h2>
                    <p className="text-center mb-4">
                        Por favor, señala la ubicación exacta de tu vivienda en el mapa para facilitar su identificación y verificación. Esto nos ayudará a validar la dirección y asegurar la precisión de la información.
                    </p>
                    <MapStep />
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
                            onClick={handleNext}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {/* Paso 4: Subir imágenes */}
            {step === 4 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Subir imágenes</h2>
                    <p className="text-center mb-4">
                        Sube fotos claras y recientes de tu vivienda y de los cuartos que deseas publicar. Asegúrate de que las imágenes muestren bien los espacios, la fachada, y detalles importantes para que los interesados puedan conocer mejor la propiedad. Esto facilitará la validación y mejorará la presentación de tu anuncio.
                    </p>
                    <div className="flex justify-end mb-4">
                        <button
                            className="border px-3 py-1 rounded flex items-center gap-1"
                            onClick={handleAddImage}
                        >
                            Subir <span className="font-bold text-lg">+</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mb-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="flex items-center border rounded px-3 py-2 bg-gray-50">
                                <span className="flex-1">{img.name}</span>
                                <button className="mx-2" title="Ver">
                                    <span role="img" aria-label="ver">
                                        <FaRegEye />
                                    </span>
                                </button>
                                <button className="text-red-500" title="Eliminar" onClick={() => handleRemoveImage(idx)}>
                                    <IoCloseSharp />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
                            onClick={handleNext}
                            disabled={images.length === 0}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {/* Paso 5: Información extra */}
            {step === 5 && !registerSuccess && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Información extra</h2>
                    <p className="text-center mb-4">
                        Indica cuántos pisos tiene la vivienda y añade otras reglas o características que deben respetar los inquilinos. Esta información es importante para verificar que tu propiedad cumple con los estándares de UStay.
                    </p>
                    <div className="mb-4">
                        <label className="block mb-1">Cant. Pisos:</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={floors}
                            onChange={e => setFloors(e.target.value)}
                        >
                            <option value="">Selecciona</option>
                            <option value="1">1 piso</option>
                            <option value="2">2 pisos</option>
                            <option value="3">3 pisos</option>
                            <option value="4">4 pisos</option>
                            <option value="5">5 pisos</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Reglas de casa:</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: No se admiten mascotas."
                            value={rules}
                            onChange={e => setRules(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
                            onClick={handleRegisterProperty}
                            disabled={!floors || registering}
                        >
                            {registering ? 'Registrando...' : 'Finalizar registro'}
                        </button>
                    </div>
                    {registerError && (
                        <div className="text-red-500 text-center mt-2">{registerError}</div>
                    )}
                </>
            )}

            {/* Paso de éxito: solo cuando registerSuccess es true */}
            {registerSuccess && (
                <div className="flex flex-col items-center text-center">
                    <div className="mt-4 mb-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Éxito" className="mx-auto w-24 h-24" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-green-700">¡Propiedad registrada con éxito!</h2>
                    <div className="text-xl font-semibold mb-2">Felicidades<br />
                        <span>{user?.nombre || user?.name || ''}</span>
                        <span> {user?.apellido_pa || user?.apellido || ''}</span>
                    </div>
                    <p className="mb-4">
                        Has completado exitosamente el registro de tu vivienda en UStay. Toda la información ha sido guardada y tu propiedad ya forma parte de nuestra plataforma.
                    </p>
                    <div className="text-left mb-4 max-w-lg">
                        <div className="font-bold mb-1">¿Qué sigue?</div>
                        <div className="mb-2 text-sm">
                            Para que puedas comenzar a publicar cuartos, es necesario completar el proceso de verificación de propiedad.<br />
                            Este proceso es sencillo y garantiza que los espacios ofrecidos cumplan con nuestros estándares de calidad.
                        </div>
                        <div className="font-bold mb-1">¿Cómo funciona la verificación?</div>
                        <ul className="text-sm mb-2 list-disc pl-5">
                            <li>Cuando solicites la verificación, uno de nuestros inspectores visitará la propiedad.</li>
                            <li>Verificará aspectos básicos como condiciones generales, servicios, seguridad y coincidencia con la información registrada.</li>
                            <li>Si todo está en orden, tu propiedad quedará habilitada para publicar cuartos.</li>
                        </ul>
                        <div className="text-blue-700 font-semibold">
                            Puedes solicitar la verificación en cualquier momento desde tu panel de propiedad.
                        </div>
                    </div>
                    <button
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mb-4"
                        onClick={() => window.location.reload()}
                    >
                        Regresar al panel
                    </button>
                    <div className="text-xs text-gray-600">
                        <span role="img" aria-label="ayuda">⚠️</span> ¿Tienes dudas o necesitas ayuda?<br />
                        Escríbenos a <a href="mailto:soporte@ustay.com" className="text-blue-700 underline">soporte@ustay.com</a> o contáctanos por nuestro <a href="https://wa.me/" className="text-blue-700 underline">WhatsApp</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterProperty;