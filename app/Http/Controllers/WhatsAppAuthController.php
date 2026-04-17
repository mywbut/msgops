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

        // Fetch extra info if connected
        $businessName = null;
        $businessId = null;
        $wabaName = null;
        $wabaId = null;
        $phoneNumber = null;
        $phoneStatus = null;
        
        if ($config) {
            $wabaId = $config->waba_id;
            
            // First check if we have data cached in the DB
            if ($config->waba_name || $config->business_name) {
                $businessName = $config->business_name;
                $businessId = $config->business_id;
                $wabaName = $config->waba_name;
                $phoneNumber = $config->phone_number;
                $phoneStatus = $config->phone_status;
            } elseif ($config->access_token && $config->waba_id) {
                // Fallback for old connections without cached data
                try {
                    // Fetch WABA Info (Name)
                    $wabaResponse = Http::withToken($config->access_token)
                        ->get("https://graph.facebook.com/v18.0/{$wabaId}?fields=name");
                    
                    if ($wabaResponse->successful()) {
                        $wabaName = $wabaResponse->json()['name'] ?? null;
                    }

                    // Fetch Business Info separately to avoid 400 Bad Request if missing permissions
                    $businessResponse = Http::withToken($config->access_token)
                        ->get("https://graph.facebook.com/v18.0/{$wabaId}?fields=business");
                    
                    if ($businessResponse->successful()) {
                        $businessData = $businessResponse->json()['business'] ?? null;
                        if ($businessData) {
                            $businessId = $businessData['id'] ?? null;
                            $businessName = $businessData['name'] ?? null;
                        }
                    }

                    if (!$businessName && $wabaName) {
                        $businessName = $wabaName;
                    }

                    // Fetch Phone Number Info
                    if ($config->phone_number_id) {
                        $phoneResponse = Http::withToken($config->access_token)
                            ->get("https://graph.facebook.com/v18.0/{$config->phone_number_id}?fields=display_phone_number,name_status");

                        if ($phoneResponse->successful()) {
                            $phoneData = $phoneResponse->json();
                            $phoneNumber = $phoneData['display_phone_number'] ?? null;
                            $phoneStatus = $phoneData['name_status'] ?? null; 
                            
                            if (strtolower($phoneStatus) === 'approved') {
                                $phoneStatus = 'Active';
                            }
                        }
                    }
                    
                    // Save the fetched info for future loads so it doesn't break if token expires
                    if ($wabaName || $phoneNumber) {
                        $config->update([
                            'business_name' => $businessName,
                            'business_id' => $businessId,
                            'waba_name' => $wabaName,
                            'phone_number' => $phoneNumber,
                            'phone_status' => $phoneStatus,
                        ]);
                    }

                } catch (\Exception $e) {
                    Log::error('Failed to fetch WhatsApp Business details: ' . $e->getMessage());
                }
            }
        }

        return Inertia::render('WhatsApp/Connect', [
            'metaAppId' => env('META_APP_ID', '911152584947331'),
            'metaConfigId' => env('META_CONFIG_ID', '1592135015238479'),
            'isConnected' => $config ? true : false,
            'phoneNumberId' => $config ? $config->phone_number_id : null,
            'businessName' => $businessName ?? 'N/A',
            'businessId' => $businessId ?? 'N/A',
            'wabaName' => $wabaName ?? 'N/A',
            'wabaId' => $wabaId ?? 'N/A',
            'phoneNumber' => $phoneNumber ?? 'N/A',
            'phoneStatus' => $phoneStatus ?? 'Active',
            'messagingLimit' => '1,000 conversations per 24 hours',
            'accountQuality' => 'High',
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
            $phoneNumberDisplay = $phonesData['data'][0]['display_phone_number'] ?? null;
            $phoneStatus = $phonesData['data'][0]['name_status'] ?? null;
            
            if (strtolower($phoneStatus) === 'approved') {
                $phoneStatus = 'Active';
            }

            // 3.5 Fetch WABA Name via access token
            $businessName = null;
            $businessId = null;
            $wabaName = null;
            
            $wabaResponse = Http::withToken($accessToken)
                ->get("https://graph.facebook.com/v18.0/{$wabaId}?fields=name");
            
            if ($wabaResponse->successful()) {
                $wabaName = $wabaResponse->json()['name'] ?? null;
            }

            // Fetch Business Info separately to avoid 400 Bad Request if missing permissions
            $businessResponse = Http::withToken($accessToken)
                ->get("https://graph.facebook.com/v18.0/{$wabaId}?fields=business");
            
            if ($businessResponse->successful()) {
                $businessData = $businessResponse->json()['business'] ?? null;
                if ($businessData) {
                    $businessId = $businessData['id'] ?? null;
                    $businessName = $businessData['name'] ?? null;
                }
            }
            if (!$businessName && $wabaName) {
                $businessName = $wabaName;
            }

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

            // 6. Subscribe the App to the WABA (Required for receiving webhooks/status updates)
            $isSubscribed = $this->subscribeAppToWaba($wabaId, $accessToken);

            // 5. Save to Supabase (Database Models)
            WhatsappConfig::updateOrCreate(
                ['org_id' => $user->org_id],
                [
                    'phone_number_id' => $phoneNumberId,
                    'waba_id' => $wabaId,
                    'access_token' => $accessToken,
                    'business_name' => $businessName,
                    'business_id' => $businessId,
                    'waba_name' => $wabaName,
                    'phone_number' => $phoneNumberDisplay,
                    'phone_status' => $phoneStatus,
                    'is_subscribed' => $isSubscribed ? 'true' : 'false',
                ]
            );
            return redirect()->route('whatsapp.connect')->with('success', 'Successfully connected your WhatsApp Business number!');

        } catch (\Exception $e) {
            Log::error('WhatsApp Connection Error: ' . $e->getMessage());
            return redirect()->route('whatsapp.connect')->with('error', 'Server error occurred during connection.');
        }
    }

    /**
     * Disconnect the WhatsApp Business Account.
     */
    public function disconnect(Request $request)
    {
        $user = $request->user();
        
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        if ($config) {
            $config->delete();
        }

        return redirect()->route('whatsapp.connect')->with('success', 'WhatsApp account disconnected successfully.');
    }

    /**
     * Subscribe the Meta App to the WABA to receive webhooks.
     */
    private function subscribeAppToWaba($wabaId, $accessToken): bool
    {
        try {
            // 1. Check if already subscribed
            $checkResponse = Http::withToken($accessToken)
                ->get("https://graph.facebook.com/v18.0/{$wabaId}/subscribed_apps");
            
            if ($checkResponse->successful()) {
                $subscribedApps = $checkResponse->json()['data'] ?? [];
                foreach ($subscribedApps as $app) {
                    if (($app['id'] ?? null) == env('META_APP_ID')) {
                        return true;
                    }
                }
            }

            // 2. Subscribe the app
            $response = Http::withToken($accessToken)
                ->post("https://graph.facebook.com/v18.0/{$wabaId}/subscribed_apps");

            if ($response->successful() && ($response->json()['success'] ?? false)) {
                Log::info("Successfully subscribed app to WABA: {$wabaId}");
                return true;
            }

            Log::error("Failed to subscribe app to WABA: {$wabaId}. Response: " . $response->body());
            return false;
        } catch (\Exception $e) {
            Log::error("Error subscribing app to WABA: " . $e->getMessage());
            return false;
        }
    }
}
