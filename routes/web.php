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

    // WhatsApp Team Inbox
    Route::get('/whatsapp/inbox', [\App\Http\Controllers\TeamInboxController::class, 'index'])->name('whatsapp.inbox');
    Route::get('/api/whatsapp/conversations', [\App\Http\Controllers\TeamInboxController::class, 'getConversations'])->name('api.whatsapp.conversations');
    Route::get('/api/whatsapp/messages/{contactId}', [\App\Http\Controllers\TeamInboxController::class, 'getMessages'])->name('api.whatsapp.messages');

    // WhatsApp Connect Route
    Route::get('/whatsapp/connect', [WhatsAppAuthController::class, 'showConnectPage'])->name('whatsapp.connect');
    Route::delete('/whatsapp/disconnect', [WhatsAppAuthController::class, 'disconnect'])->name('whatsapp.disconnect');

    // WhatsApp Template Management
    Route::get('/whatsapp/templates', [\App\Http\Controllers\WhatsAppTemplateController::class, 'index'])->name('whatsapp.templates.index');
    Route::get('/whatsapp/templates/create', [\App\Http\Controllers\WhatsAppTemplateController::class, 'create'])->name('whatsapp.templates.create');
    Route::post('/whatsapp/templates', [\App\Http\Controllers\WhatsAppTemplateController::class, 'store'])->name('whatsapp.templates.store');
    
    // WhatsApp Mockup Routes for App Review Screencast
    Route::post('/whatsapp/send-message', [\App\Http\Controllers\WhatsAppController::class, 'sendMessage'])->name('whatsapp.send-message');
    Route::get('/whatsapp/send', [\App\Http\Controllers\WhatsAppController::class, 'showSendMessagePage'])->name('whatsapp.send');

    Route::get('/whatsapp/logs', [\App\Http\Controllers\MessageLogController::class, 'index'])->name('whatsapp.logs');
    Route::get('/whatsapp/contacts/{contact}/timeline', [\App\Http\Controllers\MessageLogController::class, 'getTimeline'])->name('whatsapp.contacts.timeline');
    
    Route::name('whatsapp.contacts.')->prefix('whatsapp/contacts')->group(function () {
        Route::get('/', [\App\Http\Controllers\ContactController::class, 'index'])->name('index');
        Route::post('/', [\App\Http\Controllers\ContactController::class, 'store'])->name('store');
        Route::post('/import', [\App\Http\Controllers\ContactController::class, 'import'])->name('import');
        Route::patch('/{contact}', [\App\Http\Controllers\ContactController::class, 'update'])->name('update');
        Route::delete('/{contact}', [\App\Http\Controllers\ContactController::class, 'destroy'])->name('destroy');
    });

    Route::get('/whatsapp/automation', function () {
        $config = \App\Models\WhatsappConfig::where('org_id', request()->user()->org_id)->first();
        return Inertia::render('WhatsApp/Automation', ['isConnected' => $config ? true : false]);
    })->name('whatsapp.automation');

    // WhatsApp Campaigns
    Route::get('/whatsapp/campaigns', [\App\Http\Controllers\CampaignController::class, 'index'])->name('whatsapp.campaigns.index');
    Route::get('/whatsapp/campaigns/create', [\App\Http\Controllers\CampaignController::class, 'create'])->name('whatsapp.campaigns.create');
    Route::post('/whatsapp/campaigns', [\App\Http\Controllers\CampaignController::class, 'store'])->name('whatsapp.campaigns.store');
});

require __DIR__ . '/auth.php';
