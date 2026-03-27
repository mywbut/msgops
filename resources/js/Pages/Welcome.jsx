import { Head, Link } from '@inertiajs/react';
import {
    MessageSquare, Zap, Users, BarChart3,
    ShieldCheck, ArrowRight, PlayCircle, Star,
    CheckCircle2, Globe, Layout, ChevronRight,
    Store, GraduationCap, Building2, Scissors
} from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#25D366]/30">
            <Head>
                <title>MsgOps - WhatsApp Marketing Software for Small Businesses in India</title>
                <meta name="description" content="MsgOps helps small businesses send bulk WhatsApp messages, automate follow-ups, and manage customer chats easily. Start your free trial today." />
                <meta name="keywords" content="whatsapp marketing software, whatsapp bulk messaging india, whatsapp automation tool, whatsapp saas india, customer engagement whatsapp, msgops" />
            </Head>

            {/* Premium Glassmorphism Navbar */}
            {/* Premium Glassmorphism Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center h-20 px-8">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <img
                            src="/images/logo.png"
                            alt="MsgOps Logo"
                            className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
                        />
                        <span className="text-xl font-black text-[#0B1F2A] tracking-tighter font-heading">MsgOps</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-[#0B1F2A]/60 uppercase tracking-widest">
                        <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-[#4F46E5] transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-[#4F46E5] transition-colors">Pricing</a>
                        <a href="#demo" className="hover:text-[#4F46E5] transition-colors">Live Demo</a>
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
                                    className="bg-[#25D366] text-[#0B1F2A] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-[#1eb355] transition-all active:scale-95 flex items-center gap-2"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* High-Impact Hero Section */}
            <main className="pt-32 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full mb-8 animate-fade-in">
                                <Zap className="w-4 h-4 text-[#25D366]" />
                                <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Trusted by businesses across Kolkata & West Bengal</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-[#0B1F2A] font-heading leading-[1.1] mb-8 tracking-tighter">
                                Grow Your Business <br />
                                <span className="text-[#25D366]">on WhatsApp 🚀</span>
                            </h1>

                            <p className="text-xl text-gray-500 max-w-xl mb-10 font-medium leading-relaxed">
                                Send Offers, Follow-ups & Reminders Automatically. MsgOps helps local businesses in India manage customers and automate sales — all from one simple dashboard.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 mb-4 w-full sm:w-auto">
                                <Link
                                    href={route('register')}
                                    className="bg-[#0B1F2A] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group shadow-[#0B1F2A]/30"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="https://wa.me/919038073878?text=Hi%2C%20I%20am%20interested%20in%20MsgOps.%20Please%20share%20demo."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-[#25D366] border-2 border-[#25D366] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-50 transition-all flex items-center justify-center gap-3"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-12 ml-2">No credit card required • Setup in 5 minutes</p>

                            <div className="flex items-center gap-4 py-6 border-t border-gray-100 w-full">
                                <div className="flex -space-x-3">
                                    {[
                                        { icon: Store, color: 'bg-green-500' },
                                        { icon: GraduationCap, color: 'bg-blue-500' },
                                        { icon: Building2, color: 'bg-purple-500' },
                                        { icon: Scissors, color: 'bg-orange-500' }
                                    ].map((item, i) => (
                                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${item.color} flex items-center justify-center text-white shadow-sm`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-gray-400">Used by 100+ businesses in Kolkata</p>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="relative animate-float">
                            <div className="bg-[#25D366]/10 rounded-[3rem] p-4 shadow-2xl overflow-hidden border border-[#25D366]/20">
                                <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] relative group">
                                    <img
                                        src="/images/hero-local-business.png"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                                        alt="Local Business Owner using MsgOps"
                                    />
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center text-white">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">New Message</p>
                                                <p className="text-xs font-bold text-[#0B1F2A]">"I want to book an appointment!"</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 bg-[#0B1F2A]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Automation Active</p>
                                                <p className="text-xs font-bold">Follow-up sent automatically ✅</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full blur-[120px] opacity-20 -z-10"></div>
                        </div>
                    </div>
                </div>
            </main>


            {/* Instant Value Section */}
            <section id="features" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Everything You Need to Grow on WhatsApp</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed italic">Simple, powerful tools built for the Indian market.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Block 1: Bulk Messaging */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-green-100/50 transition-all group">
                            <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-4 font-heading">Bulk Messaging</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Send offers, festivals wishes, and updates to all your customers at once. Increase repeat customers with bulk WhatsApp messages.</p>
                        </div>

                        {/* Block 2: Auto Follow-ups */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all group">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-4 font-heading">Auto Follow-ups</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Automatically remind customers about pending payments or appointments. Never miss a lead again.</p>
                        </div>

                        {/* Block 3: Team Inbox */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-purple-100/50 transition-all group">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-4 font-heading">Team Inbox</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">Let your whole team reply to customers from one WhatsApp number. No more sharing phones!</p>
                        </div>

                        {/* Block 4: Simple Reports */}
                        <div className="p-10 bg-[#F8FAFC] rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all group">
                            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-4 font-heading">Simple Reports</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">See how many messages were sent and who replied. Clean, easy-to-read reports for busy owners.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem → Solution Section */}
            <section className="py-24 bg-[#0B1F2A] text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight">Struggling to Manage Customers <br /> on WhatsApp?</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-[3rem]">
                            <h3 className="text-2xl font-black mb-8 text-red-400 flex items-center gap-3">
                                <span>❌</span> The Old Way
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    "Customers don’t reply to manual messages",
                                    "Follow-ups miss ho jata hai (Get forgotten)",
                                    "Too many chats to handle on one phone",
                                    "No way to track who is interested"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-gray-400 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-red-400/20 flex items-center justify-center text-red-400 mt-1 flex-shrink-0 text-xs text-xs">✕</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#25D366]/10 backdrop-blur-sm border border-[#25D366]/30 p-12 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <h3 className="text-2xl font-black mb-8 text-[#25D366] flex items-center gap-3">
                                <span>✅</span> The MsgOps Way
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    "Auto replies send instantly",
                                    "Automated follow-ups do the hard work",
                                    "Bulk messaging sends offers in 1-click",
                                    "Central inbox for your whole team"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white font-medium">
                                        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-[#0B1F2A] mt-1 flex-shrink-0 text-[10px]">✔</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* Use Case Section */}
            <section id="solutions" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest mb-4 block">Built for You</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Built for Every Local Business</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Restaurants */}
                        <div className="p-8 bg-[#F8FAFC] rounded-3xl border border-gray-100 hover:border-[#25D366] transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🍛</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-3">Restaurants</h3>
                            <p className="text-sm text-gray-500 font-medium">Send daily menu & special offers to your regular customers.</p>
                        </div>

                        {/* Card 2: Coaching Centers */}
                        <div className="p-8 bg-[#F8FAFC] rounded-3xl border border-gray-100 hover:border-[#25D366] transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🎓</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-3">Coaching Centers</h3>
                            <p className="text-sm text-gray-500 font-medium">Send class updates, notes & fee reminders automatically.</p>
                        </div>

                        {/* Card 3: Real Estate */}
                        <div className="p-8 bg-[#F8FAFC] rounded-3xl border border-gray-100 hover:border-[#25D366] transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🏠</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-3">Real Estate</h3>
                            <p className="text-sm text-gray-500 font-medium">Follow-up with new leads automatically and share property pics.</p>
                        </div>

                        {/* Card 4: Salons */}
                        <div className="p-8 bg-[#F8FAFC] rounded-3xl border border-gray-100 hover:border-[#25D366] transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">💇</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-3">Salons</h3>
                            <p className="text-sm text-gray-500 font-medium">Send booking confirmations and appointment reminders.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Start in 3 Simple Steps</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Step 1 */}
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl mx-auto mb-8 border-4 border-[#25D366]/20">1️⃣</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-4">Connect</h3>
                            <p className="text-gray-500 font-medium">Connect WhatsApp number</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl mx-auto mb-8 border-4 border-[#25D366]/20">2️⃣</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-4">Upload</h3>
                            <p className="text-gray-500 font-medium">Upload contacts or get leads</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl mx-auto mb-8 border-4 border-[#25D366]/20">3️⃣</div>
                            <h3 className="text-xl font-black text-[#0B1F2A] mb-4">Grow</h3>
                            <p className="text-gray-500 font-medium">Send messages & auto-follow-ups</p>
                        </div>

                        {/* Connecting line (desktop only) */}
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-1 border-t-2 border-dashed border-[#25D366]/30 -z-0"></div>
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section id="demo" className="py-24 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#25D366] rounded-[4rem] p-16 text-center text-[#0B1F2A] relative overflow-hidden shadow-2xl shadow-[#25D366]/40">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">Try MsgOps on <br /> WhatsApp Now</h2>
                            <p className="text-lg font-bold mb-12 leading-relaxed opacity-80">Experience the power of automation yourself. Chat with our demo bot to see how it works!</p>
                            <div className="flex justify-center">
                                <a
                                    href="https://wa.me/919038073878?text=Hi%2C%20I%20am%20interested%20in%20MsgOps.%20Please%20share%20demo."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#0B1F2A] text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center gap-4"
                                >
                                    <MessageSquare className="w-6 h-6" />
                                    Try Live Demo on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight">Simple & Affordable Pricing</h2>
                        <p className="text-gray-500 font-medium italic">No hidden fees. Scale as you grow.</p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <div className="bg-[#F8FAFC] rounded-[3rem] border-4 border-[#25D366] p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#25D366] text-[#0B1F2A] px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Most Popular</div>
                            <h3 className="text-2xl font-black text-[#0B1F2A] mb-2 font-heading">Starter Plan</h3>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-5xl font-black text-[#0B1F2A]">₹99</span>
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">/ month</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "1 WhatsApp Number",
                                    "Unlimited Bulk Messaging",
                                    "Basic Automation (Auto-replies)",
                                    "Team Inbox (2 Members)",
                                    "Simple Analytics"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-[10px] text-gray-400 font-bold mb-8 uppercase tracking-widest">* Meta charges extra per conversation</p>

                            <Link
                                href={route('register')}
                                className="block w-full text-center bg-[#0B1F2A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all"
                            >
                                Get Started Now
                            </Link>

                            <div className="mt-6 text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No setup cost | Cancel anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Trust Section */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-12">Trusted by 100+ Local Businesses</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <span className="text-2xl font-black text-[#0B1F2A] italic">Rasoi ki Rani</span>
                        <span className="text-2xl font-black text-[#0B1F2A] tracking-tighter uppercase">City Coaching Center</span>
                        <span className="text-2xl font-black text-[#0B1F2A] italic">Sunrise Clinic</span>
                        <span className="text-2xl font-black text-[#0B1F2A] tracking-widest uppercase">Kolkata Realty</span>
                        <span className="text-2xl font-black text-[#0B1F2A] italic">Glamour Salon</span>
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
                                    src="/images/logo.png"
                                    alt="MsgOps Logo"
                                    className="w-10 h-10 object-contain"
                                />
                                <span className="text-xl font-black text-[#0B1F2A] tracking-tighter font-heading">MsgOps</span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                                Helping local businesses in India grow with WhatsApp automation. Simple, affordable, and effective.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-[#0B1F2A]">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500">📍</div>
                                    Kolkata Based Support
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-[#0B1F2A]">
                                    <div className="p-2 bg-green-50 rounded-lg text-[#25D366]">📞</div>
                                    +91 90380 73878
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-[#0B1F2A]">
                                    <div className="p-2 bg-green-50 rounded-lg text-[#25D366]">💬</div>
                                    WhatsApp Support
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10">Solutions</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Restaurants</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Coaching Centers</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Real Estate</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Salons & Spas</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10">Quick Links</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                                <li><a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-[#4F46E5] transition-colors">Pricing</a></li>
                                <li><a href="#demo" className="hover:text-[#4F46E5] transition-colors">Live Demo</a></li>
                                <li><a href="#" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h4 className="text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-6 block">Meta Verified</h4>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 rounded-xl text-[#25D366]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-black text-[#0B1F2A] uppercase tracking-widest">Official Cloud API</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold leading-relaxed mb-6">Messaging operations are performed using the official Meta WhatsApp Business Cloud API.</p>
                            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                <div className="w-[99.9%] h-full bg-[#25D366] animate-pulse"></div>
                            </div>
                            <span className="text-[8px] font-black text-[#25D366] uppercase tracking-widest mt-2 block">System Status: Operational</span>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4 md:mb-0">© 2026 MsgOps</p>
                        <div className="flex items-center gap-10">
                            <a href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B1F2A] transition-all">Support</a>
                            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></div>
                                <span className="text-[9px] font-black text-[#0B1F2A] uppercase tracking-widest">Secure & Fast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <style dangerouslySetInnerHTML={{
                __html: `
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
