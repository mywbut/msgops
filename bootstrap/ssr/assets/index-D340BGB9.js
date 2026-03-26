import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head } from "@inertiajs/react";
import { Check, ArrowRight } from "lucide-react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
import "react";
function BillingIndex({ organization, plans }) {
  const { post, processing } = useForm();
  const handleUpgrade = (planId) => {
    post(route("billing.upgrade", { plan: planId }));
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pricing & Plans" }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-[#F8FAFC] min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-[#0B1F2A] font-heading mb-4", children: "Choose Your Growth Engine" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-2xl mx-auto font-medium", children: "Scale your WhatsApp operations with precision. Switch plans anytime as your team grows." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: plans.map((plan) => /* @__PURE__ */ jsxs("div", { className: `relative bg-white rounded-[2.5rem] p-10 shadow-sm border ${plan.name === "Pro" ? "border-[#4F46E5] ring-4 ring-indigo-50" : "border-gray-100"} transition-all hover:shadow-xl group`, children: [
        plan.name === "Pro" && /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg", children: "MOST POPULAR" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-2", children: plan.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-4xl font-black text-[#0B1F2A]", children: [
              "$",
              plan.price
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-bold text-sm", children: "/mo" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-10", children: plan.features.map((feature, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-green-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-[#25D366]" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-600", children: feature })
        ] }, i)) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleUpgrade(plan.id),
            disabled: processing || plan.current,
            className: `w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${plan.current ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#0B1F2A] text-white hover:bg-black shadow-xl active:scale-95"}`,
            children: [
              plan.current ? "CURRENT PLAN" : "SELECT PLAN",
              !plan.current && /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }, plan.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 bg-[#0B1F2A] rounded-[3rem] p-12 text-white overflow-hidden relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center justify-between gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold mb-4 font-heading underline underline-offset-8 decoration-[#25D366]", children: "Enterprise Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm font-medium leading-relaxed", children: "Need custom message volumes or dedicated account management? Our enterprise team is ready to build a bespoke solution for your global brand." })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "bg-[#25D366] text-[#0B1F2A] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-900/20", children: "Contact Sales" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -right-20 -bottom-20 w-64 h-64 bg-[#4F46E5] rounded-full blur-[120px] opacity-20" })
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
  BillingIndex as default
};
