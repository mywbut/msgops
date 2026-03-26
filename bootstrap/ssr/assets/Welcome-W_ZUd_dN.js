import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { Zap, ArrowRight, PlayCircle, Users, BarChart3, Globe, Star, ShieldCheck, ChevronRight } from "lucide-react";
function Welcome({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-gray-900 font-sans selection:bg-[#25D366]/30", children: [
    /* @__PURE__ */ jsx(Head, { title: "MsgOps - The World's Most Powerful WhatsApp Business Platform" }),
    /* @__PURE__ */ jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center h-20 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto w-full flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 group cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo-concept.png",
            alt: "MsgOps Logo",
            className: "w-10 h-10 object-contain shadow-lg transition-transform group-hover:scale-110"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-[#0B1F2A] tracking-tighter uppercase italic", children: "MsgOps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8 text-[11px] font-black text-[#0B1F2A]/60 uppercase tracking-widest", children: [
        /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-[#4F46E5] transition-colors", children: "Features" }),
        /* @__PURE__ */ jsx("a", { href: "#solutions", className: "hover:text-[#4F46E5] transition-colors", children: "Solutions" }),
        /* @__PURE__ */ jsx("a", { href: "#pricing", className: "hover:text-[#4F46E5] transition-colors", children: "Pricing" }),
        /* @__PURE__ */ jsx("a", { href: "#about", className: "hover:text-[#4F46E5] transition-colors", children: "Enterprise" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: auth.user ? /* @__PURE__ */ jsx(
        Link,
        {
          href: route("dashboard"),
          className: "bg-[#0B1F2A] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-navy-100 hover:bg-black transition-all active:scale-95",
          children: "Launch Dashboard"
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-[#0B1F2A] font-black text-[10px] uppercase tracking-widest hover:text-[#4F46E5] transition-all", children: "Login" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "bg-[#25D366] text-[#0B1F2A] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-[#1eb355] transition-all active:scale-95",
            children: "Get Started"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "pt-32 pb-24 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8 animate-fade-in", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-[#4F46E5]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-[#4F46E5] uppercase tracking-widest", children: "V2.0 Core Cloud API Stable Release" })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-8xl font-black text-[#0B1F2A] font-heading leading-[0.9] mb-10 max-w-5xl tracking-tighter", children: [
        "Scale Your ",
        /* @__PURE__ */ jsx("span", { className: "text-[#4F46E5] underline decoration-[#25D366] decoration-8 underline-offset-8", children: "Engagement" }),
        " ",
        /* @__PURE__ */ jsx("br", {}),
        "at Global Velocity."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-500 max-w-3xl mb-12 font-medium leading-relaxed", children: "MsgOps is the definitive WhatsApp SaaS engine for modern commerce. Manage high-volume broadcasts, team collaboration, and intelligent automation in a single premium Command Center." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-5 mb-20", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("register"),
            className: "bg-[#0B1F2A] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center gap-3 group shadow-[#0B1F2A]/30",
            children: [
              "Start Building for Free",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("button", { className: "bg-white text-[#0B1F2A] border border-gray-100 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(PlayCircle, { className: "w-5 h-5" }),
          "Watch Product Tour"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-20 border-t border-gray-50 w-full", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10", children: "Trusted by modern sales & support teams globally" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-[#0B1F2A] italic", children: "Rasoi ki Rani" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-[#0B1F2A] tracking-tighter uppercase", children: "Global Logistics" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-[#0B1F2A] italic", children: "SaaS Core" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-[#0B1F2A] tracking-widest uppercase", children: "Meta Authorized" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 w-full max-w-6xl relative animate-float", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-[#0B1F2A] rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(11,31,42,0.5)] overflow-hidden border border-white/10 ring-1 ring-white/5", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#F8FAFC] rounded-[2.5rem] overflow-hidden aspect-video relative group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
              className: "w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000",
              alt: "Product Dashboard Mockup"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0B1F2A]/80 to-transparent flex items-end p-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/40", children: /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 font-black" }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-left text-white translate-y-2 opacity-100", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold font-heading mb-1", children: "Interactive Command Center" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-300", children: "Experience real-time analytics and global scale." })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -left-20 w-64 h-64 bg-[#4F46E5] rounded-full blur-[120px] opacity-20 -z-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full blur-[120px] opacity-20 -z-10" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "features", className: "py-32 border-t border-gray-50 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-24", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-[#4F46E5] uppercase tracking-widest mb-4 block", children: "Power Features" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-black text-[#0B1F2A] font-heading mb-6 tracking-tight", children: "Built for Enterprise Reliability." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed", children: "Everything you need to transform WhatsApp into your highest converting revenue channel." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-[#0B1F2A] group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(Users, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors", children: "Shared Team Inbox" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium leading-relaxed mb-8", children: "Empower your entire team to manage customer conversations collaboratively with session tracking and internal notes." }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(BarChart3, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors", children: "Visual Analytics" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium leading-relaxed mb-8", children: "Get high-fidelity insights into message volume, delivery rates, and agent performance via our stunning interactive dashboard." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-10 bg-[#F8FAFC] rounded-[3rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all duration-500 group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-4 font-heading group-hover:text-[#4F46E5] transition-colors", children: "Broadcast Engine" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium leading-relaxed mb-8", children: "Execute global marketing campaigns with ease using our 3-step wizard and real-time broadcast tracking system." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1F2A] rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[#0B1F2A]/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-black font-heading mb-8 leading-tight", children: [
          "Ready to Unleash ",
          /* @__PURE__ */ jsx("br", {}),
          " the Power of WhatsApp?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 mb-12 font-medium leading-relaxed", children: "Join thousands of high-growth businesses using MsgOps to build deeper customer relationships and scale faster than ever." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-6", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "bg-[#25D366] text-[#0B1F2A] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all",
              children: "Get Started Free"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all backdrop-blur-md", children: "Talk to an Expert" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#25D366] rounded-full blur-[150px] opacity-20 translate-y-1/2 -translate-x-1/2" })
    ] }) }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-[#F8FAFC] pt-32 pb-16 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/logo-concept.png",
                alt: "MsgOps Logo",
                className: "w-10 h-10 object-contain shadow-lg"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-[#0B1F2A] tracking-tighter uppercase italic", children: "MsgOps" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium leading-relaxed mb-8", children: "The ultimate WhatsApp SaaS for high-growth businesses. Automate, scale, and dominate your market with global-grade engagement tools." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all", children: /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("button", { className: "w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all", children: /* @__PURE__ */ jsx(Star, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("button", { className: "w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-[#0B1F2A] hover:bg-[#4F46E5] hover:text-white transition-all", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10", children: "Product Suite" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors flex items-center gap-2 group", children: [
              "Shared Team Inbox ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors flex items-center gap-2 group", children: [
              "Bulk Campaigns ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors flex items-center gap-2 group", children: [
              "Smart Automation ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors flex items-center gap-2 group", children: [
              "Premium API Access ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-10", children: "Legal & Support" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors", children: "Terms of Service" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors", children: "Cookie Settings" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-[#4F46E5] transition-colors", children: "Security Overview" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-3xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-[#0B1F2A] uppercase tracking-[0.2em] mb-6 block", children: "Platform Integrity" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-green-50 rounded-xl text-[#25D366]", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-[#0B1F2A] uppercase tracking-widest", children: "WABA Secure" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold leading-relaxed mb-6", children: "Messaging operations are performed using the Meta Graph API Cloud v18.0 Infrastructure." }),
          /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "w-[99.9%] h-full bg-[#25D366] animate-pulse" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-[#25D366] uppercase tracking-widest mt-2 block", children: "System Status: Operational" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-400 tracking-widest uppercase", children: "© 2026 MsgOps Technologies Inc." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B1F2A] transition-all", children: "Documentation" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B1F2A] transition-all", children: "Support" }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[#25D366] animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-[#0B1F2A] uppercase tracking-widest", children: "V2.0.4-STABLE" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
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
            ` } })
  ] });
}
export {
  Welcome as default
};
