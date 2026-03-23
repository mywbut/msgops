<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        $contacts = [];

        if ($config) {
            $contacts = Contact::withCount('messages')
                ->where('org_id', $user->org_id)
                ->orderBy('created_at', 'desc')
                ->limit(500)
                ->get()
                ->map(function ($contact) {
                    return [
                        'id' => $contact->id,
                        'name' => $contact->name ?? 'Unknown',
                        'phone_number' => $contact->phone_number,
                        'message_count' => $contact->messages_count,
                        'created_at' => date('M d, Y', strtotime($contact->created_at)),
                    ];
                });
        }

        return Inertia::render('WhatsApp/Contacts', [
            'isConnected' => $config ? true : false,
            'contacts' => $contacts
        ]);
    }
}
