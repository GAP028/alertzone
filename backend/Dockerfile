# Image PHP 8.3 pour l'API Symfony d'AlerteZone
FROM php:8.3-cli

# Dépendances système + extensions PHP nécessaires à Doctrine/MySQL
RUN apt-get update && apt-get install -y git unzip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip \
    && rm -rf /var/lib/apt/lists/*

# Installe Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . /app

# Installe les dépendances PHP (Symfony, Doctrine, etc.)
RUN composer install --no-interaction --prefer-dist || true

EXPOSE 8000

# Au démarrage : attend la BDD, crée le schéma, charge les données, lance le serveur
COPY docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
