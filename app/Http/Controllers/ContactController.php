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

        $query = Contact::withCount('messages')
            ->where('org_id', $user->org_id);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('tag')) {
            $tag = $request->input('tag');
            $query->whereJsonContains('tags', $tag);
        }

        $contacts = [];

        if ($config) {
            $contacts = $query->orderBy('created_at', 'desc')
                ->limit(500)
                ->get()
                ->map(function ($contact) {
                    return [
                        'id' => $contact->id,
                        'name' => $contact->name ?? 'Unknown',
                        'phone_number' => $contact->phone_number,
                        'message_count' => $contact->messages_count,
                        'tags' => $contact->tags ?? [],
                        'created_at' => date('M d, Y', strtotime($contact->created_at)),
                    ];
                });
        }

        return Inertia::render('WhatsApp/Contacts', [
            'isConnected' => $config ? true : false,
            'contacts' => $contacts,
            'filters' => $request->only(['search', 'tag']),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'name' => 'nullable|string|max:255',
            'phone_number' => 'required|string|max:20',
            'tags' => 'nullable|array',
        ]);

        $phoneNumber = preg_replace('/[^0-9]/', '', $request->phone_number);

        Contact::updateOrCreate(
            ['org_id' => $user->org_id, 'phone_number' => $phoneNumber],
            [
                'name' => $request->name,
                'tags' => $request->tags ?? [],
            ]
        );

        return back()->with('success', 'Contact saved successfully.');
    }

    public function update(Request $request, Contact $contact)
    {
        $user = $request->user();
        if ($contact->org_id !== $user->org_id) {
            abort(403);
        }

        $request->validate([
            'name' => 'nullable|string|max:255',
            'phone_number' => 'required|string|max:20',
            'tags' => 'nullable|array',
        ]);

        $phoneNumber = preg_replace('/[^0-9]/', '', $request->phone_number);

        $contact->update([
            'name' => $request->name,
            'phone_number' => $phoneNumber,
            'tags' => $request->tags ?? [],
        ]);

        return back()->with('success', 'Contact updated successfully.');
    }

    public function destroy(Request $request, Contact $contact)
    {
        $user = $request->user();
        if ($contact->org_id !== $user->org_id) {
            abort(403);
        }

        $contact->delete();

        return back()->with('success', 'Contact deleted successfully.');
    }

    public function import(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $path = $request->file('file')->getRealPath();
        $data = array_map('str_getcsv', file($path));
        
        if (count($data) < 2) {
            return back()->withErrors(['file' => 'The CSV file is empty or invalid.']);
        }

        $header = array_shift($data);
        $nameIdx = array_search('name', array_map('strtolower', $header));
        $phoneIdx = array_search('phone', array_map('strtolower', $header));

        if ($phoneIdx === false) {
            return back()->withErrors(['file' => 'The CSV must contain a "phone" column.']);
        }

        $imported = 0;
        foreach ($data as $row) {
            if (empty($row[$phoneIdx])) continue;

            $phoneNumber = preg_replace('/[^0-9]/', '', $row[$phoneIdx]);
            $name = ($nameIdx !== false) ? ($row[$nameIdx] ?? null) : null;

            Contact::updateOrCreate(
                ['org_id' => $user->org_id, 'phone_number' => $phoneNumber],
                ['name' => $name]
            );
            $imported++;
        }

        return back()->with('success', "Successfully imported {$imported} contacts.");
    }
}
