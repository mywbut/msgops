<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WhatsAppAuthController extends Controller
{
    /**
     * Display the WhatsApp Connection Dashboard.
     */
    public function showConnectPage(Request $request)
    {
        // Get the current user's organization.
        $user = $request->user();
        if (!$user->org_id) {
            // First time login? Auto-create their org!
            $org = Organization::create([
                'name' => $user->name . "'s Business",
                'plan_tier' => 'free',
            ]);
            $user->org_id = $org->id;
            $user->save();
        }

        // Check if they are already connected
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        return Inertia::render('WhatsApp/Connect', [
            'metaAppId' => env('META_APP_ID', 'YOUR_META_APP_ID_HERE'),
            'metaConfigId' => env('META_CONFIG_ID', 'YOUR_META_CONFIG_ID_HERE'),
            'isConnected' => $config ? true : false,
            'phoneNumberId' => $config ? $config->phone_number_id : null,
        ]);
    }

    /**
     * Handle the OAuth code payload from the React frontend.
     */
    public function exchangeToken(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = $request->user();
        $code = $request->input('code');

        try {
            // 1. Exchange the code for an Access Token
            $response = Http::get('https://graph.facebook.com/v18.0/oauth/access_token', [
                'client_id' => env('META_APP_ID'),
                'client_secret' => env('META_APP_SECRET'),
                'code' => $code,
            ]);

            if ($response->failed()) {
                Log::error('Meta OAuth Exchange Failed: ' . $response->body());
                return response()->json(['success' => false, 'error' => 'Failed to exchange token with Meta.']);
            }

            $tokenData = $response->json();
            $accessToken = $tokenData['access_token'];

            // 2. We now have the token! Fetch the Phone Number IDs attached to this token.
            // Using the token, we hit the /me/accounts endpoint to find their WABA
            $accountsResponse = Http::withToken($accessToken)->get('https://graph.facebook.com/v18.0/me/accounts');
            // ... (In a real scenario, you parse the business accounts and phone numbers here)
            // For MVP Simulation, assuming they only connected one number:

            // 3. Save to Supabase (Database Models)
            // We use UUIDs, so this matches our previous schema mapping
            $wabaId = 'MOCK_WABA_ID_FROM_META'; // Replace with parsed $accountsResponse data
            $phoneNumberId = 'MOCK_PHONE_ID_FROM_META'; // Replace with parsed $accountsResponse data

            WhatsappConfig::updateOrCreate(
                ['org_id' => $user->org_id],
                [
                    'phone_number_id' => $phoneNumberId,
                    'waba_id' => $wabaId,
                    'access_token' => $accessToken,
                ]
            );

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('WhatsApp Connection Error: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => 'Server error occurred during connection.']);
        }
    }
}
