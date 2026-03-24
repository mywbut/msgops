import { Head, Link } from '@inertiajs/react';
import { 
    MessageSquare, Zap, Users, BarChart3, 
    ShieldCheck, ArrowRight, PlayCircle, Star,
    CheckCircle2, Globe, Layout, ChevronRight
} from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#25D366]/30">
            <Head title="MsgOps - The World's Most Powerful WhatsApp Business Platform" />

            {/* Premium Glassmorphism Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center h-20 px-8">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <img 
                            src="/images/logo-concept.png" 
                            alt="MsgOps Logo" 
                            className="w-10 h-10 object-contain shadow-lg transition-transform group-hover:scale-110"
                        />
                        <span className="text-xl font-black text-[#0B1F2A] tracking-tighter uppercase italic">MsgOps</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-[#0B1F2A]/60 uppercase tracking-widest">
                        <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-[#4F46E5] transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-[#4F46E5] transition-colors">Pricing</a>
                        <a href="#about" className="hover:text-[#4F46E5] transition-colors">Enterprise</a>
                    </div>

                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link 
                                href={route('dashboard')} 
                                className="bg-[#0B1F2A] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-navy-100 hover:bg-black transition-all active:scale-95"
                            >
                                Launch Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link href={route('login')} className="text-[#0B1F2A] font-black text-[10px] uppercase tracking-widest hover:text-[#4F46E5] transition-all">Login</Link>
                                <Link 
                                    href={route('register')} 
                                    className="bg-[#25D366] text-[#0B1F2A] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-[#1eb355] transition-all active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* High-Impact Hero Section */}
            <main className="pt-32 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8 animate-fade-in">
                            <Zap className="w-4 h-4 text-[#4F46E5]" />
                            <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">V2.0 Core Cloud API Stable Release</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-black text-[#0B1F2A] font-heading leading-[0.9] mb-10 max-w-5xl tracking-tighter">
                            Scale Your <span className="text-[#4F46E5] underline decoration-[#25D366] decoration-8 underline-offset-8">Engagement</span> <br/> 
                            at Global Velocity.
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-500 max-w-3xl mb-12 font-medium leading-relaxed">
                            MsgOps is the definitive WhatsApp SaaS engine for modern commerce. Manage high-volume broadcasts, team collaboration, and intelligent automation in a single premium Command Center.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 mb-20">
                            <Link 
                                href={route('register')} 
                                className="bg-[#0B1F2A] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center gap-3 group shadow-[#0B1F2A]/30"
                            >
                                Start Building for Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="bg-white text-[#0B1F2A] border border-gray-100 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all flex items-center gap-3">
                                <PlayCircle className="w-5 h-5" />
                                Watch Product Tour
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-20 border-t border-gray-50 w-full">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">Trusted by modern sales & support teams globally</p>
                            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                                <span className="text-2xl font-black text-[#0B1F2A] italic">Rasoi ki Rani</span>
                                <span className="text-2xl font-black text-[#0B1F2A] tracking-tighter uppercase">Global Logistics</span>
                                <span className="text-2xl font-black text-[#0B1F2A] italic">SaaS Core</span>
                                <span className="text-2xl font-black text-[#0B1F2A] tracking-widest uppercase">Meta Authorized</span>
                            </div>
                        </div>

                        {/* Interactive UI Mockup Preview */}
                        <div className="mt-24 w-full max-w-6xl relative animate-float">
                            <div className="bg-[#0B1F2A] rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(11,31,42,0.5)] overflow-hidden border border-white/10 ring-1 ring-white/5">
                                <div className="bg-[#F8FAFC] rounded-[2.5rem] overflow-hidden aspect-video relative group">
                                    <img 
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000"
                                        alt="Product Dashboard Mockup"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F2A]/80 to-transparent flex items-end p-12">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/40">
                                                <Zap className="w-8 h-8 font-black" />
                                            </div>
                                            <div className="text-left text-white translate-y-2 opacity-100">
                                                <h4 className="text-2xl font-bold font-heading mb-1">Interactive Command Center</h4>
                                                <p className="text-sm font-medium text-gray-300">Experience real-time analytics and global scale.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative background blurs */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4F46E5] rounded-full blur-[120px] opacity-20 -z-10"></div>
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full blur-[120px] opacity-20 -z-10"></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Core Features Grid */}
            <section id="features" className="py-32 border-t border-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest mb-4 block">Power Features</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Built for Enterprise Reliability.</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">Everything you need to transform WhatsApp into your highest converting revenue channel.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-[#0B1F2A] group-hover:text-white transition-all">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors">Shared Team Inbox</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Empower your entire team to manage customer conversations collaboratively with session tracking and internal notes.</p>
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors">Visual Analytics</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Get high-fidelity insights into message volume, delivery rates, and agent performance via our stunning interactive dashboard.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors">Broadcast Engine</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Execute global marketing campaigns with ease using our 3-step wizard and real-time broadcast tracking system.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-24 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#0B1F2A] rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[#0B1F2A]/40">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">Ready to Unleash <br/> the Power of WhatsApp?</h2>
                            <p className="text-lg text-gray-400 mb-12 font-medium leading-relaxed">Join thousands of high-growth businesses using MsgOps to build deeper customer relationships and scale faster than ever.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Link 
                                    href={route('register')} 
                                    className="bg-[#25D366] text-[#0B1F2A] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                                >
                                    Get Started Free
                                </Link>
                                <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all backdrop-blur-md">
                                    Talk to an Expert
                                </button>
                            </div>
                        </div>
                        {/* Abstract background blobs */}
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#25D366] rounded-full blur-[150px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-[#F8FAFC] pt-32 pb-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-8">
                                <img 
                                    src="/images/logo-concept.png" 
                                    alt="MsgOps Logo" 
                                    className="w-10 h-10 object-contain shadow-lg"
                                />
                                <span className="text-xl font-black text-[#0B1F2A] tracking-tighter uppercase italic">MsgOps</span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                                The ultimate WhatsApp SaaS for high-growth businesses. Automate, scale, and dominate your market with global-grade engagement tools.
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all"><Globe className="w-5 h-5" /></button>
                                <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all"><Star className="w-5 h-5" /></button>
                                <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all"><ShieldCheck className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10">Product Suite</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors flex items-center gap-2 group">Shared Team Inbox <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors flex items-center gap-2 group">Bulk Campaigns <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors flex items-center gap-2 group">Smart Automation <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors flex items-center gap-2 group">Premium API Access <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10">Legal & Support</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Cookie Settings</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Security Overview</a></li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-6 block">Platform Integrity</h4>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 rounded-xl text-[#25D366]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-black text-[#0B1F2A] uppercase tracking-widest">WABA Secure</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold leading-relaxed mb-6">Messaging operations are performed using the Meta Graph API Cloud v18.0 Infrastructure.</p>
                            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                <div className="w-[99.9%] h-full bg-[#25D366] animate-pulse"></div>
                            </div>
                            <span className="text-[8px] font-black text-[#25D366] uppercase tracking-widest mt-2 block">System Status: Operational</span>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">© 2026 MsgOps Technologies Inc.</p>
                        <div className="flex items-center gap-10">
                            <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B1F2A] transition-all">Documentation</a>
                            <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B1F2A] transition-all">Support</a>
                            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></div>
                                <span className="text-[9px] font-black text-[#0B1F2A] uppercase tracking-widest">V2.0.4-STABLE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
            `}} />
        </div>
    );
}
