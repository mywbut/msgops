import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function MessageLogs() {
    const { isConnected } = usePage().props;

    // Dummy data for the screencast
    const logs = [
        { id: 1, to: '+91 9876543210', status: 'Read', message: 'Hello! Thank you for contacting us...', time: '10:45 AM' },
        { id: 2, to: '+1 555-123-4567', status: 'Delivered', message: 'Your appointment is confirmed for t...', time: '09:30 AM' },
        { id: 3, to: '+44 7911 123456', status: 'Sent', message: 'Here is your tracking link: https...', time: 'Yesterday' },
        { id: 4, to: '+91 8765432109', status: 'Read', message: 'Welcome to MsgOps! Let us know how w...', time: 'Yesterday' },
        { id: 5, to: '+1 888-999-0000', status: 'Failed', message: 'Please reply STOP to unsubscribe...', time: 'Oct 24' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Message Logs
                    </h2>
                    <span className="text-sm text-gray-500">Last 30 Days</span>
                </div>
            }
        >
            <Head title="Message Logs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold">WhatsApp is not connected.</p>
                                    <p className="text-sm">Connect your account to view your messaging history.</p>
                                </div>
                            )}

                            <div className="flex mb-6 space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search by number or keyword..."
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    disabled={!isConnected}
                                />
                                <button
                                    disabled={!isConnected}
                                    className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                >
                                    Filter
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Snippet</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ${!isConnected ? 'opacity-50' : ''}`}>
                                        {logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{log.to}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${log.status === 'Read' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                            log.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                                log.status === 'Failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}
                                                    `}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{log.message}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">{log.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
