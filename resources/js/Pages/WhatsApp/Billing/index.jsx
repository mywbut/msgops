import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Check, Zap, Rocket, Shield, ArrowRight } from 'lucide-react';

export default function BillingIndex({ organization, plans }) {
    const { post, processing } = useForm();

    const handleUpgrade = (planId) => {
        post(route('billing.upgrade', { plan: planId }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pricing & Plans" />

            <div className="py-12 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl px-6">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#0B1F2A] font-heading mb-4">Choose Your Growth Engine</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Scale your WhatsApp operations with precision. Switch plans anytime as your team grows.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`relative bg-white rounded-[2.5rem] p-10 shadow-sm border ${plan.name === 'Pro' ? 'border-[#4F46E5] ring-4 ring-indigo-50' : 'border-gray-100'} transition-all hover:shadow-xl group`}>
                                {plan.name === 'Pro' && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}
                                
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#0B1F2A] mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-[#0B1F2A]">${plan.price}</span>
                                        <span className="text-gray-400 font-bold text-sm">/mo</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-[#25D366]" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => handleUpgrade(plan.id)}
                                    disabled={processing || plan.current}
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${plan.current ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0B1F2A] text-white hover:bg-black shadow-xl active:scale-95'}`}
                                >
                                    {plan.current ? 'CURRENT PLAN' : 'SELECT PLAN'}
                                    {!plan.current && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-[#0B1F2A] rounded-[3rem] p-12 text-white overflow-hidden relative">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-md">
                                <h3 className="text-3xl font-bold mb-4 font-heading underline underline-offset-8 decoration-[#25D366]">Enterprise Support</h3>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">Need custom message volumes or dedicated account management? Our enterprise team is ready to build a bespoke solution for your global brand.</p>
                            </div>
                            <button className="bg-[#25D366] text-[#0B1F2A] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-900/20">
                                Contact Sales
                            </button>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#4F46E5] rounded-full blur-[120px] opacity-20"></div>
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
