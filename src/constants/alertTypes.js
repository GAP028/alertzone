/**
 * Configuration des types d'alerte : libellé affiché et couleur associée.
 * Utilisé pour les filtres, les pastilles et les marqueurs sur la carte.
 */
export const ALERT_TYPES = {
  agression: {
    label: 'Agression',
    color: '#DC2626',
  },
  vol: {
    label: 'Vol',
    color: '#EA580C',
  },
  meteo: {
    label: 'Météo',
    color: '#F59E0B',
  },
  disparition: {
    label: 'Disparition',
    color: '#7C3AED',
  },
  avis_recherche: {
    label: 'Avis de recherche',
    color: '#991B1B',
  },
}

// Liste des clés de type, pratique pour initialiser les filtres
export const TYPE_KEYS = Object.keys(ALERT_TYPES)
