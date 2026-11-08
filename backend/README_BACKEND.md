# AlerteZone — Back-end API (Symfony) + MySQL

API REST qui alimente le front React. Base de données MySQL. Tout tourne
avec Docker : pas besoin d'installer PHP ni MySQL sur ta machine.

## Prérequis
- **Docker Desktop** installé et démarré.

## Lancer le back-end
Depuis le dossier du projet (celui qui contient `docker-compose.yml`) :

```bash
docker compose up --build
```

Au premier lancement, Docker :
1. démarre MySQL,
2. installe Symfony et ses dépendances,
3. crée les tables (à partir des entités = ton MPD),
4. charge les 8 alertes + 5 types de démonstration,
5. démarre l'API sur http://localhost:8000

Pour vérifier que l'API répond, ouvre dans le navigateur :
http://localhost:8000/api/alertes  → tu dois voir les alertes en JSON.

## Endpoints
- `GET    /api/alertes`               → liste des alertes
- `POST   /api/alertes`               → créer une alerte (signalement)
- `PATCH  /api/alertes/{id}/confirmer`→ +1 confirmation
- `PATCH  /api/alertes/{id}/fausse`   → +1 fausse alerte
- `GET    /api/types-alerte`          → liste des types

## Lancer le front (dans un autre terminal)
```bash
npm install
npm run dev
```
Le front détecte l'API automatiquement :
- API allumée  → données réelles et **persistantes** (un F5 ne remet plus à zéro).
- API éteinte  → repli sur les données locales (mode maquette). L'appli ne casse jamais.

## Arrêter
Ctrl + C dans le terminal Docker, puis `docker compose down`.

## Note honnête
Ce back-end a été écrit mais n'a pas pu être exécuté au moment de sa génération
(machine sans PHP/Docker). Le premier `docker compose up` est donc le vrai test :
si une erreur apparaît, elle sera affichée dans le terminal et facile à corriger.
