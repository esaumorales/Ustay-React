import React, { useState } from 'react';
import { createRoom } from '@/infrastructure/services/room.service';
import { FaBolt, FaTint, FaWifi, FaLock, FaFire, FaBroom, FaCar } from 'react-icons/fa';  // Agregar íconos para los nuevos servicios

const CLOUDINARY_UPLOAD_PRESET = 'cgfucclq';
const CLOUDINARY_CLOUD_NAME = 'djasvvxs9';

const RegisterRoom = ({ propiedadId}) => {
    const [step, setStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [roomType, setRoomType] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [floor, setFloor] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [services, setServices] = useState([]); // Estado para los servicios
    const [serviceDetails, setServiceDetails] = useState({ luz: '', agua: '', wifi: '', seguridad: '', calefaccion: '', limpieza: '', garage: '' });
    const [images, setImages] = useState([]);
    const [registering, setRegistering] = useState(false);
    const [precio, setPrecio] = useState('');
    const [periodo, setPeriodo] = useState('Mensual');  // Valor predeterminado como 'Mensual'

    const handleNext = () => {
        if (step === 1 && !termsAccepted) return;
        setStep((prev) => Math.min(prev + 1, 9));
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const toggleService = (service) => {
        setServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Error al subir imagen');
        const data = await res.json();
        return data.secure_url;
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const handleServiceDetailsChange = (service, value) => {
        setServiceDetails((prev) => ({
            ...prev,
            [service]: value
        }));
    };
    const handleSubmit = async () => {
        setRegistering(true);
        try {
          // Validación básica (opcional, ya la tienes)
          if (!title || !description || !precio || !periodo || services.length === 0) {
            console.error('Faltan datos necesarios');
            return;
          }
      
          // Subir imágenes a Cloudinary (si es necesario)
          const imageUrls = [];
          for (const img of images) {
            const url = await uploadImageToCloudinary(img);
            imageUrls.push(url);
          }
      
          // Crear el objeto `serviceDetails` solo con los servicios seleccionados
          const selectedServiceDetails = {};
          services.forEach(service => {
            selectedServiceDetails[service] = serviceDetails[service] || 'Sin descripción';
          });
      
          // Datos para enviar al backend (ajustados al formato esperado)
          const cuartoData = {
            propiedad_id: propiedadId, 
            tipo_cuarto_id: parseInt(roomType),
            precio: precio,
            nombre: title,
            dimensiones: dimensions,
            n_piso: parseInt(floor),
            n_cuarto: parseInt(roomNumber),
            periodo: periodo, 
            descripcion: description,
            disponibilidad: 1,
            informacion_adicional: extraInfo,
            fotos: imageUrls,
            servicios: services, 
            serviceDetails: selectedServiceDetails, 
          };
            
          // Llamar al backend
          await createRoom(cuartoData);
          setStep(9); 
        } catch (error) {
          console.error('Error al registrar el cuarto:', error);
        } finally {
          setRegistering(false);
        }
      };
      
    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
            <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div
                        key={n}
                        className={`flex-1 h-1 rounded ${step >= n ? 'bg-orange-500' : 'bg-gray-200'}`}
                    />
                ))}
            </div>
            {step <= 9 && <div className="text-sm text-orange-600 mb-4">{step} de 9</div>}

            {step === 1 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Registra tu cuarto con nosotros</h2>
                    <p className="text-center mb-2">
                        En UStay queremos ayudarte a que alquiles tus cuartos de manera rápida y segura. Para ello, te pediremos información detallada sobre cada cuarto que desees publicar, asegurando que tus futuros inquilinos tengan toda la información necesaria para elegir con confianza.
                    </p>
                    <p className="text-center mb-2">
                        Por favor, completa todos los datos con precisión para que podamos verificar la calidad y comodidad de tu espacio. Solo los cuartos que cumplan con nuestras políticas serán visibles para los usuarios.
                    </p>
                    <p className="text-center font-semibold mt-4 mb-1">Gracias por confiar en UStay</p>
                    <p className="text-center mb-4">Empieza ahora y haz que tu cuarto destaque entre las mejores opciones.</p>
                    <p className="text-center underline font-semibold mb-2">Términos y condiciones de registro</p>
                    <div className="text-center mb-4">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mr-2"
                            />
                            Confirmo que la información es verídica y acepto los términos
                        </label>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Volver
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={!termsAccepted}
                        >
                            Iniciar registro
                        </button>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Ingrese un título y descripción</h2>
                    <p className="text-center mb-4 text-sm">
                        Escribe un título claro y llamativo que resuma las características principales de tu cuarto y atraiga a posibles clientes.
                    </p>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Título:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: Cuarto en alameda"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Descripción:</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            rows="5"
                            placeholder="Ejem: - No se admiten animales"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="mt-2 flex gap-2">
                            <button className="border px-2 py-1 rounded font-bold">B</button>
                            <button className="border px-2 py-1 rounded italic">I</button>
                            <button className="border px-2 py-1 rounded underline">U</button>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={!title || !description}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Subir imágenes</h2>
                    <p className="text-center mb-4 text-sm">
                        Asegúrate de que las imágenes muestren bien los espacios del cuarto. Las fotos son importantes para que los interesados puedan conocer mejor el inmueble.
                    </p>

                    {/* Contenedor para las imágenes seleccionadas */}
                    <div className="space-y-4 mb-4">
                        {images.length > 0 &&
                            images.map((img, idx) => (
                                <div key={idx} className="flex items-center justify-between border p-2 rounded shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Vista previa ${idx + 1}`}
                                            className="w-8 h-8 object-cover rounded"
                                        />
                                        <span className="text-sm">{img.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                        className="text-gray-600 hover:text-red-600"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* Input para seleccionar archivos */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Selecciona las imágenes para tu cuarto:</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Botones de navegación */}
                    <div className="flex justify-between mt-6">
                        <button
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                            onClick={handleBack}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={images.length === 0}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
            {step === 4 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Detalles del cuarto</h2>
                    <p className="text-center mb-4 text-sm">
                        Indica el tipo de cuarto, sus dimensiones, el piso donde se encuentra y el número asignado. Esta información es clave para que los inquilinos conozcan bien las características físicas y la ubicación dentro de la propiedad.
                    </p>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Tipo:</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="1">Cuarto</option>
                            <option value="2">Departamento</option>
                            <option value="3">Casa</option>
                            {/* Agrega más opciones si lo necesitas */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Dimensiones:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: 2 m x 3 m"
                            value={dimensions}
                            onChange={(e) => setDimensions(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Piso:</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">N° Cuarto:</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ejem: 10"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={!roomType || !dimensions || !floor || !roomNumber}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
            {step === 5 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Detalles de costo</h2>
                    <p className="text-center mb-4 text-sm">
                        Detalle la cantidad y el periodo en el que se debe pagar el inmueble.
                    </p>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Precio:</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ingrese precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Periodo:</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                        >
                            <option value="Mensual">Mensual</option>
                            <option value="Semestral">Semestral</option>
                            <option value="Anual">Anual</option>
                        </select>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={!precio || !periodo}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {step === 6 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Información extra</h2>
                    <p className="text-center mb-4 text-sm">
                        Proporciona detalles importantes sobre tu cuarto que no se hayan mencionado antes. Puedes incluir características especiales, servicios extra o cualquier información que ayude a que los interesados conozcan mejor el espacio.
                    </p>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Información adicional:</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            rows="5"
                            placeholder="Ejem: Wifi con alta velocidad, ubicado al lado del vegetariano"
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        />
                        <div className="mt-2 flex gap-2">
                            <button className="border px-2 py-1 rounded font-bold">B</button>
                            <button className="border px-2 py-1 rounded italic">I</button>
                            <button className="border px-2 py-1 rounded underline">U</button>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={!extraInfo}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
            {step === 7 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Selección de servicios</h2>
                    <p className="text-center mb-4 text-sm">
                        Selecciona los servicios que están disponibles en tu cuarto o departamento. Esta información permitirá a los inquilinos conocer qué comodidades incluye el alquiler.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {[
                            { id: 'luz', label: 'Luz', icon: <FaBolt /> },
                            { id: 'agua', label: 'Agua', icon: <FaTint /> },
                            { id: 'wifi', label: 'WiFi', icon: <FaWifi /> },
                            { id: 'seguridad', label: 'Seguridad', icon: <FaLock /> },
                            { id: 'calefaccion', label: 'Calefacción', icon: <FaFire /> },
                            { id: 'limpieza', label: 'Limpieza', icon: <FaBroom /> },
                            { id: 'garage', label: 'Garage', icon: <FaCar /> },
                        ].map(({ id, label, icon }) => (
                            <button
                                key={id}
                                type="button"
                                className={`border rounded px-4 py-2 flex items-center justify-center gap-2 ${services.includes(id) ? 'bg-orange-200 border-orange-400' : 'bg-white'}`}
                                onClick={() => toggleService(id)}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleNext}
                            disabled={services.length === 0}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
            {step === 8 && (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Detalles de los servicios</h2>
                    <p className="text-center mb-4 text-sm">
                        En esta sección podrás detallar los servicios que ofrece tu cuarto. Ya seleccionaste los servicios disponibles, ahora especifica si incluyen algún costo o son gratuitos.
                    </p>
                    <div className="space-y-4 mb-6">
                        {services.map((service) => (
                            <div key={service}>
                                <label className="block mb-1 font-medium capitalize">{service}:</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Ejem: Incluye pero...."
                                    value={serviceDetails[service] || ''}
                                    onChange={(e) => handleServiceDetailsChange(service, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border px-4 py-2 rounded hover:bg-gray-100" onClick={handleBack}>
                            Anterior
                        </button>
                        <button
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={handleSubmit}
                            disabled={registering}
                        >
                            {registering ? 'Registrando...' : 'Finalizar registro'}
                        </button>
                    </div>
                </>
            )}

            {step === 9 && (
                <div className="text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                        alt="Éxito"
                        className="mx-auto w-20 h-20 mb-4"
                    />
                    <h2 className="text-3xl font-bold text-green-700 mb-2">¡Inmueble registrado con éxito!</h2>
                    <div className="text-xl font-semibold mb-2">Felicidades Erick Mendoza</div>
                    <p className="mb-4 max-w-xl mx-auto">
                        Has completado exitosamente el registro de tu cuarto en UStay. Toda la información ha sido guardada correctamente y tu publicación ya forma parte de nuestra plataforma.
                    </p>
                    <div className="font-semibold mb-2">¿Qué sigue?</div>
                    <p className="mb-4 max-w-xl mx-auto text-sm">
                        Tu cuarto ya puede ser visto por los usuarios. Si deseas atraer más interesados, puedes explorar nuestras opciones de promoción para destacar tu publicación frente a más potenciales inquilinos.
                    </p>
                    <div className="text-blue-700 underline font-semibold mb-4">
                        Puedes gestionar todo desde tu panel de cuartos
                    </div>
                    <button
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                        onClick={() => window.location.href = '/IMS/room'}
                    >
                        Regresar al panel
                    </button>
                    <div className="text-xs text-gray-600 mt-4">
                        ⚠️ ¿Tienes dudas o necesitas ayuda? <br />
                        Escríbenos a <a href="mailto:soporte@ustay.com" className="text-blue-700 underline">soporte@ustay.com</a> o contáctanos por nuestro <a href="https://wa.me/" className="text-blue-700 underline">WhatsApp</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterRoom;
