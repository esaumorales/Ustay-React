import { useState, useEffect } from 'react';
import { updateProperty, getPropertyById } from '@/infrastructure/services/property.service';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@/presentation/components/common/Alert';
import MapSelector from '../MapSelector';

const CLOUDINARY_CLOUD_NAME = 'djasvvxs9'; // cloud name real
const CLOUDINARY_UPLOAD_PRESET = 'cgfucclq'; // upload preset sin firma

const EditProperty = ({ property: propFromProps = {}, onClose, onSuccess }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(propFromProps);

  // Estados para los inputs (inicializados vacíos para evitar bloqueo)
  const [coords, setCoords] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [referencia, setReferencia] = useState('');
  const [n_pisos, setNPisos] = useState(1);
  const [reglas, setReglas] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  // Traer propiedad si no viene en props
  useEffect(() => {
    if (!propFromProps.id && id) {
      getPropertyById(id).then(data => setProperty(data.propiedad));
    } else {
      setProperty(propFromProps);
    }
  }, [id, propFromProps]);

  // Sincronizar inputs solo cuando cambia la propiedad y si están vacíos para no sobrescribir edición del usuario
  useEffect(() => {
    if (property) {
      if (!direccion) setDireccion(property.direccion || property.direccion_completa || '');
      if (!referencia) setReferencia(property.referencia || '');
      if (!n_pisos || n_pisos === 1) setNPisos(property.n_pisos || 1);
      if (!reglas) setReglas(property.reglas || '');
      if (property.latitud && property.longitud && !coords) {
        setCoords({ lat: parseFloat(property.latitud), lng: parseFloat(property.longitud) });
      }
      if (imagenes.length === 0) setImagenes([property.foto, property.foto_2, property.foto_3].filter(Boolean));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

  // Manejo de imágenes nuevas
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

  // Subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Error subiendo imagen a Cloudinary');
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Subir nuevas imágenes y obtener URLs
      const uploadedUrls = await Promise.all(nuevasImagenes.map(uploadImageToCloudinary));

      // Preparar URLs definitivas mezclando existentes y nuevas
      const updated = {
        direccion,
        referencia,
        n_pisos: parseInt(n_pisos),
        reglas,
        latitud: coords?.lat || null,
        longitud: coords?.lng || null,
        foto: uploadedUrls[0] || imagenes[0] || null,
        foto_2: uploadedUrls[1] || imagenes[1] || null,
        foto_3: uploadedUrls[2] || imagenes[2] || null,
      };

      // Actualizar propiedad en backend
      await updateProperty(id || property.propiedad_id, updated);

      // Mostrar alerta éxito
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/IMS/property');
      }, 1800);

      if (onSuccess) onSuccess({ ...property, ...updated });
    } catch (error) {
      setError('Error al actualizar la propiedad');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded flex gap-8">
      {/* Columna principal */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Propiedad</h1>
        <form id="edit-property-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Dirección</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Referencia</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={referencia}
              onChange={e => setReferencia(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Imágenes</label>
            <div className="space-y-2 mb-2">
              {[...imagenes, ...nuevasImagenes].map((img, idx) => (
                <div key={idx} className="flex items-center border rounded px-3 py-2 bg-gray-50">
                  <span className="mr-2 text-gray-500">
                    <svg width="20" height="20" fill="none" stroke="currentColor"><rect width="18" height="14" x="1" y="3" rx="2" strokeWidth="2" /><circle cx="6" cy="8" r="1.5" /><path d="M1 13l4-4a2 2 0 0 1 2.8 0l4.2 4.2" /></svg>
                  </span>
                  <span className="flex-1 truncate">{typeof img === 'string' ? img.split('/').pop() : img.name}</span>
                  <button
                    type="button"
                    className="mx-2 text-gray-500 hover:text-gray-700"
                    onClick={() => window.open(typeof img === 'string' ? img : URL.createObjectURL(img), '_blank')}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="8" strokeWidth="2" /><circle cx="10" cy="10" r="3" strokeWidth="2" /><path d="M10 2v2m0 12v2m8-8h-2M4 10H2" /></svg>
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => idx < imagenes.length ? handleRemoveImage(idx) : handleRemoveNewImage(idx - imagenes.length)}
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-block cursor-pointer bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark">
              Subir +
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div>
            <label className="block mb-1 font-semibold">N° de Pisos</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded px-3 py-2"
              value={n_pisos}
              onChange={e => setNPisos(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Reglas de la casa</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={reglas}
              onChange={e => setReglas(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Estado de verificación</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={property.estado_verificacion || ''}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mapa</label>
            <div>
              <label className="block mb-1 font-semibold">Ubicación en el mapa</label>
              <MapSelector selectedCoords={coords} onSelect={setCoords} />
              {coords && (
                <div className="text-sm mt-1 text-gray-700">
                  Coordenadas: lat {coords.lat.toFixed(6)}, lng {coords.lng.toFixed(6)}
                </div>
              )}
            </div>

          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>

      {/* Columna lateral */}
      <div className="w-1/3 bg-gray-50 rounded p-4 h-fit">
        <div className="mb-4">
          <span className="font-semibold">Estado:</span> <span className="text-red-500">No verificado</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Última Edición:</span> 12/05/2025 05:25 p.m.
        </div>
        <button
          type="button"
          className="w-full border border-gray-400 py-2 rounded mb-2"
          onClick={() => onClose ? onClose() : navigate('/IMS/property')}
        >
          Cancelar
        </button>
        <button
          type="submit"
          form="edit-property-form"
          className="w-full bg-secondary text-white py-2 rounded"
          disabled={loading}
        >
          Actualizar
        </button>
      </div>

      {/* Alerta de éxito */}
      {showAlert && (
        <Alert
          message="Se actualizó correctamente"
          onClose={() => setShowAlert(false)}
          type="success"
        />
      )}
    </div>
  );
};

export default EditProperty;
