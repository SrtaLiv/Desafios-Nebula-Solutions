# STAGE 1: build frontend assets
FROM oven/bun:1 AS frontend-builder

WORKDIR /app

# copy files and install dependencies
COPY package.json tsconfig.json vite.config.ts eslint.config.js ./
RUN bun install
COPY resources ./resources
COPY public ./public
RUN bun run build

# STAGE 2: setup backend
FROM php:8.3-apache

WORKDIR /var/www/html

# install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libwebp-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    libzip-dev \
    cron \
    supervisor \
    sudo \
    && docker-php-ext-install opcache pdo_mysql mbstring exif pcntl bcmath gd zip \
    && pecl install redis \
    && docker-php-ext-enable redis opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# configure apache
RUN a2enmod rewrite headers && \
    sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf
# RUN echo "LimitRequestBody 1073741824" >> /etc/apache2/apache2.conf

# create necessary directories before composer install
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views \
    && mkdir -p storage/app/private storage/app/public \
    && mkdir -p bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# copy application files
COPY --chown=www-data:www-data . .
COPY --from=frontend-builder /app/public/build ./public/build

# install php dependencies
RUN composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist


# configure supervisor for queue workers and scheduler
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# configure cron for Laravel scheduler
RUN echo "* * * * * www-data cd /var/www/html && /usr/local/bin/php artisan schedule:run >> /var/www/html/storage/logs/scheduler.log 2>&1" > /etc/cron.d/laravel-scheduler && \
    chmod 0644 /etc/cron.d/laravel-scheduler && \
    crontab /etc/cron.d/laravel-scheduler

# make startup script executable
RUN chmod +x docker/startup.sh

# expose port 80
EXPOSE 80

# health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# start application
CMD ["docker/startup.sh"]