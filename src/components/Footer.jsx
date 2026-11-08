/**
 * Pied de page simple avec liens factices.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-3 text-center text-sm text-slate-500">
      <p>
        <span className="hover:text-primary cursor-pointer">Mentions légales</span>
        {' · '}
        <span className="hover:text-primary cursor-pointer">RGPD</span>
        {' · '}
        <span className="hover:text-primary cursor-pointer">À propos</span>
      </p>
    </footer>
  )
}
