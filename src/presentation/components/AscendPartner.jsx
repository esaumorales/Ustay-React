import React from 'react';
import FOTOAscendPartner from '@/presentation/assets/img/background-ascendPartner.webp'

const textFields = [
    'Nombre',
    'Apellido Materno',
    'Apellido Paterno',
    'Correo electrónico',
    'Dirección',
    'Teléfono',
    'DNI',
];

const fileFields = [
    { label: 'Foto de DNI frontal:' },
    { label: 'Foto de DNI trasera:' },
];

const AscendPartner = () => {
    return (
            <div className="relative">
              <div className="absolute inset-0 z-[-1]">
                <img src={FOTOAscendPartner} alt="fotoAscendPartner" className="w-full h-full object-cover" />
              </div>
        
              <div className='mt-8'>
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-6 min-h-screen">
        
                  {/* Vista previa izquierda */}
                  <div className="w-full md:w-1/2 h-[350px] bg-transparent rounded-md flex items-center justify-center">
                  </div>
        
                  {/* Formulario */}
                  <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-lg  p-6 space-y-5">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                      Cuarto en Alameda con pensión
                    </h2>
        
                    <form className="space-y-4">
                      {textFields.map((placeholder, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={placeholder}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ))}
        
                      {fileFields.map((field, idx) => (
                        <div key={idx}>
                          <label className="block text-sm font-semibold mb-1 text-gray-700">
                            {field.label}
                          </label>
                          <input
                            type="file"
                            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      ))}
        
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
                      >
                        Enviar solicitud
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        

export default AscendPartner;
