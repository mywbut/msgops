import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Contacts() {
    const { isConnected, contacts = [] } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Contact Directory (CRM)
                    </h2>
                    <span className="text-sm text-gray-500">Auto-synced from WhatsApp</span>
                </div>
            }
        >
            <Head title="Contacts | Mini CRM" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold">WhatsApp is not connected.</p>
                                    <p className="text-sm">Connect your account to view your synced customer profiles.</p>
                                </div>
                            )}

                            <div className="flex mb-6 space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Messages</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">First Seen</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ${!isConnected ? 'opacity-50' : ''}`}>
                                        {contacts.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                    No contacts found. Send or receive a message to establish a contact.
                                                </td>
                                            </tr>
                                        )}
                                        {contacts.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150 relative">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {contact.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {contact.phone_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                        {contact.message_count}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                                    {contact.created_at}
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
        </AuthenticatedLayout>
    );
}
