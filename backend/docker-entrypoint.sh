#!/bin/bash
set -e
# Crée le .env s'il n'existe pas (nécessaire à Symfony)
if [ ! -f ".env" ]; then
cat > .env <<'ENVEOF'
APP_ENV=dev
APP_SECRET=alertezone_secret_dev
DATABASE_URL="mysql://alerte:alerte@db:3306/alertezone?serverVersion=8.0"
ENVEOF
fi
# Installe les dépendances si besoin
if [ ! -d "vendor" ]; then composer install --no-interaction --prefer-dist; fi
# Crée le schéma puis charge les données de démo
php bin/console doctrine:database:create --if-not-exists || true
php bin/console doctrine:schema:update --force || true
php bin/console doctrine:fixtures:load --no-interaction || true
# Lance le serveur
php -S 0.0.0.0:8000 -t public
