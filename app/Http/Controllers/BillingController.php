<?php

namespace App\Http\Controllers;

use App\Models\CreditTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        $org = $request->user()->organization;
        
        // Fetch real data
        $balance = $org->wallet_balance;
        $currency = $org->currency;
        $freeConversations = $org->free_service_conversations;
        $transactions = $org->creditTransactions()
            ->latest()
            ->limit(10)
            ->get();

        // Prepare plan details (mapped from plan_tier)
        $planDetails = [
            'name' => ucfirst($org->plan_tier ?? 'Growth'),
            'price' => '₹299',
            'period' => 'month',
            'next_billing' => '12 Apr 2026', // Mocked as per request
        ];

        // Mock usage data for the table/progress bar as per the UI request
        $usage = [
            'automation' => [
                'count' => 320,
                'limit' => 1000,
                'cost' => 16,
            ],
            'ai' => [
                'count' => 40,
                'cost' => 20,
            ],
            'agents' => [
                'count' => 2,
                'cost' => 198,
            ],
            'total_cost' => 234,
        ];

        return Inertia::render('Billing/Index', [
            'balance' => $balance,
            'currency' => $currency,
            'freeConversations' => $freeConversations,
            'transactions' => $transactions,
            'plan' => $planDetails,
            'usage' => $usage,
            'organization' => $org,
        ]);
    }

    public function pricing(Request $request)
    {
        return Inertia::render('Billing/Pricing', [
            'organization' => $request->user()->organization,
        ]);
    }


    public function buyCredits(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:500',
        ]);

        $org = $request->user()->organization;
        
        // Mocking a successful payment for now
        $org->deposit($request->amount, 'Credit Top-up via UI');

        return back()->with('success', 'Credits added successfully!');
    }
}
