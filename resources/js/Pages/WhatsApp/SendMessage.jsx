import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function SendMessage() {
    const { isConnected, templates = [], contacts = [] } = usePage().props;
    
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [detailedErrors, setDetailedErrors] = useState([]);

    const [msgType, setMsgType] = useState('text'); // text, template, image, document
    const [recipientMode, setRecipientMode] = useState('single'); // single, bulk, crm
    
    const [singleRecipient, setSingleRecipient] = useState('');
    const [bulkRecipients, setBulkRecipients] = useState('');
    const [selectedCRMContacts, setSelectedCRMContacts] = useState([]);
    
    const [message, setMessage] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');

    // Template details
    const templateData = useMemo(() => {
        return templates.find(t => t.name === selectedTemplate);
    }, [selectedTemplate, templates]);

    const templateBody = useMemo(() => {
        const bodyComp = templateData?.components?.find(c => c.type === 'BODY');
        return bodyComp?.text || '';
    }, [templateData]);

    const handleSend = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);
        setError(null);
        setDetailedErrors([]);

        let recipients = [];
        if (recipientMode === 'single') {
            recipients = [singleRecipient];
        } else if (recipientMode === 'bulk') {
            recipients = bulkRecipients.split(/[\n,]+/).map(r => r.trim()).filter(r => r);
        } else if (recipientMode === 'crm') {
            recipients = selectedCRMContacts.map(id => contacts.find(c => c.id === id)?.phone_number).filter(r => r);
        }

        if (recipients.length === 0) {
            setError('Please provide at least one recipient.');
            setSending(false);
            return;
        }

        try {
            const payload = {
                recipients,
                type: msgType,
                message: msgType === 'text' ? message : (msgType === 'template' ? templateBody : null),
                template_name: msgType === 'template' ? selectedTemplate : null,
                template_language: msgType === 'template' ? templateData?.language : null,
                media_url: (msgType === 'image' || msgType === 'document') ? mediaUrl : null,
            };

            const response = await axios.post('/whatsapp/send-message', payload);
            
            if (response.data.success) {
                setStatus(response.data.summary);
                if (response.data.details?.fail_count > 0) {
                    setDetailedErrors(response.data.details.errors);
                }
                // Reset form on success if single
                if (recipientMode === 'single' && response.data.details?.fail_count === 0) {
                    setSingleRecipient('');
                    setMessage('');
                    setMediaUrl('');
                }
            } else {
                setError(response.data.summary);
                setDetailedErrors(response.data.details?.errors || []);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send messages.');
        } finally {
            setSending(false);
        }
    };

    const toggleCRMContact = (id) => {
        setSelectedCRMContacts(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Pro Messaging Console
                </h2>
            }
        >
            <Head title="Send Message" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Left Column: Recipient Selection */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800 h-full border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">1. Select Audience</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                                        <button 
                                            onClick={() => setRecipientMode('single')}
                                            className={`flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === 'single' ? 'bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold' : 'text-gray-500'}`}
                                        >Single</button>
                                        <button 
                                            onClick={() => setRecipientMode('bulk')}
                                            className={`flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === 'bulk' ? 'bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold' : 'text-gray-500'}`}
                                        >Bulk</button>
                                        <button 
                                            onClick={() => setRecipientMode('crm')}
                                            className={`flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === 'crm' ? 'bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold' : 'text-gray-500'}`}
                                        >CRM</button>
                                    </div>

                                    {recipientMode === 'single' && (
                                        <div>
                                            <InputLabel value="Phone Number" />
                                            <TextInput 
                                                className="w-full mt-1" 
                                                placeholder="+12345..." 
                                                value={singleRecipient}
                                                onChange={e => setSingleRecipient(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {recipientMode === 'bulk' && (
                                        <div>
                                            <InputLabel value="Enter Numbers (Newline or Comma)" />
                                            <textarea 
                                                className="w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" 
                                                rows={6}
                                                placeholder="+123456789\n+987654321..."
                                                value={bulkRecipients}
                                                onChange={e => setBulkRecipients(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {recipientMode === 'crm' && (
                                        <div className="max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                            {contacts.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No contacts in CRM yet.</p>}
                                            {contacts.map(contact => (
                                                <div 
                                                    key={contact.id}
                                                    onClick={() => toggleCRMContact(contact.id)}
                                                    className={`p-2 border rounded cursor-pointer transition ${selectedCRMContacts.includes(contact.id) ? 'border-[#1877F2] bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                                                >
                                                    <p className="text-sm font-medium">{contact.name}</p>
                                                    <p className="text-xs text-gray-500">{contact.phone_number}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Message Composition */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">2. Compose Message</h3>

                                {!isConnected && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 rounded text-red-800 dark:text-red-200 text-sm">
                                        WhatsApp is not connected. Please connect via dashboard.
                                    </div>
                                )}

                                <div className="space-y-6">
                                    <div className="flex space-x-4 border-b dark:border-gray-700 pb-4">
                                        {['text', 'template', 'image', 'document'].map(type => (
                                            <button 
                                                key={type}
                                                onClick={() => setMsgType(type)}
                                                className={`text-sm font-medium capitalize pb-2 px-1 transition ${msgType === type ? 'text-[#1877F2] border-b-2 border-[#1877F2]' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>

                                    {msgType === 'text' && (
                                        <div>
                                            <InputLabel value="Message Content" />
                                            <textarea 
                                                className="w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" 
                                                rows={5}
                                                placeholder="Hello, how can I help you today?"
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {msgType === 'template' && (
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel value="Select Approved Template" />
                                                <select 
                                                    className="w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                                    value={selectedTemplate}
                                                    onChange={e => setSelectedTemplate(e.target.value)}
                                                >
                                                    <option value="">-- Choose a template --</option>
                                                    {templates.map(t => (
                                                        <option key={t.id} value={t.name}>{t.name} ({t.language})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {selectedTemplate && (
                                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Live Preview (Body)</p>
                                                    <p className="text-sm italic">{templateBody || 'Loading body...'}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {(msgType === 'image' || msgType === 'document') && (
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel value={`${msgType === 'image' ? 'Image' : 'Document'} URL (Public link)`} />
                                                <TextInput 
                                                    className="w-full mt-1" 
                                                    placeholder="https://example.com/file.jpg" 
                                                    value={mediaUrl}
                                                    onChange={e => setMediaUrl(e.target.value)}
                                                />
                                                <p className="text-xs text-gray-500 mt-2">
                                                    For {msgType === 'image' ? 'images' : 'PDFs'}, ensure the link is publicly accessible via HTTPS.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 flex flex-col space-y-4 border-t dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="space-x-4">
                                                {status && <span className="text-sm font-semibold text-green-600 dark:text-green-400">✓ {status}</span>}
                                                {error && <span className="text-sm font-semibold text-red-600 dark:text-red-400">✗ {error}</span>}
                                            </div>
                                            <PrimaryButton 
                                                onClick={handleSend}
                                                disabled={!isConnected || sending}
                                            >
                                                {sending ? 'Processing Broadcast...' : 'Execute Send'}
                                            </PrimaryButton>
                                        </div>

                                        {detailedErrors.length > 0 && (
                                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded text-xs text-red-700 dark:text-red-300 space-y-1">
                                                <p className="font-bold mb-1">Detailed Errors:</p>
                                                {detailedErrors.map((err, i) => (
                                                    <p key={i}>• {err}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
