<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use App\Models\Campaign;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $orgId = $user->org_id;

        // 1. Connectivity Status
        $config = WhatsappConfig::where('org_id', $orgId)->first();
        
        // 2. Aggregate Stats
        $totalContacts = Contact::where('org_id', $orgId)->count();
        $totalMessages = Message::where('org_id', $orgId)->count();
        
        // 3. Message Status Distribution (Doughnut Chart Data)
        $statusStats = Message::where('org_id', $orgId)
            ->where('direction', 'outbound')
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        // 4. Daily Volume (Area Chart Data - Last 7 Days)
        $last7Days = collect(range(0, 6))->map(function($i) {
            return Carbon::now()->subDays($i)->format('Y-m-d');
        })->reverse();

        $dailyVolume = Message::where('org_id', $orgId)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->pluck('count', 'date');

        $chartData = $last7Days->map(function($date) use ($dailyVolume) {
            return [
                'date' => Carbon::parse($date)->format('M d'),
                'count' => (int)($dailyVolume[$date] ?? 0)
            ];
        })->values();

        // 5. Recent Campaigns
        $recentCampaigns = Campaign::where('org_id', $orgId)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'isConnected' => $config ? true : false,
            'stats' => [
                'total_contacts' => (int)$totalContacts,
                'total_messages' => (int)$totalMessages,
                'sent' => (int)($statusStats['sent'] ?? 0),
                'delivered' => (int)($statusStats['delivered'] ?? 0),
                'read' => (int)($statusStats['read'] ?? 0),
                'failed' => (int)($statusStats['failed'] ?? 0),
            ],
            'chartData' => $chartData,
            'recentCampaigns' => $recentCampaigns,
            'waba_status' => $config->status ?? 'Disconnected'
        ]);
    }
}
