# EXPLICATIONS — Maquette AlertZone

Ce document décrit l'architecture du projet, le rôle de chaque fichier, la construction du visuel et le fonctionnement de chaque fonctionnalité. Il est conçu pour vous permettre de défendre ce travail à l'oral.

---

## 1. Arborescence du projet

```
Projet_file_rouge_systeme_alerte_zone/
├── index.html                 # Page HTML de base (point d'ancrage React)
├── package.json               # Dépendances et scripts npm
├── vite.config.js             # Configuration du bundler Vite
├── tailwind.config.js         # Charte graphique (couleurs, police Inter)
├── postcss.config.js          # Traitement CSS pour Tailwind
├── README.md                  # Instructions de lancement
├── EXPLICATIONS.md            # Ce fichier
├── public/
│   └── shield.svg             # Favicon (icône bouclier)
└── src/
    ├── main.jsx               # Point d'entrée JavaScript
    ├── App.jsx                # Composant racine + state global
    ├── index.css              # Styles globaux + Tailwind
    ├── data/
    │   └── alertes.js         # Données fictives (8 alertes mock)
    ├── constants/
    │   └── alertTypes.js      # Libellés et couleurs par type
    ├── utils/
    │   └── helpers.js         # Fonctions utilitaires (dates, filtres…)
    └── components/
        ├── Header.jsx         # En-tête fixe
        ├── Footer.jsx         # Pied de page
        ├── Sidebar.jsx        # Panneau latéral (filtres + liste)
        ├── AlertFilters.jsx   # Cases à cocher par type
        ├── AlertList.jsx      # Liste des cartes d'alerte
        ├── MapView.jsx        # Carte Leaflet
        ├── AlertMarker.jsx    # Marqueur + cercle d'impact
        ├── FloatingButton.jsx # Bouton « Signaler une alerte »
        ├── DetailModal.jsx    # Modale détail d'une alerte
        ├── SignalerModal.jsx  # Modale formulaire de signalement
        └── Toast.jsx          # Message de confirmation
```

---

## 2. Rôle de chaque fichier

| Fichier | Rôle |
|---------|------|
| `index.html` | Charge la police Inter (Google Fonts) et le script `main.jsx`. Contient la `<div id="root">` où React s'affiche. |
| `package.json` | Liste les bibliothèques : React, Vite, Tailwind, Leaflet, lucide-react. |
| `tailwind.config.js` | Définit les couleurs de la charte (`primary`, `alert`, `amber`…) et la police Inter. |
| `src/main.jsx` | Monte le composant `<App />` dans le DOM avec `ReactDOM.createRoot`. |
| `src/App.jsx` | **Cœur de l'application** : stocke toutes les données en mémoire (state React) et relie les composants entre eux. |
| `src/data/alertes.js` | 8 alertes d'exemple autour de Paris (tous les types représentés). |
| `src/constants/alertTypes.js` | Associe chaque type à un libellé français et une couleur (marqueurs, pastilles). |
| `src/utils/helpers.js` | Fonctions réutilisables : formatage des dates, filtrage, position aléatoire. |

---

## 3. Construction du visuel (écran par écran)

### 3.1 Layout général

**Header fixe** — composant `Header.jsx`
- Fond bleu `#1E3A8A` via la classe Tailwind `bg-primary`.
- Logo : icône `Shield` (lucide-react) + texte « AlertZone ».
- Barre de recherche : `<input>` avec icône `Search`, reliée au state `recherche` dans `App.jsx`.
- Badge rouge : affiche le nombre d'alertes actives (`nombreAlertesActives`).
- Avatar factice : cercle avec icône `User`.

**Footer** — composant `Footer.jsx`
- Bande blanche en bas avec les liens « Mentions légales · RGPD · À propos » (non cliquables fonctionnellement, maquette).

**Structure** — dans `App.jsx` :
```jsx
<Header /> → <main> (Sidebar + MapView) </main> → <Footer />
```
Le `main` a un `pt-14` (padding-top) pour ne pas passer sous le header fixe.

---

### 3.2 Panneau latéral gauche

**Sidebar** — composant `Sidebar.jsx`
- Largeur fixe (`md:w-80`) sur desktop, pleine largeur sur mobile.
- Contient deux zones : filtres en haut, liste scrollable en dessous.

**Filtres** — composant `AlertFilters.jsx`
- Une case à cocher par type d'alerte (5 types).
- Chaque case affiche une pastille colorée selon `ALERT_TYPES` dans `alertTypes.js`.
- Le clic appelle `onToggleType(type)` remonté jusqu'à `App.jsx`.

**Liste des alertes** — composant `AlertList.jsx`
- Chaque alerte est un `<button>` cliquable affichant :
  - le **titre** ;
  - une **pastille colorée** + le nom du type ;
  - l'**heure** (formatée par `formaterHeure`) ;
  - le **niveau de gravité** (5 petits cercles, les premiers en rouge).

---

### 3.3 Carte Leaflet (panneau droit)

**MapView** — composant `MapView.jsx`
- Utilise `MapContainer` et `TileLayer` de react-leaflet.
- Tuiles OpenStreetMap : `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` (gratuit, sans clé API).
- Centrée sur Paris : `[48.8566, 2.3522]`, zoom 13.
- Pour chaque alerte filtrée, affiche un composant `AlertMarker`.

**AlertMarker** — composant `AlertMarker.jsx`
- **Marqueur** : icône personnalisée (`L.divIcon`) = cercle coloré selon le type.
- **Cercle d'impact** : composant `Circle` de react-leaflet avec un rayon en mètres (`alerte.rayon`).
- Clic sur le marqueur → ouvre la modale de détail via `onSelectAlerte`.

---

### 3.4 Bouton flottant

**FloatingButton** — composant `FloatingButton.jsx`
- Position `fixed bottom-20 right-6`, fond rouge `bg-alert`.
- Icône `AlertTriangle` + texte « Signaler une alerte ».
- Clic → ouvre `SignalerModal`.

---

### 3.5 Modale « Détail d'une alerte »

**DetailModal** — composant `DetailModal.jsx`
- Overlay sombre semi-transparent (`bg-black/50`).
- Carte blanche centrée avec :
  - pastille de type colorée ;
  - titre, description, gravité (cercles), date ;
  - compteurs « X confirmations » et « Y fausses alertes » ;
  - boutons verts « Confirmer » et ambre « Fausse alerte ».
- Fermeture : clic sur la croix ou sur l'overlay.

---

### 3.6 Modale « Signaler une alerte »

**SignalerModal** — composant `SignalerModal.jsx`
- Formulaire local (`useState`) avec :
  - menu déroulant du type ;
  - champ titre (obligatoire) ;
  - champ description ;
  - curseur de gravité 1 à 5.
- Soumission → appelle `onSubmit(formulaire)` puis ferme la modale.

---

### 3.7 Toast de confirmation

**Toast** — composant `Toast.jsx`
- Bandeau sombre en bas de l'écran avec icône verte et message.
- S'affiche 3 secondes puis disparaît (géré par `useEffect` dans `App.jsx`).

---

## 4. Fonctionnalités — comment ça marche

### Fonctionnalité 1 : Filtrer les alertes par type

**Où ?** `AlertFilters.jsx` → `App.jsx` → `filtrerAlertes()` dans `helpers.js`

**Mécanisme :**
1. Au démarrage, `typesActifs` est un objet `{ agression: true, vol: true, … }` (tous à `true`).
2. Quand on clique une case, `handleToggleType(type)` inverse la valeur (`true` ↔ `false`).
3. `alertesFiltrees` est recalculé avec `useMemo` : seules les alertes dont le type est `true` sont gardées.
4. `Sidebar` et `MapView` reçoivent `alertesFiltrees` : la liste ET les marqueurs se mettent à jour ensemble.

**À l'oral :** « Le filtre modifie un objet React en mémoire. La liste et la carte lisent la même liste filtrée, donc elles restent synchronisées. »

---

### Fonctionnalité 2 : Cliquer sur une alerte → modale de détail

**Où ?** `AlertList.jsx`, `AlertMarker.jsx` → `handleSelectAlerte` dans `App.jsx` → `DetailModal.jsx`

**Mécanisme :**
1. Clic sur une carte de la liste OU sur un marqueur de la carte.
2. `setAlerteSelectionnee(alerte)` stocke l'alerte cliquée.
3. `DetailModal` reçoit `alerte={alerteSelectionnee}` : si non null, la modale s'affiche.
4. Fermer → `setAlerteSelectionnee(null)`.

---

### Fonctionnalité 3 : Signaler une alerte

**Où ?** `FloatingButton` → `SignalerModal` → `handleSignaler` dans `App.jsx`

**Mécanisme :**
1. L'utilisateur remplit le formulaire et valide.
2. `handleSignaler` crée un objet alerte :
   - `id` auto-incrémenté (`prochainId`) ;
   - position aléatoire via `genererPositionAleatoire()` (proche du centre de Paris) ;
   - `date` = maintenant (`new Date().toISOString()`) ;
   - compteurs à 0.
3. `setAlertes([nouvelleAlerte, ...prev])` ajoute l'alerte en tête de liste.
4. React re-rend : la nouvelle alerte apparaît dans la liste et sur la carte.
5. Toast « Alerte signalée avec succès ! » pendant 3 secondes.

**À l'oral :** « Pas de serveur : tout est ajouté dans le state React. Plus tard, on remplacera `setAlertes` par un `fetch POST /api/alertes`. »

---

### Fonctionnalité 4 : Confirmer / Fausse alerte

**Où ?** `DetailModal.jsx` → `handleConfirmer` / `handleFausseAlerte` dans `App.jsx`

**Mécanisme :**
1. Clic sur « Confirmer » → `nombreConfirmations` de l'alerte +1.
2. Clic sur « Fausse alerte » → `nombreFausseAlertes` +1.
3. `setAlertes` met à jour la liste globale.
4. `setAlerteSelectionnee` met aussi à jour l'alerte affichée dans la modale (sinon les compteurs ne bougeraient pas à l'écran).

**À l'oral :** « Ce sont des compteurs en mémoire qui simulent la validation communautaire. En production, ce serait persisté en base de données. »

---

### Fonctionnalité 5 : Compteur d'alertes actives dans le header

**Où ?** `App.jsx` → prop `nombreAlertesActives` → `Header.jsx`

**Mécanisme :**
- `nombreAlertesActives = alertesFiltrees.length`
- Le badge rouge affiche ce nombre et s'adapte au pluriel.
- Si on filtre par type ou recherche, le compteur reflète les alertes **visibles**, pas le total brut.

---

### Bonus : Recherche textuelle (header)

**Où ?** `Header.jsx` → state `recherche` → `filtrerAlertes()` dans `helpers.js`

- Filtre sur le titre, la description ou le libellé du type.
- Combiné avec les filtres par type dans le même `useMemo`.

---

## 5. Charte graphique appliquée

| Élément | Couleur | Où |
|---------|---------|-----|
| Header, boutons primaires | `#1E3A8A` | `bg-primary` |
| Bouton signaler, gravité | `#DC2626` | `bg-alert` |
| Météo | `#F59E0B` | `alertTypes.js` |
| Confirmer | `#16A34A` | `bg-success` |
| Disparition | `#7C3AED` | `alertTypes.js` |
| Fond page | `#F8FAFC` | `bg-background` |
| Texte | `#1E293B` | `text-dark` |
| Police | Inter | Google Fonts dans `index.html` |

---

## 6. Évolution future (API Symfony)

Aujourd'hui, les données viennent de `src/data/alertes.js` et vivent dans le state React.

Pour brancher une API Symfony :
1. Remplacer `useState(alertesInitiales)` par un `useEffect` avec `fetch('/api/alertes')`.
2. Dans `handleSignaler`, envoyer un `POST` au lieu de `setAlertes` local.
3. Dans `handleConfirmer` / `handleFausseAlerte`, envoyer un `PATCH` ou `POST`.

Le front React reste séparé du back Symfony — architecture cohérente avec le cahier des charges.

---

## 7. Commandes utiles pour la démo

```bash
npm install    # une seule fois
npm run dev    # lance l'application en local
```

Ouvrir `http://localhost:5173` et tester :
1. Décocher « Météo » → les alertes météo disparaissent de la liste et de la carte.
2. Cliquer une alerte → modale de détail.
3. « Signaler une alerte » → remplir le formulaire → nouvelle alerte visible.
4. « Confirmer » → le compteur augmente dans la modale.
