import { useState } from 'react'
import { X } from 'lucide-react'
import { ALERT_TYPES, TYPE_KEYS } from '../constants/alertTypes'

/**
 * Modale avec formulaire pour signaler une nouvelle alerte (données mock).
 */
export default function SignalerModal({ onClose, onSubmit }) {
  const [formulaire, setFormulaire] = useState({
    type: 'agression',
    titre: '',
    description: '',
    niveauGravite: 3,
  })

  // Met à jour un champ du formulaire
  function handleChange(champ, valeur) {
    setFormulaire((prev) => ({ ...prev, [champ]: valeur }))
  }

  // Envoie le formulaire si le titre est renseigné
  function handleSubmit(e) {
    e.preventDefault()
    if (!formulaire.titre.trim()) return
    onSubmit(formulaire)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-dark"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-dark mb-4">Signaler une alerte</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type d'alerte */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-600 mb-1">
              Type d'alerte
            </label>
            <select
              id="type"
              value={formulaire.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {TYPE_KEYS.map((type) => (
                <option key={type} value={type}>
                  {ALERT_TYPES[type].label}
                </option>
              ))}
            </select>
          </div>

          {/* Titre */}
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-slate-600 mb-1">
              Titre
            </label>
            <input
              id="titre"
              type="text"
              value={formulaire.titre}
              onChange={(e) => handleChange('titre', e.target.value)}
              placeholder="Ex. Agression signalée rue X"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formulaire.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Décrivez la situation..."
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Niveau de gravité (1 à 5) */}
          <div>
            <label htmlFor="gravite" className="block text-sm font-medium text-slate-600 mb-1">
              Niveau de gravité : {formulaire.niveauGravite}/5
            </label>
            <input
              id="gravite"
              type="range"
              min={1}
              max={5}
              value={formulaire.niveauGravite}
              onChange={(e) => handleChange('niveauGravite', Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-blue-900 transition-colors"
          >
            Envoyer le signalement
          </button>
        </form>
      </div>
    </div>
  )
}
