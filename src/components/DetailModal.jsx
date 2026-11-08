import { X, Check, AlertOctagon } from 'lucide-react'
import { formaterDate, getTypeLabel, getTypeColor } from '../utils/helpers'

/**
 * Modale affichant le détail d'une alerte avec boutons Confirmer / Fausse alerte.
 */
export default function DetailModal({ alerte, onClose, onConfirmer, onFausseAlerte }) {
  if (!alerte) return null

  const couleur = getTypeColor(alerte.type)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-dark"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Type avec pastille colorée */}
        <span
          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full mb-3"
          style={{ backgroundColor: `${couleur}20`, color: couleur }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: couleur }} />
          {getTypeLabel(alerte.type)}
        </span>

        <h2 className="text-xl font-bold text-dark pr-8">{alerte.titre}</h2>
        <p className="text-slate-600 mt-3 text-sm leading-relaxed">{alerte.description}</p>

        {/* Niveau de gravité */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-slate-500">Gravité :</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`w-3 h-3 rounded-full ${
                  n <= alerte.niveauGravite ? 'bg-alert' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{alerte.niveauGravite}/5</span>
        </div>

        <p className="text-xs text-slate-400 mt-3">{formaterDate(alerte.date)}</p>

        {/* Compteurs de confirmations / fausses alertes */}
        <div className="mt-4 flex gap-4 text-sm text-slate-600">
          <span>{alerte.nombreConfirmations} confirmation{alerte.nombreConfirmations > 1 ? 's' : ''}</span>
          <span>{alerte.nombreFausseAlertes} fausse{alerte.nombreFausseAlertes > 1 ? 's' : ''} alerte{alerte.nombreFausseAlertes > 1 ? 's' : ''}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => onConfirmer(alerte.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-success text-white
                       py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            Confirmer
          </button>
          <button
            type="button"
            onClick={() => onFausseAlerte(alerte.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white
                       py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            <AlertOctagon className="w-4 h-4" />
            Fausse alerte
          </button>
        </div>
      </div>
    </div>
  )
}
