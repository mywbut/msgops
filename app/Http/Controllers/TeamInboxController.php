<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TeamInboxController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        $templates = [];
        if ($config && $config->waba_id) {
            try {
                $response = Http::withToken($config->access_token)
                    ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?limit=100");
                if ($response->successful()) {
                    $templates = $response->json()['data'] ?? [];
                }
            } catch (\Exception $e) {
                Log::error('Fetch Templates Error in TeamInbox: ' . $e->getMessage());
            }
        }

        return Inertia::render('WhatsApp/TeamInbox', [
            'isConnected' => $config ? true : false,
            'selectedContactId' => $request->query('contactId'),
            'templates' => $templates,
        ]);
    }

    public function getConversations(Request $request)
    {
        $user = $request->user();
        
        // Fetch contacts with their latest message
        $contacts = Contact::where('org_id', $user->org_id)
            ->with(['messages' => function ($query) {
                $query->orderBy('created_at', 'desc')->limit(1);
            }])
            ->orderByDesc('last_message_at')
            ->get()
            ->map(function ($contact) {
                $lastMsg = $contact->messages->first();
                $lastIncoming = Message::where('contact_id', $contact->id)
                    ->where('direction', 'inbound')
                    ->orderBy('created_at', 'desc')
                    ->first();

                $isExpired = true;
                if ($lastIncoming) {
                    $isExpired = Carbon::parse($lastIncoming->created_at)->addHours(24)->isPast();
                }

                $unreadCount = Message::where('contact_id', $contact->id)
                    ->where('direction', 'inbound')
                    ->where('is_read', false)
                    ->count();

                return [
                    'id' => $contact->id,
                    'name' => $contact->name ?? 'Unknown',
                    'phone_number' => $contact->phone_number,
                    'last_message' => $lastMsg ? ($lastMsg->content['body'] ?? 'Media/Template') : null,
                    'last_message_time' => $lastMsg ? Carbon::parse($lastMsg->created_at)->diffForHumans() : null,
                    'is_expired' => $isExpired,
                    'unread_count' => $unreadCount,
                ];
            });

        return response()->json([
            'conversations' => $contacts->values()
        ]);
    }

    public function getMessages(Request $request, $contactId)
    {
        $user = $request->user();
        $contact = Contact::where('id', $contactId)->where('org_id', $user->org_id)->firstOrFail();

        // Mark all inbound messages as read for this contact
        Message::where('contact_id', $contact->id)
            ->where('direction', 'inbound')
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = Message::where('contact_id', $contact->id)
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
                    'time' => $msg->created_at->timezone(config('app.timezone'))->format('H:i'),
                    'date' => $msg->created_at->timezone(config('app.timezone'))->format('d/m/Y'),
                ];
            });

        $lastIncoming = Message::where('contact_id', $contact->id)
            ->where('direction', 'inbound')
            ->orderBy('created_at', 'desc')
            ->first();

        $isExpired = true;
        $expiresAt = null;
        if ($lastIncoming) {
            $expiryTime = Carbon::parse($lastIncoming->created_at)->addHours(24);
            $isExpired = $expiryTime->isPast();
            $expiresAt = $expiryTime->toDateTimeString();
        }

        return response()->json([
            'contact' => $contact,
            'messages' => $messages,
            'is_expired' => $isExpired,
            'expires_at' => $expiresAt
        ]);
    }

    public function getUnreadNotifications(Request $request)
    {
        $user = $request->user();
        
        $unreadTotal = Message::where('org_id', $user->org_id)
            ->where('direction', 'inbound')
            ->where('is_read', false)
            ->count();
            
        $latestUnread = Message::where('org_id', $user->org_id)
            ->where('direction', 'inbound')
            ->where('is_read', false)
            ->with('contact')
            ->orderBy('created_at', 'desc')
            ->first();
            
        return response()->json([
            'unread_total' => $unreadTotal,
            'latest_message' => $latestUnread ? [
                'id' => $latestUnread->id,
                'contact_name' => $latestUnread->contact->name ?? $latestUnread->contact->phone_number,
                'contact_id' => $latestUnread->contact_id,
                'snippet' => $latestUnread->content['body'] ?? 'New Media/Template'
            ] : null
        ]);
    }
}
