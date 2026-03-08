import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Automation() {
    const { isConnected } = usePage().props;
    const [enabled, setEnabled] = useState(true);
    const [status, setStatus] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        setStatus('Automation settings saved (Demo Mode)');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Automation Features
                </h2>
            }
        >
            <Head title="Automation Features" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold">WhatsApp is not connected.</p>
                                    <p className="text-sm">Connect your account to enable Chatbot Automations.</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Master Auto-Reply Toggles</h3>
                                    <p className="text-sm text-gray-500">Enable or disable all automated replies globally for your WhatsApp number.</p>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={enabled}
                                        onChange={() => setEnabled(!enabled)}
                                        disabled={!isConnected}
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1877F2]/30 dark:peer-focus:ring-[#1877F2]/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1877F2]"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{enabled ? 'Active' : 'Paused'}</span>
                                </label>
                            </div>

                            <form onSubmit={handleSave} className={`space-y-6 ${!enabled || !isConnected ? 'opacity-50' : ''}`}>
                                <div>
                                    <label htmlFor="trigger" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keyword Triggers (comma separated)</label>
                                    <input
                                        type="text"
                                        id="trigger"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        defaultValue="hello, hi, help, support"
                                        disabled={!enabled || !isConnected}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">When a user message contains any of these words, the auto-reply will trigger.</p>
                                </div>

                                <div>
                                    <label htmlFor="reply_message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Auto-Reply Message</label>
                                    <textarea
                                        id="reply_message"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        defaultValue="Hello 👋! Thank you for reaching out to us. Our support team will respond to your query shortly. If it's urgent, please reply with 'URGENT'."
                                        disabled={!enabled || !isConnected}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={!enabled || !isConnected}
                                        className="bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50"
                                    >
                                        Save Automations
                                    </button>
                                    {status && <span className="text-sm text-green-600 dark:text-green-400">{status}</span>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
