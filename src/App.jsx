import { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import MapView from './components/MapView'
import FloatingButton from './components/FloatingButton'
import DetailModal from './components/DetailModal'
import SignalerModal from './components/SignalerModal'
import Toast from './components/Toast'
import { alertesInitiales } from './data/alertes'
import { TYPE_KEYS } from './constants/alertTypes'
import { filtrerAlertes, genererPositionAleatoire } from './utils/helpers'
import * as api from './services/api'

/**
 * Composant racine : gère tout le state de l'application.
 *
 * Fonctionnement :
 *  - Au démarrage, on tente de charger les alertes depuis l'API Symfony.
 *  - Si l'API répond -> données réelles et persistantes (mode connecté).
 *  - Si l'API est éteinte -> on retombe sur les données locales (mode maquette).
 * Le même principe s'applique au signalement et aux votes.
 */
export default function App() {
  // Liste des alertes en mémoire
  const [alertes, setAlertes] = useState(alertesInitiales)

  // Indique si on est branché sur l'API (true) ou en repli local (false)
  const [connecte, setConnecte] = useState(false)

  // Filtres par type : tous activés au départ
  const [typesActifs, setTypesActifs] = useState(() =>
    Object.fromEntries(TYPE_KEYS.map((type) => [type, true]))
  )

  const [recherche, setRecherche] = useState('')
  const [alerteSelectionnee, setAlerteSelectionnee] = useState(null)
  const [modaleSignalerOuverte, setModaleSignalerOuverte] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })
  const [prochainId, setProchainId] = useState(
    Math.max(...alertesInitiales.map((a) => a.id)) + 1
  )

  // Chargement initial : on essaie l'API, sinon repli sur les données locales
  useEffect(() => {
    api
      .chargerAlertes()
      .then((data) => {
        setAlertes(data)
        setConnecte(true)
      })
      .catch(() => {
        // API indisponible : on garde les données locales (mode maquette)
        setConnecte(false)
      })
  }, [])

  const alertesFiltrees = useMemo(
    () => filtrerAlertes(alertes, typesActifs, recherche),
    [alertes, typesActifs, recherche]
  )
  const nombreAlertesActives = alertesFiltrees.length

  useEffect(() => {
    if (!toast.visible) return
    const timer = setTimeout(() => setToast({ message: '', visible: false }), 3000)
    return () => clearTimeout(timer)
  }, [toast.visible])

  function handleToggleType(type) {
    setTypesActifs((prev) => ({ ...prev, [type]: !prev[type] }))
  }
  function handleSelectAlerte(alerte) {
    setAlerteSelectionnee(alerte)
  }
  function handleFermerDetail() {
    setAlerteSelectionnee(null)
  }

  // Confirmer : appelle l'API si connecté, sinon met à jour en local
  async function handleConfirmer(id) {
    if (connecte) {
      try {
        const maj = await api.confirmerAlerte(id)
        setAlertes((prev) => prev.map((a) => (a.id === id ? maj : a)))
        setAlerteSelectionnee((prev) => (prev && prev.id === id ? maj : prev))
        return
      } catch (e) {
        /* repli local ci-dessous */
      }
    }
    setAlertes((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, nombreConfirmations: a.nombreConfirmations + 1 } : a
      )
    )
    setAlerteSelectionnee((prev) =>
      prev && prev.id === id
        ? { ...prev, nombreConfirmations: prev.nombreConfirmations + 1 }
        : prev
    )
  }

  // Fausse alerte : idem
  async function handleFausseAlerte(id) {
    if (connecte) {
      try {
        const maj = await api.signalerFausse(id)
        setAlertes((prev) => prev.map((a) => (a.id === id ? maj : a)))
        setAlerteSelectionnee((prev) => (prev && prev.id === id ? maj : prev))
        return
      } catch (e) {
        /* repli local ci-dessous */
      }
    }
    setAlertes((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, nombreFausseAlertes: a.nombreFausseAlertes + 1 } : a
      )
    )
    setAlerteSelectionnee((prev) =>
      prev && prev.id === id
        ? { ...prev, nombreFausseAlertes: prev.nombreFausseAlertes + 1 }
        : prev
    )
  }

  // Signaler : envoie à l'API si connecté, sinon ajoute en local
  async function handleSignaler(donnees) {
    const position = genererPositionAleatoire()
    if (connecte) {
      try {
        const creee = await api.creerAlerte({
          type: donnees.type,
          titre: donnees.titre,
          description: donnees.description,
          niveauGravite: donnees.niveauGravite,
          latitude: position.latitude,
          longitude: position.longitude,
          rayon: 250,
        })
        setAlertes((prev) => [creee, ...prev])
        setToast({ message: 'Alerte enregistrée en base !', visible: true })
        return
      } catch (e) {
        /* repli local ci-dessous */
      }
    }
    const nouvelleAlerte = {
      id: prochainId,
      type: donnees.type,
      titre: donnees.titre,
      description: donnees.description || 'Signalement citoyen.',
      latitude: position.latitude,
      longitude: position.longitude,
      niveauGravite: donnees.niveauGravite,
      date: new Date().toISOString(),
      nombreConfirmations: 0,
      nombreFausseAlertes: 0,
      rayon: 250,
    }
    setAlertes((prev) => [nouvelleAlerte, ...prev])
    setProchainId((id) => id + 1)
    setToast({ message: 'Alerte signalée avec succès !', visible: true })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        nombreAlertesActives={nombreAlertesActives}
        recherche={recherche}
        onRechercheChange={setRecherche}
      />

      <main className="flex-1 flex flex-col md:flex-row pt-14 min-h-0">
        <Sidebar
          alertes={alertesFiltrees}
          typesActifs={typesActifs}
          onToggleType={handleToggleType}
          onSelectAlerte={handleSelectAlerte}
        />
        <MapView alertes={alertesFiltrees} onSelectAlerte={handleSelectAlerte} />
      </main>

      <Footer />

      <FloatingButton onClick={() => setModaleSignalerOuverte(true)} />

      <DetailModal
        alerte={alerteSelectionnee}
        onClose={handleFermerDetail}
        onConfirmer={handleConfirmer}
        onFausseAlerte={handleFausseAlerte}
      />

      {modaleSignalerOuverte && (
        <SignalerModal
          onClose={() => setModaleSignalerOuverte(false)}
          onSubmit={handleSignaler}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
