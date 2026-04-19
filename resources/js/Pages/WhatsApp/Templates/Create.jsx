import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Create({ isConnected, flashError, initialTemplate, isEditing }) {
    const { flash } = usePage().props;
    const currentError = flashError || flash?.error;

    const { data, setData, post, processing, errors, transform } = useForm({
        name: initialTemplate?.name || '',
        category: initialTemplate?.category || 'MARKETING',
        language: initialTemplate?.language || 'en_US',
        header_type: initialTemplate?.header_type || 'NONE',
        header_text: initialTemplate?.header_text || '',
        header_handle: initialTemplate?.header_handle || '',
        body: initialTemplate?.body || '',
        footer: initialTemplate?.footer || '',
        buttons: initialTemplate?.buttons || [],
        body_examples: {} 
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const fileInputRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        const variables = [...new Set(data.body.match(/\{\{[^}]+\}\}/g) || [])];
        const newExamples = { ...data.body_examples };
        let changed = false;

        // Cleanup: remove examples for variables that were deleted from body
        Object.keys(newExamples).forEach(key => {
            if (!variables.includes(key)) {
                delete newExamples[key];
                changed = true;
            }
        });

        // Add new: add keys for newly typed variables
        variables.forEach(v => {
            if (!(v in newExamples)) {
                newExamples[v] = '';
                changed = true;
            }
        });

        if (changed) {
            setData('body_examples', newExamples);
        }
    }, [data.body]);

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        let bodyWithIndices = data.body;
        const variables = [...new Set(data.body.match(/\{\{[^}]+\}\}/g) || [])];
        
        // Map user-provided samples in the correct order (1, 2, 3...)
        // and create a mapping for safe replacement
        const varMap = {};
        const examples = variables.map((v, i) => {
            const index = i + 1;
            varMap[v] = `{{${index}}}`;
            return data.body_examples[v] || "Sample Value";
        });
        
        // Safe replacement: use a single pass with a regex to avoid "clobbering" 
        // (where replacing {{1}} with {{2}} causes a later loop to replace it again)
        if (variables.length > 0) {
            // Escape regex special characters in variables and join with pipe
            const escapedVars = variables.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const regex = new RegExp(escapedVars.join('|'), 'g');
            bodyWithIndices = data.body.replace(regex, (matched) => varMap[matched]);
        }

        const submissionData = {
            ...data,
            body: bodyWithIndices,
            body_examples: examples
        };

        transform((_) => submissionData);

        post(route('whatsapp.templates.store'), {
            onFinish: () => setIsSubmitting(false),
            onError: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsSubmitting(false);
            }
        });
    };

    const addCTAButton = (type) => {
        if (data.buttons.length >= 10) return;
        
        let newBtn = { type, text: '' };
        if (type === 'URL') {
            newBtn.text = 'Visit Website';
            newBtn.url = '';
            newBtn.url_type = 'STATIC';
        } else if (type === 'PHONE_NUMBER') {
            newBtn.text = 'Call';
            newBtn.phone_number = '';
        } else if (type === 'COPY_CODE') {
            newBtn.text = 'Copy Code';
            newBtn.coupon_code = '';
        } else if (type === 'QUICK_REPLY') {
            newBtn.text = 'Quick Reply';
        }
        
        setData('buttons', [...data.buttons, newBtn]);
    };

    const updateButtonValue = (index, field, value) => {
        const newButtons = [...data.buttons];
        newButtons[index][field] = value;
        setData('buttons', newButtons);
    };

    const removeButton = (index) => {
        const newButtons = [...data.buttons];
        newButtons.splice(index, 1);
        setData('buttons', newButtons);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const response = await axios.post(route('whatsapp.media.upload'), formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token
                }
            });

            if (response.data.success) {
                setData('header_handle', response.data.handle);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Failed to upload media sample.';
            alert(`Upload Error: ${errorMsg}`);
        } finally {
            setIsUploading(false);
        }
    };

    const insertVariable = (variable) => {
        const textarea = bodyRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        const newText = before + `{{${variable}}}` + after;
        
        setData('body', newText);
        setIsAttributeModalOpen(false);
        
        setTimeout(() => {
            textarea.focus();
            const newCursor = start + variable.length + 4;
            textarea.setSelectionRange(newCursor, newCursor);
        }, 10);
    };

    const insertEmoji = (emoji) => {
        const textarea = bodyRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        const newText = before + emoji + after;
        
        setData('body', newText);
        
        setTimeout(() => {
            textarea.focus();
            const newCursor = start + emoji.length;
            textarea.setSelectionRange(newCursor, newCursor);
        }, 10);
    };

    const insertLink = () => {
        const url = window.prompt("Enter URL (e.g. google.com):");
        if (!url) return;
        
        let formattedUrl = url.trim();
        if (!formattedUrl.startsWith('http')) {
            formattedUrl = 'https://' + formattedUrl;
        }

        const textarea = bodyRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        const newText = before + formattedUrl + after;
        
        setData('body', newText);
        
        setTimeout(() => {
            textarea.focus();
            const newCursor = start + formattedUrl.length;
            textarea.setSelectionRange(newCursor, newCursor);
        }, 10);
    };

    const applyFormatting = (format) => {
        const textarea = bodyRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        
        if (start === end) return;

        const selectedText = text.substring(start, end);
        let tag = '';
        if (format === 'bold') tag = '*';
        if (format === 'italic') tag = '_';
        if (format === 'strikethrough') tag = '~';
        
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        const newText = before + tag + selectedText + tag + after;
        
        setData('body', newText);
        
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + 1, end + 1);
        }, 10);
    };

    const AttributeModal = () => {
        if (!isAttributeModalOpen) return null;
        const attributes = ['name', 'phone', 'email', 'source', 'category', 'owner', 'last_contacted_at'];
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform animate-scale-in">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <div>
                            <h4 className="text-lg font-bold text-[#0B1F2A]">Select Variable</h4>
                            <p className="text-xs text-gray-400">Choose a contact field to insert</p>
                        </div>
                        <button onClick={() => setIsAttributeModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <div className="flex flex-wrap gap-2">
                            {attributes.map(attr => (
                                <button key={attr} onClick={() => insertVariable(attr)} className="px-4 py-2.5 bg-white border border-gray-100 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 group">
                                    <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#25D366]"></div>
                                    {attr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EmojiPicker = () => {
        if (!isEmojiPickerOpen) return null;
        const emojis = ['😊', '😂', '😍', '👍', '🙏', '❤️', '🔥', '✨', '🙌', '👏', '🤝', '✅', '🚀', '💡', '⏰', '📱', '📦', '💰', '🛒', '🎁', '📣', '📍', '✉️', '📞'];
        return (
            <div className="absolute top-[50px] left-0 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-[240px] animate-scale-in origin-top-left">
                <div className="grid grid-cols-6 gap-2">
                    {emojis.map(emoji => (
                        <button key={emoji} onClick={() => { insertEmoji(emoji); setIsEmojiPickerOpen(false); }} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-all text-lg">
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderMockupBody = (text) => {
        if (!text) return '';
        let renderedText = text;
        Object.entries(data.body_examples).forEach(([variable, value]) => {
            if (value) {
                renderedText = renderedText.replaceAll(variable, value);
            }
        });
        return renderedText;
    };

    const WhatsAppMockup = () => {
        return (
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#E5DDD5] flex flex-col">
                    <div className="bg-[#075E54] p-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        <div className="text-white text-xs font-bold leading-tight">Business Account<div className="text-[10px] font-normal opacity-80">Online</div></div>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-4">
                        <div className="bg-white rounded-lg shadow-sm p-0 overflow-hidden max-w-[90%] relative">
                            {['IMAGE', 'VIDEO', 'DOCUMENT'].includes(data.header_type) && (
                                <div className="aspect-video bg-gray-50 flex flex-col items-center justify-center p-6 border-b border-gray-100">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-300">
                                        {data.header_type === 'IMAGE' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                        {data.header_type === 'VIDEO' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                        {data.header_type === 'DOCUMENT' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                                    </div>
                                    <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{data.header_type} HEADER</div>
                                </div>
                            )}
                            {data.header_type === 'TEXT' && data.header_text && (
                                <div className="px-3 py-2 font-bold text-sm border-b border-gray-50">{data.header_text}</div>
                            )}
                            <div className="px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap">{renderMockupBody(data.body) || 'Type your message body...'}</div>
                            {data.footer && <div className="px-3 pb-2 text-[10px] text-gray-400">{data.footer}</div>}
                        </div>
                        <div className="space-y-1 w-[90%] mx-auto pb-4">
                            {data.buttons.map((btn, idx) => (
                                <div key={idx} className="bg-white text-[#00a5f4] text-[11px] font-bold py-2.5 rounded-lg shadow-sm text-center border-t border-gray-100 flex items-center justify-center gap-2 transition-all hover:bg-gray-50">
                                    {btn.type === 'QUICK_REPLY' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>}
                                    {btn.type === 'URL' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}
                                    {btn.type === 'PHONE_NUMBER' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                                    {btn.type === 'COPY_CODE' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>}
                                    {btn.text || (btn.type === 'URL' ? 'Visit Website' : btn.type === 'PHONE_NUMBER' ? 'Call' : btn.type === 'COPY_CODE' ? 'Copy Code' : 'Quick Reply')}
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
                        <div className="flex-1 space-y-6">
                            {(currentError || Object.keys(errors).length > 0) && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-3xl animate-fade-in shadow-sm flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[12px] font-bold text-red-800 uppercase tracking-wider mb-1">Submission Failed</h4>
                                        <p className="text-sm font-medium text-red-600 mb-2">{currentError || 'Please check the form for errors.'}</p>
                                        {Object.keys(errors).length > 0 && (
                                            <ul className="list-disc list-inside text-xs text-red-500 space-y-1 ml-1 opacity-90">
                                                {Object.entries(errors).map(([field, msg]) => (
                                                    <li key={field}><span className="font-bold capitalize">{field.replace(/_/g, ' ')}:</span> {msg}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 space-y-12">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#0B1F2A] font-heading">1. Message Context</h3>
                                        </div>
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

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Header Format</label>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {[
                                                    { label: 'None', type: 'NONE' },
                                                    { label: 'Text', type: 'TEXT' },
                                                    { label: 'Image', type: 'IMAGE' },
                                                    { label: 'Video', type: 'VIDEO' },
                                                    { label: 'Document', type: 'DOCUMENT' },
                                                ].map((item) => (
                                                    <button 
                                                        key={item.type}
                                                        type="button"
                                                        onClick={() => setData({ ...data, header_type: item.type, header_text: '', header_handle: '' })}
                                                        className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl border-2 transition-all font-bold text-xs ${data.header_type === item.type ? 'bg-[#0B1F2A] border-[#0B1F2A] text-white shadow-lg shadow-black/10 scale-[1.02]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                                    >
                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.header_type === item.type ? 'border-[#25D366] bg-[#25D366]' : 'border-gray-200'}`}>
                                                            {data.header_type === item.type && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                                        </div>
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Header Content Input */}
                                            {data.header_type === 'TEXT' && (
                                                <div className="animate-fade-in space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Campaign title</label>
                                                        <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-0.5 rounded tracking-widest">{data.header_text.length}/60</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        maxLength="60"
                                                        className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                        placeholder="Example: Order Confirmed!"
                                                        value={data.header_text}
                                                        onChange={e => setData('header_text', e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            {['IMAGE', 'VIDEO', 'DOCUMENT'].includes(data.header_type) && (
                                                <div className="animate-fade-in space-y-4">
                                                    <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-1 italic">
                                                        ({data.header_type}: {data.header_type === 'IMAGE' ? '.jpeg, .png' : data.header_type === 'VIDEO' ? '.mp4' : '.pdf'})
                                                    </p>
                                                    <div className="flex gap-4">
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all"
                                                                placeholder={`https://cdn.example.com/${data.header_type.toLowerCase()}.${data.header_type === 'IMAGE' ? 'png' : data.header_type === 'VIDEO' ? 'mp4' : 'pdf'}`}
                                                                value={data.header_handle}
                                                                onChange={e => setData('header_handle', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-gray-300">or</span>
                                                            <input 
                                                                type="file" 
                                                                ref={fileInputRef} 
                                                                className="hidden" 
                                                                onChange={handleFileUpload}
                                                                accept={data.header_type === 'IMAGE' ? 'image/*' : data.header_type === 'VIDEO' ? 'video/*' : '.pdf'}
                                                            />
                                                            <button 
                                                                type="button" 
                                                                onClick={() => fileInputRef.current.click()}
                                                                disabled={isUploading}
                                                                className="px-6 py-3 bg-white border-2 border-[#25D366] text-[#25D366] rounded-xl text-xs font-black transition-all hover:bg-[#25D366]/5 flex items-center gap-2 disabled:opacity-50"
                                                            >
                                                                {isUploading ? (
                                                                    <>
                                                                        <svg className="animate-spin h-3.5 w-3.5 text-[#25D366]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                        Uploading...
                                                                    </>
                                                                ) : 'Upload Media'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400">Meta requires a sample file for review when using media headers.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Message Body</label>
                                                    <p className="text-[10px] text-gray-400">Make your messages personal using variables like <span className="text-[#25D366] font-bold">{"{{name}}"}</span></p>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsAttributeModalOpen(true)}
                                                    className="flex items-center gap-2 text-xs font-bold text-[#25D366] hover:bg-[#25D366]/5 px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-[#25D366]/20"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Add Variable
                                                </button>
                                            </div>
                                            
                                            <div className="group relative bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-[#25D366] focus-within:bg-white transition-all shadow-sm">
                                                {/* Toolbar */}
                                                <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative">
                                                    <div className="flex items-center gap-1">
                                                        <button 
                                                            type="button" 
                                                            title="Smilies"
                                                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                                            className={`p-2 hover:bg-white rounded-xl transition-all ${isEmojiPickerOpen ? 'text-[#25D366] bg-white' : 'text-gray-400 hover:text-[#0B1F2A]'}`}
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                                                        </button>
                                                        <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                                        <button 
                                                            type="button" 
                                                            title="Bold"
                                                            onClick={() => applyFormatting('bold')}
                                                            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#0B1F2A] transition-all font-bold font-serif"
                                                        >
                                                            B
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            title="Italic"
                                                            onClick={() => applyFormatting('italic')}
                                                            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#0B1F2A] transition-all italic font-serif"
                                                        >
                                                            I
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            title="Strikethrough"
                                                            onClick={() => applyFormatting('strikethrough')}
                                                            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#0B1F2A] transition-all line-through font-serif"
                                                        >
                                                            S
                                                        </button>
                                                        <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                                        <button 
                                                            type="button" 
                                                            title="Insert Link"
                                                            onClick={() => insertLink()}
                                                            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-[#0B1F2A] transition-all"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                                                        </button>

                                                        {/* Emoji Picker Popover */}
                                                        <EmojiPicker />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2">
                                                        {data.body.length}/1024
                                                    </div>
                                                </div>

                                                <textarea
                                                    ref={bodyRef}
                                                    rows="6"
                                                    maxLength="1024"
                                                    className="w-full bg-transparent border-none focus:ring-0 text-sm p-6 placeholder:text-gray-300 leading-relaxed font-body"
                                                    placeholder="Type your message body here... Use formatting buttons for bold or italics."
                                                    value={data.body}
                                                    onChange={e => setData('body', e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Footer (Optional)</label>
                                                <span className="text-[10px] text-gray-300">{data.footer.length}/60</span>
                                            </div>
                                            <input type="text" maxLength="60" className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm" value={data.footer} onChange={e => setData('footer', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="h-px bg-gray-50 w-full"></div>
                                    {/* 2. Interactive Actions */}
                                    <div className="space-y-8 animate-fade-in">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-[#0B1F2A] font-heading">2. Interactive Actions</h3>
                                                    <p className="text-[10px] text-gray-400">Add common actions to increase campaign conversion!</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-2xl border border-gray-100">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended</span>
                                                <div className="w-10 h-5 bg-[#25D366] rounded-full relative p-1 cursor-pointer">
                                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Buttons Builder */}
                                        <div className="space-y-12">
                                            {/* CTA Buttons */}
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">1. Call to Actions (CTA)</h4>
                                                    <div className="flex gap-2">
                                                        {data.buttons.filter(b => b.type === 'URL').length < 2 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => addCTAButton('URL')}
                                                                className="px-4 py-2 bg-white border border-gray-100 hover:border-[#25D366] hover:text-[#25D366] rounded-xl text-[10px] font-bold transition-all shadow-sm"
                                                            >
                                                                + Add Website
                                                            </button>
                                                        )}
                                                        {data.buttons.filter(b => b.type === 'PHONE_NUMBER').length < 1 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => addCTAButton('PHONE_NUMBER')}
                                                                className="px-4 py-2 bg-white border border-gray-100 hover:border-[#25D366] hover:text-[#25D366] rounded-xl text-[10px] font-bold transition-all shadow-sm"
                                                            >
                                                                + Add Phone
                                                            </button>
                                                        )}
                                                        {data.buttons.filter(b => b.type === 'COPY_CODE').length < 1 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => addCTAButton('COPY_CODE')}
                                                                className="px-4 py-2 bg-white border border-gray-100 hover:border-[#25D366] hover:text-[#25D366] rounded-xl text-[10px] font-bold transition-all shadow-sm"
                                                            >
                                                                + Add Copy Code
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {data.buttons.filter(b => b.type !== 'QUICK_REPLY').map((btn, originalIdx) => {
                                                        const realIdx = data.buttons.findIndex(b => b === btn);
                                                        return (
                                                            <div key={realIdx} className="group relative flex flex-wrap lg:flex-nowrap gap-4 items-center bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 hover:border-[#25D366]/30 transition-all">
                                                                <div className="w-full lg:w-40 flex-shrink-0">
                                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">{btn.type}</div>
                                                                    <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-600">
                                                                        {btn.type === 'URL' ? 'Static URL' : btn.type === 'PHONE_NUMBER' ? 'Phone Number' : 'Copy Code'}
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 relative">
                                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Button Text</div>
                                                                    <input type="text" maxLength="25" className="w-full border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all font-bold" value={btn.text} onChange={e => updateButtonValue(realIdx, 'text', e.target.value)} />
                                                                </div>
                                                                {btn.type === 'URL' && <input type="text" className="flex-[1.5] border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm" placeholder="https://example.com" value={btn.url} onChange={e => updateButtonValue(realIdx, 'url', e.target.value)} />}
                                                                {btn.type === 'PHONE_NUMBER' && <input type="text" className="flex-1 border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm" placeholder="+91..." value={btn.phone_number} onChange={e => updateButtonValue(realIdx, 'phone_number', e.target.value)} />}
                                                                {btn.type === 'COPY_CODE' && <input type="text" className="flex-1 border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm" placeholder="CODE" value={btn.coupon_code} onChange={e => updateButtonValue(realIdx, 'coupon_code', e.target.value)} />}
                                                                <button onClick={() => removeButton(realIdx)} className="p-3 text-gray-400 hover:text-red-500">Remove</button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Quick Replies */}
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">2. Quick Replies</h4>
                                                    {data.buttons.length < 10 && (
                                                        <button 
                                                            type="button" 
                                                            onClick={() => addCTAButton('QUICK_REPLY')}
                                                            className="px-6 py-2.5 bg-[#25D366] text-white rounded-2xl text-[10px] font-black transition-all shadow-md"
                                                        >
                                                            + Add Button
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {data.buttons.filter(b => b.type === 'QUICK_REPLY').map((btn, originalIdx) => {
                                                        const realIdx = data.buttons.findIndex(b => b === btn);
                                                        return (
                                                            <div key={realIdx} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-[1.5rem] border border-gray-100">
                                                                <input type="text" maxLength="25" className="flex-1 border-gray-200 bg-white rounded-2xl px-5 py-3 text-sm font-bold" value={btn.text} onChange={e => updateButtonValue(realIdx, 'text', e.target.value)} />
                                                                <button onClick={() => removeButton(realIdx)} className="p-3 text-gray-400 hover:text-red-500">×</button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. Sample Content */}
                                        {Object.keys(data.body_examples).length > 0 && (
                                            <div className="space-y-8 animate-fade-in pt-8 border-t border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-[#0B1F2A] font-heading">3. Sample Content</h3>
                                                        <p className="text-[10px] text-gray-400">Just enter sample content here (it doesn't need to be exact!)</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {Object.entries(data.body_examples).map(([variable, value]) => (
                                                        <div key={variable} className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md">
                                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1 flex items-center gap-2">
                                                                Enter content for <span className="text-[#4F46E5] lowercase">{variable}</span>
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                className="w-full border-gray-200 bg-white rounded-3xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all font-medium placeholder:text-gray-300"
                                                                placeholder={`e.g. ${variable === '{{name}}' ? 'John Doe' : 'Sample'}`}
                                                                value={value}
                                                                onChange={e => {
                                                                    const newExp = { ...data.body_examples, [variable]: e.target.value };
                                                                    setData('body_examples', newExp);
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="bg-indigo-50/50 p-4 rounded-3xl border border-indigo-100/50 flex items-start gap-4 mx-2">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-4 h-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">
                                                        Meta requires valid sample values for every variable in your template before approval. 
                                                        <span className="font-bold underline ml-1">Important:</span> Make sure not to include any actual user or customer information. Provide only sample content.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    <button onClick={submit} disabled={!isConnected || processing} className="bg-[#0B1F2A] hover:bg-black text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-all disabled:opacity-50">
                                        {processing ? 'Processing...' : 'Submit to Meta'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[400px]">
                            <div className="sticky top-8">
                                <WhatsAppMockup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AttributeModal />
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </AuthenticatedLayout>
    );
}
