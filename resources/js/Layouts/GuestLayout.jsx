import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#111827]">
            {/* Left Side: Branding & Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0B1F2A] flex-col justify-between p-12 relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/">
                        <ApplicationLogo className="w-16 h-16 fill-[#25D366]" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-12 mb-6 font-heading leading-tight">
                        The World's Most <br /> 
                        <span className="text-[#25D366]">Popular WhatsApp</span> <br /> 
                        Marketing Platform.
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md">
                        Join 8,000+ businesses globally to scale your customer engagement with automated broadcasts and real-time support.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="flex gap-4 items-center">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1F2A] bg-gray-600 flex items-center justify-center text-[10px] text-white font-bold">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-400">
                            <span className="text-white font-bold">4.8/5</span> from over <span className="text-white font-bold">1,200</span> reviews
                        </div>
                    </div>
                </div>

                {/* Abstract Background Element */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#25D366]/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-[#4F46E5]/10 rounded-full blur-3xl opacity-30"></div>
                
                {/* Illustration placeholder - we'll embed the generated image here in specific pages if needed or keep it clean */}
                <div className="absolute right-0 bottom-24 opacity-20 pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="200" r="150" stroke="#25D366" strokeWidth="1" strokeDasharray="10 10" />
                        <rect x="150" y="150" width="100" height="100" rx="20" stroke="#25D366" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8 flex justify-center">
                        <Link href="/">
                            <ApplicationLogo className="w-12 h-12 fill-[#25D366]" />
                        </Link>
                    </div>
                    
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                        {children}
                    </div>
                    
                    <div className="mt-8 text-center text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} msgops.in. All rights reserved.
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            `}} />
        </div>
    );
}
