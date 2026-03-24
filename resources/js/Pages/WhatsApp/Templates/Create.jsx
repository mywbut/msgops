import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create({ isConnected, flashError }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'MARKETING',
        language: 'en_US',
        header_type: 'NONE',
        header_text: '',
        body: '',
        footer: '',
        buttons: [] // { type: 'QUICK_REPLY', text: '' }
    });

    const [activeTab, setActiveTab] = useState('content'); // content, buttons

    const submit = (e) => {
        e.preventDefault();
        post(route('whatsapp.templates.store'));
    };

    const addButton = () => {
        if (data.buttons.length < 3) {
            setData('buttons', [...data.buttons, { type: 'QUICK_REPLY', text: '' }]);
        }
    };

    const removeButton = (index) => {
        const newButtons = [...data.buttons];
        newButtons.splice(index, 1);
        setData('buttons', newButtons);
    };

    const updateButtonText = (index, text) => {
        const newButtons = [...data.buttons];
        newButtons[index].text = text;
        setData('buttons', newButtons);
    };

    // Component for the WhatsApp Mockup
    const WhatsAppMockup = () => {
        return (
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#E5DDD5] flex flex-col">
                    {/* Header */}
                    <div className="bg-[#075E54] p-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        <div className="text-white text-xs font-bold leading-tight">
                            Business Account
                            <div className="text-[10px] font-normal opacity-80">Online</div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-4">
                        <div className="bg-white rounded-lg shadow-sm p-0 overflow-hidden max-w-[90%] relative">
                            {/* Template Header */}
                            {data.header_type === 'TEXT' && data.header_text && (
                                <div className="px-3 py-2 font-bold text-sm border-b border-gray-50">
                                    {data.header_text}
                                </div>
                            )}

                            {/* Template Body */}
                            <div className="px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap">
                                {data.body || 'Type your message body...'}
                            </div>

                            {/* Template Footer */}
                            {data.footer && (
                                <div className="px-3 pb-2 text-[10px] text-gray-400">
                                    {data.footer}
                                </div>
                            )}

                            {/* Template Buttons (Rendered below the bubble) */}
                        </div>

                        {/* Buttons Rendering */}
                        <div className="space-y-1 w-[90%] mx-auto">
                            {data.buttons.map((btn, idx) => (
                                <div key={idx} className="bg-white text-[#00a5f4] text-xs font-semibold py-2.5 rounded-lg shadow-sm text-center border-t border-gray-100 flex items-center justify-center gap-2">
                                    {btn.type === 'QUICK_REPLY' && (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                                    )}
                                    {btn.text || 'Button text'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4 bg-white py-4 px-6 border-b border-gray-100">
                    <Link href={route('whatsapp.templates.index')} className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="text-xl font-bold text-[#0B1F2A] font-heading">Template Builder</h2>
                    <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] text-[10px] font-bold rounded border border-indigo-100 uppercase tracking-widest">BETA</span>
                </div>
            }
        >
            <Head title="Create Template" />

            <div className="py-8 px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Left Pane: Form */}
                        <div className="flex-1 space-y-6">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 border-b border-gray-50 flex gap-8">
                                    <button 
                                        onClick={() => setActiveTab('content')}
                                        className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'content' ? 'border-[#25D366] text-[#25D366]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                    >
                                        1. Content Builder
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('buttons')}
                                        className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'buttons' ? 'border-[#25D366] text-[#25D366]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                    >
                                        2. Interactive Buttons
                                    </button>
                                </div>

                                <div className="p-8">
                                    {activeTab === 'content' ? (
                                        <div className="space-y-8">
                                            {/* Basic Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Template Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                        placeholder="e.g. order_confirmation"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                                        required
                                                    />
                                                    <p className="mt-1.5 text-[10px] text-gray-400">Only lowercase letters, numbers and underscores allowed.</p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                                                    <select
                                                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                        value={data.category}
                                                        onChange={e => setData('category', e.target.value)}
                                                    >
                                                        <option value="MARKETING">Marketing</option>
                                                        <option value="UTILITY">Utility</option>
                                                        <option value="AUTHENTICATION">Authentication</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Header */}
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Header (Optional)</label>
                                                <div className="flex gap-4 mb-4">
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('header_type', 'NONE')}
                                                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${data.header_type === 'NONE' ? 'bg-[#0B1F2A] text-white border-[#0B1F2A]' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
                                                    >
                                                        None
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('header_type', 'TEXT')}
                                                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${data.header_type === 'TEXT' ? 'bg-[#0B1F2A] text-white border-[#0B1F2A]' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
                                                    >
                                                        Text Header
                                                    </button>
                                                </div>
                                                {data.header_type === 'TEXT' && (
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                        placeholder="Enter header text..."
                                                        value={data.header_text}
                                                        onChange={e => setData('header_text', e.target.value)}
                                                        maxLength={60}
                                                    />
                                                )}
                                            </div>

                                            {/* Body */}
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Message Body</label>
                                                    <span className="text-[10px] font-bold text-[#25D366]">REQUIRED</span>
                                                </div>
                                                <textarea
                                                    rows={6}
                                                    className="w-full border-gray-100 bg-gray-50 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all resize-none"
                                                    placeholder="Hello {{1}}, your order {{2}} has been shipped!"
                                                    value={data.body}
                                                    onChange={e => setData('body', e.target.value)}
                                                    required
                                                />
                                                <p className="mt-2 text-[10px] text-gray-400">To add variables, use double curly braces like <span className="text-[#4F46E5] font-bold">{"{{1}}"}</span>, <span className="text-[#4F46E5] font-bold">{"{{2}}"}</span> etc.</p>
                                            </div>

                                            {/* Footer */}
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Footer (Optional)</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                    placeholder="Enter footer text..."
                                                    value={data.footer}
                                                    onChange={e => setData('footer', e.target.value)}
                                                    maxLength={60}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                                                <h4 className="text-sm font-bold text-[#4F46E5] mb-1">About Buttons</h4>
                                                <p className="text-xs text-indigo-600/80 leading-relaxed">
                                                    Interactive buttons allow your customers to take action quickly. You can add up to 3 Quick Reply buttons per template.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {data.buttons.map((btn, index) => (
                                                    <div key={index} className="flex gap-4 items-center animate-fade-in">
                                                        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100">
                                                                    {index + 1}
                                                                </span>
                                                                <input 
                                                                    type="text"
                                                                    className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full"
                                                                    placeholder="Button label..."
                                                                    value={btn.text}
                                                                    onChange={(e) => updateButtonText(index, e.target.value)}
                                                                />
                                                            </div>
                                                            <button 
                                                                onClick={() => removeButton(index)}
                                                                className="text-gray-300 hover:text-red-500 transition-all"
                                                            >
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                {data.buttons.length < 3 && (
                                                    <button 
                                                        type="button"
                                                        onClick={addButton}
                                                        className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-xs font-bold hover:border-[#25D366] hover:text-[#25D366] transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                        Add Quick Reply Button
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <button
                                        onClick={submit}
                                        disabled={!isConnected || processing}
                                        className="bg-[#0B1F2A] hover:bg-black text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-black/10 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 disabled:opacity-50"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        )}
                                        Submit to Meta
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Pane: Live Mockup */}
                        <div className="lg:w-[400px]">
                            <div className="sticky top-8">
                                <div className="text-center mb-6">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200">Live Mobile Preview</span>
                                </div>
                                <WhatsAppMockup />
                                <div className="mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                    <h5 className="text-xs font-bold text-[#0B1F2A] uppercase tracking-wider mb-2">Meta Submission Notice</h5>
                                    <p className="text-[10px] text-gray-400 leading-relaxed">
                                        Templates sent to Meta typically take 2-24 hours for approval. Once approved, the status in your dashboard will update to <span className="text-[#25D366] font-bold uppercase">Approved</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}} />
        </AuthenticatedLayout>
    );
}
