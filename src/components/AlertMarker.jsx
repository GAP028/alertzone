import { Marker, Circle, Popup } from 'react-leaflet'
import L from 'leaflet'
import { getTypeColor, getTypeLabel } from '../utils/helpers'

/**
 * Crée une icône Leaflet personnalisée : cercle coloré selon le type d'alerte.
 */
function creerIcone(couleur) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 18px;
      height: 18px;
      background: ${couleur};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

/**
 * Marqueur sur la carte + cercle de rayon d'impact.
 */
export default function AlertMarker({ alerte, onSelectAlerte }) {
  const couleur = getTypeColor(alerte.type)
  const position = [alerte.latitude, alerte.longitude]

  return (
    <>
      {/* Cercle représentant le rayon d'impact de l'alerte */}
      <Circle
        center={position}
        radius={alerte.rayon ?? 300}
        pathOptions={{
          color: couleur,
          fillColor: couleur,
          fillOpacity: 0.15,
          weight: 2,
        }}
      />

      {/* Marqueur cliquable */}
      <Marker
        position={position}
        icon={creerIcone(couleur)}
        eventHandlers={{
          click: () => onSelectAlerte(alerte),
        }}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{alerte.titre}</p>
            <p className="text-slate-500">{getTypeLabel(alerte.type)}</p>
            <button
              type="button"
              onClick={() => onSelectAlerte(alerte)}
              className="mt-2 text-primary text-xs font-medium hover:underline"
            >
              Voir le détail
            </button>
          </div>
        </Popup>
      </Marker>
    </>
  )
}
