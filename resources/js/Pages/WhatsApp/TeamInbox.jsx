import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function TeamInbox({ selectedContactId, templates = [] }) {
    const { auth } = usePage().props;
    const [conversations, setConversations] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSendingTemplate, setIsSendingTemplate] = useState(false);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact.id);
            const interval = setInterval(() => fetchMessages(selectedContact.id), 5000); // Poll messages every 5s
            return () => clearInterval(interval);
        }
    }, [selectedContact]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(route('api.whatsapp.conversations'));
            setConversations(response.data.conversations);
            setIsLoading(false);
            
            // Handle pre-selected contact from CRM
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

    const filteredConversations = conversations.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.phone_number.includes(searchQuery)
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Team Inbox
                </h2>
            }
        >
            <Head title="Team Inbox" />

            <div className="flex h-[calc(100vh-160px)] mt-4 mx-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {/* Left Pane: Channels & Contacts */}
                <div className="w-80 flex flex-col border-r border-gray-100 bg-[#F8FAFC]">
                    <div className="p-4 bg-white border-b border-gray-100">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#25D366]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-400 text-sm">Loading conversations...</div>
                        ) : filteredConversations.length === 0 ? (
                            <div className="p-4 text-center text-gray-400 text-sm">No conversations found</div>
                        ) : (
                            filteredConversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedContact(conv)}
                                    className={`p-4 cursor-pointer border-b border-gray-50 transition-all ${
                                        selectedContact?.id === conv.id 
                                        ? 'bg-white border-l-4 border-l-[#25D366] shadow-sm' 
                                        : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="font-bold text-[#111827] text-sm truncate w-40">{conv.name}</div>
                                        <div className="text-[10px] text-gray-400">{conv.last_message_time}</div>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">{conv.last_message || 'New conversation'}</div>
                                    {conv.is_expired && (
                                        <span className="mt-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded uppercase font-bold tracking-wider">
                                            Expired
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Middle Pane: Chat View */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedContact ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] font-bold">
                                        {selectedContact.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{selectedContact.name}</div>
                                        <div className="text-xs text-gray-400">{selectedContact.phone_number}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
                                {messages.map((msg, idx) => {
                                    const isOutbound = msg.direction === 'outbound';
                                    const showDate = idx === 0 || messages[idx-1].date !== msg.date;

                                    return (
                                        <div key={msg.id}>
                                            {showDate && (
                                                <div className="flex justify-center my-6">
                                                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {msg.date}
                                                    </span>
                                                </div>
                                            )}
                                            <div className={`flex mb-4 ${isOutbound ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                                                    isOutbound 
                                                    ? 'bg-[#25D366] text-white rounded-tr-none' 
                                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-50'
                                                }`}>
                                                    <div className="text-sm leading-relaxed">
                                                        {msg.content?.body || (msg.type === 'template' ? `Template: ${msg.content?.template}` : `Sent ${msg.type}`)}
                                                    </div>
                                                    <div className={`text-[10px] mt-1 flex justify-end items-center gap-1 ${isOutbound ? 'text-white/70' : 'text-gray-400'}`}>
                                                        {msg.time}
                                                        {isOutbound && (
                                                            <span>
                                                                {msg.status === 'read' ? (
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                                                ) : (
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Footer */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                {isExpired ? (
                                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                        <p className="text-sm text-amber-700 mb-4 font-medium text-center">
                                            The 24-hour window has expired. Choose a template to reconnect.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {templates.filter(t => t.status === 'APPROVED').map((template) => (
                                                <button
                                                    key={template.id}
                                                    disabled={isSendingTemplate}
                                                    onClick={() => handleSendTemplate(template.name, template.language)}
                                                    className="flex flex-col items-start p-3 bg-white border border-amber-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all text-left disabled:opacity-50"
                                                >
                                                    <span className="text-[10px] font-bold text-amber-600 uppercase mb-1">{template.category}</span>
                                                    <span className="text-sm font-bold text-gray-800 mb-1 truncate w-full">{template.name.replace(/_/g, ' ')}</span>
                                                    <span className="text-[10px] text-gray-400">Language: {template.language}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {templates.length === 0 && (
                                            <p className="text-xs text-gray-400 text-center py-2">No approved templates found.</p>
                                        )}
                                    </div>
                                ) : (
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <textarea
                                                rows="1"
                                                placeholder="Type a message..."
                                                className="w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] focus:border-transparent resize-none"
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
                                            className="bg-[#25D366] text-white p-3 rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#25D366]/20"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#F8FAFC]">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                <svg className="w-12 h-12 text-[#25D366]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1F2A] mb-2 font-heading">No conversation selected</h3>
                            <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                                Select a chat from the left panel to view messages and start communicating with your customers.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Pane: Contact Info (Optional for now) */}
                {selectedContact && (
                    <div className="w-72 border-l border-gray-100 bg-white p-6 hidden lg:block overflow-y-auto">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contact Info</h3>
                        
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#25D366] text-3xl font-bold mb-4 border border-gray-50">
                                {selectedContact.name.charAt(0)}
                            </div>
                            <div className="font-bold text-[#0B1F2A] text-lg mb-1">{selectedContact.name}</div>
                            <div className="text-sm text-gray-400 font-medium">{selectedContact.phone_number}</div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Source</label>
                                <div className="text-xs py-2 px-3 bg-[#F8FAFC] rounded-lg text-gray-600 font-medium flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></div>
                                    WhatsApp Business
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Tags</label>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100">
                                        CUSTOMER
                                    </span>
                                    <button className="px-2.5 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all">
                                        + ADD TAG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .font-heading { font-family: 'Poppins', 'Inter', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
