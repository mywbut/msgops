<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Contact;
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
                        'contact_id' => $msg->contact_id,
                        'to' => $msg->contact->phone_number ?? 'Unknown',
                        'contact_name' => $msg->contact->name,
                        'status' => ucfirst($msg->status),
                        'message' => $msg->content['body'] ?? ($msg->type === 'template' ? 'Template Message' : 'Media'),
                        'time' => \Carbon\Carbon::parse($msg->created_at)->diffForHumans(),
                        'direction' => $msg->direction,
                        'error' => $msg->error,
                    ];
                });
        }

        return Inertia::render('WhatsApp/MessageLogs', [
            'isConnected' => $config ? true : false,
            'logs' => $logs
        ]);
    }

    public function getTimeline(Request $request, $contactId)
    {
        $user = $request->user();
        $contact = Contact::where('id', $contactId)->where('org_id', $user->org_id)->firstOrFail();

        $messages = Message::where('contact_id', $contact->id)
            ->where('org_id', $user->org_id)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'direction' => $msg->direction,
                    'type' => $msg->type,
                    'content' => $msg->content,
                    'status' => $msg->status,
                    'error' => $msg->error,
                    'time' => \Carbon\Carbon::parse($msg->created_at)->format('M d, H:i'),
                ];
            });

        return response()->json([
            'contact' => $contact,
            'messages' => $messages
        ]);
    }
}
