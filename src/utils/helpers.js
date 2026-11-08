import { ALERT_TYPES } from '../constants/alertTypes'

/**
 * Formate une date ISO en heure lisible (ex. "14:30").
 */
export function formaterHeure(dateISO) {
  const date = new Date(dateISO)
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

/**
 * Formate une date ISO en date complète lisible.
 */
export function formaterDate(dateISO) {
  const date = new Date(dateISO)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Retourne le libellé du type d'alerte.
 */
export function getTypeLabel(type) {
  return ALERT_TYPES[type]?.label ?? type
}

/**
 * Retourne la couleur associée au type d'alerte.
 */
export function getTypeColor(type) {
  return ALERT_TYPES[type]?.color ?? '#1E3A8A'
}

/**
 * Génère des coordonnées aléatoires proches du centre de Paris.
 * Utilisé lors du signalement d'une nouvelle alerte (maquette).
 */
export function genererPositionAleatoire() {
  const centreLat = 48.8566
  const centreLng = 2.3522
  // Décalage aléatoire d'environ ±0.02° (~2 km)
  const decalage = () => (Math.random() - 0.5) * 0.04
  return {
    latitude: centreLat + decalage(),
    longitude: centreLng + decalage(),
  }
}

/**
 * Filtre les alertes selon les types actifs et la recherche textuelle.
 */
export function filtrerAlertes(alertes, typesActifs, recherche = '') {
  const terme = recherche.trim().toLowerCase()
  return alertes.filter((alerte) => {
    const typeVisible = typesActifs[alerte.type]
    if (!typeVisible) return false
    if (!terme) return true
    return (
      alerte.titre.toLowerCase().includes(terme) ||
      alerte.description.toLowerCase().includes(terme) ||
      getTypeLabel(alerte.type).toLowerCase().includes(terme)
    )
  })
}
