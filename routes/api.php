<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// WhatsApp Webhook Verification (GET)
Route::get('/webhook', [WebhookController::class, 'verify']);

// WhatsApp Incoming Messages (POST)
Route::post('/webhook', [WebhookController::class, 'handle']);
