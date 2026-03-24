import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ templates, contacts, tags, isConnected }) {
    const [step, setStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        template_name: '',
        language: '',
        audience_type: 'ALL', // ALL, TAGS, INDIVIDUAL
        selected_tags: [],
        selected_contacts: [],
    });

    const filteredContacts = contacts.filter(c => 
        (c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         c.phone?.includes(searchTerm))
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('whatsapp.campaigns.store'));
    };

    const toggleTag = (tag) => {
        const newTags = data.selected_tags.includes(tag) 
            ? data.selected_tags.filter(t => t !== tag)
            : [...data.selected_tags, tag];
        setData('selected_tags', newTags);
    };

    const toggleContact = (id) => {
        const newContacts = data.selected_contacts.includes(id)
            ? data.selected_contacts.filter(tid => tid !== id)
            : [...data.selected_contacts, id];
        setData('selected_contacts', newContacts);
    };

    const getSelectedTemplate = () => templates.find(t => t.name === data.template_name);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4 bg-white py-4 px-6 border-b border-gray-100">
                    <Link href={route('whatsapp.campaigns.index')} className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="text-xl font-bold text-[#0B1F2A] font-heading">New Broadcast Campaign</h2>
                    <div className="flex items-center gap-2 ml-auto">
                        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                    </div>
                </div>
            }
        >
            <Head title="Create Campaign" />

            <div className="py-12 px-6">
                <div className="mx-auto max-w-3xl">
                    
                    {!isConnected && (
                        <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0B1F2A]">WhatsApp is not connected</p>
                                    <p className="text-sm text-gray-500 text-center md:text-left">Connect your account first to fetch templates and launch campaigns.</p>
                                </div>
                            </div>
                            <Link href={route('whatsapp.connect')} className="px-6 py-2 bg-[#0B1F2A] text-white rounded-xl text-sm font-bold hover:bg-black transition-all">Connect Now</Link>
                        </div>
                    )}

                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Step 1: Basics & Template */}
                        {step === 1 && (
                            <div className="p-10 animate-fade-in">
                                <h3 className="text-xl font-bold text-[#0B1F2A] mb-8">Step 1: Campaign Details</h3>
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Internal Campaign Name</label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                            placeholder="e.g. Eid Mubarak Broadcast"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Select Message Template</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {templates.length === 0 ? (
                                                <div className="col-span-2 p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center">
                                                    <p className="text-sm text-gray-400 mb-4">No approved templates found.</p>
                                                    <Link href={route('whatsapp.templates.create')} className="text-[#4F46E5] font-bold text-sm hover:underline">Create Template First</Link>
                                                </div>
                                            ) : (
                                                templates.map((tpl) => (
                                                    <div 
                                                        key={tpl.name}
                                                        onClick={() => {
                                                            setData(prev => ({ ...prev, template_name: tpl.name, language: tpl.language }));
                                                        }}
                                                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.template_name === tpl.name ? 'border-[#25D366] bg-green-50/30' : 'border-gray-50 hover:border-gray-200'}`}
                                                    >
                                                        <div className="font-bold text-[#0B1F2A] text-sm mb-1">{tpl.name}</div>
                                                        <div className="flex justify-between items-center mt-3">
                                                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold">{tpl.category}</span>
                                                            <span className="text-[10px] font-bold text-gray-400">{tpl.language}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {errors.template_name && <p className="mt-2 text-xs text-red-500">{errors.template_name}</p>}
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-end">
                                    <button 
                                        onClick={() => setStep(2)}
                                        disabled={!data.name || !data.template_name}
                                        className="bg-[#0B1F2A] hover:bg-black text-white font-bold py-3.5 px-10 rounded-2xl transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        Next View: Audience
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Audience Selection */}
                        {step === 2 && (
                            <div className="p-10 animate-fade-in">
                                <h3 className="text-xl font-bold text-[#0B1F2A] mb-8">Step 2: Choose Audience</h3>
                                
                                <div className="flex gap-4 p-1.5 bg-gray-50 rounded-2xl mb-10 overflow-x-auto">
                                    <button 
                                        onClick={() => setData('audience_type', 'ALL')}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === 'ALL' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        All Contacts ({contacts.length})
                                    </button>
                                    <button 
                                        onClick={() => setData('audience_type', 'TAGS')}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === 'TAGS' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        Select by Tags
                                    </button>
                                    <button 
                                        onClick={() => setData('audience_type', 'INDIVIDUAL')}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === 'INDIVIDUAL' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        Select Individuals
                                    </button>
                                </div>

                                {data.audience_type === 'TAGS' && (
                                    <div className="space-y-4 mb-8">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Target Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map(tag => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => toggleTag(tag)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${data.selected_tags.includes(tag) ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-lg shadow-[#4F46E5]/20' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                            {tags.length === 0 && <p className="text-xs text-gray-400">No tags found in your contact list.</p>}
                                        </div>
                                    </div>
                                )}

                                {data.audience_type === 'INDIVIDUAL' && (
                                    <div className="space-y-4 mb-8">
                                        <input 
                                            type="text" 
                                            placeholder="Search contacts..." 
                                            className="w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-3 text-sm mb-4"
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                        <div className="max-h-60 overflow-y-auto border border-gray-50 rounded-2xl divide-y divide-gray-50 bg-gray-50/30">
                                            {filteredContacts.map(contact => (
                                                <div 
                                                    key={contact.id}
                                                    onClick={() => toggleContact(contact.id)}
                                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${data.selected_contacts.includes(contact.id) ? 'bg-[#25D366] border-[#25D366]' : 'border-gray-200 bg-white'}`}>
                                                            {data.selected_contacts.includes(contact.id) && (
                                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-bold text-[#0B1F2A]">{contact.name}</div>
                                                            <div className="text-[10px] text-gray-400">+{contact.phone}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-12 flex justify-between">
                                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-[#0B1F2A] text-sm font-bold transition-all">Back to Basics</button>
                                    <button 
                                        onClick={() => setStep(3)}
                                        className="bg-[#0B1F2A] hover:bg-black text-white font-bold py-3.5 px-10 rounded-2xl transition-all flex items-center gap-2"
                                    >
                                        Final Step: Review
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review & Send */}
                        {step === 3 && (
                            <div className="p-10 animate-fade-in">
                                <h3 className="text-xl font-bold text-[#0B1F2A] mb-8">Step 3: Review & Send</h3>
                                
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[2.5rem]">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Campaign Name</p>
                                            <p className="text-sm font-bold text-[#0B1F2A]">{data.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Template</p>
                                            <p className="text-sm font-bold text-[#0B1F2A]">{data.template_name} ({data.language})</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target Audience</p>
                                            <p className="text-sm font-bold text-[#0B1F2A]">
                                                {data.audience_type === 'ALL' && `All Contacts (${contacts.length})`}
                                                {data.audience_type === 'TAGS' && `Tagged: ${data.selected_tags.join(', ')}`}
                                                {data.audience_type === 'INDIVIDUAL' && `${data.selected_contacts.length} Selected Contacts`}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Cost</p>
                                            <p className="text-sm font-bold text-[#25D366]">Standard Unit Cost</p>
                                        </div>
                                    </div>

                                    <div className="p-8 border-2 border-dashed border-[#25D366]/20 bg-green-50/20 rounded-3xl">
                                        <h4 className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-4">Message Preview</h4>
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-[85%]">
                                            <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                                                {getSelectedTemplate()?.components?.find(c => c.type === 'BODY')?.text || 'No preview available for this template.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between items-center">
                                    <button onClick={() => setStep(2)} className="text-gray-400 hover:text-[#0B1F2A] text-sm font-bold transition-all">Edit Audience</button>
                                    <button 
                                        onClick={submit}
                                        disabled={processing}
                                        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-12 rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all transform hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        )}
                                        Launch Broadcast Now
                                    </button>
                                </div>
                            </div>
                        )}

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
