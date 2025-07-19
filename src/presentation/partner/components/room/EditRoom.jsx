import { useState, useEffect } from 'react';
import { fetchRoomById } from '@/infrastructure/services/room.service';
import { updateRoom } from '@/infrastructure/services/property.service';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert';
import { FaBolt, FaTint, FaWifi, FaLock, FaFire, FaBroom, FaCar } from 'react-icons/fa';

const CLOUDINARY_CLOUD_NAME = 'djasvvxs9';
const CLOUDINARY_UPLOAD_PRESET = 'cgfucclq';

const EditRoom = ({ room: roomFromProps = {}, onClose, onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [tipoCuarto, setTipoCuarto] = useState(1);
  const [precio, setPrecio] = useState('');
  const [periodo, setPeriodo] = useState('Mensual');
  const [estado, setEstado] = useState('Disponible');
  const [imagenes, setImagenes] = useState([]);
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [serviceDetails, setServiceDetails] = useState({
    luz: '', agua: '', wifi: '', seguridad: '', calefaccion: '', limpieza: '', garage: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const periodoMap = { 'Mensual': 1, 'Semestral': 2, 'Anual': 3 };

  useEffect(() => {
    if (id) {
      fetchRoomById(id)
        .then(data => {
          const cuarto = data.cuarto || {};
          setNombre(cuarto.nombre || '');
          setTipoCuarto(cuarto.tipo_cuarto_id || 1);
          setPrecio(cuarto.precio || '');
          setPeriodo(cuarto.periodo || 'Mensual');
          setEstado(cuarto.disponibilidad === 1 ? 'Disponible' : 'No disponible');
          setImagenes(data.fotos?.map(f => f.url_imagen) || []);
          setDescripcion(cuarto.descripcion || '');

          // Cargar servicios y detalles
          const loadedServices = data.servicios?.map(s => s.servicio) || [];
          setServicios(loadedServices);

          const detalles = {};
          data.servicios?.forEach(s => {
            detalles[s.servicio] = s.descripcion || '';
          });
          setServiceDetails(detalles);
        })
        .catch(() => setError('Error cargando datos del cuarto'));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNuevasImagenes(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (idx) => {
    setImagenes(imagenes.filter((_, i) => i !== idx));
  };

  const handleRemoveNewImage = (idx) => {
    setNuevasImagenes(nuevasImagenes.filter((_, i) => i !== idx));
  };

  const toggleService = (service) => {
    setServicios(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleServiceDetailChange = (service, value) => {
    setServiceDetails(prev => ({
      ...prev,
      [service]: value
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newImageUrls = nuevasImagenes.length > 0
        ? await Promise.all(nuevasImagenes.map(uploadImageToCloudinary))
        : [];

      const todasLasImagenes = [...imagenes, ...newImageUrls];
      const disponibilidad = estado === 'Disponible' ? 1 : 0;

      const updated = {
        nombre,
        tipo_cuarto_id: tipoCuarto,
        precio,
        descripcion,           
        periodo_id: periodoMap[periodo],
        disponibilidad,
        fotos: todasLasImagenes,
        servicios,
        serviceDetails
      };
      

      await updateRoom(id || roomFromProps.cuarto_id, updated);

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/IMS/room');
      }, 1800);

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
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Inmueble</h1>
        <form id="edit-room-form" onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-semibold">Nombre</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Tipo</label>
            <select className="w-full border rounded px-3 py-2" value={tipoCuarto} onChange={e => setTipoCuarto(parseInt(e.target.value))}>
              <option value="1">Departamento</option>
              <option value="2">Cuarto</option>
              <option value="3">Casa</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Descripción</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Escribe una descripción detallada del inmueble"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Precio</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={precio} onChange={e => setPrecio(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Periodo</label>
            <select className="w-full border rounded px-3 py-2" value={periodo} onChange={e => setPeriodo(e.target.value)}>
              <option value="Mensual">Mensual</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Estado</label>
            <select className="w-full border rounded px-3 py-2" value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="Disponible">Disponible</option>
              <option value="No disponible">No disponible</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Servicios</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
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
                  className={`border rounded px-2 py-1 flex items-center gap-1 ${servicios.includes(id) ? 'bg-orange-200 border-orange-400' : 'bg-white'}`}
                  onClick={() => toggleService(id)}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {servicios.length > 0 && servicios.map(service => (
              <div key={service} className="mb-2">
                <label className="capitalize">{service}:</label>
                <input
                  type="text"
                  value={serviceDetails[service] || ''}
                  onChange={(e) => handleServiceDetailChange(service, e.target.value)}
                  className="w-full border rounded px-3 py-1"
                  placeholder={`Descripción de ${service}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Agregar nuevas fotos</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Mostrar imágenes actuales */}
          {imagenes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">Imágenes actuales</p>
              <div className="flex gap-2 flex-wrap">
                {imagenes.map((imgUrl, idx) => (
                  <div key={idx} className="relative">
                    <img src={imgUrl} alt="" className="w-24 h-24 object-cover rounded" />
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
        </form>
      </div>
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
