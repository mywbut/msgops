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

    // WhatsApp Connect Route
    Route::get('/whatsapp/connect', [WhatsAppAuthController::class, 'showConnectPage'])->name('whatsapp.connect');
    Route::delete('/whatsapp/disconnect', [WhatsAppAuthController::class, 'disconnect'])->name('whatsapp.disconnect');

    // WhatsApp Template Management
    Route::get('/whatsapp/templates', [\App\Http\Controllers\WhatsAppTemplateController::class, 'index'])->name('whatsapp.templates.index');
    Route::get('/whatsapp/templates/create', [\App\Http\Controllers\WhatsAppTemplateController::class, 'create'])->name('whatsapp.templates.create');
    Route::post('/whatsapp/templates', [\App\Http\Controllers\WhatsAppTemplateController::class, 'store'])->name('whatsapp.templates.store');
    
    // WhatsApp Mockup Routes for App Review Screencast
    Route::post('/whatsapp/send-message', [\App\Http\Controllers\WhatsAppController::class, 'sendMessage'])->name('whatsapp.send-message');
    Route::get('/whatsapp/send', function () {
        $config = \App\Models\WhatsappConfig::where('org_id', request()->user()->org_id)->first();
        return Inertia::render('WhatsApp/SendMessage', ['isConnected' => $config ? true : false]);
    })->name('whatsapp.send');

    Route::get('/whatsapp/logs', function () {
        $config = \App\Models\WhatsappConfig::where('org_id', request()->user()->org_id)->first();
        return Inertia::render('WhatsApp/MessageLogs', ['isConnected' => $config ? true : false]);
    })->name('whatsapp.logs');

    Route::get('/whatsapp/automation', function () {
        $config = \App\Models\WhatsappConfig::where('org_id', request()->user()->org_id)->first();
        return Inertia::render('WhatsApp/Automation', ['isConnected' => $config ? true : false]);
    })->name('whatsapp.automation');
});

require __DIR__ . '/auth.php';
