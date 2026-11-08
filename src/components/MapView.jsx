import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import AlertMarker from './AlertMarker'

// Centre de la carte : Paris
const CENTRE_PARIS = [48.8566, 2.3522]
const ZOOM_INITIAL = 13

/**
 * Carte Leaflet avec tuiles OpenStreetMap et marqueurs d'alertes.
 */
export default function MapView({ alertes, onSelectAlerte }) {
  return (
    <div className="flex-1 relative min-h-[300px]">
      <MapContainer
        center={CENTRE_PARIS}
        zoom={ZOOM_INITIAL}
        className="absolute inset-0"
        scrollWheelZoom={true}
      >
        {/* Tuiles gratuites OpenStreetMap — aucune clé API requise */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Un marqueur + cercle par alerte visible */}
        {alertes.map((alerte) => (
          <AlertMarker
            key={alerte.id}
            alerte={alerte}
            onSelectAlerte={onSelectAlerte}
          />
        ))}
      </MapContainer>
    </div>
  )
}
