import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Zap, CreditCard, Box, MessageSquare,
    Info, AlertTriangle, ArrowRight, ShieldCheck,
    Plus, ExternalLink, RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export default function BillingIndex({
    balance,
    currency,
    freeConversations,
    transactions,
    plan,
    usage
}) {
    const [rechargeAmount, setRechargeAmount] = useState('');
    const { post, processing } = useForm({
        amount: '',
    });

    const handleRecharge = (amount) => {
        post(route('billing.buy-credits', { amount: amount || rechargeAmount }));
    };

    const quickOptions = [500, 1000, 2000];

    return (
        <AuthenticatedLayout>
            <Head title="Billing & Usage" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-[#0B1F2A] font-heading">Billing & Usage</h1>
                        <p className="text-gray-500 text-sm font-medium mt-1">
                            Manage your MsgOps subscription and usage. WhatsApp charges are billed separately by Meta.
                        </p>
                    </div>

                    {/* Low Balance Alert */}
                    {balance < 50 && (
                        <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="text-amber-500 w-5 h-5" />
                                <p className="text-amber-800 font-bold text-sm">
                                    Your balance is low. Recharge to continue automation.
                                </p>
                            </div>
                            <button
                                onClick={() => document.getElementById('recharge-section').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-amber-600 transition-colors"
                            >
                                Recharge Now
                            </button>
                        </div>
                    )}

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Card 1: MsgOps Balance */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-4 text-[#25D366]">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">MsgOps Balance</h3>
                            <div className="text-4xl font-black text-[#0B1F2A] mb-2">{currency} {balance}</div>
                            <p className="text-[10px] text-gray-400 font-medium mb-6">Used for automation, AI & add-ons</p>
                            <button
                                onClick={() => document.getElementById('recharge-section').scrollIntoView({ behavior: 'smooth' })}
                                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1ebe5d] transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Balance
                            </button>
                        </div>

                        {/* Card 2: Current Plan */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-2xl flex items-center justify-center mb-4 text-[#4F46E5]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Current Plan</h3>
                            <div className="text-2xl font-black text-[#0B1F2A] mb-1">{plan.name} Plan</div>
                            <div className="text-xl font-bold text-[#4F46E5] mb-2">{plan.price} / {plan.period}</div>
                            <p className="text-[10px] text-gray-400 font-medium mb-6">Next billing: {plan.next_billing}</p>
                            <Link
                                href={route('billing.pricing')}
                                className="w-full bg-[#0B1F2A] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
                            >
                                Upgrade Plan
                            </Link>
                        </div>

                        {/* Card 3: Meta Charges */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Meta Charges (Read-only)</h3>
                            <div className="text-4xl font-black text-[#0B1F2A] mb-2">₹ 0.00</div>
                            <p className="text-[10px] text-gray-400 font-medium mb-6">WhatsApp Charges Paid directly to Meta</p>
                            <a
                                href="https://business.facebook.com/"
                                target="_blank"
                                className="text-[#4F46E5] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:underline"
                            >
                                View in Meta Manager <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                        {/* Usage Breakdown */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-[#0B1F2A] font-heading mb-6">Usage This Month</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Feature</th>
                                            <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Usage</th>
                                            <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <tr>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">Automation Triggers</td>
                                            <td className="py-4 text-sm font-medium text-gray-500">{usage.automation.count}</td>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">₹{usage.automation.cost}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">AI Responses</td>
                                            <td className="py-4 text-sm font-medium text-gray-500">{usage.ai.count}</td>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">₹{usage.ai.cost}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">Additional Agents</td>
                                            <td className="py-4 text-sm font-medium text-gray-500">{usage.agents.count}</td>
                                            <td className="py-4 text-sm font-bold text-[#0B1F2A]">₹{usage.agents.cost}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2" className="pt-6 text-sm font-black text-[#0B1F2A] uppercase tracking-wider">Total Usage Cost:</td>
                                            <td className="pt-6 text-xl font-black text-[#25D366]">₹{usage.total_cost}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Automation Usage</span>
                                    <span className="text-xs font-bold text-[#0B1F2A]">{usage.automation.count} / {usage.automation.limit} free</span>
                                </div>
                                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                    <div
                                        className="bg-[#25D366] h-full transition-all duration-500"
                                        style={{ width: `${(usage.automation.count / usage.automation.limit) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="mt-2 text-[10px] text-gray-400 font-medium text-right">Remaining usage: {usage.automation.limit - usage.automation.count}</p>
                            </div>
                        </div>

                        {/* Add Balance Section */}
                        <div id="recharge-section" className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
                            <h3 className="text-xl font-black text-[#0B1F2A] font-heading mb-6">Recharge Balance</h3>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {quickOptions.map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setRechargeAmount(amount.toString())}
                                        className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${rechargeAmount === amount.toString()
                                                ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]'
                                                : 'border-gray-100 text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        ₹{amount}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Enter amount: ₹</label>
                                <input
                                    type="number"
                                    value={rechargeAmount}
                                    onChange={(e) => setRechargeAmount(e.target.value)}
                                    placeholder="Enter custom amount"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#25D366] text-lg font-bold"
                                />
                            </div>

                            <button
                                disabled={!rechargeAmount || processing}
                                onClick={() => handleRecharge()}
                                className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                            >
                                <Plus className="w-5 h-5" /> Add Balance
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-40">
                                <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Secure payment via Razorpay / UPI / Cards
                                </p>
                            </div>

                            {/* Auto Recharge Toggle */}
                            <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs font-black text-[#0B1F2A] uppercase tracking-widest mb-1">Enable Auto Recharge</h4>
                                    <p className="text-[10px] text-gray-400 font-medium leading-tight">Recharge ₹500 when balance &lt; ₹50</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-[#0B1F2A] font-heading">Transaction History</h3>
                            <button className="flex items-center gap-2 text-xs font-black text-[#4F46E5] uppercase tracking-widest hover:underline">
                                <RefreshCw className="w-4 h-4" /> Refresh
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-50">
                                        <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                                        <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                                        <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                        <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {transactions.length > 0 ? transactions.map((tx, idx) => (
                                        <tr key={idx}>
                                            <td className="py-4 text-sm font-medium text-gray-500">
                                                {new Date(tx.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="py-4">
                                                <span className="text-sm font-bold text-[#0B1F2A]">{tx.description || tx.type}</span>
                                            </td>
                                            <td className={`py-4 text-sm font-black ${tx.amount > 0 ? 'text-[#25D366]' : 'text-red-500'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                                            </td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-green-50 text-[#25D366] text-[10px] font-black uppercase tracking-widest rounded-full">Success</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="py-10 text-center text-gray-400 font-medium">No transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Billing Clarity Box */}
                    <div className="bg-[#4F46E5]/5 p-8 rounded-[2.5rem] border border-[#4F46E5]/10 flex items-start gap-6">
                        <div className="bg-[#4F46E5] p-4 rounded-2xl text-white">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#0B1F2A] leading-relaxed">
                                <span className="font-black">ℹ️ WhatsApp message charges are billed directly by Meta.</span>
                                <br />
                                MsgOps balance is used only for automation and platform features.
                                <br />
                                <span className="text-xs text-gray-400 mt-2 block">No hidden charges from MsgOps. Meta charges apply separately.</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
