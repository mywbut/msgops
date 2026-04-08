import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    X, 
    Zap, 
    MessageSquare, 
    MousePointer2, 
    Settings2, 
    Trash2, 
    Plus,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Search,
    ImageIcon,
    FileText,
    Film,
    Smile
} from 'lucide-react';

export default function RuleBuilder({ rule = null, materials = [] }) {
    const { data, setData, post, patch, processing, errors } = useForm({
        name: rule?.name || '',
        trigger_type: rule?.trigger_type || 'message_received',
        trigger_config: rule?.trigger_config || {
            matching_method: 'contains',
            keywords: [],
            threshold: 0.8
        },
        action_config: rule?.action_config || [{
            type: 'send_message',
            reply_material_id: ''
        }],
        is_active: rule?.is_active ?? true
    });

    const [keywordInput, setKeywordInput] = useState('');
    const [selectedStep, setSelectedStep] = useState(1); // 1: Trigger, 2: Actions, 3: Settings

    const addKeyword = () => {
        if (!keywordInput.trim()) return;
        const keywords = [...data.trigger_config.keywords];
        if (!keywords.includes(keywordInput.trim())) {
            keywords.push(keywordInput.trim());
            setData('trigger_config', { ...data.trigger_config, keywords });
        }
        setKeywordInput('');
    };

    const removeKeyword = (kw) => {
        const keywords = data.trigger_config.keywords.filter(k => k !== kw);
        setData('trigger_config', { ...data.trigger_config, keywords });
    };

    const updateAction = (index, materialId) => {
        const action_config = [...data.action_config];
        action_config[index] = { ...action_config[index], reply_material_id: materialId };
        setData('action_config', action_config);
    };

    const submit = (e) => {
        e.preventDefault();
        if (rule) {
            patch(route('whatsapp.automation.update', rule.id));
        } else {
            post(route('whatsapp.automation.store'));
        }
    };

    const getMaterialIcon = (type) => {
        switch (type) {
            case 'image': return <ImageIcon className="w-4 h-4" />;
            case 'video': return <Film className="w-4 h-4" />;
            case 'document': return <FileText className="w-4 h-4" />;
            case 'sticker': return <Smile className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-white py-6 px-10 border-b border-gray-50">
                    <div className="flex items-center gap-6">
                        <Link 
                            href={route('whatsapp.automation.index')}
                            className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-[#0B1F2A]"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-black text-[#0B1F2A] font-heading tracking-tight">
                                {rule ? 'Edit Automation Rule' : 'New Automation Rule'}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${selectedStep === 1 ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-400'}`}>1. Trigger</span>
                                <ChevronRight className="w-3 h-3 text-gray-200" />
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${selectedStep === 2 ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-400'}`}>2. Actions</span>
                                <ChevronRight className="w-3 h-3 text-gray-200" />
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${selectedStep === 3 ? 'bg-[#25D366] text-white' : 'bg-gray-100 text-gray-400'}`}>3. Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={rule ? 'Edit Rule' : 'New Rule'} />

            <div className="py-12 px-10">
                <div className="mx-auto max-w-[1000px]">
                    <form onSubmit={submit} className="flex flex-col gap-10">
                        
                        {/* STEP 1: TRIGGER */}
                        <div className={`bg-white rounded-[3rem] p-10 shadow-xl shadow-black/5 border border-gray-50 transition-all ${selectedStep === 1 ? 'ring-4 ring-[#25D366]/5 border-[#25D366]' : 'opacity-60 scale-[0.98]'}`}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-[#25D366]/10 text-[#25D366] rounded-3xl">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">Step 1: The Trigger</h3>
                                    <p className="text-sm font-medium text-gray-400">Define when this automation should start</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Matching Strategy</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['contains', 'exact', 'fuzzy'].map((method) => (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() => setData('trigger_config', { ...data.trigger_config, matching_method: method })}
                                                className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-3 group ${
                                                    data.trigger_config.matching_method === method 
                                                    ? 'border-[#25D366] bg-[#25D366]/5' 
                                                    : 'border-gray-50 hover:border-gray-200'
                                                }`}
                                            >
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                                                    data.trigger_config.matching_method === method ? 'bg-[#25D366] text-white shadow-xl' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {method === 'exact' ? <CheckCircle2 className="w-5 h-5" /> : method === 'fuzzy' ? <Zap className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                                                </div>
                                                <div className="font-black text-[#0B1F2A] text-sm uppercase tracking-widest">{method} match</div>
                                                <div className="text-xs text-gray-400 font-medium leading-relaxed">
                                                    {method === 'exact' && 'Only triggers if the message is identical to keywords.'}
                                                    {method === 'contains' && 'Triggers if any keyword exists within the message.'}
                                                    {method === 'fuzzy' && 'Triggers even with typos. Uses smart similarity.'}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Keywords</label>
                                    <div className="relative mb-6">
                                        <input 
                                            type="text"
                                            placeholder="Type keyword and press Enter..."
                                            value={keywordInput}
                                            onChange={e => setKeywordInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                                            className="w-full px-8 py-5 bg-[#F8FAFC] border border-gray-100 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all outline-none"
                                        />
                                        <button 
                                            type="button"
                                            onClick={addKeyword}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#0B1F2A] text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {data.trigger_config.keywords.map((kw, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-white border border-gray-100 text-[#0B1F2A] text-sm font-bold rounded-2xl flex items-center gap-3 shadow-sm group">
                                                {kw}
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeKeyword(kw)}
                                                    className="p-1 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {selectedStep === 1 && (
                                <div className="mt-12 pt-10 border-t border-gray-50 flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedStep(2)}
                                        className="px-10 py-4 bg-[#0B1F2A] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-black/10 transition-all"
                                    >
                                        Configure Actions
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* STEP 2: ACTIONS */}
                        <div className={`bg-white rounded-[3rem] p-10 shadow-xl shadow-black/5 border border-gray-50 transition-all ${selectedStep === 2 ? 'ring-4 ring-[#25D366]/5 border-[#25D366]' : 'opacity-60 scale-[0.98]'}`}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-indigo-50 text-[#4F46E5] rounded-3xl">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">Step 2: The Action</h3>
                                    <p className="text-sm font-medium text-gray-400">Define what the bot should do when triggered</p>
                                </div>
                            </div>

                            {data.action_config.map((action, index) => (
                                <div key={index} className="space-y-6">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Send Content From Library</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {materials.length === 0 ? (
                                            <div className="col-span-2 p-12 bg-amber-50 border border-amber-100 rounded-[2rem] text-center">
                                                <p className="text-amber-800 font-bold mb-4 italic">You haven't added any reply materials yet.</p>
                                                <Link 
                                                    href={route('whatsapp.reply-material.index')} 
                                                    className="text-xs font-black uppercase tracking-widest text-[#0B1F2A] underline underline-offset-8"
                                                >
                                                    Go to Reply Material Library
                                                </Link>
                                            </div>
                                        ) : (
                                            materials.map((m) => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => updateAction(index, m.id)}
                                                    className={`p-6 rounded-[2rem] border-2 text-left transition-all flex flex-col gap-3 group relative ${
                                                        action.reply_material_id === m.id 
                                                        ? 'border-[#25D366] bg-[#25D366]/5' 
                                                        : 'border-gray-50 hover:border-gray-200'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2.5 rounded-xl ${action.reply_material_id === m.id ? 'bg-[#25D366] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                                                            {getMaterialIcon(m.type)}
                                                        </div>
                                                        <div className="font-black text-[#0B1F2A] text-sm uppercase tracking-widest">{m.name}</div>
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-medium line-clamp-2 italic">
                                                        {m.type === 'text' ? m.content.body : `[${m.type.toUpperCase()}] ${m.content.caption || 'No caption'}`}
                                                    </p>
                                                    {action.reply_material_id === m.id && (
                                                        <div className="absolute top-6 right-6">
                                                            <div className="p-1 bg-[#25D366] text-white rounded-full">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}

                            {selectedStep === 2 && (
                                <div className="mt-12 pt-10 border-t border-gray-50 flex justify-between">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedStep(1)}
                                        className="px-8 py-4 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-[#0B1F2A] transition-colors"
                                    >
                                        Previous Step
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedStep(3)}
                                        className="px-10 py-4 bg-[#0B1F2A] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-black/10 transition-all"
                                    >
                                        Finalize Settings
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* STEP 3: SETTINGS */}
                        <div className={`bg-white rounded-[3rem] p-10 shadow-xl shadow-black/5 border border-gray-50 transition-all ${selectedStep === 3 ? 'ring-4 ring-[#25D366]/5 border-[#25D366]' : 'opacity-60 scale-[0.98]'}`}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-gray-50 text-[#0B1F2A] rounded-3xl">
                                    <Settings2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">Step 3: Rule Settings</h3>
                                    <p className="text-sm font-medium text-gray-400">Give your rule a name and finish up</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Rule Name</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. FAQ - Pricing Question"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-8 py-5 bg-[#F8FAFC] border border-gray-100 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-[#25D366]/5 focus:border-[#25D366] transition-all outline-none"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-black mt-2 ml-1">{errors.name}</p>}
                                </div>

                                <div className="flex items-center justify-between p-8 bg-[#F8FAFC] rounded-[2rem] border border-gray-50">
                                    <div>
                                        <h4 className="font-black text-[#0B1F2A] text-sm uppercase tracking-widest">Activate Rule</h4>
                                        <p className="text-xs text-gray-400 font-medium">If enabled, this rule will start responding immediately.</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setData('is_active', !data.is_active)}
                                        className={`w-16 h-8 rounded-full p-1 transition-all duration-300 relative shadow-inner ${data.is_active ? 'bg-[#25D366]' : 'bg-gray-200'}`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${data.is_active ? 'translate-x-8' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>

                            {selectedStep === 3 && (
                                <div className="mt-12 pt-10 border-t border-gray-50 flex justify-between gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedStep(2)}
                                        className="px-8 py-4 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-[#0B1F2A] transition-colors"
                                    >
                                        Previous Step
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-5 bg-[#25D366] text-white rounded-3xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-[#25D366]/30 transition-all disabled:opacity-50 disabled:translate-y-0"
                                    >
                                        {processing ? 'Saving...' : (rule ? 'Update Automation' : 'Launch Automation')}
                                        <Zap className="w-5 h-5 fill-white" />
                                    </button>
                                </div>
                            )}
                        </div>

                    </form>
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
