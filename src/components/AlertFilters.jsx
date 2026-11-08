import { ALERT_TYPES, TYPE_KEYS } from '../constants/alertTypes'

/**
 * Cases à cocher colorées pour filtrer les alertes par type.
 */
export default function AlertFilters({ typesActifs, onToggleType }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
        Filtrer par type
      </h2>
      <div className="space-y-2">
        {TYPE_KEYS.map((type) => {
          const config = ALERT_TYPES[type]
          const estCoche = typesActifs[type]

          return (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={estCoche}
                onChange={() => onToggleType(type)}
                className="sr-only"
              />
              {/* Pastille colorée qui simule la case à cocher */}
              <span
                className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-opacity"
                style={{
                  borderColor: config.color,
                  backgroundColor: estCoche ? config.color : 'transparent',
                }}
              >
                {estCoche && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10.28 2.28a1 1 0 00-1.42 0L4.5 6.64 3.14 5.28a1 1 0 00-1.42 1.42l2 2a1 1 0 001.42 0l5-5a1 1 0 000-1.42z" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-dark group-hover:text-primary">{config.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
