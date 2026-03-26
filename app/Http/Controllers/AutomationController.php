<?php

namespace App\Http\Controllers;

use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AutomationController extends Controller
{
    public function index(Request $request)
    {
        $config = WhatsappConfig::where('org_id', $request->user()->org_id)->first();
        
        return Inertia::render('WhatsApp/Automation', [
            'isConnected' => $config ? true : false,
            'config' => $config
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'is_automation_enabled' => 'required|boolean',
            'automation_keywords' => 'nullable|string',
            'automation_reply' => 'nullable|string',
        ]);

        $config = WhatsappConfig::where('org_id', $request->user()->org_id)->firstOrFail();
        
        $config->update([
            'is_automation_enabled' => $request->is_automation_enabled,
            'automation_keywords' => $request->automation_keywords,
            'automation_reply' => $request->automation_reply,
        ]);

        return back()->with('message', 'Automation settings saved successfully.');
    }
}
