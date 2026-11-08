# Prompt à coller à Claude (documentation + brief oral AlertZone)

Copie tout le bloc ci-dessous et envoie-le à Claude. Il gère la documentation ; ce prompt décrit **uniquement ce qui est réellement dans le code**, rien de plus.

---

Tu es chargé de la **documentation** et du **brief oral** pour le projet **AlertZone**.

Contexte : c’est un **projet file rouge** (école). L’étudiant présente une **maquette front-end** d’un système d’alerte citoyen géolocalisé. Tu dois produire une doc claire, honnête, défendable à l’oral. **Ne rien inventer** : pas de back-end, pas d’auth réelle, pas de vraie géoloc utilisateur, pas de persistance.

## Mission

Rédige / mets à jour la documentation pour que l’étudiant puisse expliquer :
1. ce que l’app **fait concrètement** quand on la lance ;
2. **ce qui est implémenté dans le code** (composants, state, fonctions) ;
3. ce qui est **mock / maquette** vs ce qui serait une vraie appli plus tard ;
4. comment **démontrer** chaque fonctionnalité en 2 minutes.

Langue : **français**, ton simple, phrases courtes, vocabulaire d’étudiant (pas de jargon inutile).

---

## Vérité produit (à respecter absolument)

- Front-end **uniquement**. React 18 + Vite (JavaScript, pas TypeScript) + Tailwind CSS + Leaflet / react-leaflet (tuiles OpenStreetMap, **sans clé API**) + lucide-react.
- **Aucune API**, aucune base de données, aucun Symfony branché pour l’instant.
- Données **100 % fictives** dans `src/data/alertes.js` (8 alertes d’exemple autour de Paris).
- Tout vit dans le **state React** (`useState`). **Pas de localStorage**. Un **F5 = reset** : on revient aux 8 alertes initiales, les compteurs et les signalements disparaissent.
- C’est une **maquette fonctionnelle**, pas un produit fini.

Évolution prévue (à mentionner à l’oral, pas encore faite) : remplacer `alertes.js` + `setAlertes` par `fetch('/api/alertes')` vers une API Symfony. Front et back restent séparés.

---

## Lancement

```bash
npm install
npm run dev
```

URL : `http://localhost:5173/`

Au démarrage, l’utilisateur voit :
- un **header bleu fixe** : logo bouclier + « AlertZone », barre de recherche, badge rouge « X alertes actives », avatar factice (icône User, **pas de connexion**) ;
- à **gauche** : filtres par type + liste des 8 alertes ;
- à **droite** : **carte Leaflet centrée sur Paris** (zoom 13, coords `[48.8566, 2.3522]`), un marqueur coloré + un cercle de rayon par alerte ;
- un **bouton flottant rouge** « Signaler une alerte » en bas à droite ;
- un **footer** : « Mentions légales · RGPD · À propos » (**liens visuels seulement**, aucun écran derrière).

Les 8 alertes mock (titres) :
1. Agression rue de Rivoli (`agression`)
2. Vol à la tire Gare du Nord (`vol`)
3. Fortes pluies — 15e (`meteo`)
4. Personne disparue — Buttes-Chaumont (`disparition`)
5. Avis de recherche — véhicule suspect (`avis_recherche`)
6. Agression métro Ligne 13 (`agression`)
7. Vol de vélo — Canal Saint-Martin (`vol`)
8. Vent violent — Tour Eiffel (`meteo`)

Champs d’une alerte : `id`, `type`, `titre`, `description`, `latitude`, `longitude`, `niveauGravite` (1–5), `date`, `nombreConfirmations`, `nombreFausseAlertes`, `rayon` (mètres, pour le cercle Leaflet).

Types et couleurs (`src/constants/alertTypes.js`) :
- agression → `#DC2626`
- vol → `#EA580C`
- meteo → `#F59E0B`
- disparition → `#7C3AED`
- avis_recherche → `#991B1B`

Charte : header/boutons `#1E3A8A`, fond `#F8FAFC`, texte `#1E293B`, police **Inter** (Google Fonts dans `index.html`). Vert confirmé `#16A34A`.

---

## Ce que l’utilisateur PEUT faire (et comment c’est codé)

Tout le state est dans **`src/App.jsx`**. Les enfants reçoivent des props et rappellent des handlers.

### 1. Filtrer par type
- UI : `AlertFilters.jsx` (cases colorées dans `Sidebar.jsx`).
- State : `typesActifs` = `{ agression: true, vol: true, meteo: true, disparition: true, avis_recherche: true }` au départ.
- Handler : `handleToggleType` inverse un booléen.
- Calcul : `alertesFiltrees = useMemo(() => filtrerAlertes(alertes, typesActifs, recherche), …)` dans `helpers.js`.
- Effet : **liste ET marqueurs** reçoivent la même liste filtrée → ils restent synchronisés.

### 2. Rechercher (bonus, dans le header)
- State : `recherche`.
- `filtrerAlertes` cherche dans titre, description, libellé du type (insensible à la casse).
- Combiné avec les filtres type.

### 3. Compteur header
- `nombreAlertesActives = alertesFiltrees.length` (alertes **visibles**, pas le total brut).
- Affiché dans `Header.jsx` (pluriel géré).

### 4. Ouvrir le détail
- Clic liste (`AlertList.jsx`) **ou** clic marqueur / « Voir le détail » dans le popup Leaflet (`AlertMarker.jsx`) → `handleSelectAlerte` → `alerteSelectionnee`.
- `DetailModal.jsx` s’affiche si `alerte !== null`. Overlay + croix ferment (`handleFermerDetail`).
- Affiche : type (pastille), titre, description, gravité (5 points), date formatée, compteurs confirmations / fausses alertes, boutons Confirmer / Fausse alerte.

### 5. Signaler une alerte
- `FloatingButton.jsx` → `modaleSignalerOuverte = true` → `SignalerModal.jsx`.
- Formulaire local : type (select), titre (obligatoire), description, gravité (range 1–5).
- `handleSignaler` : crée un objet, `id` = `prochainId`, position **aléatoire** près de Paris (`genererPositionAleatoire` : ± ~0.02°), date = maintenant, compteurs à 0, `rayon: 250`. **Pas de clic sur la carte pour choisir le point** (choix maquette).
- `setAlertes([nouvelleAlerte, ...prev])` → apparaît tout de suite en tête de liste + sur la carte.
- Toast `Toast.jsx` : « Alerte signalée avec succès ! » pendant **3 secondes** (`useEffect` + `setTimeout`).

### 6. Confirmer / Fausse alerte
- `handleConfirmer` / `handleFausseAlerte` : +1 sur `nombreConfirmations` ou `nombreFausseAlertes` dans `alertes` **et** dans `alerteSelectionnee` (sinon la modale n’afficherait pas le nouveau chiffre).
- Mémoire session uniquement.

### Carte
- `MapView.jsx` : `MapContainer` + `TileLayer` OSM.
- `AlertMarker.jsx` : `L.divIcon` (pastille HTML colorée) + `Circle` (rayon d’impact, opacité 0.15).

### Footer / avatar
- Cosmétiques. Pas de pages Mentions / RGPD / À propos. Pas de profil.

---

## Fichiers (rôle)

| Fichier | Rôle |
|---------|------|
| `src/main.jsx` | Monte `<App />` dans `#root` |
| `src/App.jsx` | State global + handlers |
| `src/data/alertes.js` | 8 mocks |
| `src/constants/alertTypes.js` | Labels + couleurs |
| `src/utils/helpers.js` | Dates, couleurs, filtre, position random |
| `Header.jsx` | Barre du haut |
| `Footer.jsx` | Pied |
| `Sidebar.jsx` | Colonne gauche |
| `AlertFilters.jsx` | Checkboxes types |
| `AlertList.jsx` | Cartes cliquables |
| `MapView.jsx` | Carte |
| `AlertMarker.jsx` | Marqueur + cercle |
| `FloatingButton.jsx` | CTA signaler |
| `DetailModal.jsx` | Détail + votes |
| `SignalerModal.jsx` | Formulaire |
| `Toast.jsx` | Message 3 s |
| `index.css` | Tailwind + hauteur Leaflet |
| `tailwind.config.js` | Couleurs charte + Inter |

Code commenté en français.

---

## Ce que tu dois produire

1. Un **script oral 3–5 min** (ce que je dis, ce que je clique).
2. Une **FAQ jury** : « C’est de vraies données ? » « Où c’est stocké ? » « Pourquoi pas Symfony maintenant ? » « Comment on brancherait l’API ? » « Pourquoi Leaflet / OSM ? »
3. Un **parcours démo** chronologique (filtre → clic → confirmer → signaler → F5 = reset).
4. Si tu mets à jour `EXPLICATIONS.md` / un brief : rester **aligné sur ce prompt**. Interdit d’ajouter login, GPS réel, notifications, BDD, localStorage, pages légales, choix de position sur la carte.

Commence par un résumé en 10 lignes « ce que fait l’app aujourd’hui », puis le script oral.
