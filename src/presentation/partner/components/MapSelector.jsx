import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useMemo } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

// Centro por defecto: Ñaña
const defaultCenter = { lat: -11.9887986, lng: -76.8399675 };

// Ícono con react-icons renderizado en HTML
const createReactIcon = () =>
  L.divIcon({
    html: ReactDOMServer.renderToString(
      <div style={{ fontSize: '30px', color: '#ff3b3b' }}>
        <FaMapMarkerAlt />
      </div>
    ),
    className: '', // sin estilos por defecto de Leaflet
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

function ClickToAddMarker({ onSelect, markerPos }) {
  const customIcon = useMemo(() => createReactIcon(), []);

  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return markerPos ? <Marker position={markerPos} icon={customIcon} /> : null;
}

export default function MapSelector({ selectedCoords, onSelect }) {
  const positionToShow = selectedCoords || defaultCenter;

  return (
    <div className="w-full h-[400px] rounded overflow-hidden">
      <MapContainer
        center={positionToShow}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickToAddMarker onSelect={onSelect} markerPos={selectedCoords} />
      </MapContainer>
    </div>
  );
}
