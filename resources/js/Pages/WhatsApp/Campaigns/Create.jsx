import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Zap, ShieldCheck, ChevronLeft, ChevronRight, Phone, Info, Plus, MessageSquare, CheckCircle2, ChevronDown, Search, Trash2, Check, User, Hash } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function Create({ templates, contacts, tags, isConnected, accountName, dailyLimit, currentUsage, prefill }) {
    const [step, setStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
    const [templateSearch, setTemplateSearch] = useState('');

    const { data, setData, post, transform, processing, errors } = useForm({
        name: '',
        template_name: '',
        language: '',
        audience_type: 'ALL', // ALL, TAGS, INDIVIDUAL
        selected_tags: [],
        selected_contacts: [],
        variables_mapping: {},
    });

    const requiredVariables = useMemo(() => {
        const tpl = templates.find(t => t.name === data.template_name);
        if (!tpl) return [];
        let vars = [];
        tpl.components?.forEach(c => {
            if (c.type === 'BODY' && c.text) {
                const matches = c.text.match(/\{\{(\d+)\}\}/g);
                if (matches) {
                    matches.forEach(m => {
                        const num = m.replace(/[\{\}]/g, '');
                        if (!vars.includes(num)) vars.push(num);
                    });
                }
            }
        });
        return vars.sort((a,b) => parseInt(a) - parseInt(b));
    }, [data.template_name, templates]);

    const [filters, setFilters] = useState([{ id: Date.now(), attribute: 'name', operator: 'contains', value: '' }]);

    useEffect(() => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB').replace(/\//g, '');
        const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
        const randomName = `campaign_${dateStr}${timeStr}`;
        if (!data.name) {
            setData('name', randomName);
        }

        // Handle prefill from Template page
        if (prefill?.template_name) {
            setData({
                ...data,
                name: randomName,
                template_name: prefill.template_name,
                language: prefill.language || 'en'
            });
        }
    }, [prefill]);

    useEffect(() => {
        if (requiredVariables.length > 0) {
            const currentMapping = { ...data.variables_mapping };
            let changed = false;
            requiredVariables.forEach(num => {
                if (!currentMapping[num]) {
                    currentMapping[num] = { type: 'contact', value: 'name' };
                    changed = true;
                }
            });
            if (changed) {
                setData('variables_mapping', currentMapping);
            }
        }
    }, [requiredVariables]);

    const addFilter = () => {
        setFilters([...filters, { id: Date.now(), attribute: 'name', operator: 'contains', value: '' }]);
    };

    const removeFilter = (id) => {
        if (filters.length > 1) {
            setFilters(filters.filter(f => f.id !== id));
        }
    };

    const updateFilter = (id, key, val) => {
        setFilters(filters.map(f => f.id === id ? { ...f, [key]: val } : f));
    };

    const filteredContacts = useMemo(() => {
        if (data.audience_type === 'ALL') return contacts;
        if (data.audience_type === 'INDIVIDUAL') {
            return contacts.filter(c => 
                (c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 c.phone_number?.includes(searchTerm))
            );
        }
        
        // Advanced Filters
        return contacts.filter(contact => {
            return filters.every(f => {
                if (!f.value && f.operator !== 'is_empty' && f.operator !== 'is_not_empty') return true;
                
                let val = '';
                if (f.attribute === 'name') val = contact.name || '';
                if (f.attribute === 'phone') val = contact.phone_number || '';
                if (f.attribute === 'tags') {
                    const contactTags = contact.tags || [];
                    if (f.operator === 'contains') return contactTags.some(t => t.toLowerCase().includes(f.value.toLowerCase()));
                    if (f.operator === 'equal') return contactTags.some(t => t.toLowerCase() === f.value.toLowerCase());
                    return true;
                }

                val = val.toString().toLowerCase();
                const target = f.value.toLowerCase();

                switch (f.operator) {
                    case 'equal': return val === target;
                    case 'not_equal': return val !== target;
                    case 'contains': return val.includes(target);
                    case 'starts_with': return val.startsWith(target);
                    case 'ends_with': return val.endsWith(target);
                    default: return true;
                }
            });
        });
    }, [contacts, filters, data.audience_type, searchTerm]);

    const isAllSelected = filteredContacts.length > 0 && filteredContacts.every(c => data.selected_contacts.includes(c.id));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setData('selected_contacts', []);
        } else {
            setData('selected_contacts', filteredContacts.map(c => c.id));
        }
    };

    const selectedTemplate = useMemo(() => templates.find(t => t.name === data.template_name), [templates, data.template_name]);

    const submit = (e) => {
        e.preventDefault();
        
        // Ensure the backend receives the specific IDs for the filtered audience
        // and a valid mapping for all required variables
        transform((data) => {
            const currentMapping = { ...data.variables_mapping };
            
            // Re-calculate variables from current template components
            const tpl = templates.find(t => t.name === data.template_name);
            const vars = [];
            tpl?.components?.forEach(c => {
                if (c.type === 'BODY' && c.text) {
                    const matches = c.text.match(/\{\{(\d+)\}\}/g);
                    matches?.forEach(m => {
                        const n = m.replace(/[\{\}]/g, '');
                        if (!vars.includes(n)) vars.push(n);
                    });
                }
            });

            vars.forEach(num => {
                if (!currentMapping[num]) {
                    currentMapping[num] = { type: 'contact', value: 'name' };
                }
            });

            return {
                ...data,
                variables_mapping: currentMapping,
                selected_contacts: (data.selected_contacts.length > 0)
                    ? data.selected_contacts
                    : ((data.audience_type === 'ALL' || data.audience_type === 'TAGS')
                        ? filteredContacts.map(c => c.id)
                        : data.selected_contacts)
            };
        });

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
                <div className="mx-auto max-w-6xl">
                    
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
                            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                                {/* Form Section */}
                                <div className="p-10 lg:col-span-2 animate-fade-in">
                                    <div className="mb-10">
                                        <h3 className="text-xl font-black text-[#0B1F2A] font-heading mb-2">What message do you want to send?</h3>
                                        <p className="text-sm text-gray-400">Add campaign name and template below</p>
                                    </div>
                                    
                                    <div className="space-y-10">
                                        <div>
                                            <label className="block text-xs font-black text-[#0B1F2A] uppercase tracking-widest mb-3">Campaign Name</label>
                                            <input
                                                type="text"
                                                className="w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-[#25D366] transition-all"
                                                placeholder="e.g. genie_broadcast_2803"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                            />
                                            {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="block text-xs font-black text-[#0B1F2A] uppercase tracking-widest">Select Template Message</label>
                                                <Link href={route('whatsapp.templates.create')} className="text-[#4F46E5] font-bold text-[11px] flex items-center gap-1 hover:underline">
                                                    <Plus className="w-3 h-3" /> Add New Template
                                                </Link>
                                            </div>
                                            
                                            {templates.length === 0 ? (
                                                <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center bg-gray-50/30">
                                                    <p className="text-sm text-gray-400 mb-4 font-medium">No approved templates found.</p>
                                                    <Link href={route('whatsapp.templates.create')} className="text-[#4F46E5] font-black text-sm hover:underline">Create Template First</Link>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    {/* Custom Dropdown Trigger */}
                                                    <button 
                                                        type="button"
                                                        onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                                                        className={`w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 text-sm font-medium flex items-center justify-between transition-all hover:bg-gray-100/50 ${isTemplateDropdownOpen ? 'ring-2 ring-[#25D366] border-transparent shadow-lg bg-white' : ''}`}
                                                    >
                                                        <span className={data.template_name ? 'text-[#0B1F2A]' : 'text-gray-400'}>
                                                            {data.template_name ? (
                                                                <span className="flex items-center gap-2">
                                                                    {data.template_name}
                                                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded uppercase font-bold">{data.language}</span>
                                                                </span>
                                                            ) : 'Select a message template...'}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isTemplateDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {/* Dropdown Content */}
                                                    {isTemplateDropdownOpen && (
                                                        <>
                                                            <div 
                                                                className="fixed inset-0 z-40" 
                                                                onClick={() => setIsTemplateDropdownOpen(false)}
                                                            ></div>
                                                            <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-scale-up origin-top">
                                                                <div className="p-3 border-b border-gray-50">
                                                                    <div className="relative">
                                                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                                        <input 
                                                                            type="text" 
                                                                            placeholder="Search templates..."
                                                                            value={templateSearch}
                                                                            onChange={(e) => setTemplateSearch(e.target.value)}
                                                                            className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#25D366] transition-all"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
                                                                    {templates
                                                                        .filter(t => t.name.toLowerCase().includes(templateSearch.toLowerCase()))
                                                                        .map((tpl) => (
                                                                        <div 
                                                                            key={tpl.name}
                                                                            onClick={() => {
                                                                                const vars = [];
                                                                                tpl.components?.forEach(c => {
                                                                                    if (c.type === 'BODY' && c.text) {
                                                                                        const matches = c.text.match(/\{\{(\d+)\}\}/g);
                                                                                        if (matches) {
                                                                                            matches.forEach(m => {
                                                                                                const num = m.replace(/[\{\}]/g, '');
                                                                                                if (!vars.includes(num)) vars.push(num);
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });
                                                                                
                                                                                const initialMapping = {};
                                                                                vars.forEach(v => {
                                                                                    initialMapping[v] = { type: 'contact', value: 'name' };
                                                                                });

                                                                                setData(prev => ({ 
                                                                                    ...prev, 
                                                                                    template_name: tpl.name, 
                                                                                    language: tpl.language,
                                                                                    variables_mapping: initialMapping
                                                                                }));
                                                                                setIsTemplateDropdownOpen(false);
                                                                            }}
                                                                            className={`group p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between hover:bg-[#25D366]/5 ${data.template_name === tpl.name ? 'bg-[#25D366]/10' : ''}`}
                                                                        >
                                                                            <div className="flex flex-col">
                                                                                <span className={`text-sm font-bold transition-all ${data.template_name === tpl.name ? 'text-[#25D366]' : 'text-[#0B1F2A] group-hover:text-[#25D366]'}`}>
                                                                                    {tpl.name}
                                                                                </span>
                                                                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{tpl.category}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-[10px] font-black text-gray-300 uppercase">{tpl.language}</span>
                                                                                {data.template_name === tpl.name && <CheckCircle2 className="w-4 h-4 text-[#25D366]" />}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {templates.filter(t => t.name.toLowerCase().includes(templateSearch.toLowerCase())).length === 0 && (
                                                                        <div className="p-8 text-center text-gray-400 text-xs italic font-medium">
                                                                            No templates match your search.
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            {errors.template_name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.template_name}</p>}
                                        </div>

                                        {/* Variable Mapping Section */}
                                        {requiredVariables.length > 0 && (
                                            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 animate-fade-in">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <Hash className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-[#0B1F2A]">Template Variables</h4>
                                                        <p className="text-[11px] text-gray-500 font-medium">Map content to the variables in your template.</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {requiredVariables.map((num) => {
                                                        const currentMapping = data.variables_mapping[num] || { type: 'contact', value: 'name' };
                                                        return (
                                                            <div key={num} className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-3 rounded-xl border border-blue-50">
                                                                <div className="w-16 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-xs font-black text-gray-400 border border-gray-100 shrink-0">
                                                                    {"{{"}{num}{"}}"}
                                                                </div>
                                                                
                                                                <select
                                                                    className="bg-gray-50 border-gray-100 rounded-lg px-3 py-2 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-blue-500 shrink-0 w-full md:w-36"
                                                                    value={currentMapping.type}
                                                                    onChange={(e) => {
                                                                        const type = e.target.value;
                                                                        const value = type === 'contact' ? 'name' : '';
                                                                        setData('variables_mapping', { 
                                                                            ...data.variables_mapping, 
                                                                            [num]: { type, value } 
                                                                        });
                                                                    }}
                                                                >
                                                                    <option value="contact">Contact Field</option>
                                                                    <option value="custom">Custom Text</option>
                                                                </select>

                                                                {currentMapping.type === 'contact' ? (
                                                                    <select
                                                                        className="w-full bg-gray-50 border-gray-100 rounded-lg px-3 py-2 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-blue-500"
                                                                        value={currentMapping.value}
                                                                        onChange={(e) => setData('variables_mapping', { ...data.variables_mapping, [num]: { ...currentMapping, value: e.target.value }})}
                                                                    >
                                                                        <option value="name">Contact Name</option>
                                                                        <option value="phone_number">Phone Number</option>
                                                                    </select>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter text for all contacts..."
                                                                        className="w-full bg-gray-50 border-gray-100 rounded-lg px-3 py-2 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-blue-500"
                                                                        value={currentMapping.value}
                                                                        onChange={(e) => setData('variables_mapping', { ...data.variables_mapping, [num]: { ...currentMapping, value: e.target.value }})}
                                                                    />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-16 flex justify-end">
                                        <button 
                                            onClick={() => setStep(2)}
                                            disabled={!data.name || !data.template_name}
                                            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 px-10 rounded-2xl transition-all shadow-lg shadow-[#25D366]/20 disabled:opacity-50 flex items-center gap-3 transform hover:-translate-y-1"
                                        >
                                            Next Stage
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Preview Section */}
                                <div className="p-10 bg-gray-50/50 flex flex-col items-center">
                                    <div className="w-full max-w-[280px]">
                                        <div className="flex items-center justify-between mb-6 px-2">
                                            <h4 className="text-sm font-black text-[#0B1F2A] font-heading">Preview</h4>
                                            <div className="flex gap-1">
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Phone Container */}
                                        <div className="bg-white rounded-[3rem] border-[8px] border-[#0B1F2A] overflow-hidden shadow-2xl aspect-[9/18.5] relative flex flex-col">
                                            {/* Status Bar */}
                                            <div className="bg-[#0B1F2A] h-6 flex items-center justify-between px-6">
                                                <div className="text-[8px] text-white font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                                <div className="flex gap-1 items-center">
                                                    <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                                                    <div className="w-3 h-1.5 bg-green-400 rounded-sm"></div>
                                                </div>
                                            </div>

                                            {/* Header */}
                                            <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                                                <ChevronLeft className="w-3 h-3 text-blue-500" />
                                                <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                                                    <MessageSquare className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black leading-none flex items-center gap-1">
                                                        {accountName} <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 fill-current" />
                                                    </span>
                                                    <span className="text-[8px] text-gray-400">online</span>
                                                </div>
                                            </div>

                                            {/* Chat Area */}
                                            <div className="flex-1 p-4 bg-gray-100/50 overflow-y-auto space-y-3">
                                                <div className="bg-blue-50/80 p-2 rounded-lg text-center border border-blue-100">
                                                    <p className="text-[8px] text-gray-500">
                                                        <Info className="w-2.5 h-2.5 inline mr-1 text-gray-400" />
                                                        This business uses a secure service to manage this chat. Tap to learn more.
                                                    </p>
                                                </div>

                                                {selectedTemplate ? (
                                                    <div className="bg-[#E7FFDB] p-3 rounded-xl shadow-sm border border-[#D0E5C9] relative ml-2 max-w-[95%] animate-fade-in">
                                                        <div className="absolute -left-1.5 top-3 w-3 h-3 bg-[#E7FFDB] border-l border-t border-[#D0E5C9] rotate-[-45deg]"></div>
                                                        <div className="space-y-2">
                                                            {selectedTemplate.components?.map((component, idx) => {
                                                                if (component.type === 'HEADER' && component.format === 'IMAGE') {
                                                                    return <div key={idx} className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-[10px] italic font-medium">Header Image</div>;
                                                                }
                                                                if (component.type === 'BODY') {
                                                                    return <p key={idx} className="text-[11px] text-[#0B1F2A] font-medium leading-relaxed whitespace-pre-wrap">{component.text}</p>;
                                                                }
                                                                if (component.type === 'FOOTER') {
                                                                    return <p key={idx} className="text-[9px] text-gray-500 italic mt-1">{component.text}</p>;
                                                                }
                                                                if (component.type === 'BUTTONS') {
                                                                    return (
                                                                        <div key={idx} className="pt-2 border-t border-[#D0E5C9] space-y-1.5 mt-2">
                                                                            {component.buttons?.map((btn, bIdx) => (
                                                                                <div key={bIdx} className="w-full py-2 bg-white/60 rounded-lg text-center text-blue-600 text-[10px] font-black border border-white/80 shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-all flex items-center justify-center gap-1.5">
                                                                                    {btn.text}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    );
                                                                }
                                                                return null;
                                                            })}
                                                        </div>
                                                        <div className="text-right mt-1 opacity-40">
                                                            <span className="text-[8px] font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
                                                            <MessageSquare className="w-6 h-6" />
                                                        </div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-normal">
                                                            Select a template <br /> to see preview
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Audience Selection */}
                        {step === 2 && (
                            <div className="p-10 animate-fade-in lg:max-w-5xl mx-auto">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-black text-[#0B1F2A] font-heading mb-2">Who is your audience?</h3>
                                    <p className="text-sm text-gray-400">Choose from segments, contacts, or manual selection</p>
                                </div>
                                
                                <div className="flex gap-4 p-1.5 bg-gray-50 rounded-2xl mb-10 overflow-x-auto">
                                    <button 
                                        onClick={() => setData('audience_type', 'ALL')}
                                        className={`px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${data.audience_type === 'ALL' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        All Contacts ({contacts.length})
                                    </button>
                                    <button 
                                        onClick={() => setData('audience_type', 'TAGS')}
                                        className={`px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${data.audience_type === 'TAGS' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        Advanced Filters (Rule)
                                    </button>
                                    <button 
                                        onClick={() => setData('audience_type', 'INDIVIDUAL')}
                                        className={`px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap ${data.audience_type === 'INDIVIDUAL' ? 'bg-white text-[#25D366] shadow-sm shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        Select Individuals
                                    </button>
                                </div>

                                {data.audience_type === 'TAGS' && (
                                    <div className="space-y-4 mb-10 animate-fade-in">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter Audience by Rules</h4>
                                            <button 
                                                onClick={addFilter}
                                                className="text-[#25D366] text-[11px] font-black flex items-center gap-1.5 hover:underline bg-[#25D366]/5 px-3 py-1.5 rounded-lg border border-[#25D366]/10"
                                            >
                                                <Plus className="w-3.5 h-3.5" /> Add another filter
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {filters.map((filter, index) => (
                                                <div key={filter.id} className="flex flex-col md:flex-row gap-3 items-center group">
                                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                                                        <select 
                                                            value={filter.attribute}
                                                            onChange={(e) => updateFilter(filter.id, 'attribute', e.target.value)}
                                                            className="bg-gray-50 border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-[#25D366] appearance-none cursor-pointer"
                                                        >
                                                            <option value="name">Name</option>
                                                            <option value="phone">Phone</option>
                                                            <option value="tags">Tags</option>
                                                        </select>

                                                        <select 
                                                            value={filter.operator}
                                                            onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                                                            className="bg-gray-50 border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-[#25D366] appearance-none cursor-pointer"
                                                        >
                                                            <option value="equal">Equal</option>
                                                            <option value="not_equal">Not Equal</option>
                                                            <option value="contains">Contains</option>
                                                            <option value="starts_with">Starts With</option>
                                                            <option value="ends_with">Ends With</option>
                                                        </select>

                                                        <div className="relative">
                                                            {filter.attribute === 'tags' ? (
                                                                <select 
                                                                    value={filter.value}
                                                                    onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                                                                    className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-[#25D366] appearance-none cursor-pointer"
                                                                >
                                                                    <option value="">Select Tag...</option>
                                                                    {tags.map(tag => (
                                                                        <option key={tag} value={tag}>{tag}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <input 
                                                                    type="text"
                                                                    placeholder="Value..."
                                                                    value={filter.value}
                                                                    onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                                                                    className="w-full bg-gray-50 border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-[#0B1F2A] focus:ring-1 focus:ring-[#25D366] placeholder:text-gray-300"
                                                                />
                                                            )}
                                                            {filter.attribute === 'tags' && (
                                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFilter(filter.id)}
                                                        disabled={filters.length === 1}
                                                        className="p-2.5 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-20"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {data.audience_type === 'INDIVIDUAL' && (
                                    <div className="space-y-4 mb-8">
                                        <div className="relative">
                                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input 
                                                type="text" 
                                                placeholder="Search contacts..." 
                                                className="w-full border-gray-100 bg-gray-50 rounded-[1.5rem] pl-12 pr-6 py-4 text-sm mb-4 font-medium focus:ring-2 focus:ring-[#25D366] transition-all"
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Selection Summary Bar */}
                                <div className="mb-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 font-heading">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-[#25D366]">Selected:</span>
                                            <span className="text-sm font-black text-[#0B1F2A] bg-[#25D366]/10 px-2 py-0.5 rounded-lg border border-[#25D366]/20">
                                                {data.selected_contacts.length.toLocaleString()} / {contacts.length.toLocaleString()} Contacts remaining
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <span className="text-xs font-bold uppercase tracking-widest leading-none">Daily limit:</span>
                                            <span className="text-sm font-black text-[#0B1F2A]">{dailyLimit.toLocaleString()}/Day</span>
                                            <Info className="w-3.5 h-3.5 text-gray-300 cursor-help" />
                                        </div>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 relative">
                                        <div 
                                            className="absolute inset-y-0 left-0 bg-blue-100 transition-all duration-1000"
                                            style={{ width: `${(currentUsage / dailyLimit) * 100}%` }}
                                        ></div>
                                        <div 
                                            className="absolute inset-y-0 bg-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.4)] transition-all duration-700 delay-300 rounded-full"
                                            style={{ 
                                                left: `${(currentUsage / dailyLimit) * 100}%`,
                                                width: `${(data.selected_contacts.length / dailyLimit) * 100}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Contact Table */}
                                <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-black/5">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                                    <th className="px-8 py-5 w-20">
                                                        <div 
                                                            onClick={toggleSelectAll}
                                                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${isAllSelected ? 'bg-[#25D366] border-[#25D366] shadow-md shadow-[#25D366]/20' : 'bg-white border-gray-100'}`}
                                                        >
                                                            {isAllSelected && <Check className="w-3.5 h-3.5 text-white stroke-[4]" />}
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                            Name <ChevronDown className="w-3 h-3" />
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Allow Campaign</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {/* Select All Link */}
                                                {filteredContacts.length > 0 && !isAllSelected && (
                                                    <tr className="bg-[#25D366]/5 transition-all">
                                                        <td colSpan="4" className="px-8 py-3 text-center">
                                                            <button 
                                                                onClick={toggleSelectAll}
                                                                className="text-[11px] font-black text-[#25D366] hover:underline flex items-center justify-center gap-2 mx-auto"
                                                            >
                                                                {data.selected_contacts.length} contacts on this page are selected. <span className="underline">Select all {filteredContacts.length} contacts</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}

                                                {filteredContacts.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="px-8 py-20 text-center">
                                                            <div className="flex flex-col items-center gap-4">
                                                                <div className="p-4 bg-gray-50 rounded-3xl">
                                                                    <User className="w-10 h-10 text-gray-200" />
                                                                </div>
                                                                <p className="text-sm font-bold text-gray-400">No contacts found matching these filters.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    filteredContacts.slice(0, 100).map(contact => (
                                                        <tr key={contact.id} className="group hover:bg-gray-50/50 transition-all">
                                                            <td className="px-8 py-4">
                                                                <div 
                                                                    onClick={() => toggleContact(contact.id)}
                                                                    className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${data.selected_contacts.includes(contact.id) ? 'bg-[#25D366] border-[#25D366]' : 'bg-white border-gray-100 group-hover:border-gray-200'}`}
                                                                >
                                                                    {data.selected_contacts.includes(contact.id) && <Check className="w-3 h-3 text-white stroke-[4]" />}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-black text-[#0B1F2A]">{contact.name}</p>
                                                                {contact.tags?.length > 0 && (
                                                                    <div className="flex gap-1 mt-1">
                                                                        {contact.tags.slice(0, 2).map(t => (
                                                                            <span key={t} className="text-[8px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">#{t}</span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm font-bold text-gray-500">(+91){contact.phone_number?.replace(/^91/, '')}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-1.5">
                                                                    <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">TRUE</span>
                                                                    <div className="w-4 h-4 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center">
                                                                        <Check className="w-2.5 h-2.5 stroke-[4]" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {filteredContacts.length > 100 && (
                                        <div className="p-6 text-center border-t border-gray-50">
                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Showing first 100 filtered results</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-12 flex justify-between items-center">
                                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-[#0B1F2A] text-sm font-bold transition-all flex items-center gap-2">
                                        <ChevronLeft className="w-4 h-4" /> Back to Message
                                    </button>
                                    <button 
                                        onClick={() => setStep(3)}
                                        disabled={data.selected_contacts.length === 0}
                                        className="bg-[#0B1F2A] hover:bg-black text-white font-black py-4 px-12 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-black/10 disabled:opacity-50 transform hover:-translate-y-1"
                                    >
                                        Final Review
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review & Send */}
                        {step === 3 && (
                            <div className="p-10 animate-fade-in lg:max-w-5xl mx-auto">
                                <div className="mb-10 text-center">
                                    <h3 className="text-3xl font-black text-[#0B1F2A] font-heading mb-2">Ready to launch?</h3>
                                    <p className="text-sm text-gray-400">Review your campaign details one last time before sending</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    {/* Campaign Overview Card */}
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-black/5 flex flex-col items-center text-center group hover:shadow-xl hover:shadow-black/5 transition-all">
                                        <div className="w-16 h-16 bg-[#25D366]/10 rounded-3xl flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-110 transition-transform">
                                            <Zap className="w-8 h-8" />
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Campaign Identity</p>
                                        <h4 className="text-lg font-black text-[#0B1F2A] mb-4">{data.name}</h4>
                                        <div className="w-full h-px bg-gray-50 mb-4"></div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                            <MessageSquare className="w-4 h-4 text-blue-400" />
                                            {data.template_name}
                                            <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded uppercase">{data.language}</span>
                                        </div>
                                    </div>

                                    {/* Audience Overview Card */}
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-black/5 flex flex-col items-center text-center group hover:shadow-xl hover:shadow-black/5 transition-all">
                                        <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                            <User className="w-8 h-8" />
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Audience</p>
                                        <h4 className="text-lg font-black text-[#0B1F2A] mb-4">
                                            {data.selected_contacts.length > 0 
                                                ? (data.selected_contacts.length === filteredContacts.length ? 'Broadcast to All' : 'Targeted Selection')
                                                : (data.audience_type === 'ALL' ? 'Broadcast to All' : (data.audience_type === 'TAGS' ? 'Filtered Segment' : 'Selected Contacts'))
                                            }
                                        </h4>
                                        <div className="w-full h-px bg-gray-50 mb-4"></div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl font-black text-[#0B1F2A]">{data.selected_contacts.length}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified Recipients</span>
                                            </div>
                                            <div className="w-px h-8 bg-gray-100 mx-2"></div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl font-black text-[#25D366]">100%</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Deliverability</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Preview Section */}
                                <div className="mb-10">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Live Message Review</h4>
                                    <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 flex justify-center">
                                        <div className="bg-[#E7FFDB] p-6 rounded-2xl shadow-xl border border-[#D0E5C9] relative max-w-sm w-full animate-fade-in">
                                            <div className="absolute -left-2 top-4 w-4 h-4 bg-[#E7FFDB] border-l border-t border-[#D0E5C9] rotate-[-45deg]"></div>
                                            <div className="space-y-4">
                                                {selectedTemplate?.components?.map((component, idx) => {
                                                    if (component.type === 'HEADER' && component.format === 'IMAGE') {
                                                        return <div key={idx} className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs italic font-medium">Header Image</div>;
                                                    }
                                                    if (component.type === 'BODY') {
                                                        return <p key={idx} className="text-sm text-[#0B1F2A] font-medium leading-relaxed whitespace-pre-wrap">{component.text}</p>;
                                                    }
                                                    if (component.type === 'FOOTER') {
                                                        return <p key={idx} className="text-[11px] text-gray-400 italic mt-2">{component.text}</p>;
                                                    }
                                                    if (component.type === 'BUTTONS') {
                                                        return (
                                                            <div key={idx} className="pt-4 border-t border-[#D0E5C9] space-y-2 mt-2">
                                                                {component.buttons?.map((btn, bIdx) => (
                                                                    <div key={bIdx} className="w-full py-3 bg-white rounded-xl text-center text-blue-500 font-black border border-white shadow-sm flex items-center justify-center gap-2">
                                                                        {btn.text}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                            <div className="text-right mt-2 opacity-50 flex items-center justify-end gap-1">
                                                <span className="text-[10px] font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <Check className="w-3 h-3 text-blue-400 stroke-[3]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
                                    <div className="text-center md:text-left flex-1 px-4">
                                        <p className="text-sm font-black text-[#0B1F2A] mb-1">Final confirmation required</p>
                                        <p className="text-xs text-gray-400 italic">This broadcast is permanent once launched.</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => setStep(2)} 
                                            className="px-8 py-4 text-gray-400 hover:text-[#0B1F2A] text-sm font-black transition-all hover:bg-gray-100 rounded-2xl"
                                        >
                                            Modify Audience
                                        </button>
                                        <button 
                                            onClick={submit}
                                            disabled={processing}
                                            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 px-12 rounded-[1.5rem] shadow-xl shadow-[#25D366]/30 transition-all transform hover:-translate-y-1 flex items-center gap-4 disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            ) : (
                                                <Zap className="w-5 h-5 fill-current" />
                                            )}
                                            Launch Campaign
                                        </button>
                                    </div>
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
