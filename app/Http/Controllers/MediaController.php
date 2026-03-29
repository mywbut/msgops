<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Upload media for WhatsApp messages.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:20480', // 20MB Max
            'type' => 'required|in:image,video,audio,document'
        ]);

        $file = $request->file('file');
        $orgId = $request->user()->org_id;

        // Generate a clean filename
        $extension = $file->getClientOriginalExtension();
        $filename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '-' . time() . '.' . $extension;
        
        // Store in public disk
        $path = $file->storeAs("whatsapp_media/{$orgId}", $filename, 'public');

        return response()->json([
            'success' => true,
            'url' => asset("storage/{$path}"),
            'filename' => $file->getClientOriginalName()
        ]);
    }
}
