<?php

namespace App\Http\Controllers;

use App\Models\ReplyMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReplyMaterialController extends Controller
{
    public function index(Request $request)
    {
        $materials = ReplyMaterial::where('org_id', $request->user()->org_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('WhatsApp/ReplyMaterial/Index', [
            'materials' => $materials
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:text,image,video,document,sticker',
            'content' => 'required|array',
        ]);

        ReplyMaterial::create([
            'org_id' => $request->user()->org_id,
            'name' => $request->name,
            'type' => $request->type,
            'content' => $request->input('content'),
        ]);

        return back()->with('message', 'Reply material created successfully.');
    }

    public function update(Request $request, ReplyMaterial $material)
    {
        if ($material->org_id !== $request->user()->org_id) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|array',
        ]);

        $material->update([
            'name' => $request->name,
            'content' => $request->input('content'),
        ]);

        return back()->with('message', 'Reply material updated successfully.');
    }

    public function destroy(Request $request, ReplyMaterial $material)
    {
        if ($material->org_id !== $request->user()->org_id) {
            abort(403);
        }

        $material->delete();

        return back()->with('message', 'Reply material deleted successfully.');
    }
}
