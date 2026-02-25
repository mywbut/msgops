<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WhatsAppAuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy.policy');

Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('terms');

Route::get('/data-deletion', function () {
    return Inertia::render('DataDeletion');
})->name('data.deletion');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // WhatsApp Connect Routes
    Route::get('/whatsapp/connect', [WhatsAppAuthController::class, 'showConnectPage'])->name('whatsapp.connect');
    Route::post('/whatsapp/exchange-token', [WhatsAppAuthController::class, 'exchangeToken'])->name('whatsapp.exchangeToken');
});

require __DIR__ . '/auth.php';
