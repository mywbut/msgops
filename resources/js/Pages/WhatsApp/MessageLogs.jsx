import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

export default function MessageLogs() {
    const { isConnected, logs = [] } = usePage().props;
    const [selectedContact, setSelectedContact] = useState(null);
    const [timelineMessages, setTimelineMessages] = useState([]);
    const [loadingTimeline, setLoadingTimeline] = useState(false);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    const openTimeline = async (contactId) => {
        setLoadingTimeline(true);
        setIsTimelineOpen(true);
        try {
            const response = await axios.get(route('whatsapp.contacts.timeline', contactId));
            setSelectedContact(response.data.contact);
            setTimelineMessages(response.data.messages);
        } catch (err) {
            console.error('Failed to fetch timeline', err);
        } finally {
            setLoadingTimeline(false);
        }
    };

    const StatusIcon = ({ status, error }) => {
        if (status === 'failed') {
            return (
                <div className="group relative inline-block">
                    <span className="text-red-500 cursor-help" title={JSON.stringify(error)}>✕</span>
                    {error && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl z-50">
                            {error.message || 'Unknown Error'}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                    )}
                </div>
            );
        }

        switch (status) {
            case 'read':
                return <span className="text-blue-500" title="Read">✓✓</span>;
            case 'delivered':
                return <span className="text-gray-400" title="Delivered">✓✓</span>;
            case 'sent':
                return <span className="text-gray-400" title="Sent">✓</span>;
            default:
                return <span className="text-gray-300">...</span>;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Communication Logs & Analytics
                </h2>
            }
        >
            <Head title="Message Logs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 rounded text-yellow-800 dark:text-yellow-200 text-sm">
                                    WhatsApp is not connected. Live status updates will not be received.
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    No messages logged yet.
                                                </td>
                                            </tr>
                                        )}
                                        {logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {log.time}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.contact_name}</div>
                                                    <div className="text-xs text-gray-500">{log.to}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start">
                                                        <span className={`mr-2 flex-shrink-0 ${log.direction === 'outbound' ? 'text-blue-500' : 'text-green-500'}`}>
                                                            {log.direction === 'outbound' ? '↑' : '↓'}
                                                        </span>
                                                        <span className="text-sm line-clamp-2 max-w-xs">{log.message}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                    <StatusIcon status={log.status?.toLowerCase()} error={log.error} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button 
                                                        onClick={() => openTimeline(log.contact_id)}
                                                        className="text-[#1877F2] hover:text-[#0c63d4] text-xs"
                                                    >
                                                        View Timeline
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Modal */}
            <Modal show={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} maxWidth="2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4">
                        <h3 className="text-lg font-medium">
                            Conversation with {selectedContact?.name || 'Loading...'}
                        </h3>
                        <button onClick={() => setIsTimelineOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                        {loadingTimeline ? (
                            <div className="text-center py-10 text-gray-500">Loading conversation history...</div>
                        ) : timelineMessages.map(msg => (
                            <div 
                                key={msg.id}
                                className={`max-w-[80%] rounded-lg p-3 ${
                                    msg.direction === 'outbound' 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 self-end ml-auto rounded-tr-none border border-blue-100 dark:border-blue-800' 
                                    : 'bg-gray-100 dark:bg-gray-700 self-start rounded-tl-none'
                                }`}
                            >
                                <p className="text-sm">{msg.content.body || `[Sent ${msg.type}]`}</p>
                                <div className="mt-1 flex items-center justify-end space-x-2 text-[10px] text-gray-500">
                                    <span>{msg.time}</span>
                                    {msg.direction === 'outbound' && <StatusIcon status={msg.status?.toLowerCase()} error={msg.error} />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={() => setIsTimelineOpen(false)}>Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
