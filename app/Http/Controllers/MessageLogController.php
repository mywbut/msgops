<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageLogController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        // If no config exists, logs will be empty
        $logs = [];

        if ($config) {
            $logs = Message::with('contact')
                ->where('org_id', $user->org_id)
                ->orderBy('created_at', 'desc')
                ->limit(200)
                ->get()
                ->map(function ($msg) {
                    return [
                        'id' => $msg->id,
                        'to' => $msg->contact->phone_number ?? 'Unknown',
                        'contact_name' => $msg->contact->name,
                        'status' => ucfirst($msg->status),
                        'message' => $msg->content['body'] ?? ($msg->type === 'template' ? 'Template Message' : 'Media'),
                        'time' => $msg->created_at->diffForHumans(),
                        'direction' => $msg->direction,
                    ];
                });
        }

        return Inertia::render('WhatsApp/MessageLogs', [
            'isConnected' => $config ? true : false,
            'logs' => $logs
        ]);
    }
}
