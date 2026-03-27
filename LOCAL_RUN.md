# Local Development Setup Guide

Follow these steps to set up and run the MsgOps project locally on your machine.

## Prerequisites

- **PHP** (8.2 or higher)
- **Composer**
- **Node.js & npm**
- **SQLite** (or any other database of your choice)

## 1. Initial Setup

Clone the repository and enter the project directory:

```bash
cd /opt/homebrew/var/www/automation/msgops
```

### Install PHP Dependencies
```bash
composer install
```

### Install Javascript Dependencies
```bash
npm install
```

## 2. Environment Configuration

### Create .env File
Copy the example environment file:
```bash
cp .env.example .env
```

### Generate App Key
```bash
php artisan key:generate
```

### Database Setup
The project is configured to use SQLite by default. Create the database file:
```bash
touch database/database.sqlite
```

Then run the migrations and seed the database (if any):
```bash
php artisan migrate --seed
```

## 3. Running the Project

You need to run two separate processes: the Laravel development server and the Vite development server.

### Start Laravel Server
```bash
php artisan serve
```
This will typically start the server at `http://127.0.0.1:8000`.

### Start Vite Server (for React/CSS)
In a new terminal tab:
```bash
npm run dev
```

## 4. Quality Checks

Before committing any changes, it is highly recommended to run the following checks (as per project guidelines):

### Type Checking
```bash
brew typecheck
```

### Linting & Style
```bash
brew style --fix --changed
```

### Unit Tests
```bash
brew tests --changed
```

---
**Note:** If you are working in a sandboxed environment, ensure that you follow any specific cache or permission settings mentioned in the `AGENTS.md` or repository rules.
