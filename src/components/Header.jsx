import { Shield, Search, User } from 'lucide-react'

/**
 * En-tête fixe : logo, barre de recherche, compteur d'alertes, avatar factice.
 */
export default function Header({ nombreAlertesActives, recherche, onRechercheChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3 max-w-[100vw]">
        {/* Logo AlertZone avec icône bouclier */}
        <div className="flex items-center gap-2 shrink-0">
          <Shield className="w-7 h-7" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight">AlertZone</span>
        </div>

        {/* Barre de recherche (filtre les alertes par texte) */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="search"
            placeholder="Rechercher une alerte..."
            value={recherche}
            onChange={(e) => onRechercheChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/15 border border-white/20
                       placeholder:text-white/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
          />
        </div>

        {/* Compteur d'alertes actives */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm bg-alert px-3 py-1 rounded-full font-medium whitespace-nowrap">
            {nombreAlertesActives} alerte{nombreAlertesActives > 1 ? 's' : ''} active{nombreAlertesActives > 1 ? 's' : ''}
          </span>

          {/* Avatar de profil factice */}
          <div
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/30"
            title="Profil utilisateur (maquette)"
          >
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
