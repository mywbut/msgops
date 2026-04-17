import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Connect() {
    const { 
        metaAppId, metaConfigId, isConnected, phoneNumberId, 
        businessName, businessId, wabaName, wabaId, phoneNumber, phoneStatus,
        messagingLimit, accountQuality,
        flashError, flashSuccess 
    } = usePage().props;
    
    const [status, setStatus] = useState('');
    const [isError, setIsError] = useState(false);
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchNumbers = async () => {
        setIsSyncing(true);
        setStatus('Fetching your phone numbers from Meta...');
        setIsError(false);
        try {
            const response = await fetch(route('whatsapp.sync-numbers'));
            const data = await response.json();
            if (data.data) {
                setAvailableNumbers(data.data);
                setStatus('Phone numbers synced successfully!');
            } else if (data.error) {
                setStatus(data.error);
                setIsError(true);
            }
        } catch (err) {
            setStatus('Failed to fetch numbers. Please try again.');
            setIsError(true);
        } finally {
            setIsSyncing(false);
        }
    };

    const activateNumber = async (num) => {
        setStatus(`Activating ${num.display_phone_number}...`);
        setIsError(false);
        try {
            const response = await fetch(route('whatsapp.select-number'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    phone_number_id: num.id,
                    display_phone_number: num.display_phone_number,
                    status: num.name_status,
                }),
            });
            const data = await response.json();
            if (data.success) {
                // Hard refresh to update everything
                window.location.reload();
            } else {
                setStatus(data.error || 'Failed to activate number.');
                setIsError(true);
            }
        } catch (err) {
            setStatus('Error occurred during activation.');
            setIsError(true);
        }
    };

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
                    Channel Status
                </h2>
            }
        >
            <Head title="Channel Status" />

            <div className="py-8 px-4">
                <div className="mx-auto max-w-7xl">
                    {!isConnected ? (
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden max-w-2xl mx-auto">
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.073 2.15c-5.43 0-9.85 4.42-9.85 9.85 0 1.73.45 3.42 1.3 4.9L2.15 21.85l5.12-1.34c1.43.78 3.03 1.19 4.68 1.19 5.43 0 9.85-4.42 9.85-9.85s-4.42-9.85-9.85-9.85zm0 18.06c-1.54 0-3.05-.41-4.37-1.19l-.31-.19-3.04.8 1.14-3.83-2.07-.33c-1.3-.21-2.42-.76-3.32-1.63s-1.42-2.02-1.63-3.32l-.33-2.07-.33 2.07c.21 1.3.76 2.42 1.63 3.32s2.02 1.42 3.32 1.63l2.07.33-1.14 3.83 3.04-.8.31.19c1.32.78 2.83 1.19 4.37 1.19 4.6 0 8.35-3.75 8.35-8.35s-3.75-8.35-8.35-8.35z"/></svg>
                                </div>
                                <h3 className="text-3xl font-bold text-[#0B1F2A] font-heading mb-4">Connect WhatsApp Business</h3>
                                <p className="text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed">
                                    Link your Meta Business Account to start sending automated broadcasts, campaigns, and managing your Team Inbox.
                                </p>

                                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-8 text-left">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600 h-fit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">Direct Meta Billing</p>
                                            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                                                Meta charges for conversations directly via your linked payment method in Business Manager. 
                                                <br />
                                                <strong>MsgOps Wallet credits are for our platform service fee only.</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={launchWhatsAppSignup}
                                    className="bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-[#1877F2]/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 w-full"
                                >
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    Continue with Facebook
                                </button>

                                {status && (
                                    <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                        {status}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Dashboard Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Messaging Limit Card */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-indigo-50 rounded-2xl text-[#4F46E5]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TIER 1</span>
                                        </div>
                                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Messaging Limit</h4>
                                        <div className="text-2xl font-bold text-[#0B1F2A] mb-2">{messagingLimit}</div>
                                        <p className="text-xs text-gray-400">Conversations initiated by business in a rolling 24-hour period.</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center text-xs">
                                        <span className="text-gray-500">Current Usage</span>
                                        <span className="font-bold text-[#25D366]">0 / 1,000</span>
                                    </div>
                                </div>

                                {/* Account Quality Card */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-green-50 rounded-2xl text-[#25D366]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <span className="px-2 py-0.5 bg-green-50 text-[#25D366] text-[10px] font-bold rounded shadow-sm border border-green-100 uppercase">HEALTHY</span>
                                        </div>
                                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Account Quality</h4>
                                        <div className="text-2xl font-bold text-[#0B1F2A] mb-2">{accountQuality}</div>
                                        <p className="text-xs text-gray-400">Based on how recipients have received your messages over the past 7 days.</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-50 text-center">
                                        <button className="text-xs font-bold text-[#4F46E5] hover:underline">VIEW INSIGHTS</button>
                                    </div>
                                </div>

                                { /* Phone Status Card */ }
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded shadow-sm border border-blue-100 uppercase">{phoneStatus}</span>
                                        </div>
                                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Connection Details</h4>
                                        <div className="text-2xl font-bold text-[#0B1F2A] mb-2">{phoneNumber}</div>
                                        <p className="text-xs text-gray-400 truncate">ID: {phoneNumberId}</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                                        <button 
                                            onClick={fetchNumbers}
                                            disabled={isSyncing}
                                            className="text-[10px] font-bold text-[#4F46E5] hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-all uppercase tracking-wider"
                                        >
                                            {isSyncing ? 'Syncing...' : 'Sync Phone Numbers'}
                                        </button>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Auto-reply</span>
                                            <span className="text-[10px] font-bold text-[#25D366] uppercase">ENABLED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Available Numbers Selection Section */}
                            {availableNumbers.length > 0 && (
                                <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200/50">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="text-xl font-bold font-heading mb-1">Available Phone Numbers</h3>
                                            <p className="text-indigo-300 text-sm">Select the number you want to use for this workspace.</p>
                                        </div>
                                        <button 
                                            onClick={() => setAvailableNumbers([])}
                                            className="text-indigo-300 hover:text-white"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {availableNumbers.map((num) => (
                                            <div 
                                                key={num.id} 
                                                className={`p-6 rounded-2xl border transition-all ${num.id === phoneNumberId ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="font-bold text-lg">{num.display_phone_number}</div>
                                                    {num.id === phoneNumberId && (
                                                        <span className="bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Active</span>
                                                    )}
                                                </div>
                                                <div className="space-y-1 mb-6">
                                                    <div className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest">Phone ID</div>
                                                    <div className="text-xs font-mono opacity-80">{num.id}</div>
                                                </div>
                                                <div className="space-y-1 mb-6">
                                                    <div className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest">Name Status</div>
                                                    <div className="text-xs opacity-80">{num.name_status}</div>
                                                </div>
                                                
                                                {num.id !== phoneNumberId && (
                                                    <button
                                                        onClick={() => activateNumber(num)}
                                                        className="w-full bg-white text-indigo-900 font-bold py-2.5 rounded-xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-widest"
                                                    >
                                                        Activate Number
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Detailed Info Section */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-[#0B1F2A] font-heading">Meta Business Configuration</h3>
                                    <Link
                                        href={route('whatsapp.disconnect')}
                                        method="delete"
                                        as="button"
                                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-all uppercase tracking-wider bg-red-50 px-4 py-2 rounded-xl border border-red-100"
                                    >
                                        Disconnect Account
                                    </Link>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div>
                                            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Business Manager</h5>
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1877F2]">
                                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.023 4.412 11.015 10.125 11.916V15.46h-2.953v-3.387h2.953V9.474c0-2.915 1.734-4.526 4.394-4.526 1.274 0 2.61.228 2.61.228v2.87h-1.471c-1.445 0-1.896.9-1.896 1.821v2.185h3.235l-.517 3.387h-2.718v8.53C19.588 23.088 24 18.096 24 12.073z"/></svg>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#0B1F2A]">{businessName}</div>
                                                    <div className="text-xs text-gray-400">BM ID: {businessId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">WhatsApp Business Account</h5>
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#25D366]">
                                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048c0 2.12.54 4.19 1.566 6.02L0 24l6.142-1.61a11.785 11.785 0 005.904 1.594c6.64 0 12.05-5.412 12.054-12.049A11.808 11.808 0 0020.465 3.488z"/></svg>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#0B1F2A]">{wabaName}</div>
                                                    <div className="text-xs text-gray-400">WABA ID: {wabaId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-center pb-12">
                                    <div className="max-w-md text-center">
                                        <h5 className="font-bold text-gray-800 mb-2">Feeling stuck?</h5>
                                        <p className="text-sm text-gray-500 mb-4">Our documentation provides step-by-step guides for Meta Business verification and message template approvals.</p>
                                        <button className="text-[#4F46E5] text-xs font-bold px-6 py-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">VIEW DOCUMENTATION</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
