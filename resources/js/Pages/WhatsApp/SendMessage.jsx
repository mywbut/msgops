import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SendMessage() {
    const { isConnected } = usePage().props;
    const [status, setStatus] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        setStatus('Message added to queue (Demo Mode)');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Send Message
                </h2>
            }
        >
            <Head title="Send Message" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold">WhatsApp is not connected.</p>
                                    <p className="text-sm">You must connect your WhatsApp Business Account before sending messages.</p>
                                </div>
                            )}

                            <form onSubmit={handleSend} className="space-y-6">
                                <div>
                                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient Phone Number (with country code)</label>
                                    <input
                                        type="tel"
                                        id="recipient"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        placeholder="+1234567890"
                                        disabled={!isConnected}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message Template (Optional)</label>
                                    <select
                                        id="template"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        disabled={!isConnected}
                                    >
                                        <option value="">-- Select Template --</option>
                                        <option value="welcome">Welcome Message</option>
                                        <option value="appointment">Appointment Reminder</option>
                                        <option value="update">Order Update</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message Body</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        placeholder="Type your message here..."
                                        disabled={!isConnected}
                                        required
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Variables like ((name)) will be replaced automatically.</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={!isConnected}
                                        className="bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50"
                                    >
                                        Send Message
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
