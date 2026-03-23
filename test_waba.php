<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$config = App\Models\WhatsappConfig::orderBy('created_at', 'desc')->first();
$wabaResponse = Illuminate\Support\Facades\Http::withToken($config->access_token)->get('https://graph.facebook.com/v18.0/'.$config->waba_id.'?fields=name');
echo "Status: " . $wabaResponse->status() . "\n";
print_r($wabaResponse->json());
