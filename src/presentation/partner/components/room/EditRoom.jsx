import { useState, useEffect } from 'react';
import { fetchRoomById } from '@/infrastructure/services/room.service';
import { updateRoom } from '@/infrastructure/services/property.service';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert';

const CLOUDINARY_CLOUD_NAME = 'djasvvxs9'; // cloud name real
const CLOUDINARY_UPLOAD_PRESET = 'cgfucclq'; // upload preset sin firma

const EditRoom = ({ room: roomFromProps = {}, onClose, onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para inputs
  const [nombre, setNombre] = useState('');
  const [tipoCuarto, setTipoCuarto] = useState(1); // Asignamos un valor inicial
  const [precio, setPrecio] = useState('');
  const [periodo, setPeriodo] = useState('Mensual'); // Valor predeterminado
  const [estado, setEstado] = useState('Disponible');
  const [imagenes, setImagenes] = useState([]); // URLs existentes
  const [nuevasImagenes, setNuevasImagenes] = useState([]); // Archivos nuevos

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Mapeo de periodo a periodo_id
  const periodoMap = {
    'Mensual': 1,
    'Semestral': 2,
    'Anual': 3
  };


  // Cargar datos del cuarto desde props o backend
  useEffect(() => {
    if (id) {
      fetchRoomById(id)
        .then(data => {
          const cuarto = data.cuarto || {};
          setNombre(cuarto.nombre || '');
          setTipoCuarto(cuarto.tipo_cuarto_id || 1); // Asignar valor de tipo_cuarto_id
          setPrecio(cuarto.precio || '');
          setPeriodo(cuarto.periodo || 'Mensual'); // Asegurarse de que se tenga un valor para el periodo
          setEstado(cuarto.disponibilidad === 1 ? 'Disponible' : 'No disponible');
          setImagenes(data.fotos?.map(f => f.url_imagen) || []);
        })
        .catch(() => setError('Error cargando datos del cuarto'));
    }
  }, [id]);

  // Manejo imágenes nuevas (archivos)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNuevasImagenes(prev => [...prev, ...files]);
  };

  // Eliminar imagen existente (URL)
  const handleRemoveImage = (idx) => {
    setImagenes(imagenes.filter((_, i) => i !== idx));
  };

  // Eliminar imagen nueva (archivo)
  const handleRemoveNewImage = (idx) => {
    setNuevasImagenes(nuevasImagenes.filter((_, i) => i !== idx));
  };

  // Subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Error al subir la imagen');
    const data = await res.json();
    return data.secure_url;
  };

  // Enviar formulario para actualizar cuarto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // Subir nuevas imágenes a Cloudinary
      const newImageUrls = nuevasImagenes.length > 0 ? await Promise.all(nuevasImagenes.map(uploadImageToCloudinary)) : [];
      
      // Combinar las imágenes existentes con las nuevas
      const todasLasImagenes = [...imagenes, ...newImageUrls];
  
      // Asegúrate de que 'estado' es mapeado correctamente a 1 o 0
      const disponibilidad = (estado === 'Disponible') ? 1 : 0;
  
      // Crear el objeto actualizado
      const updated = {
        nombre: nombre || roomFromProps.nombre,  // Si no se proporciona nombre, usamos el nombre actual
        tipo_cuarto_id: tipoCuarto || roomFromProps.tipo_cuarto_id,  // Asignar tipo_cuarto_id
        precio: precio || roomFromProps.precio,  // Si no se proporciona precio, usamos el actual
        periodo_id: periodoMap[periodo] || roomFromProps.periodo_id, // Mapear el periodo a periodo_id
        disponibilidad,  // Asegurarse de que disponibilidad sea 1 o 0
      };
  
      // Si hay nuevas imágenes, actualizar el campo fotos
      if (newImageUrls.length > 0) {
        updated.fotos = todasLasImagenes;  // Asignar todas las imágenes, tanto existentes como nuevas
      } else {
        updated.fotos = imagenes;  // Si no hay nuevas imágenes, solo usamos las existentes
      }
      console.log(updated);  // Verifica el objeto actualizado
      await updateRoom(id || roomFromProps.cuarto_id, updated);
  
      // Mostrar la alerta de éxito
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/IMS/room');  // Redirigir después de un corto tiempo
      }, 1800);
  
      // Callback para cuando la actualización es exitosa
      if (onSuccess) onSuccess({ ...roomFromProps, ...updated });
  
    } catch (error) {
      setError('Error al actualizar el cuarto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded flex gap-8">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Cuarto</h1>
        <form id="edit-room-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs para Nombre, Tipo de Cuarto, Precio, Periodo y Estado */}
          <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tipo de cuarto</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={tipoCuarto}
              onChange={e => setTipoCuarto(parseInt(e.target.value))}
              required
            >
              <option value="1">Departamento</option>
              <option value="2">Cuartos</option>
              <option value="3">Casa</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Precio</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Periodo</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={periodo}
              onChange={e => setPeriodo(e.target.value)}
              required
            >
              <option value="Mensual">Mensual</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Estado</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={estado}
              onChange={e => setEstado(e.target.value)}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="No disponible">No disponible</option>
            </select>
          </div>

          {/* Agregar nuevas fotos */}
          <div>
            <label className="block mb-1 font-semibold">Agregar nuevas fotos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
          </div>

          {/* Mostrar imágenes actuales */}
          {imagenes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">Imágenes actuales</p>
              <div className="flex gap-2 flex-wrap">
                {imagenes.map((imgUrl, idx) => (
                  <div key={idx} className="relative">
                    <img src={imgUrl} alt={`Imagen ${idx + 1}`} className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mostrar nuevas imágenes seleccionadas */}
          {nuevasImagenes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">Nuevas imágenes seleccionadas</p>
              <div className="flex gap-2 flex-wrap">
                {nuevasImagenes.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Nueva imagen ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Panel lateral */}
      <div className="w-1/3 bg-gray-50 rounded p-4 h-fit">
        <div className="mb-4">
          <span className="font-semibold">Estado:</span>{' '}
          <span className={estado === 'Disponible' ? 'text-green-600' : 'text-red-600'}>
            {estado}
          </span>
        </div>
        <button
          type="button"
          className="w-full border border-gray-400 py-2 rounded mb-2"
          onClick={() => (onClose ? onClose() : navigate('/IMS/room'))}
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="edit-room-form"
          className="w-full bg-secondary text-white py-2 rounded"
          disabled={loading}
        >
          Actualizar
        </button>

        {error && <Alert type="error" message={error} />}
        {showAlert && (
          <Alert
            message="Cuarto actualizado correctamente"
            onClose={() => setShowAlert(false)}
            type="success"
          />
        )}
      </div>
    </div>
  );
};

export default EditRoom;
