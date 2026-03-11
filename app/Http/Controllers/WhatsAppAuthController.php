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
        if ($request->has('code') || $request->has('error')) {
            return $this->exchangeToken($request);
        }

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
            'metaAppId' => env('META_APP_ID', '911152584947331'),
            'metaConfigId' => env('META_CONFIG_ID', '1592135015238479'),
            'isConnected' => $config ? true : false,
            'phoneNumberId' => $config ? $config->phone_number_id : null,
            'flashError' => session('error'),
            'flashSuccess' => session('success'),
        ]);
    }

    /**
     * Handle the OAuth code payload from the React frontend.
     */
    public function exchangeToken(Request $request)
    {
        if ($request->has('error')) {
            Log::error('Meta OAuth Error: ' . $request->input('error_description', $request->input('error')));
            return redirect()->route('whatsapp.connect')->with('error', 'Facebook Login failed: ' . $request->input('error_description', 'User cancelled or configuration error.'));
        }

        $request->validate([
            'code' => 'required|string',
        ]);

        $user = $request->user();
        $code = $request->input('code');

        try {
            // 1. Exchange the code for an Access Token
            $response = Http::get('https://graph.facebook.com/v18.0/oauth/access_token', [
                'client_id' => env('META_APP_ID'),
                'client_redirect_uri' => route('whatsapp.connect'),
                'redirect_uri' => route('whatsapp.connect'),
                'client_secret' => env('META_APP_SECRET'),
                'code' => $code,
            ]);

            if ($response->failed()) {
                Log::error('Meta OAuth Exchange Failed: ' . $response->body());
                return redirect()->route('whatsapp.connect')->with('error', 'Failed to exchange token with Meta.');
            }

            $tokenData = $response->json();
            $accessToken = $tokenData['access_token'];

            // 2. We now have the token! Fetch the WABA ID granted during signup using the debug_token endpoint.
            $appToken = env('META_APP_ID') . '|' . env('META_APP_SECRET');
            $debugResponse = Http::get('https://graph.facebook.com/v18.0/debug_token', [
                'input_token' => $accessToken,
                'access_token' => $appToken,
            ]);

            if ($debugResponse->failed()) {
                Log::error('Meta Debug Token Failed: ' . $debugResponse->body());
                return redirect()->route('whatsapp.connect')->with('error', 'Failed to verify token scopes.');
            }

            $debugData = $debugResponse->json();
            $wabaId = null;

            Log::info('Debug Data: ' . json_encode($debugData));

            if (isset($debugData['data']['granular_scopes'])) {
                foreach ($debugData['data']['granular_scopes'] as $scope) {
                    if (in_array($scope['scope'], ['whatsapp_business_messaging', 'whatsapp_business_management']) && !empty($scope['target_ids'])) {
                        $wabaId = $scope['target_ids'][0];
                        break;
                    }
                }
            }

            if (!$wabaId) {
                Log::error('WABA ID not found in debug token data.');
                return redirect()->route('whatsapp.connect')->with('error', 'No WhatsApp Business Account (WABA) was granted in the permissions.');
            }

            // 3. Now that we have the WABA ID, we can query its phone numbers
            $phonesResponse = Http::withToken($accessToken)
                ->get("https://graph.facebook.com/v18.0/{$wabaId}/phone_numbers");

            if ($phonesResponse->failed()) {
                Log::error('Meta Fetch Phones Failed: ' . $phonesResponse->body());
                return redirect()->route('whatsapp.connect')->with('error', 'Failed to fetch WhatsApp Phone Numbers.');
            }

            $phonesData = $phonesResponse->json();

            if (empty($phonesData['data'])) {
                return redirect()->route('whatsapp.connect')->with('error', 'No phone numbers found in the connected WhatsApp Business Account.');
            }

            // Grab the very first phone number attached to this WABA for the MVP
            $phoneNumberId = $phonesData['data'][0]['id'];

            // 4. Register the phone number for the Cloud API.
            // Meta requires newly linked phone numbers to be registered with a 6-digit PIN.
            $registerResponse = Http::withToken($accessToken)
                ->post("https://graph.facebook.com/v18.0/{$phoneNumberId}/register", [
                    'messaging_product' => 'whatsapp',
                    'pin' => '123456'
                ]);

            if ($registerResponse->failed()) {
                Log::error('Meta Register Phone Failed: ' . json_encode($registerResponse->json()));
                // We don't abort the connection entirely since test numbers might throw "already registered"
            }

            // 5. Save to Supabase (Database Models)
            WhatsappConfig::updateOrCreate(
                ['org_id' => $user->org_id],
                [
                    'phone_number_id' => $phoneNumberId,
                    'waba_id' => $wabaId,
                    'access_token' => $accessToken,
                ]
            );
            return redirect()->route('whatsapp.connect')->with('success', 'Successfully connected your WhatsApp Business number!');

        } catch (\Exception $e) {
            Log::error('WhatsApp Connection Error: ' . $e->getMessage());
            return redirect()->route('whatsapp.connect')->with('error', 'Server error occurred during connection.');
        }
    }
}
