import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    X, 
    MessageSquare, 
    Send, 
    ExternalLink, 
    Edit3, 
    Trash2, 
    RefreshCw, 
    Plus,
    Layout,
    Globe,
    CheckCircle2,
    Eye
} from 'lucide-react';

export default function Index({ isConnected, templates, apiError, success, flashError }) {
    const [previewTemplate, setPreviewTemplate] = useState(null);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-700 border-green-200 shadow-green-100';
            case 'REJECTED':
                return 'bg-red-100 text-red-700 border-red-200 shadow-red-100';
            case 'PENDING':
            case 'IN_APPEAL':
                return 'bg-amber-100 text-amber-700 border-amber-200 shadow-amber-100';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200 shadow-gray-100';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-white py-6 px-10 border-b border-gray-50">
                    <div>
                        <h2 className="text-3xl font-black text-[#0B1F2A] font-heading tracking-tight">Template Messages</h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">Manage and sync your WhatsApp message templates</p>
                    </div>
                    <div className="flex gap-4">
                        {isConnected && (
                            <>
                                <Link 
                                    href={route('whatsapp.templates.sync')} 
                                    method="post" 
                                    as="button"
                                    className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-[#4F46E5] bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all border border-indigo-100 flex items-center gap-2 group shadow-sm active:scale-95"
                                >
                                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    Sync Templates
                                </Link>
                                <Link
                                    href={route('whatsapp.templates.create')}
                                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-2.5 rounded-2xl shadow-xl shadow-[#25D366]/20 text-[10px] uppercase font-black tracking-[0.15em] transition-all transform hover:-translate-y-0.5 flex items-center gap-3 active:scale-95"
                                >
                                    <Plus className="w-4 h-4" />
                                    New Template
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="WhatsApp Templates" />

            <div className="py-10 px-10">
                <div className="mx-auto max-w-[1400px]">
                    
                    {/* Alerts Stack */}
                    <div className="space-y-4 mb-10">
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-800 shadow-sm animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                                <span className="text-sm font-bold tracking-tight">{success}</span>
                            </div>
                        )}
                        
                        {(apiError || flashError) && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-800 shadow-sm">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                <span className="text-sm font-bold tracking-tight">{apiError || flashError}</span>
                            </div>
                        )}

                        {!isConnected && (
                            <div className="p-10 bg-amber-50 border border-amber-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-amber-100 rounded-[1.5rem] text-amber-600 shadow-sm">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-[#0B1F2A] tracking-tight mb-1">WhatsApp is not connected</p>
                                        <p className="text-sm text-gray-500 font-medium">Connect your account to create and manage templates seamlessly.</p>
                                    </div>
                                </div>
                                <Link href={route('whatsapp.connect')} className="px-10 py-3.5 bg-[#0B1F2A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95">Go to Connection Page</Link>
                            </div>
                        )}
                    </div>

                    {/* Templates Table Container */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-50 overflow-hidden">
                        {isConnected && templates.length === 0 && !apiError ? (
                            <div className="text-center py-32 px-10">
                                <div className="w-32 h-32 bg-gray-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-gray-200">
                                    <MessageSquare className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-black text-[#0B1F2A] mb-4 tracking-tight">No Templates Available</h3>
                                <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">Create your first template message to start reaching out and engaging with your customers.</p>
                                <Link 
                                    href={route('whatsapp.templates.create')} 
                                    className="px-12 py-3.5 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-[#25D366]/30 transition-all hover:-translate-y-1 active:scale-95"
                                >
                                    Create Template
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#F8FAFC] border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            <th className="px-10 py-6">Template Name</th>
                                            <th className="px-8 py-6">Category</th>
                                            <th className="px-8 py-6 text-center">Language</th>
                                            <th className="px-8 py-6 text-center">Status</th>
                                            <th className="px-10 py-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50/50">
                                        {(templates || []).map((tpl) => (
                                            <tr key={tpl.id} className="group hover:bg-[#F8FAFC]/50 transition-all">
                                                <td className="px-10 py-6">
                                                    <button 
                                                        onClick={() => setPreviewTemplate(tpl)}
                                                        className="text-left group/name"
                                                    >
                                                        <div className="font-black text-[#0B1F2A] text-base group-hover/name:text-[#25D366] transition-colors tracking-tight flex items-center gap-2">
                                                            {tpl.name}
                                                            <Eye className="w-3 h-3 opacity-0 group-hover/name:opacity-100 transition-opacity text-gray-300" />
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">ID: {tpl.id || 'Pending Meta Sync'}</div>
                                                    </button>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] font-black px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl uppercase tracking-widest">
                                                        {tpl.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{tpl.language}</span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`px-4 py-1.5 text-[10px] font-black rounded-xl border shadow-sm ${getStatusStyle(tpl.status)}`}>
                                                        {tpl.status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                        {tpl.status === 'APPROVED' && (
                                                            <Link
                                                                href={route('whatsapp.campaigns.create', { template_name: tpl.name, language: tpl.language })}
                                                                className="p-3 bg-white border border-gray-50 shadow-sm text-gray-400 hover:text-[#25D366] hover:bg-green-50 rounded-[1.25rem] transition-all transform hover:scale-110"
                                                                title="Send Campaign"
                                                            >
                                                                <Send className="w-5 h-5" />
                                                            </Link>
                                                        )}
                                                        <Link
                                                            href={route('whatsapp.templates.edit', { name: tpl.name, language: tpl.language })}
                                                            className="p-3 bg-white border border-gray-50 shadow-sm text-gray-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-[1.25rem] transition-all transform hover:scale-110"
                                                            title="Edit / Reuse"
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </Link>
                                                        <button 
                                                            className="p-3 bg-white border border-gray-50 shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[1.25rem] transition-all transform hover:scale-110" 
                                                            title="Delete"
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

            {/* Template Preview Modal */}
            {previewTemplate && (
                <div 
                    className="fixed inset-0 z-50 bg-[#0B1F2A]/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
                    onClick={() => setPreviewTemplate(null)}
                >
                    <div 
                        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-scale-up border border-white/20"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-10 py-10 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div>
                                <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">{previewTemplate.name.replace(/_/g, ' ')}</h3>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest">{previewTemplate.category}</span>
                                    <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black rounded-lg uppercase tracking-widest">{previewTemplate.language}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setPreviewTemplate(null)}
                                className="p-4 text-gray-400 hover:text-[#0B1F2A] hover:bg-gray-50 rounded-[1.5rem] transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Modal Content: Visual Bubble */}
                        <div className="p-10 bg-[#F8FAFC]">
                            <div className="max-w-md mx-auto">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Phone Preview</p>
                                
                                <div className="bg-[#E7FFDB] p-8 rounded-[2.5rem] shadow-2xl shadow-[#25D366]/10 border border-[#D0E5C9] relative mb-10">
                                    <div className="absolute -left-2 top-10 w-6 h-6 bg-[#E7FFDB] border-l border-t border-[#D0E5C9] rotate-[-45deg]"></div>
                                    
                                    <div className="space-y-5">
                                        {(previewTemplate.components || []).map((comp, idx) => {
                                            if (comp.type === 'HEADER') {
                                                if (comp.format === 'TEXT') {
                                                    return <div key={idx} className="font-black text-[#0B1F2A] text-base mb-2 tracking-tight">{comp.text}</div>
                                                }
                                                if (comp.format === 'IMAGE' || comp.format === 'VIDEO' || comp.format === 'DOCUMENT') {
                                                    return <div key={idx} className="w-full aspect-video bg-black/5 rounded-2xl flex items-center justify-center text-gray-300 text-[10px] font-black uppercase tracking-widest border border-black/5">{comp.format} Header</div>
                                                }
                                            }
                                            if (comp.type === 'BODY') {
                                                return <p key={idx} className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">{comp.text}</p>
                                            }
                                            if (comp.type === 'FOOTER') {
                                                return <p key={idx} className="text-[11px] text-gray-400/80 font-bold tracking-tight">{comp.text}</p>
                                            }
                                            if (comp.type === 'BUTTONS') {
                                                return (
                                                    <div key={idx} className="pt-5 border-t border-black/5 flex flex-col gap-2">
                                                        {comp.buttons.map((b, bIdx) => (
                                                            <div key={bIdx} className="w-full py-3 bg-white/50 rounded-2xl text-center text-blue-500 font-black text-[10px] uppercase tracking-widest border border-white/60 shadow-sm flex items-center justify-center gap-2">
                                                                {b.type === 'URL' ? <ExternalLink className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                                                                {b.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })}
                                    </div>
                                    <div className="mt-4 text-right">
                                        <span className="text-[9px] font-black text-[#25D366]/60 uppercase tracking-widest">11:08 PM</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link 
                                        href={route('whatsapp.campaigns.create', { template_name: previewTemplate.name, language: previewTemplate.language })}
                                        className="flex-1 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
                                    >
                                        Use This Template
                                        <Send className="w-4 h-4" />
                                    </Link>
                                    <Link 
                                        href={route('whatsapp.templates.edit', { name: previewTemplate.name, language: previewTemplate.language })}
                                        className="px-6 py-4 bg-white text-[#0B1F2A] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', 'Inter', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}} />
        </AuthenticatedLayout>
    );
}
