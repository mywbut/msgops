<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Organization;

class BillingController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $organization = Organization::find($user->org_id);

        return Inertia::render('WhatsApp/Billing/index', [
            'organization' => $organization,
            'plans' => [
                [
                    'id' => 'growth',
                    'name' => 'Growth',
                    'price' => 49,
                    'features' => ['1000 Messages/mo', 'Basic Analytics', '1 Team Member'],
                    'current' => $organization->plan === 'growth'
                ],
                [
                    'id' => 'pro',
                    'name' => 'Pro',
                    'price' => 99,
                    'features' => ['5000 Messages/mo', 'Advanced Analytics', '5 Team Members', 'Priority Support'],
                    'current' => $organization->plan === 'pro' || !$organization->plan
                ],
                [
                    'id' => 'business',
                    'name' => 'Business',
                    'price' => 249,
                    'features' => ['Unlimited Messages', 'Custom Reports', 'Unlimited Team Members', 'API Access'],
                    'current' => $organization->plan === 'business'
                ]
            ]
        ]);
    }

    public function upgrade(Request $request)
    {
        $request->validate([
            'plan' => 'required|string|in:growth,pro,business'
        ]);

        $user = auth()->user();
        $organization = Organization::find($user->org_id);
        $organization->update(['plan' => $request->plan]);

        return redirect()->back()->with('success', 'Plan upgraded successfully!');
    }
}
