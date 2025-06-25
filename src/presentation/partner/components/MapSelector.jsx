import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useMemo, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

// Ñaña por defecto
const defaultCenter = { lat: -11.9887986, lng: -76.8399675 };

// Ícono desde React
const createReactIcon = () =>
  L.divIcon({
    html: ReactDOMServer.renderToString(
      <div style={{ fontSize: '30px', color: '#ff3b3b' }}>
        <FaMapMarkerAlt />
      </div>
    ),
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

// Centra el mapa si cambia la coordenada seleccionada
function RecenterMap({ latlng }) {
  const map = useMap();
  useEffect(() => {
    if (latlng) map.setView(latlng);
  }, [latlng, map]);
  return null;
}

// Componente para clic en mapa
function ClickToAddMarker({ onSelect, markerPos }) {
  const customIcon = useMemo(() => createReactIcon(), []);

  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return markerPos ? <Marker position={markerPos} icon={customIcon} /> : null;
}

// Componente principal del mapa
export default function MapSelector({ selectedCoords, onSelect, readOnly = false }) {
  const center = selectedCoords || defaultCenter;
  const customIcon = useMemo(() => createReactIcon(), []);

  return (
    <div className="w-full h-[400px] rounded overflow-hidden">
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={!readOnly}
        dragging={!readOnly}
        doubleClickZoom={!readOnly}
        zoomControl={!readOnly}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Centra cuando cambia la selección */}
        <RecenterMap latlng={selectedCoords} />

        {/* Mostrar marcador */}
        {readOnly ? (
          selectedCoords && <Marker position={selectedCoords} icon={customIcon} />
        ) : (
          <ClickToAddMarker onSelect={onSelect} markerPos={selectedCoords} />
        )}
      </MapContainer>
    </div>
  );
}
