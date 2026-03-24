<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $organization = Organization::where('id', $user->org_id)->first();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        $team = User::where('org_id', $user->org_id)->get();

        return Inertia::render('WhatsApp/Settings', [
            'organization' => $organization,
            'config' => $config,
            'team' => $team,
            'webhook_url' => config('app.url') . "/api/whatsapp/webhook"
        ]);
    }

    public function updateOrganization(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Organization::where('id', $user->org_id)->update([
            'name' => $request->name
        ]);

        return back()->with('success', 'Organization updated successfully.');
    }
}
