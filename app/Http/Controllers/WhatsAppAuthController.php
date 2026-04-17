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
            // Check if they already have an organization with the same name before creating
            $existingOrg = Organization::where('name', $user->name . "'s Business")->first();
            
            if ($existingOrg) {
                $user->org_id = $existingOrg->id;
            } else {
                // First time login? Auto-create their org!
                $org = Organization::create([
                    'name' => $user->name . "'s Business",
                    'plan_tier' => 'free',
                ]);
                $user->org_id = $org->id;
            }
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
            
            // We consider the config "complete" only if we have at least these key names.
            // If anything is missing or 'N/A', we should try to re-fetch from Meta.
            $isCacheComplete = ($config->waba_name && $config->waba_name !== 'N/A') && 
                               ($config->phone_number && $config->phone_number !== 'N/A');

            if ($isCacheComplete) {
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
                    
                    // Save the fetched info for future loads so it doesn't break if token expires.
                    // IMPORTANT: We only update fields that were successfully retrieved to avoid clearing existing data.
                    $updateData = [];
                    if ($businessName) $updateData['business_name'] = $businessName;
                    if ($businessId) $updateData['business_id'] = $businessId;
                    if ($wabaName) $updateData['waba_name'] = $wabaName;
                    if ($phoneNumber) $updateData['phone_number'] = $phoneNumber;
                    if ($phoneStatus) $updateData['phone_status'] = $phoneStatus;

                    if (!empty($updateData)) {
                        $config->update($updateData);
                    }

                } catch (\Exception $e) {
                    Log::error('Failed to fetch WhatsApp Business details: ' . $e->getMessage());
                }
            }
        }

        // Fetch Meta Health and Usage if connected
        $dailyLimit = 250;
        $currentUsage = 0;
        $tierName = 'TIER 1';
        $accountQuality = 'High';

        if ($config && $config->phone_number_id && $config->access_token) {
            // Calculate actual usage (Unique contacts in last 24 hours)
            $currentUsage = \App\Models\Message::where('org_id', $user->org_id)
                ->where('direction', 'outbound')
                ->where('created_at', '>=', now()->subHours(24))
                ->distinct('contact_id')
                ->count();

            // Fetch Real Meta Health Data with caching
            $cacheKey = "meta_health_v2_{$config->phone_number_id}";
            $metaApiData = \Illuminate\Support\Facades\Cache::remember($cacheKey, now()->addHours(24), function () use ($config) {
                try {
                    $response = Http::withToken($config->access_token)
                        ->get("https://graph.facebook.com/v18.0/{$config->phone_number_id}?fields=messaging_limit_tier,quality_rating");

                    if ($response->successful()) {
                        return $response->json();
                    }
                } catch (\Exception $e) {
                    Log::error("Connect Meta API Error: " . $e->getMessage());
                }
                return null;
            });

            if ($metaApiData) {
                $tierMap = [
                    'TIER_250' => 250,
                    'TIER_2K' => 2000,
                    'TIER_10K' => 10000,
                    'TIER_100K' => 100000,
                    'TIER_UNLIMITED' => 1000000,
                ];
                
                $tierRaw = $metaApiData['messaging_limit_tier'] ?? 'TIER_250';
                $dailyLimit = $tierMap[$tierRaw] ?? 250;
                $tierName = str_replace('_', ' ', $tierRaw);
                $accountQuality = $metaApiData['quality_rating'] ?? 'High';
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
            'dailyLimit' => $dailyLimit,
            'currentUsage' => $currentUsage,
            'tierName' => $tierName,
            'accountQuality' => $accountQuality,
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
                    'is_subscribed' => (bool)$isSubscribed,
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
     * Fetch all available phone numbers from Meta for the connected WABA.
     */
    public function getAvailableNumbers(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config || !$config->access_token || !$config->waba_id) {
            return response()->json(['error' => 'No WhatsApp connection found.'], 400);
        }

        try {
            $response = Http::withToken($config->access_token)
                ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/phone_numbers");

            if (!$response->successful()) {
                $errorData = $response->json();
                $errorMessage = $errorData['error']['message'] ?? 'Failed to fetch phone numbers from Meta.';
                
                Log::error('Meta Fetch Phones Failed: ' . $response->body());

                // If token is invalid or user logged out
                if ($response->status() === 401 || (isset($errorData['error']['code']) && $errorData['error']['code'] == 190)) {
                    return response()->json(['error' => 'Your WhatsApp session has expired. Please disconnect and reconnect your account.'], 401);
                }

                return response()->json(['error' => $errorMessage], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Fetch Available Numbers Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server error occurred while fetching numbers.'], 500);
        }
    }

    /**
     * Select and activate a specific phone number.
     */
    public function selectNumber(Request $request)
    {
        $request->validate([
            'phone_number_id' => 'required|string',
            'display_phone_number' => 'required|string',
            'status' => 'nullable|string',
        ]);

        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config) {
            return response()->json(['error' => 'No WhatsApp connection found.'], 400);
        }

        try {
            $phoneNumberId = $request->input('phone_number_id');
            $phoneNumberDisplay = $request->input('display_phone_number');
            $phoneStatus = $request->input('status');

            if (strtolower($phoneStatus) === 'approved') {
                $phoneStatus = 'Active';
            }

            // Register the phone number for the Cloud API.
            $registerResponse = Http::withToken($config->access_token)
                ->post("https://graph.facebook.com/v18.0/{$phoneNumberId}/register", [
                    'messaging_product' => 'whatsapp',
                    'pin' => '123456'
                ]);

            if ($registerResponse->failed()) {
                Log::error('Meta Register Phone Failed (Selection): ' . json_encode($registerResponse->json()));
                // We keep going as some test numbers might already be registered
            }

            $config->update([
                'phone_number_id' => $phoneNumberId,
                'phone_number' => $phoneNumberDisplay,
                'phone_status' => $phoneStatus,
            ]);

            // Attempt to refresh Business/WABA names immediately after switching numbers
            try {
                $wabaRes = Http::withToken($config->access_token)->get("https://graph.facebook.com/v18.0/{$config->waba_id}?fields=name");
                if ($wabaRes->successful()) {
                    $config->update(['waba_name' => $wabaRes->json()['name'] ?? $config->waba_name]);
                }
            } catch (\Exception $e) {
                Log::warning('Silent failure refreshing WABA name after number selection: ' . $e->getMessage());
            }

            return response()->json(['success' => true, 'message' => 'Phone number activated successfully!']);
        } catch (\Exception $e) {
            Log::error('Select Phone Number Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server error occurred while activating the number.'], 500);
        }
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
