import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Settings, Shield, Users, Globe, ExternalLink, 
    Bell, CreditCard, Code, Copy, Check, Save
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage({ organization, config, team, webhook_url }) {
    const [activeTab, setActiveTab] = useState('general');
    const [copied, setCopied] = useState(false);
    const { data, setData, patch, processing, errors } = useForm({
        name: organization.name || '',
    });

    const copyWebhook = () => {
        navigator.clipboard.writeText(webhook_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('settings.org.update'));
    };

    const tabs = [
        { id: 'general', label: 'General Info', icon: <Settings className="w-4 h-4" /> },
        { id: 'team', label: 'Team Members', icon: <Users className="w-4 h-4" /> },
        { id: 'api', label: 'WABA & API', icon: <Code className="w-4 h-4" /> },
        { id: 'billing', label: 'Billing & Plans', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Organization Settings" />

            <div className="py-8 px-6 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-6xl">
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-[#0B1F2A] rounded-2xl flex items-center justify-center text-white shadow-xl">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-[#0B1F2A] font-heading tracking-tight">Organization Settings</h2>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest text-[10px]">Command Center</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        
                        {/* Sidebar */}
                        <div className="space-y-2">
                            {tabs.map((item) => (
                                <button 
                                    key={item.id} 
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-white text-[#4F46E5] shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3 space-y-8">
                            
                            {/* General Profile */}
                            {activeTab === 'general' && (
                                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                                    <h3 className="text-xl font-bold text-[#0B1F2A] mb-8 font-heading flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-blue-500" />
                                        Business Profile
                                    </h3>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Organization Name</label>
                                            <input 
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                                                placeholder="Enter organization name"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-2 font-bold">{errors.name}</p>}
                                        </div>
                                        <div className="flex justify-end">
                                            <button 
                                                disabled={processing}
                                                className="bg-[#0B1F2A] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center gap-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Team Management */}
                            {activeTab === 'team' && (
                                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-bold text-[#0B1F2A] font-heading flex items-center gap-3">
                                            <Users className="w-5 h-5 text-indigo-500" />
                                            Team Members
                                        </h3>
                                        <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                                            + Invite Member
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {team.map(member => (
                                            <div key={member.id} className="py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-black text-xs border border-gray-100">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0B1F2A]">{member.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">{member.email}</p>
                                                    </div>
                                                </div>
                                                <span className="bg-green-50 text-[#25D366] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                                                    ADMIN
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Webhook Configuration */}
                            {activeTab === 'api' && (
                                <div className="bg-[#0B1F2A] rounded-[2rem] shadow-2xl p-8 text-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                            <Code className="w-5 h-5 text-[#25D366]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">Inbound Webhook</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">WABA Configuration</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-6 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                                        Configure this URL in your Meta App Developer Portal under <strong>WhatsApp &gt; Configuration</strong> to receive real-time messages and message status updates into your Team Inbox and CRM.
                                    </p>
                                    <div className="relative group">
                                        <input 
                                            type="text"
                                            readOnly
                                            value={webhook_url}
                                            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-xs font-mono text-green-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                                        />
                                        <button 
                                            onClick={copyWebhook}
                                            className="absolute right-3 top-3 bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Billing Mockup */}
                            {activeTab === 'billing' && (
                                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 text-center">
                                    <CreditCard className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                                    <h3 className="text-2xl font-black text-[#0B1F2A] mb-2 font-heading">Plan & Billing</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto text-sm font-medium mb-8">You are currently on the Free Trial. Upgrade to unlock bulk campaigns and automation.</p>
                                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 text-left">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Active Plan</p>
                                                <p className="text-lg font-bold text-[#4F46E5]">MsgOps PRO (Trial)</p>
                                            </div>
                                            <Link 
                                                href={route('billing.index')}
                                                className="bg-[#4F46E5] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center gap-2"
                                            >
                                                Upgrade
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
