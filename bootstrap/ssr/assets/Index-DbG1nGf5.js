import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { Head, Link } from "@inertiajs/react";
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Briefcase, Rocket, Crown } from "lucide-react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
import "react";
function Plans({ organization }) {
  const plans = [
    {
      name: "Basic",
      price: "₹2,499",
      period: "per month",
      description: "Perfect for small businesses starting with WhatsApp Marketing.",
      features: [
        "1,000 Free Service Conversations",
        "Basic Campaign Engine",
        "Single Agent Team Inbox",
        "Contact Management",
        "Standard Analytics",
        "Community Support"
      ],
      icon: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-gray-500" }),
      color: "bg-white",
      buttonLabel: "Current Plan",
      isCurrent: true
    },
    {
      name: "Pro",
      price: "₹5,999",
      period: "per month",
      description: "For growing businesses needing scale and automation.",
      features: [
        "Advanced Campaign Scheduling",
        "API & Webhook Access",
        "Up to 5 Team Agents",
        "AI Auto-Replying Logic",
        "Advanced Delivery Analytics",
        "Priority Email Support"
      ],
      icon: /* @__PURE__ */ jsx(Rocket, { className: "w-6 h-6 text-[#4F46E5]" }),
      color: "border-2 border-[#4F46E5]",
      buttonLabel: "UPGRADE NOW",
      isCurrent: false,
      badge: "MOST POPULAR"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "Custom solutions for high-volume enterprise operations.",
      features: [
        "Unlimited Free Conversations",
        "Dedicated Account Manager",
        "Unlimited Team Agents",
        "Custom API Integrations",
        "Whitelabel Dashboard",
        "24/7 Phone Support"
      ],
      icon: /* @__PURE__ */ jsx(Crown, { className: "w-6 h-6 text-amber-500" }),
      color: "bg-white",
      buttonLabel: "CONTACT US",
      isCurrent: false
    }
  ];
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Subscription Plans" }),
    /* @__PURE__ */ jsx("div", { className: "py-12 px-6 bg-[#F8FAFC] min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#4F46E5]/10 text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3" }),
          "Premium Pricing"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-[#0B1F2A] font-heading mb-4 tracking-tight", children: "Choose Your Power Plan" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed", children: [
          "MsgOps scale as you grow. Choose a subscription that fits your business needs.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#25D366] font-bold", children: "Message credits are managed separately via your Wallet." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: plans.map((plan, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative flex flex-col p-10 rounded-[2.5rem] shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 ${plan.color} ${plan.isCurrent ? "bg-white opacity-80" : "bg-white"}`,
          children: [
            plan.badge && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4F46E5] text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest", children: plan.badge }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 rounded-2xl bg-gray-50 w-fit mb-6 shadow-sm border border-gray-100", children: plan.icon }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] font-heading mb-2", children: plan.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 mb-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-black text-[#0B1F2A]", children: plan.price }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 font-bold uppercase tracking-widest", children: plan.period })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-medium leading-relaxed", children: plan.description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-10 flex-grow", children: plan.features.map((feature, fIdx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-[#0B1F2A]", children: feature })
            ] }, fIdx)) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                disabled: plan.isCurrent,
                className: `w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${plan.isCurrent ? "bg-gray-100 text-gray-400" : "bg-[#0B1F2A] text-white hover:bg-black hover:shadow-indigo-200"}`,
                children: [
                  plan.buttonLabel,
                  !plan.isCurrent && /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 max-w-3xl mx-auto bg-[#0B1F2A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white/10 p-5 rounded-2xl backdrop-blur-md", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-10 h-10 text-[#25D366]" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 font-heading", children: "How do message credits work?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 leading-relaxed font-medium", children: [
              "Subscriptions cover the platform usage and features. Message costs (Conversations) are deducted from your balance in real-time.",
              /* @__PURE__ */ jsx(Link, { href: route("billing.credits"), className: "text-[#25D366] font-bold underline underline-offset-4 ml-1", children: "Go to Wallet →" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full mix-blend-screen filter blur-[100px] opacity-10" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
  ] });
}
export {
  Plans as default
};
