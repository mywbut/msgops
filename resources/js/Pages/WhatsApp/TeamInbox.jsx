import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
    Search, 
    MessageSquare, 
    Check, 
    X, 
    Send, 
    Clock, 
    Zap, 
    Plus, 
    ChevronRight, 
    MoreVertical, 
    Smile, 
    Paperclip,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    User,
    Tag,
    Image as ImageIcon,
    Video as VideoIcon,
    FileText,
    Music,
    Sticker,
    UploadCloud,
    Loader2,
    Download
} from 'lucide-react';

const POPULAR_EMOJIS = [
    '😊', '😂', '🔥', '👍', '❤️', '👏', '🙌', '🎉', '✨', '🙏', 
    '🤩', '🤔', '😎', '💡', '🚀', '✅', '❌', '📢', '🎁', '👋',
    '😍', '😜', '🤭', '🤐', '🙄', '😴', '💪', '💯', '💰', '🌟',
    '🌈', '🎈', '🍕', '☕', '🏢', '📱', '📧', '📍', '📆', '🤝'
];

export default function TeamInbox({ selectedContactId, templates = [] }) {
    const { auth } = usePage().props;
    const [conversations, setConversations] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Template Picker States
    const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
    const [templateSearch, setTemplateSearch] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [variableValues, setVariableValues] = useState({});
    const [isSending, setIsSending] = useState(false);

    // Attachment Modal States
    const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
    const [attachmentTab, setAttachmentTab] = useState('image'); // image, video, document, audio, sticker
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Emoji Picker State
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const prevMessagesLengthRef = useRef(0);
    const fileInputRef = useRef(null);
    const textAreaRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const lastMessageIdRef = useRef(null);
    const incomingSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'));
    const outgoingSoundRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'));

    const scrollToBottom = (behavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact.id);
            const interval = setInterval(() => fetchMessages(selectedContact.id), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedContact]);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container || messages.length === 0) return;

        const lastMessage = messages[messages.length - 1];
        const lastMessageId = lastMessage?.id || lastMessage?.created_at; // Fallback to timestamp if ID missing
        
        // Detect if there's a brand new message (not just a fetch refresh)
        const isNewMessage = lastMessageId !== lastMessageIdRef.current;
        
        if (isNewMessage) {
            const isOutbound = lastMessage?.direction === 'outbound';
            
            // 1. Play Sound (if it's not the initial load)
            if (lastMessageIdRef.current !== null) {
                if (isOutbound) {
                    outgoingSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
                } else {
                    incomingSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
                }
            }

            // 2. Auto-scroll logic 
            // Determine if user is already at the bottom (with 150px threshold)
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 150;

            // Scenario A: First load -> Scroll auto
            // Scenario B: User sent message -> Scroll smooth
            // Scenario C: Received message while at bottom -> Scroll smooth
            if (lastMessageIdRef.current === null) {
                scrollToBottom("auto");
            } else if (isOutbound || isAtBottom) {
                scrollToBottom("smooth");
            }

            lastMessageIdRef.current = lastMessageId;
        }

        prevMessagesLengthRef.current = messages.length;
    }, [messages]);

    // Handle click outside to close the Emoji Picker
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
                setIsEmojiPickerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(route('api.whatsapp.conversations'));
            setConversations(response.data.conversations);
            setIsLoading(false);
            
            if (selectedContactId && !selectedContact) {
                const preselected = response.data.conversations.find(c => c.id === selectedContactId);
                if (preselected) setSelectedContact(preselected);
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchMessages = async (contactId) => {
        try {
            const response = await axios.get(route('api.whatsapp.messages', contactId));
            setMessages(response.data.messages);
            setIsExpired(response.data.is_expired);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContact) return;

        try {
            const response = await axios.post(route('whatsapp.send-message'), {
                recipients: [selectedContact.phone_number],
                type: 'text',
                message: newMessage
            });

            if (response.data.success) {
                setNewMessage('');
                fetchMessages(selectedContact.id);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !selectedContact) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', attachmentTab);

        try {
            const uploadResponse = await axios.post(route('whatsapp.media.upload'), formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            });

            if (uploadResponse.data.success) {
                // Now send the message with this media URL
                const sendResponse = await axios.post(route('whatsapp.send-message'), {
                    recipients: [selectedContact.phone_number],
                    type: attachmentTab,
                    media_url: uploadResponse.data.url,
                    message: newMessage // Use whatever is in input as caption
                });

                if (sendResponse.data.success) {
                    setIsAttachmentModalOpen(false);
                    setNewMessage('');
                    fetchMessages(selectedContact.id);
                }
            }
        } catch (error) {
            console.error('Upload Failed:', error);
            alert('Failed to upload file. Please try again.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const appendEmoji = (emoji) => {
        setNewMessage(prev => prev + emoji);
        // setIsEmojiPickerOpen(false); // Optional: Keep open if users want to send multiple
    };

    const sendTemplateMessage = async () => {
        if (!selectedTemplate || !selectedContact) return;
        setIsSending(true);

        const bodyComp = selectedTemplate.components.find(c => c.type === 'BODY');
        let renderedText = bodyComp?.text || `Sent template: ${selectedTemplate.name}`;
        
        // Prepare parameters for Meta API
        const parameters = [];
        const varCount = (renderedText.match(/\{\{\d+\}\}/g) || []).length;
        
        for (let i = 1; i <= varCount; i++) {
            const val = variableValues[i] || 'Customer';
            parameters.push({ type: 'text', text: val });
            renderedText = renderedText.replace(`{{${i}}}`, val);
        }

        try {
            const response = await axios.post(route('whatsapp.send-message'), {
                recipients: [selectedContact.phone_number],
                type: 'template',
                template_name: selectedTemplate.name,
                template_language: selectedTemplate.language,
                template_components: parameters.length > 0 ? [{ type: 'body', parameters }] : [],
                message: renderedText
            });

            if (response.data.success) {
                setIsTemplatePickerOpen(false);
                setSelectedTemplate(null);
                setVariableValues({});
                fetchMessages(selectedContact.id);
            }
        } catch (error) {
            console.error('Error sending template:', error);
        } finally {
            setIsSending(false);
        }
    };

    const filteredConversations = conversations.filter(c => 
        (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (c.phone_number || '').includes(searchQuery)
    );

    const filteredTemplates = templates.filter(t => 
        t.status === 'APPROVED' && 
        (t.name.toLowerCase().includes(templateSearch.toLowerCase()) || 
         t.category.toLowerCase().includes(templateSearch.toLowerCase()))
    );

    const getTemplateVarCount = (template) => {
        const body = template.components.find(c => c.type === 'BODY')?.text || '';
        return (body.match(/\{\{\d+\}\}/g) || []).length;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Team Inbox" />

            <div className="flex h-[calc(100vh-80px)] mx-4 my-4 bg-white rounded-[2rem] shadow-xl shadow-black/5 overflow-hidden border border-gray-100">
                {/* Left Pane: Contacts Panel */}
                <div className="w-72 lg:w-80 flex flex-col border-r border-gray-50 bg-[#F8FAFC]">
                    <div className="p-6 bg-white border-b border-gray-50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-[#0B1F2A] font-heading tracking-tight">Messages</h2>
                            <div className="p-2 bg-gray-50 rounded-xl text-gray-400 cursor-pointer hover:bg-gray-100 transition-all">
                                <Plus className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#25D366] transition-all group-hover:bg-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 opacity-20">
                                <div className="w-8 h-8 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-[10px] font-black uppercase tracking-widest">Waking up...</p>
                            </div>
                        ) : filteredConversations.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <p className="text-xs font-bold text-gray-400">No chats found</p>
                            </div>
                        ) : (
                            filteredConversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedContact(conv)}
                                    className={`p-4 rounded-2xl cursor-pointer transition-all flex gap-4 relative group ${
                                        selectedContact?.id === conv.id 
                                        ? 'bg-white shadow-lg shadow-black/5 ring-1 ring-gray-100' 
                                        : 'hover:bg-white/60'
                                    }`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] font-black text-lg border border-[#25D366]/5">
                                            {conv.name?.charAt(0) || '?'}
                                        </div>
                                        {conv.unread_count > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                                {conv.unread_count}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <div className="font-bold text-[#0B1F2A] text-sm truncate">{conv.name || conv.phone_number}</div>
                                            <div className="text-[10px] font-bold text-gray-300">{conv.last_message_time}</div>
                                        </div>
                                        <div className="text-xs text-gray-400 truncate font-medium">{conv.last_message || 'New connection'}</div>
                                    </div>
                                    {selectedContact?.id === conv.id && (
                                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#25D366] rounded-full"></div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Middle Pane: Chat View */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                    {selectedContact ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-white/80 backdrop-blur-md z-10 sticky top-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0B1F2A] rounded-2xl flex items-center justify-center text-[#25D366] font-black text-xl shadow-lg shadow-black/10">
                                        {selectedContact.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <div className="font-black text-[#0B1F2A] tracking-tight">{selectedContact.name}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></div>
                                            <div className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Active Chat</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div 
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-8 space-y-6" 
                                style={{ backgroundImage: 'radial-gradient(#25D366 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundOpacity: 0.05 }}
                            >
                                {messages.map((msg, idx) => {
                                    const isOutbound = msg.direction === 'outbound';
                                    const showDate = idx === 0 || messages[idx-1].date !== msg.date;

                                    return (
                                        <div key={msg.id || idx}>
                                            {showDate && (
                                                <div className="flex justify-center mb-8">
                                                    <span className="px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm">
                                                        {msg.date}
                                                    </span>
                                                </div>
                                            )}
                                            <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                                <div className={`max-w-[80%] lg:max-w-[65%] rounded-[2rem] px-6 py-4 shadow-xl shadow-black/5 relative group ${
                                                    isOutbound 
                                                    ? 'bg-[#25D366] text-white rounded-tr-none' 
                                                    : 'bg-white text-[#0B1F2A] rounded-tl-none border border-gray-50'
                                                }`}>
                                                    <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                                        {msg.content?.header && (
                                                            <div className="font-black text-[15px] mb-2 tracking-tight border-b border-white/10 pb-1 italic">
                                                                {msg.content.header}
                                                            </div>
                                                        )}
                                                        
                                                        {/* Media Rendering */}
                                                        {msg.type === 'image' && (
                                                            <div className="mb-3 rounded-2xl overflow-hidden shadow-sm border border-black/5">
                                                                <img src={msg.content?.media_url} alt="Shared Image" className="w-full h-auto max-h-80 object-cover" />
                                                            </div>
                                                        )}
                                                        {msg.type === 'video' && (
                                                            <div className="mb-3 rounded-2xl overflow-hidden bg-black/5">
                                                                <video controls src={msg.content?.media_url} className="w-full h-auto max-h-80"></video>
                                                            </div>
                                                        )}
                                                        {msg.type === 'document' && (
                                                            <div className="mb-3 p-4 bg-black/5 rounded-2xl flex items-center gap-3 border border-black/5">
                                                                <div className="p-2 bg-white rounded-lg text-red-500">
                                                                    <FileText className="w-6 h-6" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-[10px] font-black uppercase tracking-tight truncate">{msg.content?.filename || 'Document'}</p>
                                                                    <a href={msg.content?.media_url} target="_blank" className="text-[9px] font-black text-blue-500 uppercase flex items-center gap-1 hover:underline">
                                                                        <Download className="w-3 h-3" /> Download
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {msg.type === 'audio' && (
                                                            <div className="mb-3 p-3 bg-black/5 rounded-2xl flex items-center gap-3">
                                                                <Music className="w-5 h-5 opacity-40" />
                                                                <audio controls src={msg.content?.media_url} className="h-8 max-w-full"></audio>
                                                            </div>
                                                        )}

                                                        {msg.content?.body}

                                                        {msg.content?.footer && (
                                                            <div className={`mt-2 text-[10px] font-bold ${isOutbound ? 'text-white/60' : 'text-gray-400'}`}>
                                                                {msg.content.footer}
                                                            </div>
                                                        )}
                                                        {msg.content?.buttons && msg.content.buttons.length > 0 && (
                                                            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                                                                {msg.content.buttons.map((btn, bIdx) => (
                                                                    <div key={bIdx} className={`py-2 px-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border ${
                                                                        isOutbound 
                                                                        ? 'bg-white/10 border-white/20 text-white' 
                                                                        : 'bg-gray-50 border-gray-100 text-[#25D366]'
                                                                    }`}>
                                                                        {btn.text}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={`text-[9px] mt-2 font-black flex justify-end items-center gap-1.5 ${isOutbound ? 'text-white/70' : 'text-gray-300'} uppercase tracking-tighter`}>
                                                        {msg.time}
                                                        {isOutbound && (
                                                            <span>
                                                                {msg.status === 'read' ? <CheckCircle2 className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3 opacity-40" />}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {msg.status === 'failed' && (
                                                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                                                            <div className="p-2 bg-red-50 rounded-xl text-red-500 cursor-help" title={msg.error?.message || 'Delivery failed'}>
                                                                <AlertCircle className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Expired Window Notice */}
                            {isExpired && (
                                <div className="mx-8 mb-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-amber-800 uppercase tracking-tight">Window Expired</p>
                                            <p className="text-[10px] font-bold text-amber-600/80">Only templates can be sent after 24 hours</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsTemplatePickerOpen(true)}
                                        className="px-4 py-2 bg-amber-600 text-white text-[10px] font-black rounded-xl hover:bg-amber-700 transition-all uppercase tracking-widest"
                                    >
                                        Use Template
                                    </button>
                                </div>
                            )}

                            {/* Chat Footer */}
                            {!isExpired && (
                                <div className="p-8 bg-white border-t border-gray-50 relative">
                                    {/* Emoji Picker Popover */}
                                    {isEmojiPickerOpen && (
                                        <div 
                                            ref={emojiPickerRef}
                                            className="absolute bottom-[100%] left-8 mb-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 w-72 animate-scale-up z-[40]"
                                        >
                                            <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1F2A]">Quick Emojis</p>
                                                <button onClick={() => setIsEmojiPickerOpen(false)} className="text-gray-300 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                            </div>
                                            <div className="grid grid-cols-6 gap-3">
                                                {POPULAR_EMOJIS.map((emoji, idx) => (
                                                    <button 
                                                        key={idx} 
                                                        onClick={() => appendEmoji(emoji)}
                                                        className="text-xl hover:scale-125 transition-transform duration-200"
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSendMessage} className="flex gap-4 items-center">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsTemplatePickerOpen(true)}
                                                className="p-3.5 bg-gray-50 text-gray-400 hover:text-[#25D366] hover:bg-gray-100 rounded-2xl transition-all"
                                                title="Choose Template"
                                            >
                                                < Zap className="w-6 h-6" />
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setIsAttachmentModalOpen(true)}
                                                className="p-3.5 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#25D366] rounded-2xl transition-all"
                                                title="Attach Media"
                                            >
                                                <Paperclip className="w-6 h-6" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                                className={`p-3.5 rounded-2xl transition-all ${isEmojiPickerOpen ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#25D366]'}`}
                                                title="Emojis"
                                            >
                                                <Smile className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="flex-1 relative">
                                            <textarea
                                                ref={textAreaRef}
                                                rows="1"
                                                placeholder="Type something beautiful..."
                                                className="w-full border-none bg-gray-50 rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#25D366] transition-all resize-none shadow-inner"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if(e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage(e);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="bg-[#25D366] text-white p-4 rounded-2xl hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 disabled:opacity-30 disabled:grayscale transform hover:scale-105 active:scale-95"
                                        >
                                            <Send className="w-6 h-6" />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 bg-[#F8FAFC]">
                            <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl shadow-black/5 flex items-center justify-center mb-10 group translate-y-[-20%] animate-fade-in">
                                <MessageSquare className="w-12 h-12 text-[#25D366]/20 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-3xl font-black text-[#0B1F2A] mb-4 font-heading tracking-tight">Select a Chat</h3>
                            <p className="text-gray-400 max-w-xs text-center font-medium leading-relaxed mb-10">Start communicating with your customers instantly from your unified team inbox.</p>
                            <button className="px-8 py-3 bg-white border border-gray-100 text-[#0B1F2A] font-black text-[10px] rounded-2xl shadow-sm hover:shadow-md transition-all uppercase tracking-widest">Open Contacts</button>
                        </div>
                    )}

                    {/* Template Picker Modal */}
                    {isTemplatePickerOpen && (
                        <div className="absolute inset-0 z-50 bg-[#0B1F2A]/60 backdrop-blur-md flex items-end lg:items-center justify-center p-4 lg:p-10 animate-fade-in overflow-hidden">
                            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up border border-white/20">
                                {/* Modal Header */}
                                <div className="p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-20">
                                    <div>
                                        <h3 className="text-2xl font-black text-[#0B1F2A] tracking-tight">Choose A Template</h3>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Approved Message Templates</p>
                                    </div>
                                    <button 
                                        onClick={() => { setIsTemplatePickerOpen(false); setSelectedTemplate(null); }}
                                        className="p-3 text-gray-400 hover:text-[#0B1F2A] hover:bg-gray-50 rounded-2xl transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Content - Scroll area */}
                                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                    {!selectedTemplate ? (
                                        <>
                                            {/* Search box */}
                                            <div className="relative mb-8 group">
                                                <input
                                                    type="text"
                                                    placeholder="Search message patterns..."
                                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#25D366] transition-all"
                                                    value={templateSearch}
                                                    onChange={(e) => setTemplateSearch(e.target.value)}
                                                />
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none group-focus-within:text-[#25D366] transition-colors" />
                                            </div>

                                            {/* Template List */}
                                            <div className="grid grid-cols-1 gap-4">
                                                {filteredTemplates.map(t => (
                                                    <div 
                                                        key={t.id}
                                                        onClick={() => setSelectedTemplate(t)}
                                                        className="p-6 bg-[#FAFBFE] border border-gray-100 rounded-[2rem] cursor-pointer hover:border-[#25D366] hover:bg-white hover:shadow-xl hover:shadow-[#25D366]/10 transition-all group"
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <span className="px-3 py-1 bg-[#25D366]/10 text-[#25D366] text-[9px] font-black rounded-full uppercase tracking-widest mb-2 inline-block">
                                                                    {t.category}
                                                                </span>
                                                                <h4 className="font-black text-[#0B1F2A] tracking-tight group-hover:text-[#25D366] transition-colors">{t.name.replace(/_/g, ' ')}</h4>
                                                            </div>
                                                            <div className="p-2 bg-white rounded-xl shadow-sm">
                                                                <ChevronRight className="w-4 h-4 text-gray-300" />
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Visual Preview */}
                                                        <div className="bg-[#E7FFDB] p-4 rounded-xl border border-[#D0E5C9] relative pointer-events-none">
                                                            <div className="text-xs text-gray-800 leading-relaxed font-medium line-clamp-2">
                                                                {t.components.find(c => c.type === 'BODY')?.text}
                                                            </div>
                                                            <div className="mt-2 text-[8px] text-[#25D366]/60 font-black uppercase text-right">View Full Message</div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {filteredTemplates.length === 0 && (
                                                    <div className="py-12 text-center text-gray-300 font-black uppercase text-[10px] tracking-[0.2em]">No Matches</div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="animate-fade-in pb-4">
                                            <button 
                                                onClick={() => setSelectedTemplate(null)}
                                                className="flex items-center gap-2 text-gray-400 hover:text-[#0B1F2A] text-xs font-black uppercase tracking-widest mb-8 group"
                                            >
                                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to List
                                            </button>

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                {/* Left: Final Preview */}
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Message Preview</p>
                                                    <div className="bg-[#E7FFDB] p-6 rounded-[2.5rem] shadow-xl shadow-[#25D366]/20 border border-[#D0E5C9] relative">
                                                        <div className="absolute -left-2 top-8 w-6 h-6 bg-[#E7FFDB] border-l border-t border-[#D0E5C9] rotate-[-45deg]"></div>
                                                        
                                                        <div className="space-y-4">
                                                            {selectedTemplate.components.map((comp, idx) => {
                                                                if (comp.type === 'HEADER') {
                                                                    if (comp.format === 'TEXT') {
                                                                        return <div key={idx} className="font-black text-[#0B1F2A] text-base mb-2 tracking-tight">{comp.text}</div>
                                                                    }
                                                                    if (comp.format === 'IMAGE') {
                                                                        return <div key={idx} className="w-full aspect-video bg-black/5 rounded-2xl flex items-center justify-center text-gray-300 text-[10px] font-black uppercase">Image Header</div>
                                                                    }
                                                                }
                                                                if (comp.type === 'BODY') {
                                                                    let body = comp.text;
                                                                    // Replace variables with inputs
                                                                    const varCount = getTemplateVarCount(selectedTemplate);
                                                                    for(let i=1; i<=varCount; i++) {
                                                                        body = body.replace(`{{${i}}}`, variableValues[i] || `[Variable ${i}]`);
                                                                    }
                                                                    return <p key={idx} className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-wrap">{body}</p>
                                                                }
                                                                if (comp.type === 'FOOTER') {
                                                                    return <p key={idx} className="text-[10px] text-gray-400/80 font-medium">{comp.text}</p>
                                                                }
                                                                if (comp.type === 'BUTTONS') {
                                                                    return (
                                                                        <div key={idx} className="pt-4 border-t border-black/5 flex flex-col gap-2">
                                                                            {comp.buttons.map((b, bIdx) => (
                                                                                <div key={bIdx} className="w-full py-2 bg-white/40 rounded-xl text-center text-blue-500 font-bold text-xs border border-white/60">
                                                                                    {b.text}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                        </div>
                                                        <div className="mt-4 text-right">
                                                            <span className="text-[9px] font-black text-[#25D366]/60 uppercase">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Variable Inputs */}
                                                <div className="space-y-8 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Personalize Message</p>
                                                        <div className="space-y-6">
                                                            {Array.from({ length: getTemplateVarCount(selectedTemplate) }).map((_, i) => (
                                                                <div key={i} className="space-y-2 group">
                                                                    <label className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-wider block ml-1">Variable {i + 1}</label>
                                                                    <input 
                                                                        type="text" 
                                                                        placeholder={`Enter value for {{${i+1}}}`}
                                                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#25D366] transition-all group-hover:bg-gray-100"
                                                                        value={variableValues[i+1] || ''}
                                                                        onChange={(e) => setVariableValues({...variableValues, [i+1]: e.target.value})}
                                                                    />
                                                                </div>
                                                            ))}
                                                            {getTemplateVarCount(selectedTemplate) === 0 && (
                                                                <div className="p-6 bg-[#25D366]/5 rounded-3xl border border-[#25D366]/10 flex items-center gap-4">
                                                                    <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
                                                                    <p className="text-xs font-bold text-[#25D366]">No mapping required. Ready to send!</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={sendTemplateMessage}
                                                        disabled={isSending || Object.keys(variableValues).length < getTemplateVarCount(selectedTemplate)}
                                                        className="w-full py-5 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 active:scale-95 disabled:grayscale disabled:opacity-30 transition-all hover:-translate-y-1"
                                                    >
                                                        {isSending ? 'Launching...' : 'Send Message Now'}
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Attachment Modal (Wati Style) */}
                    {isAttachmentModalOpen && (
                        <div className="absolute inset-0 z-[60] bg-[#0B1F2A]/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-10 animate-fade-in overflow-hidden">
                            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl flex overflow-hidden animate-scale-up border border-white/20">
                                {/* Sidebar Tabs */}
                                <div className="w-48 bg-[#F8FAFC] border-r border-gray-50 flex flex-col p-6 space-y-2">
                                    {[
                                        { id: 'image', label: 'Images', icon: ImageIcon },
                                        { id: 'video', label: 'Videos', icon: VideoIcon },
                                        { id: 'document', label: 'Documents', icon: FileText },
                                        { id: 'audio', label: 'Audios', icon: Music },
                                        { id: 'sticker', label: 'Stickers', icon: Sticker },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setAttachmentTab(tab.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs ${
                                                attachmentTab === tab.id 
                                                ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20' 
                                                : 'text-gray-400 hover:bg-white hover:text-[#0B1F2A]'
                                            }`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 flex flex-col relative">
                                    <div className="p-8 pb-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-black text-[#0B1F2A] tracking-tight uppercase">Upload {attachmentTab}</h3>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Supports common formats up to 20MB</p>
                                        </div>
                                        <button onClick={() => setIsAttachmentModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 transition-all font-black"><X className="w-6 h-6" /></button>
                                    </div>

                                    <div className="flex-1 px-8 flex flex-col items-center justify-center">
                                        <div 
                                            className="w-full py-12 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-[#F8FAFC]/50 flex flex-col items-center justify-center gap-6 transition-all hover:bg-gray-50 relative group overflow-hidden"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const droppedFile = e.dataTransfer.files[0];
                                                if (droppedFile) handleFileUpload({ target: { files: [droppedFile] } });
                                            }}
                                        >
                                            {isUploading ? (
                                                <div className="flex flex-col items-center gap-4">
                                                    <Loader2 className="w-12 h-12 text-[#25D366] animate-spin" />
                                                    <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                        <div className="h-full bg-[#25D366] transition-all duration-300 shadow-lg" style={{ width: `${uploadProgress}%` }}></div>
                                                    </div>
                                                    <p className="text-[10px] font-black text-[#25D366] uppercase tracking-[0.2em]">{uploadProgress}% Sending...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="p-8 bg-white rounded-[2rem] shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500">
                                                        <UploadCloud className="w-10 h-10 text-[#25D366]" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-black text-[#0B1F2A] mb-1">Drag & Drop Files Here</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Compressed files deliver faster!</p>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        ref={fileInputRef} 
                                                        onChange={handleFileUpload} 
                                                        accept={attachmentTab === 'image' ? 'image/*' : attachmentTab === 'video' ? 'video/*' : attachmentTab === 'audio' ? 'audio/*' : '*'}
                                                    />
                                                    <button 
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="px-10 py-3.5 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#25D366]/20 transition-all hover:-translate-y-1 active:scale-95"
                                                    >
                                                        Browse Files
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 pt-0 text-center">
                                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                                            By uploading, you agree to our <a href="#" className="underline">Media Guidelines</a>. <br/>
                                            Max file size permitted is 20.00 MiB per upload.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Pane: Info */}
                {selectedContact && (
                    <div className="w-80 border-l border-gray-50 bg-white p-8 hidden xl:flex flex-col overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <div className="w-24 h-24 bg-[#F8FAFC] rounded-[2.5rem] flex items-center justify-center text-[#25D366] text-4xl font-black mb-6 border border-gray-50 shadow-sm">
                                {selectedContact.name?.charAt(0) || '?'}
                            </div>
                            <h4 className="text-xl font-black text-[#0B1F2A] tracking-tight truncate w-full px-2 mb-1">{selectedContact.name}</h4>
                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">{selectedContact.phone_number}</p>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">
                                    <User className="w-3 h-3" /> Identity Source
                                </label>
                                <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03a11.854 11.854 0 001.547 5.851L0 24l6.305-1.654a11.81 11.81 0 005.738 1.482h.005c6.637 0 12.032-5.395 12.035-12.032a11.772 11.772 0 00-3.48-8.528"/></svg>
                                    </div>
                                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">WhatsApp API</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">
                                    <Tag className="w-3 h-3" /> Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl border border-indigo-100 uppercase tracking-tighter">
                                        CUSTOMER
                                    </span>
                                    <button className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-black rounded-xl border border-gray-100 hover:bg-gray-100 transition-all uppercase tracking-tighter">
                                        + ADD TAG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
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

                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0,0,0,0.1);
                }
            `}} />
        </AuthenticatedLayout>
    );
}
