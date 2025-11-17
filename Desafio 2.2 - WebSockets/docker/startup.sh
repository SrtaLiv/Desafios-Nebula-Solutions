#!/bin/bash

set -e # exit on error

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
PREFIX='[startup.sh] '

# start cron and supervisor services as root
service cron start
supervisord -c /etc/supervisor/supervisord.conf &

# clear caches
echo "${PREFIX}Optimizing Laravel..."
php artisan config:clear || echo "${PREFIX}Config clear failed"
php artisan cache:clear || echo "${PREFIX}Cache clear failed"
php artisan route:clear || echo "${PREFIX}Route clear failed"
php artisan view:clear || echo "${PREFIX}View clear failed"

# regenerate caches
php artisan config:cache || echo "${PREFIX}Config cache failed"
php artisan route:cache || echo "${PREFIX}Route cache failed"
php artisan view:cache || echo "${PREFIX}View cache failed"
# ziggy route generation removed - using direct URLs instead

# create storage link if it doesn't exist
echo "${PREFIX}Creating storage link..."
php artisan storage:link || echo "${PREFIX}Storage link already exists"

# run database migrations
php artisan migrate --force

# set permissions
echo "${PREFIX}Final permission setup..."
chown -R www-data:www-data public bootstrap/cache storage
chmod -R 775 public bootstrap/cache

# create and set permissions for psysh config directory
mkdir -p /var/www/.config/psysh
chown -R www-data:www-data /var/www/.config
chmod -R 775 /var/www/.config

# check if apache is configured correctly
echo "${PREFIX}Checking Apache configuration..."
apache2ctl configtest

# start apache server
echo "${PREFIX}Starting Apache server on port 80..."
apache2-foreground