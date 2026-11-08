import { formaterHeure, getTypeLabel, getTypeColor } from '../utils/helpers'

/**
 * Liste des alertes filtrées, chaque carte est cliquable.
 */
export default function AlertList({ alertes, onSelectAlerte }) {
  if (alertes.length === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-8">
        Aucune alerte ne correspond aux filtres.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {alertes.map((alerte) => (
        <button
          key={alerte.id}
          type="button"
          onClick={() => onSelectAlerte(alerte)}
          className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white
                     hover:border-primary hover:shadow-sm transition-all"
        >
          {/* Titre de l'alerte */}
          <p className="font-medium text-dark text-sm line-clamp-1">{alerte.titre}</p>

          <div className="flex items-center justify-between mt-2 gap-2">
            {/* Pastille de couleur + type */}
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: getTypeColor(alerte.type) }}
              />
              {getTypeLabel(alerte.type)}
            </span>

            {/* Heure */}
            <span className="text-xs text-slate-400">{formaterHeure(alerte.date)}</span>
          </div>

          {/* Niveau de gravité (étoiles visuelles) */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-slate-500 mr-1">Gravité</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`w-2 h-2 rounded-full ${
                  n <= alerte.niveauGravite ? 'bg-alert' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  )
}
