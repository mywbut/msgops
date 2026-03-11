# Deploying Updates to the Live Server

This guide documents the steps required to push your local changes to the live production server (`206.189.138.130`).

## 1. Commit and Push Local Changes

Before deploying, ensure all your local code changes are committed to the `main` branch and pushed to your remote GitHub repository (`https://github.com/mywbut/msgops`).

```bash
# 1. View your changed files
git status

# 2. Stage all changed files
git add .

# 3. Commit your changes with a descriptive message
git commit -m "your commit message here"

# 4. Push the changes to GitHub
git push origin main
```

## 2. Connect to the Live Server

Log in to the live production server using SSH.

```bash
ssh root@206.189.138.130
```

## 3. Pull Changes and Rebuild the Application

Once connected to the live server, navigate to your application's root directory. 
Pull the latest code from GitHub, rebuild the React frontend assets, and clear Laravel's cache.

```bash
# 1. Go to the web application directory
cd /var/www/msgops

# 2. Pull the latest code from the 'main' branch
git pull origin main

# 3. (Optional) If you added new packages to package.json, run:
# npm install

# 4. (Optional) If you added new PHP packages to composer.json, run:
# composer install --no-dev --optimize-autoloader

# 5. Rebuild the frontend assets using Vite
npm run build

# 6. Clear Laravel configuration and view caches
php artisan optimize:clear

# 7. (Optional) If you created new database migrations, run:
# php artisan migrate --force
```

## 4. Verify the Deployment

1. Visit your live application in the browser (`https://msgops.in`).
2. Perform a **Hard Refresh** (`Ctrl+Shift+R` on Windows/Linux or `Cmd+Shift+R` on Mac) to ensure your browser loads the newly built JavaScript/CSS files.
3. Verify that your new features or bug fixes are working as expected.
