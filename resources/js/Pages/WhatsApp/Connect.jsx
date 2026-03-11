import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Connect() {
    const { metaAppId, metaConfigId, isConnected, phoneNumberId, flashError, flashSuccess } = usePage().props;
    const [status, setStatus] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (flashError) {
            setStatus(flashError);
            setIsError(true);
        } else if (flashSuccess) {
            setStatus(flashSuccess);
            setIsError(false);
        }
    }, [flashError, flashSuccess]);

    const launchWhatsAppSignup = () => {
        setStatus('Redirecting to Facebook...');
        setIsError(false);

        const stateStr = 'token_' + Math.random().toString(36).substring(7);
        const redirectUri = encodeURIComponent(window.location.origin + '/whatsapp/connect');
        const qs = `client_id=${metaAppId}&redirect_uri=${redirectUri}&response_type=code&config_id=${metaConfigId}&state=${stateStr}&override_default_response_type=true`;

        window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?${qs}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    WhatsApp Integrations
                </h2>
            }
        >
            <Head title="Connect WhatsApp" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {isConnected ? (
                                <div className="text-center">
                                    <div className="text-green-500 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">WhatsApp Connected!</h3>
                                    <p className="text-gray-400 mb-8">Your organization is currently bound to Phone Number ID: <strong>{phoneNumberId}</strong></p>
                                    
                                    <Link
                                        href={route('whatsapp.disconnect')}
                                        method="delete"
                                        as="button"
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow transition duration-200"
                                    >
                                        Disconnect Account
                                    </Link>
                                </div>
                            ) : (
                                <div className="max-w-md mx-auto text-center py-8">
                                    <h3 className="text-2xl font-bold mb-4">Connect WhatsApp Business</h3>
                                    <p className="mb-8 text-gray-400">Link your Meta Business Account to start sending automated replies, campaigns, and managing your CRM.</p>

                                    <button
                                        onClick={launchWhatsAppSignup}
                                        className="bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-3 px-6 rounded shadow transition duration-200 w-full flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        Continue with Facebook
                                    </button>

                                    {status && (
                                        <div className={`mt-4 p-4 rounded ${isError ? 'bg-red-900/50 text-red-200' : 'bg-blue-900/50 text-blue-200'}`}>
                                            {status}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
