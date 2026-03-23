import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ isConnected, templates, apiError, success, flashError }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Template Messages
                    </h2>
                    {isConnected && (
                        <Link
                            href={route('whatsapp.templates.create')}
                            className="bg-[#1877F2] hover:bg-[#0c63d4] text-white px-4 py-2 rounded shadow text-sm font-medium transition"
                        >
                            + New Template
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="WhatsApp Templates" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded text-green-800 dark:text-green-200">
                            {success}
                        </div>
                    )}
                    
                    {(apiError || flashError) && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200">
                            {apiError || flashError}
                        </div>
                    )}

                    {!isConnected && (
                        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                            <p className="font-semibold">WhatsApp is not connected.</p>
                            <p className="text-sm">You must connect your WhatsApp Business Account before managing templates.</p>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            {isConnected && templates.length === 0 && !apiError && (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <p>No templates found for this WhatsApp Business Account.</p>
                                    <Link href={route('whatsapp.templates.create')} className="text-[#1877F2] hover:underline mt-2 inline-block">Create your first template</Link>
                                </div>
                            )}

                            {isConnected && templates.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Category</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Language</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Preview</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {templates.map((tpl) => {
                                                const bodyComponent = tpl.components?.find(c => c.type === 'BODY');
                                                const statusColor = tpl.status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                                    : (tpl.status === 'REJECTED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400');
                                                return (
                                                    <tr key={tpl.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{tpl.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tpl.category}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tpl.language}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                                                                {tpl.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate" title={bodyComponent?.text}>
                                                            {bodyComponent?.text || 'No text body'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
