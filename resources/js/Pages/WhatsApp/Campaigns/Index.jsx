import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Zap, ShieldCheck, RefreshCw, Check, ArrowRight, Box, HelpCircle, X, CheckCircle2, Crown, Lock, Eye, MessageSquare, AlertCircle, CheckCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import CircularProgress from '@/Components/CircularProgress';
import axios from 'axios';

export default function Index({ campaigns, stats, metaHealth, filters, success, error }) {
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [templateData, setTemplateData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [syncingIds, setSyncingIds] = useState([]);

    const openReportModal = async (campaign) => {
        setIsReportModalOpen(true);
        setIsLoading(true);
        setSelectedCampaign(campaign);
        try {
            const response = await axios.get(route('api.whatsapp.campaigns.report', campaign.id));
            setReportData(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const openTemplateModal = async (campaign) => {
        setIsTemplateModalOpen(true);
        setIsLoading(true);
        setSelectedCampaign(campaign);
        try {
            const response = await axios.get(route('api.whatsapp.campaigns.template', campaign.id));
            setTemplateData(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const syncCampaign = (campaignId) => {
        setSyncingIds(prev => [...prev, campaignId]);
        router.post(route('whatsapp.campaigns.sync', campaignId), {}, {
            preserveScroll: true,
            onFinish: () => {
                setSyncingIds(prev => prev.filter(id => id !== campaignId));
            }
        });
    };

    const handleDateChange = (range) => {
        let start = filters.start_date;
        let end = filters.end_date;
        const today = new Date().toISOString().split('T')[0];

        if (range === 'Today') {
            start = today;
            end = today;
        } else if (range === 'Last 7 days') {
            const date = new Date();
            date.setDate(date.getDate() - 7);
            start = date.toISOString().split('T')[0];
            end = today;
        } else if (range === 'Last 30 days') {
            const date = new Date();
            date.setDate(date.getDate() - 30);
            start = date.toISOString().split('T')[0];
            end = today;
        }

        router.get(route('whatsapp.campaigns.index'), { start_date: start, end_date: end }, { preserveState: true });
    };

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
                    

                    {/* Updated Overview & Stats Grid */}
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h2 className="text-xl font-black text-[#0B1F2A] font-heading">Overview</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <select 
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="bg-white border-gray-100 rounded-xl text-xs font-bold text-gray-500 py-2.5 pl-4 pr-10 focus:ring-[#25D366] focus:border-transparent shadow-sm"
                                >
                                    <option value="Last 30 days">Last 30 days</option>
                                    <option value="Last 7 days">Last 7 days</option>
                                    <option value="Today">Today</option>
                                </select>
                                <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                                    <span className="text-xs font-bold text-gray-500">{filters.start_date} - {filters.end_date}</span>
                                </div>
                                <button className="bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm text-xs font-bold text-gray-500 flex items-center gap-2 hover:bg-gray-50 transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Export
                                </button>
                                <button 
                                    onClick={() => router.reload()}
                                    className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm text-gray-400 hover:text-[#25D366] transition-all"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Top Meta Health Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-[#25D366]/10 rounded-lg">
                                        <Zap className="w-5 h-5 text-[#25D366]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">Your daily Meta messaging limit</p>
                                        <p className="text-xs font-black text-[#0B1F2A]">{metaHealth.unique_contacts}/{metaHealth.daily_limit} unique contacts</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsLimitModalOpen(true)}
                                    className="text-[10px] font-black text-[#4F46E5] hover:underline uppercase tracking-tight"
                                >
                                    What are limits?
                                </button>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <Zap className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Consecutive days of messaging</p>
                                    <div className="flex gap-1.5">
                                        {metaHealth.consecutive_days.map((active, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full border ${active ? 'bg-orange-400 border-orange-400' : 'border-gray-200'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Messaging Quality</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-end gap-0.5 h-3">
                                            <div className={`w-1 rounded-full h-1 ${metaHealth.quality_rating === 'Low' ? 'bg-red-500' : 'bg-[#25D366]/30'}`}></div>
                                            <div className={`w-1 rounded-full h-2 ${metaHealth.quality_rating === 'Medium' ? 'bg-amber-500' : metaHealth.quality_rating === 'High' ? 'bg-[#25D366]/60' : 'bg-gray-200'}`}></div>
                                            <div className={`w-1 rounded-full h-3 ${metaHealth.quality_rating === 'High' ? 'bg-[#25D366]' : 'bg-gray-200'}`}></div>
                                        </div>
                                        <span className={`text-xs font-black uppercase ${metaHealth.quality_rating === 'High' ? 'text-[#25D366]' : metaHealth.quality_rating === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>
                                            {metaHealth.quality_rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Core Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { label: 'Sent', value: stats.sent, icon: <Check className="w-4 h-4" />, color: 'bg-indigo-50 text-indigo-500', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that were sent' },
                                { label: 'Delivered', value: stats.delivered, icon: <Check className="w-4 h-4" />, color: 'bg-green-50 text-[#25D366]', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that were delivered to the device' },
                                { label: 'Read', value: stats.read, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>, color: 'bg-green-50 text-[#25D366]', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that the users read. If read notifications are not enabled, the status shall not update here' },
                                { label: 'Replied', value: stats.replied, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>, color: 'bg-green-50 text-[#25D366]', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages to which users have replied' },
                                { label: 'Sending', value: stats.sending, icon: <ArrowRight className="w-4 h-4" />, color: 'bg-gray-50 text-gray-400', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that are in the process of being sent' },
                                { label: 'Failed', value: stats.failed, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>, color: 'bg-red-50 text-red-500', iconBg: 'bg-red-50 text-red-500', tooltip: 'Messages that failed to deliver either due to incorrect number or other errors' },
                                { label: 'Processing', value: stats.processing, icon: <RefreshCw className="w-4 h-4" />, color: 'bg-amber-50 text-amber-500', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that are in process' },
                                { label: 'Queued', value: stats.queued, icon: <Box className="w-4 h-4" />, color: 'bg-[#25D366]/10 text-[#25D366]', iconBg: 'bg-green-50 text-[#25D366]', tooltip: 'Messages that are in queue' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black text-[#0B1F2A]">{stat.value.toLocaleString()}</h3>
                                        <div className={`p-2 rounded-full ${stat.iconBg} bg-opacity-20 flex items-center justify-center`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 group/tooltip relative">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                                        <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                                        
                                        {/* Premium Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0B1F2A] text-white text-[10px] font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-20 shadow-xl pointer-events-none">
                                            {stat.tooltip}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0B1F2A]"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        {campaigns.total === 0 ? (
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
                                            <th className="px-8 py-5">Campaign Name</th>
                                            <th className="px-6 py-5 text-center">Recipients</th>
                                            <th className="px-6 py-5 text-center">Successful</th>
                                            <th className="px-6 py-5 text-center">Read</th>
                                            <th className="px-6 py-5 text-center">Replied</th>
                                            <th className="px-6 py-5 text-center">Delivery Status</th>
                                            <th className="px-6 py-5 text-center">Failed</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {campaigns.data.map((camp) => (
                                            <tr key={camp.id} className="group hover:bg-gray-50/10 transition-all">
                                                <td className="px-8 py-6">
                                                    <button 
                                                        onClick={() => openTemplateModal(camp)}
                                                        className="font-bold text-blue-600 hover:text-blue-800 text-sm block mb-1 hover:underline"
                                                    >
                                                        {camp.name}
                                                    </button>
                                                    <div className="text-[10px] text-gray-400 font-medium">
                                                        {new Date(camp.created_at).toLocaleDateString()} {new Date(camp.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <span className="font-bold text-[#0B1F2A]">{camp.total_contacts}</span>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <CircularProgress 
                                                        percentage={calculatePercentage(camp.delivered_count, camp.total_contacts)} 
                                                        color="#25D366" 
                                                        size={44}
                                                    />
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <CircularProgress 
                                                        percentage={calculatePercentage(camp.read_count, camp.delivered_count)} 
                                                        color="#FFA500" 
                                                        size={44}
                                                    />
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <CircularProgress 
                                                        percentage={calculatePercentage(camp.replied_count, camp.delivered_count)} 
                                                        color="#4F46E5" 
                                                        size={44}
                                                    />
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <span className={`px-3 py-1 text-[9px] font-black rounded-full border ${getStatusStyle(camp.status)}`}>
                                                            {camp.status}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => syncCampaign(camp.id)}
                                                                disabled={syncingIds.includes(camp.id)}
                                                                title="Refresh Delivery Status"
                                                                className={`p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm text-gray-400 hover:text-[#25D366] transition-all ${syncingIds.includes(camp.id) ? 'animate-spin opacity-50' : 'hover:scale-110 active:scale-95'}`}
                                                            >
                                                                <RefreshCw className="w-3.5 h-3.5" />
                                                            </button>
                                                            <div className="p-1 text-gray-200 cursor-help group/delivery transition-all">
                                                                <HelpCircle className="w-3.5 h-3.5" />
                                                                {/* Potential popover for status details here */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <span className="font-bold text-[#E11D48]">{camp.failed_count}</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button 
                                                        onClick={() => openReportModal(camp)}
                                                        className="text-xs font-bold text-blue-500 hover:text-blue-700 underline"
                                                    >
                                                        View report
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                {/* Pagination Control Bar */}
                                {campaigns.total > 0 && (
                                    <div className="px-6 py-5 border-t border-gray-100 bg-[#FAFAFA] flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rows per page:</span>
                                            <div className="relative group/perpage">
                                                <select 
                                                    value={campaigns.per_page}
                                                    onChange={(e) => router.get(route('whatsapp.campaigns.index'), { ...filters, per_page: e.target.value }, { preserveScroll: true, preserveState: true })}
                                                    className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] cursor-pointer hover:border-gray-300 transition-all shadow-sm min-w-[70px]"
                                                >
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover/perpage:text-gray-600">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span className="text-sm font-bold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-xs">
                                                {campaigns.from || 0}-{campaigns.to || 0} <span className="font-normal text-gray-400 mx-1">of</span> {campaigns.total}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => campaigns.prev_page_url && router.get(campaigns.prev_page_url, {}, { preserveScroll: true })}
                                                    disabled={!campaigns.prev_page_url}
                                                    className={`flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-lg text-sm font-bold transition-all border ${!campaigns.prev_page_url ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] hover:bg-gray-50 active:scale-95 shadow-sm'}`}
                                                >
                                                    <ArrowLeft className="w-4 h-4" />
                                                    Previous
                                                </button>

                                                <button
                                                    onClick={() => campaigns.next_page_url && router.get(campaigns.next_page_url, {}, { preserveScroll: true })}
                                                    disabled={!campaigns.next_page_url}
                                                    className={`flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${!campaigns.next_page_url ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] hover:bg-gray-50 active:scale-95 shadow-sm'}`}
                                                >
                                                    Next
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F2A]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl overflow-hidden relative animate-scale-up my-8">
                        <button 
                            onClick={() => { setIsReportModalOpen(false); setReportData(null); }}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-black text-[#0B1F2A] font-heading mb-6">
                                Contacts: {reportData?.stats?.total || selectedCampaign?.total_contacts}
                            </h2>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25D366]"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        {[
                                            { label: 'Sent', value: reportData?.stats?.sent, icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-50' },
                                            { label: 'Delivered', value: reportData?.stats?.delivered, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10' },
                                            { label: 'Read', value: reportData?.stats?.read, icon: <Eye className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-50' },
                                            { label: 'Replied', value: reportData?.stats?.replied, icon: <MessageSquare className="w-5 h-5" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                            { label: 'Sending', value: reportData?.stats?.sending, icon: <Zap className="w-5 h-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
                                            { label: 'Failed', value: reportData?.stats?.failed, icon: <AlertCircle className="w-5 h-5" />, color: 'text-red-500', bg: 'bg-red-50' },
                                            { label: 'Processing', value: reportData?.stats?.processing, icon: <RefreshCw className="w-5 h-5" />, color: 'text-purple-500', bg: 'bg-purple-50' },
                                            { label: 'Queued', value: reportData?.stats?.queued, icon: <Box className="w-5 h-5" />, color: 'text-gray-500', bg: 'bg-gray-50' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                                                <div>
                                                    <p className="text-2xl font-black text-[#0B1F2A]">{stat.value?.toLocaleString() || 0}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                                </div>
                                                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                                    {stat.icon}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                                        <div className="max-h-[400px] overflow-y-auto">
                                            <table className="w-full text-left">
                                                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                                                    <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <th className="px-6 py-4">Contact</th>
                                                        <th className="px-6 py-4">Phone</th>
                                                        <th className="px-6 py-4">Status</th>
                                                        <th className="px-6 py-4">Reason</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {reportData?.contacts?.map((c) => (
                                                        <tr key={c.id} className="text-sm group hover:bg-gray-50/30 transition-all">
                                                            <td className="px-6 py-4 font-medium text-[#0B1F2A]">{c.name}</td>
                                                            <td className="px-6 py-4 text-gray-500">{c.phone}</td>
                                                             <td className="px-6 py-4">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                                        c.status === 'READ' || c.status === 'DELIVERED' || c.status === 'SENT'
                                                                        ? 'bg-[#25D366]/10 text-[#25D366]' 
                                                                        : 'bg-red-50 text-red-500'
                                                                    }`}>
                                                                        {c.status === 'READ' || c.status === 'DELIVERED' || c.status === 'SENT' ? (
                                                                            <Check className="w-3 h-3 stroke-[3]" />
                                                                        ) : (
                                                                            <X className="w-3 h-3 stroke-[3]" />
                                                                        )}
                                                                    </div>
                                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                                        c.status === 'READ' ? 'text-blue-500' :
                                                                        c.status === 'DELIVERED' ? 'text-[#25D366]' :
                                                                        c.status === 'SENT' ? 'text-green-500' :
                                                                        c.status === 'FAILED' || c.status === 'ERROR' ? 'text-red-500' : 'text-gray-400'
                                                                    }`}>
                                                                        {c.status}
                                                                    </span>
                                                                </div>
                                                             </td>
                                                             <td className="px-6 py-4">
                                                                <p className="text-[10px] font-bold text-gray-400 leading-snug">{c.reason}</p>
                                                             </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Template Modal */}
            {isTemplateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F2A]/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden relative animate-scale-up">
                        <button 
                            onClick={() => { setIsTemplateModalOpen(false); setTemplateData(null); }}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <h2 className="text-2xl font-black text-[#0B1F2A] font-heading mb-8 text-center">
                                Template Preview
                            </h2>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25D366]"></div>
                                </div>
                            ) : templateData ? (
                                <div className="bg-[#E7FFDB] p-4 rounded-2xl shadow-sm border border-[#D0E5C9] relative max-w-xs mx-auto mb-4">
                                    <div className="absolute -left-2 top-4 w-4 h-4 bg-[#E7FFDB] border-l border-t border-[#D0E5C9] rotate-[-45deg]"></div>
                                    <div className="space-y-3">
                                        {templateData.components?.map((component, idx) => {
                                            if (component.type === 'HEADER' && component.format === 'IMAGE') {
                                                return <div key={idx} className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs italic">Image Header</div>;
                                            }
                                            if (component.type === 'BODY') {
                                                return <p key={idx} className="text-sm text-gray-800 whitespace-pre-wrap">{component.text}</p>;
                                            }
                                            if (component.type === 'FOOTER') {
                                                return <p key={idx} className="text-[10px] text-gray-500">{component.text}</p>;
                                            }
                                            if (component.type === 'BUTTONS') {
                                                return (
                                                    <div key={idx} className="pt-2 border-t border-[#D0E5C9] space-y-2">
                                                        {component.buttons?.map((btn, bIdx) => (
                                                            <div key={bIdx} className="w-full py-1.5 bg-white/50 rounded-lg text-center text-blue-600 text-xs font-bold border border-white/50">
                                                                {btn.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                    <div className="text-right mt-1">
                                        <span className="text-[9px] text-gray-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-400 italic">No template details found mapping to this campaign.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-delayed { animation: fade-in 0.5s ease-out 0.2s forwards; opacity: 0; }
            `}} />
        </AuthenticatedLayout>
    );
}
