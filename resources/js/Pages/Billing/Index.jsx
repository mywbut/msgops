import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckCircle2, Crown, Zap, ShieldCheck, 
    ArrowRight, MessageSquare, Briefcase, Rocket
} from 'lucide-react';

export default function Plans({ organization }) {
    const plans = [
        {
            name: 'Basic',
            price: '₹2,499',
            period: 'per month',
            description: 'Perfect for small businesses starting with WhatsApp Marketing.',
            features: [
                '1,000 Free Service Conversations',
                'Basic Campaign Engine',
                'Single Agent Team Inbox',
                'Contact Management',
                'Standard Analytics',
                'Community Support'
            ],
            icon: <Briefcase className="w-6 h-6 text-gray-500" />,
            color: 'bg-white',
            buttonLabel: 'Current Plan',
            isCurrent: true
        },
        {
            name: 'Pro',
            price: '₹5,999',
            period: 'per month',
            description: 'For growing businesses needing scale and automation.',
            features: [
                'Advanced Campaign Scheduling',
                'API & Webhook Access',
                'Up to 5 Team Agents',
                'AI Auto-Replying Logic',
                'Advanced Delivery Analytics',
                'Priority Email Support'
            ],
            icon: <Rocket className="w-6 h-6 text-[#4F46E5]" />,
            color: 'border-2 border-[#4F46E5]',
            buttonLabel: 'UPGRADE NOW',
            isCurrent: false,
            badge: 'MOST POPULAR'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact sales',
            description: 'Custom solutions for high-volume enterprise operations.',
            features: [
                'Unlimited Free Conversations',
                'Dedicated Account Manager',
                'Unlimited Team Agents',
                'Custom API Integrations',
                'Whitelabel Dashboard',
                '24/7 Phone Support'
            ],
            icon: <Crown className="w-6 h-6 text-amber-500" />,
            color: 'bg-white',
            buttonLabel: 'CONTACT US',
            isCurrent: false
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Subscription Plans" />

            <div className="py-12 px-6 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl">
                    
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#4F46E5]/10 text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                            <Zap className="w-3 h-3" />
                            Premium Pricing
                        </div>
                        <h2 className="text-4xl font-black text-[#0B1F2A] font-heading mb-4 tracking-tight">Choose Your Power Plan</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            MsgOps scale as you grow. Choose a subscription that fits your business needs. 
                            <br />
                            <span className="text-[#25D366] font-bold">Message credits are managed separately via your Wallet.</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <div 
                                key={i} 
                                className={`relative flex flex-col p-10 rounded-[2.5rem] shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 ${plan.color} ${plan.isCurrent ? 'bg-white opacity-80' : 'bg-white'}`}
                            >
                                {plan.badge && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4F46E5] text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest">
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className="p-4 rounded-2xl bg-gray-50 w-fit mb-6 shadow-sm border border-gray-100">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B1F2A] font-heading mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-3xl font-black text-[#0B1F2A]">{plan.price}</span>
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{plan.period}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                                            <span className="text-xs font-bold text-[#0B1F2A]">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    disabled={plan.isCurrent}
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${plan.isCurrent ? 'bg-gray-100 text-gray-400' : 'bg-[#0B1F2A] text-white hover:bg-black hover:shadow-indigo-200'}`}
                                >
                                    {plan.buttonLabel}
                                    {!plan.isCurrent && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Mini Section */}
                    <div className="mt-20 max-w-3xl mx-auto bg-[#0B1F2A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md">
                                <ShieldCheck className="w-10 h-10 text-[#25D366]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 font-heading">How do message credits work?</h3>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                    Subscriptions cover the platform usage and features. Message costs (Conversations) are deducted from your balance in real-time. 
                                    <Link href={route('billing.credits')} className="text-[#25D366] font-bold underline underline-offset-4 ml-1">Go to Wallet &rarr;</Link>
                                </p>
                            </div>
                        </div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
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
