import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ isConnected, flashError }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'MARKETING',
        language: 'en_US',
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('whatsapp.templates.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('whatsapp.templates.index')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        &larr; Back
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create New Template
                    </h2>
                </div>
            }
        >
            <Head title="New WhatsApp Template" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    
                    {flashError && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200">
                            {flashError}
                        </div>
                    )}

                    {!isConnected && (
                        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                            <p className="font-semibold">WhatsApp is not connected.</p>
                            <p className="text-sm">You must connect your WhatsApp Business Account before creating templates.</p>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Template Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        placeholder="e.g. summer_sale_promo"
                                        disabled={!isConnected || processing}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and underscores only.</p>
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                        <select
                                            id="category"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                            disabled={!isConnected || processing}
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                        >
                                            <option value="MARKETING">Marketing (Promos, Offers)</option>
                                            <option value="UTILITY">Utility (Updates, Reminders)</option>
                                            <option value="AUTHENTICATION">Authentication (OTPs)</option>
                                        </select>
                                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                                        <select
                                            id="language"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                            disabled={!isConnected || processing}
                                            value={data.language}
                                            onChange={e => setData('language', e.target.value)}
                                        >
                                            <option value="en_US">English (US)</option>
                                            <option value="en_GB">English (UK)</option>
                                            <option value="es">Spanish</option>
                                            <option value="pt_BR">Portuguese (BR)</option>
                                            <option value="hi">Hindi</option>
                                        </select>
                                        {errors.language && <p className="mt-1 text-sm text-red-600">{errors.language}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message Text Body</label>
                                    <textarea
                                        id="body"
                                        rows={5}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        placeholder="Type your template message here..."
                                        disabled={!isConnected || processing}
                                        value={data.body}
                                        onChange={e => setData('body', e.target.value)}
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Variables like ((1)), ((2)) are not supported in this text-only builder.</p>
                                    {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body}</p>}
                                </div>

                                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <button
                                        type="submit"
                                        disabled={!isConnected || processing}
                                        className="bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Submitting to Meta...' : 'Submit Template'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
