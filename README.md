# AlertZone — Maquette front-end

Application web de signalement et visualisation d'alertes citoyennes géolocalisées (maquette fonctionnelle, données fictives).

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- npm (fourni avec Node.js)

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez l'URL affichée dans le terminal (généralement `http://localhost:5173`).

## Autres commandes

```bash
# Construire la version de production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Stack technique

- React 18 + Vite
- Tailwind CSS
- Leaflet + react-leaflet (carte OpenStreetMap)
- lucide-react (icônes)

## Documentation détaillée

Consultez le fichier [EXPLICATIONS.md](./EXPLICATIONS.md) pour comprendre l'arborescence, le rôle de chaque fichier et le fonctionnement de chaque fonctionnalité.
