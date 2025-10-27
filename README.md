# My Task ( Laravel + Inertia + React Project )

This is a **Laravel + Inertia + React** application with a ready-to-use setup for development and production.

---

## Features

- Laravel backend API
- React frontend via Inertia.js
- Fully seeded database for testing
- Production-ready build process for assets
- Custom Artisan command for setup
- Simple Role
- Products
- To-Do List
- Real time Notifications

---

## Requirements

- PHP >= 8.2 
- Composer  
- Node.js & npm  

---

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-project.git
cd my-project
```

## Installation (Development)

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node dependencies:
```bash
npm install
```

4. Copy .env file and generate key for security:
```bash
cp .env.example .env
php artisan key:generate
```

5. migrate database:
```bash
php artisan migrate --force
```

## Installation (Production)
1- 
```bash
composer setup
```

2- cach routes and cnfigs for performance
```bash
php artisan route:cache
php artisan config:cache
```

------------------------------

## Run vite live sever (development):
```bash
npm run dev
```

## Build assets with vite for (production):
```bash
npm run build
```

## Run php server:
```bash
php artisan serve
```

## Run Reverb Server (websocket server):
-For real time notification
```bash
php artisan reverb:start
```

## Api Documentation:
```bash
http://127.0.0.1:8000/docs
```

## openapi:
```bash
http://127.0.0.1:8000/docs.openapi
```

## postman:
```bash
http://127.0.0.1:8000/docs.postman
```



