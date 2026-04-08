import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Plus, 
    MessageSquare, 
    Zap, 
    MoreVertical, 
    Trash2, 
    Edit3, 
    Play, 
    Pause,
    ChevronRight,
    Library
} from 'lucide-react';

export default function Index({ rules, materials }) {
    const { post, delete: destroyRule } = useForm();
    const [searchTerm, setSearchTerm] = useState('');

    const toggleRule = (id) => {
        post(route('whatsapp.automation.toggle', id));
    };

    const deleteRule = (id) => {
        if (confirm('Are you sure you want to delete this rule?')) {
            destroyRule(route('whatsapp.automation.destroy', id));
        }
    };

    const getTriggerPreview = (config) => {
        if (!config || !config.keywords || config.keywords.length === 0) return 'All Messages';
        return config.keywords.slice(0, 2).join(', ') + (config.keywords.length > 2 ? '...' : '');
    };

    const getActionPreview = (config) => {
        if (!config || config.length === 0) return 'No Action';
        const firstAction = config[0];
        if (firstAction.type === 'send_message') {
            const material = materials.find(m => m.id === firstAction.reply_material_id);
            return `Send: ${material ? material.name : 'Unknown'}`;
        }
        return firstAction.type;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-white py-6 px-10 border-b border-gray-50">
                    <div>
                        <h2 className="text-3xl font-black text-[#0B1F2A] font-heading tracking-tight">Automation Rules</h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">Auto-respond to customers based on keywords and triggers</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href={route('whatsapp.reply-material.index')}
                            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-gray-100 flex items-center gap-2 group shadow-sm active:scale-95"
                        >
                            <Library className="w-4 h-4" />
                            Content Library
                        </Link>
                        <Link
                            href={route('whatsapp.automation.create')}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-2.5 rounded-2xl shadow-xl shadow-[#25D366]/20 text-[10px] uppercase font-black tracking-[0.15em] transition-all transform hover:-translate-y-0.5 flex items-center gap-3 active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Create Rules
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="WhatsApp Automation Rules" />

            <div className="py-10 px-10">
                <div className="mx-auto max-w-[1400px]">
                    
                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-gray-50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-50 text-[#25D366] rounded-2xl">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Rules</span>
                            </div>
                            <div className="text-4xl font-black text-[#0B1F2A] tracking-tighter">
                                {rules.filter(r => r.is_active).length}
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-gray-50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-indigo-50 text-[#4F46E5] rounded-2xl">
                                    <Play className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Executions</span>
                            </div>
                            <div className="text-4xl font-black text-[#0B1F2A] tracking-tighter">
                                {rules.reduce((acc, r) => acc + (r.executed_count || 0), 0)}
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-gray-50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Response Library</span>
                            </div>
                            <div className="text-4xl font-black text-[#0B1F2A] tracking-tighter">
                                {materials.length}
                            </div>
                        </div>
                    </div>

                    {/* Rules Table */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 overflow-hidden">
                        {rules.length === 0 ? (
                            <div className="text-center py-32 px-10">
                                <div className="w-32 h-32 bg-gray-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-gray-200">
                                    <Zap className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-black text-[#0B1F2A] mb-4 tracking-tight">No Automation Rules</h3>
                                <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">Set up triggers and auto-replies to provide instant support for your customers 24/7.</p>
                                <button className="px-12 py-3.5 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-[#25D366]/30 transition-all hover:-translate-y-1 active:scale-95">
                                    Create First Rule
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#F8FAFC] border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            <th className="px-10 py-6">Rule Name</th>
                                            <th className="px-8 py-6">Trigger Type</th>
                                            <th className="px-8 py-6">Action</th>
                                            <th className="px-8 py-6 text-center">Status</th>
                                            <th className="px-8 py-6 text-center">Executed</th>
                                            <th className="px-8 py-6">Last Updated</th>
                                            <th className="px-10 py-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50/50">
                                        {rules.map((rule) => (
                                            <tr key={rule.id} className="group hover:bg-[#F8FAFC]/50 transition-all">
                                                <td className="px-10 py-6">
                                                    <div className="font-black text-[#0B1F2A] text-base tracking-tight">{rule.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ID: {rule.id.slice(0, 8)}...</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                                                        {getTriggerPreview(rule.trigger_config)}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-sm font-bold text-gray-600">
                                                        {getActionPreview(rule.action_config)}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <button 
                                                        onClick={() => toggleRule(rule.id)}
                                                        className={`w-14 h-7 rounded-full p-1 transition-all duration-300 relative ${rule.is_active ? 'bg-[#25D366]' : 'bg-gray-200'}`}
                                                    >
                                                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${rule.is_active ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                                    </button>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="font-black text-[#0B1F2A] bg-gray-100 px-3 py-1 rounded-lg text-xs">{rule.executed_count || 0}</span>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-400 font-medium whitespace-nowrap">
                                                    {new Date(rule.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-10 py-6 text-right font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <Link 
                                                            href={route('whatsapp.automation.edit', rule.id)}
                                                            className="p-3 text-gray-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-xl transition-all"
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </Link>
                                                        <button 
                                                            onClick={() => deleteRule(rule.id)}
                                                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', 'Inter', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
