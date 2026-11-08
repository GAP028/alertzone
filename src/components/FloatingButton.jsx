import { AlertTriangle } from 'lucide-react'

/**
 * Bouton flottant rouge pour signaler une nouvelle alerte.
 */
export default function FloatingButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 right-6 z-40 flex items-center gap-2
                 bg-alert text-white px-5 py-3 rounded-full shadow-lg
                 hover:bg-red-700 transition-colors font-medium text-sm"
    >
      <AlertTriangle className="w-5 h-5" />
      Signaler une alerte
    </button>
  )
}
