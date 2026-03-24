import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';
import { 
    Users, MessageSquare, CheckCircle, Send, 
    AlertCircle, BarChart2, Zap, ArrowUpRight,
    TrendingUp, Calendar
} from 'lucide-react';

export default function Dashboard({ isConnected = false, stats = {}, chartData = [], recentCampaigns = [], waba_status = 'Disconnected' }) {
    const COLORS = ['#25D366', '#3b82f6', '#4F46E5', '#ef4444'];
    
    // Defensive stats defaults
    const safeStats = {
        total_contacts: stats?.total_contacts ?? 0,
        total_messages: stats?.total_messages ?? 0,
        sent: stats?.sent ?? 0,
        delivered: stats?.delivered ?? 0,
        read: stats?.read ?? 0,
        failed: stats?.failed ?? 0
    };

    const pieData = [
        { name: 'Delivered', value: safeStats.delivered },
        { name: 'Read', value: safeStats.read },
        { name: 'Sent', value: safeStats.sent },
        { name: 'Failed', value: safeStats.failed },
    ].filter(item => item.value > 0);

    return (
        <AuthenticatedLayout>
            <Head title="Premium Analytics Dashboard" />

            <div className="py-8 px-6 bg-[#F8FAFC] min-h-screen">
                <div className="mx-auto max-w-7xl">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-[#0B1F2A] font-heading tracking-tight">Analytics Dashboard</h2>
                            <p className="text-sm text-gray-500 font-medium">Real-time performance metrics for your organization</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${isConnected ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} text-xs font-bold uppercase transition-all shadow-sm`}>
                                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#25D366] animate-pulse' : 'bg-red-500'}`}></div>
                                {waba_status || (isConnected ? 'API Connected' : 'Disconnected')}
                            </div>
                            <Link 
                                href={route('whatsapp.campaigns.create')}
                                className="bg-[#4F46E5] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                NEW CAMPAIGN
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Contacts', val: safeStats.total_contacts, icon: <Users className="w-5 h-5" />, color: 'bg-blue-500', trend: '+12%' },
                            { label: 'Total Messages', val: safeStats.total_messages, icon: <MessageSquare className="w-5 h-5" />, color: 'bg-indigo-500', trend: '+8%' },
                            { label: 'Delivery Rate', val: safeStats.total_messages > 0 ? Math.round((safeStats.delivered/safeStats.total_messages)*100) : 0, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-[#25D366]', suffix: '%' },
                            { label: 'Failed Rate', val: safeStats.total_messages > 0 ? Math.round((safeStats.failed/safeStats.total_messages)*100) : 0, icon: <AlertCircle className="w-5 h-5" />, color: 'bg-red-500', suffix: '%' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                    {stat.trend && (
                                        <div className="flex items-center gap-1 text-[#25D366] text-[10px] font-bold bg-green-50 px-2 py-1 rounded-full">
                                            <TrendingUp className="w-3 h-3" />
                                            {stat.trend}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-[#0B1F2A]">{stat.val}</span>
                                    {stat.suffix && <span className="text-sm font-bold text-gray-400">{stat.suffix}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        
                        {/* Area Chart: Messaging Volume */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-[#0B1F2A]">Messaging Volume</h3>
                                    <p className="text-xs text-gray-400 font-medium">Daily outbound traffic for last 7 days</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last 7 Days</span>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 600}} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 600}}
                                        />
                                        <Tooltip 
                                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px'}}
                                            itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                                        />
                                        <Area type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart: Status Distribution */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center">
                            <h3 className="text-lg font-bold text-[#0B1F2A] self-start mb-6">Delivery Breakdown</h3>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-[#0B1F2A]">{safeStats.delivered + safeStats.sent + safeStats.failed}</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                                {pieData.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Lower Section: Recent Campaigns & Team */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#0B1F2A]">Recent Campaigns</h3>
                                <Link href={route('whatsapp.campaigns.index')} className="text-xs font-bold text-[#4F46E5] hover:underline transition-all flex items-center gap-1">
                                    View All <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentCampaigns.length === 0 ? (
                                    <div className="p-12 text-center text-gray-400 text-sm">No campaigns sent yet.</div>
                                ) : (
                                    recentCampaigns.map(camp => (
                                        <div key={camp.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${camp.status === 'COMPLETED' ? 'bg-[#25D366]' : 'bg-indigo-500'}`}>
                                                    {camp.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#0B1F2A]">{camp.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{camp.template_name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-800">{camp.sent_count} Sent</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-widest ${camp.status === 'COMPLETED' ? 'text-[#25D366]' : 'text-indigo-500'}`}>{camp.status}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-[#0B1F2A] rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                                        <Zap className="w-8 h-8 text-[#25D366]" />
                                    </div>
                                    <span className="bg-[#25D366] text-[#0B1F2A] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">PRO PLAN</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-heading leading-tight underline underline-offset-8 decoration-[#25D366]">Power your growth with MsgOps Pro</h3>
                                <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed max-w-sm">Unlock smart automation, multi-agent inbox, and white-labeled customer support today.</p>
                                <div className="mt-auto">
                                    <Link 
                                        href={route('billing.index')}
                                        className="w-full bg-white text-[#0B1F2A] py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center block"
                                    >
                                        UPGRADE ACCOUNT
                                    </Link>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full mix-blend-screen filter blur-[100px] opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
                        </div>

                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </AuthenticatedLayout>
    );
}
