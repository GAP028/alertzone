import { CheckCircle } from 'lucide-react'

/**
 * Petit message de confirmation temporaire (toast).
 */
export default function Toast({ message, visible }) {
  if (!visible || !message) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2
                 bg-dark text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-fade-in"
    >
      <CheckCircle className="w-5 h-5 text-success shrink-0" />
      {message}
    </div>
  )
}
