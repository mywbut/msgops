<?php

namespace App\Http\Controllers;

use App\Models\CreditTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function credits(Request $request)
    {
        $org = $request->user()->organization;
        
        return Inertia::render('Billing/Credits', [
            'balance' => $org->wallet_balance,
            'currency' => $org->currency,
            'freeServiceConversations' => $org->free_service_conversations,
            'transactions' => $org->creditTransactions()
                ->latest()
                ->paginate(10),
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
