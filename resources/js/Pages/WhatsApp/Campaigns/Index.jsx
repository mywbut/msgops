import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ campaigns, success, error }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'SENDING':
                return 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse';
            case 'FAILED':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'SCHEDULED':
                return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const calculatePercentage = (count, total) => {
        if (!total) return 0;
        return Math.round((count / total) * 100);
    };

    // Aggregate stats
    const totalSent = campaigns.reduce((acc, c) => acc + c.sent_count, 0);
    const totalDelivered = campaigns.reduce((acc, c) => acc + c.delivered_count, 0);
    const totalRead = campaigns.reduce((acc, c) => acc + c.read_count, 0);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center bg-white py-4 px-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0B1F2A] font-heading">Campaigns & Broadcasts</h2>
                        <p className="text-sm text-gray-400 mt-1">Monitor your message reach and engagement</p>
                    </div>
                    <Link
                        href={route('whatsapp.campaigns.create')}
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#25D366]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Create Campaign
                    </Link>
                </div>
            }
        >
            <Head title="WhatsApp Campaigns" />

            <div className="py-8 px-6">
                <div className="mx-auto max-w-7xl">
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Sent</p>
                                <h3 className="text-3xl font-bold text-[#0B1F2A]">{totalSent.toLocaleString()}</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-indigo-600 font-bold">
                                <span className="bg-indigo-100 px-2 py-0.5 rounded-lg">All Time</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Delivered</p>
                                <h3 className="text-3xl font-bold text-[#0B1F2A]">{totalDelivered.toLocaleString()}</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-green-600 font-bold">
                                <span className="bg-green-100 px-2 py-0.5 rounded-lg">{calculatePercentage(totalDelivered, totalSent)}% Rate</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Read Rate</p>
                                <h3 className="text-3xl font-bold text-[#0B1F2A]">{totalRead.toLocaleString()}</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-amber-600 font-bold">
                                <span className="bg-amber-100 px-2 py-0.5 rounded-lg">{calculatePercentage(totalRead, totalDelivered)}% Rate</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Campaigns</p>
                                <h3 className="text-3xl font-bold text-[#0B1F2A]">{campaigns.length}</h3>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                                <span className="bg-gray-100 px-2 py-0.5 rounded-lg">Active & Past</span>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Stack */}
                    <div className="space-y-4 mb-8">
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-800 shadow-sm animate-fade-in">
                                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                <span className="text-sm font-medium">{success}</span>
                            </div>
                        )}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-800 shadow-sm">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}
                    </div>

                    {/* Campaigns List Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {campaigns.length === 0 ? (
                            <div className="text-center py-24 px-6">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0B1F2A] mb-2">No Campaigns Yet</h3>
                                <p className="text-gray-400 mb-8 max-w-xs mx-auto">Launch your first broadcast campaign to reach your audience at scale.</p>
                                <Link 
                                    href={route('whatsapp.campaigns.create')} 
                                    className="px-8 py-3 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5"
                                >
                                    Start Broadcast
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-4">Campaign Name</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4">Audience Stats</th>
                                            <th className="px-6 py-4 text-center">Delivery</th>
                                            <th className="px-6 py-4 text-center">Read</th>
                                            <th className="px-8 py-4 text-right">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {campaigns.map((camp) => (
                                            <tr key={camp.id} className="group hover:bg-gray-50/30 transition-all">
                                                <td className="px-8 py-5">
                                                    <div className="font-bold text-[#0B1F2A] text-sm">{camp.name}</div>
                                                    <div className="text-[10px] text-gray-400 mt-0.5 italic">{camp.template_name} ({camp.language})</div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`px-3 py-1 text-[10px] font-bold rounded-lg border ${getStatusStyle(camp.status)}`}>
                                                        {camp.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1.5 min-w-[120px]">
                                                        <div className="flex justify-between text-[10px] font-bold">
                                                            <span className="text-gray-400">PROGRESS</span>
                                                            <span className="text-[#0B1F2A]">{calculatePercentage(camp.sent_count, camp.total_contacts)}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                            <div 
                                                                className="bg-[#25D366] h-full transition-all duration-500 ease-out" 
                                                                style={{ width: `${calculatePercentage(camp.sent_count, camp.total_contacts)}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-[10px] text-gray-400">
                                                            {camp.sent_count} / {camp.total_contacts} sent
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <div className="font-bold text-[#0B1F2A] text-sm">{camp.delivered_count}</div>
                                                    <div className="text-[10px] text-green-500 font-bold">{calculatePercentage(camp.delivered_count, camp.sent_count)}%</div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <div className="font-bold text-[#0B1F2A] text-sm">{camp.read_count}</div>
                                                    <div className="text-[10px] text-amber-500 font-bold">{calculatePercentage(camp.read_count, camp.delivered_count)}%</div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="text-xs text-[#0B1F2A] font-medium">{new Date(camp.created_at).toLocaleDateString()}</div>
                                                    <div className="text-[10px] text-gray-400">{new Date(camp.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}} />
        </AuthenticatedLayout>
    );
}
