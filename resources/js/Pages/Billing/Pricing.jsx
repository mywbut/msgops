import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Check, Zap, MessageSquare, Info, 
    ShieldCheck, HelpCircle, ArrowRight, Star
} from 'lucide-react';

export default function Pricing({ organization }) {
    const plans = [
        {
            name: 'Starter',
            price: '99',
            description: 'Best for small businesses getting started',
            features: [
                '1 WhatsApp Number',
                'Basic Inbox',
                'Manual messaging',
                '1 Automation flow',
                'Email support'
            ],
            cta: 'Start Free Trial',
            color: 'border-gray-100',
            icon: <Zap className="w-6 h-6 text-gray-400" />
        },
        {
            name: 'Growth',
            price: '299',
            tag: 'Most Popular',
            description: 'For growing businesses needing scale and automation.',
            features: [
                'Everything in Starter',
                'Bulk messaging',
                'Advanced automation',
                'Contact management',
                'Basic analytics'
            ],
            cta: 'Start Free Trial',
            color: 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10',
            icon: <Star className="w-6 h-6 text-[#4F46E5]" />,
            isPopular: true
        },
        {
            name: 'Pro',
            price: '499',
            description: 'Advanced tools for high-volume operations.',
            features: [
                'Everything in Growth',
                'Multi-agent inbox',
                'Advanced automation flows',
                'Campaign tracking',
                'Priority support'
            ],
            cta: 'Start Free Trial',
            color: 'border-gray-100',
            icon: <Zap className="w-6 h-6 text-[#25D366]" />
        }
    ];

    const faqs = [
        {
            q: "Do you charge per WhatsApp message?",
            a: "No. WhatsApp charges are applied by Meta directly. MsgOps does not charge per message."
        },
        {
            q: "What is MsgOps Balance?",
            a: "It is used for automation, AI responses, and additional features (add-ons)."
        },
        {
            q: "Can I cancel anytime?",
            a: "Yes, you can cancel your subscription anytime from the billing settings."
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Pricing" />

            <div className="py-20 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">
                            Simple & Transparent Pricing
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                            Pay only for MsgOps features. WhatsApp message charges are billed separately by Meta.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366]" /> No hidden charges</span>
                            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366]" /> Cancel anytime</span>
                            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#25D366]" /> Setup in minutes</span>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {plans.map((plan, i) => (
                            <div 
                                key={i} 
                                className={`relative bg-white p-10 rounded-[2.5rem] shadow-sm border transition-all hover:shadow-xl hover:-translate-y-2 flex flex-col ${plan.color}`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4F46E5] text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={`p-4 rounded-2xl w-fit mb-6 shadow-sm border border-gray-50 ${plan.isPopular ? 'bg-[#4F46E5]/5' : 'bg-gray-50'}`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0B1F2A] font-heading mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-black text-[#0B1F2A]">₹{plan.price}</span>
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">/ month</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            <div className="mt-1 bg-[#25D366]/10 p-0.5 rounded-full">
                                                <Check className="w-3 h-3 text-[#25D366]" />
                                            </div>
                                            <span className="text-xs font-bold text-[#0B1F2A]">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${plan.isPopular ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-green-100' : 'bg-[#0B1F2A] text-white hover:bg-black'}`}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Usage Based Pricing */}
                    <div className="mb-20 bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Usage-Based Charges (MsgOps)</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <span className="text-sm font-bold text-[#0B1F2A]">Automation triggers</span>
                                        <span className="text-[#4F46E5] font-black">₹0.05 – ₹0.20 <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">per execution</span></span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <span className="text-sm font-bold text-[#0B1F2A]">AI responses</span>
                                        <span className="text-[#4F46E5] font-black">₹1.00 <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">per response</span></span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <span className="text-sm font-bold text-[#0B1F2A]">Additional agents</span>
                                        <span className="text-[#4F46E5] font-black">₹99 <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">per user / month</span></span>
                                    </div>
                                </div>
                                <p className="mt-8 flex items-center gap-2 text-xs font-medium text-gray-400">
                                    <Info className="w-4 h-4 text-[#4F46E5]" />
                                    These charges are deducted from your MsgOps balance.
                                </p>
                            </div>
                            <div className="bg-[#4F46E5]/5 p-8 rounded-[2.5rem] border border-[#4F46E5]/10">
                                <div className="bg-[#4F46E5] w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-[#0B1F2A] font-heading mb-4">WhatsApp Message Charges</h3>
                                <p className="text-sm text-[#0B1F2A] font-medium leading-relaxed mb-4">
                                    Meta charges per conversation directly from your account. 
                                </p>
                                <p className="text-sm font-black text-[#4F46E5]">
                                    MsgOps does NOT charge per message.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-20 overflow-hidden bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="p-10 border-b border-gray-50">
                            <h2 className="text-2xl font-black text-[#0B1F2A] font-heading">Plan Comparison</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-widest">Feature</th>
                                        <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-widest">Starter</th>
                                        <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-widest text-[#4F46E5]">Growth</th>
                                        <th className="p-8 text-xs font-black text-gray-400 uppercase tracking-widest">Pro</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <tr>
                                        <td className="p-8 text-sm font-bold text-[#0B1F2A]">WhatsApp Number</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">1</td>
                                        <td className="p-8 text-sm font-black text-[#0B1F2A]">1</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">1</td>
                                    </tr>
                                    <tr>
                                        <td className="p-8 text-sm font-bold text-[#0B1F2A]">Automation</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">Basic</td>
                                        <td className="p-8 text-sm font-black text-[#4F46E5]">Advanced</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">Advanced+</td>
                                    </tr>
                                    <tr>
                                        <td className="p-8 text-sm font-bold text-[#0B1F2A]">Bulk Messaging</td>
                                        <td className="p-8 text-red-400 text-lg">×</td>
                                        <td className="p-8 text-[#25D366] text-lg">✔</td>
                                        <td className="p-8 text-[#25D366] text-lg">✔</td>
                                    </tr>
                                    <tr>
                                        <td className="p-8 text-sm font-bold text-[#0B1F2A]">Team Inbox</td>
                                        <td className="p-8 text-red-400 text-lg">×</td>
                                        <td className="p-8 text-red-400 text-lg">×</td>
                                        <td className="p-8 text-[#25D366] text-lg">✔</td>
                                    </tr>
                                    <tr>
                                        <td className="p-8 text-sm font-bold text-[#0B1F2A]">Support</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">Email</td>
                                        <td className="p-8 text-sm font-black text-[#0B1F2A]">Email</td>
                                        <td className="p-8 text-sm font-medium text-gray-500">Priority</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black text-[#0B1F2A] font-heading mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex gap-6 items-start">
                                    <div className="bg-[#4F46E5]/10 p-3 rounded-2xl text-[#4F46E5]">
                                        <HelpCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-[#0B1F2A] mb-2">{faq.q}</h4>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="bg-[#0B1F2A] p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-white font-heading mb-6 tracking-tight">
                                Start Growing Your Business on WhatsApp Today 🚀
                            </h2>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                                <button className="px-10 py-5 bg-[#25D366] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:-translate-y-1 transition-all">
                                    Start Free Trial
                                </button>
                                <button className="px-10 py-5 bg-white text-[#0B1F2A] rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-gray-50 hover:-translate-y-1 transition-all">
                                    Chat on WhatsApp
                                </button>
                            </div>
                        </div>
                        {/* Blob decorations */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4F46E5] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
