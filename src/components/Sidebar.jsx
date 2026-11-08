import AlertFilters from './AlertFilters'
import AlertList from './AlertList'

/**
 * Panneau latéral gauche : filtres + liste des alertes.
 */
export default function Sidebar({ alertes, typesActifs, onToggleType, onSelectAlerte }) {
  return (
    <aside className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col bg-white border-r border-slate-200 overflow-hidden">
      {/* Zone des filtres */}
      <div className="p-4 border-b border-slate-100">
        <AlertFilters typesActifs={typesActifs} onToggleType={onToggleType} />
      </div>

      {/* Liste scrollable des alertes */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">
          Alertes ({alertes.length})
        </h2>
        <AlertList alertes={alertes} onSelectAlerte={onSelectAlerte} />
      </div>
    </aside>
  )
}
