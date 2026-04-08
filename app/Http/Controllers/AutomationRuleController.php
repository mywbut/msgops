<?php

namespace App\Http\Controllers;

use App\Models\AutomationRule;
use App\Models\ReplyMaterial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AutomationRuleController extends Controller
{
    public function index(Request $request)
    {
        $rules = AutomationRule::where('org_id', $request->user()->org_id)
            ->orderBy('created_at', 'desc')
            ->get();

        $materials = ReplyMaterial::where('org_id', $request->user()->org_id)->get();

        return Inertia::render('WhatsApp/Automation/Index', [
            'rules' => $rules,
            'materials' => $materials
        ]);
    }

    public function create(Request $request)
    {
        $materials = ReplyMaterial::where('org_id', $request->user()->org_id)->get();

        return Inertia::render('WhatsApp/Automation/RuleBuilder', [
            'materials' => $materials
        ]);
    }

    public function edit(Request $request, AutomationRule $rule)
    {
        if ($rule->org_id !== $request->user()->org_id) {
            abort(403);
        }

        $materials = ReplyMaterial::where('org_id', $request->user()->org_id)->get();

        return Inertia::render('WhatsApp/Automation/RuleBuilder', [
            'rule' => $rule,
            'materials' => $materials
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|string',
            'trigger_config' => 'required|array',
            'action_config' => 'required|array',
        ]);

        AutomationRule::create([
            'org_id' => $request->user()->org_id,
            'name' => $request->name,
            'trigger_type' => $request->trigger_type,
            'trigger_config' => $request->input('trigger_config'),
            'action_config' => $request->input('action_config'),
            // 'is_active' defaults to true in migration
        ]);

        return redirect()->route('whatsapp.automation.index')->with('message', 'Automation rule created successfully.');
    }

    public function update(Request $request, AutomationRule $rule)
    {
        if ($rule->org_id !== $request->user()->org_id) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|string',
            'trigger_config' => 'required|array',
            'action_config' => 'required|array',
            'is_active' => 'required|boolean',
        ]);

        $rule->update([
            'name' => $request->name,
            'trigger_type' => $request->trigger_type,
            'trigger_config' => $request->input('trigger_config'),
            'action_config' => $request->input('action_config'),
            'is_active' => (bool) $request->is_active,
        ]);

        return back()->with('message', 'Automation rule updated successfully.');
    }

    public function toggle(Request $request, AutomationRule $rule)
    {
        if ($rule->org_id !== $request->user()->org_id) {
            abort(403);
        }

        \Illuminate\Support\Facades\DB::table('automation_rules')
            ->where('id', $rule->id)
            ->update(['is_active' => \Illuminate\Support\Facades\DB::raw('NOT is_active')]);

        return back()->with('message', 'Rule status updated.');
    }

    public function destroy(Request $request, AutomationRule $rule)
    {
        if ($rule->org_id !== $request->user()->org_id) {
            abort(403);
        }

        $rule->delete();

        return back()->with('message', 'Automation rule deleted successfully.');
    }
}
