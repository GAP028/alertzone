/**
 * Service API — centralise les appels au back-end Symfony.
 * L'URL de base peut être surchargée via la variable d'environnement VITE_API_URL.
 * Si l'API ne répond pas, les fonctions lèvent une erreur : App.jsx bascule alors
 * automatiquement sur les données locales (mode maquette).
 */
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Récupère toutes les alertes
export async function chargerAlertes() {
  const res = await fetch(`${BASE}/alertes`)
  if (!res.ok) throw new Error('API indisponible')
  return res.json()
}

// Crée une nouvelle alerte (signalement)
export async function creerAlerte(donnees) {
  const res = await fetch(`${BASE}/alertes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donnees),
  })
  if (!res.ok) throw new Error('Création impossible')
  return res.json()
}

// +1 confirmation
export async function confirmerAlerte(id) {
  const res = await fetch(`${BASE}/alertes/${id}/confirmer`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Action impossible')
  return res.json()
}

// +1 fausse alerte
export async function signalerFausse(id) {
  const res = await fetch(`${BASE}/alertes/${id}/fausse`, { method: 'PATCH' })
  if (!res.ok) throw new Error('Action impossible')
  return res.json()
}
