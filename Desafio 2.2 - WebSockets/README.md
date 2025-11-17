# Nebula Laravel + React Starter Kit

Nebula Starter Kit is a production-ready boilerplate that combines Laravel for the backend and React for the frontend. It provides a comprehensive foundation for building modern web applications with enterprise-grade authentication, role management, and API integration.

## Technology Stack

**Backend**  
Laravel 12, Inertia 2.0

**Frontend**  
React 19, Vite, Tailwind CSS 3.0, ShadCN

**Package Manager**  
Bun, Composer

**Database**  
MySQL / MariaDB / PostgreSQL (with Redis caching)

**Containerization**  
Docker, Docker Compose

**Key Dependencies**  
Spatie, Socialite (Google OAuth), Wayfinder, Radix, TanStack, Axios, i18next, react-hot-toast, Zod and more.

## Installation

### Prerequisites

- PHP 8.2 or higher (https://www.php.net/downloads.php)
- Composer (https://getcomposer.org/download/)
- Bun (https://bun.com/docs/installation)
- MySQL, MariaDB, or PostgreSQL instance

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/nebulasolutionsx/nebula-starter-kit.git
   cd nebula-starter-kit
   ```

2. Install dependencies:
   ```bash
   pnpm install # or npm install / bun install
   composer install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Initialize the database:
   ```bash
   php artisan migrate --seed
   ```

5. Start the development server:
   ```bash
   bun run dev:all
   ```

## Docker Deployment

### Build and Run

Build the Docker image and start containers:
```bash
docker-compose build
docker-compose up -d
```

For standard Docker environments (non-swarm), use the included deployment script for streamlined container rebuilds:
```bash
chmod +x redeploy.sh
./redeploy.sh -y
```

### Container Management

View application logs:
```bash
docker-compose logs -f laravel-app
```

Monitor Laravel application logs:
```bash
docker exec -it laravel-app tail -f storage/logs/laravel.log
```

Access container shell:
```bash
docker exec -it laravel-app bash
```

## Common Issues
#### `Error: "Redis PHP extension is not installed"`
Download `php_redis.dll` from https://pecl.php.net/package/redis/6.2.0/windows (x64 non-thread safe and match your php installation version) and add it to your PHP `ext` directory. 
Enable the extension in `php.ini`:
```ini
extension=redis
```
Then run `php artisan redis:check` to verify the connection. "Redis connection successful"

---

#### `Error: "cURL error 60: SSL certificate problem: unable to get local issuer certificate"`
Download `cacert.pem` from https://curl.haxx.se/ca/cacert.pem and save it to your PHP installation directory (e.g., `C:\php\cacert.pem`). 
Then, update your `php.ini` file to include the following line:
```ini
curl.cainfo = "C:\php\cacert.pem"
```