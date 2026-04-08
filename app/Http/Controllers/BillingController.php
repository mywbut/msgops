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

        // Real usage data
        $automationLimit = $org->automation_limit;
        $automationCount = $org->monthly_automation_triggers;
        $excessTriggers = max(0, $automationCount - $automationLimit);
        $automationCost = $excessTriggers * 0.05;

        $usage = [
            'automation' => [
                'count' => $automationCount,
                'limit' => $automationLimit,
                'cost' => $automationCost,
            ],
            'ai' => [
                'count' => 0,
                'cost' => 0,
            ],
            'agents' => [
                'count' => 0,
                'cost' => 0,
            ],
            'total_cost' => $automationCost,
        ];

        // System alerts for UI
        $alert = null;
        if ($automationCount >= ($automationLimit * 0.9)) {
            $alert = [
                'type' => 'warning',
                'message' => $automationCount >= $automationLimit 
                    ? "You have reached your free automation limit. Standard charges (₹0.05/trigger) apply."
                    : "You have used " . round(($automationCount / $automationLimit) * 100) . "% of your free automation triggers."
            ];
        }

        return Inertia::render('Billing/Index', [
            'balance' => $balance,
            'currency' => $currency,
            'freeConversations' => $freeConversations,
            'transactions' => $transactions,
            'plan' => $planDetails,
            'usage' => $usage,
            'organization' => $org,
            'alert' => $alert,
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
