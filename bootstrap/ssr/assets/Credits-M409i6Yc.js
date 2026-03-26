import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function Credits({ balance, currency, freeServiceConversations, transactions }) {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const { data, setData, post, processing, reset } = useForm({
    amount: ""
  });
  const handleBuyCredits = (e) => {
    e.preventDefault();
    post(route("billing.buy-credits"), {
      onSuccess: () => {
        setIsBuyModalOpen(false);
        reset();
      }
    });
  };
  const quickAmounts = [1e3, 5e3, 1e4, 2e4, 5e4];
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "bg-white py-4 px-6 border-b border-gray-100 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#0B1F2A] font-heading", children: "Wallet & Credits" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Manage your prepaid balance for messaging" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsBuyModalOpen(true),
            className: "bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-2.5 rounded-xl shadow-lg shadow-[#25D366]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
              "Buy Credits"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Wallet & Credits" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-24 h-24 text-[#25D366]", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Available Balance" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-black text-[#0B1F2A] flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#25D366]", children: currency }),
                parseFloat(balance).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 mt-4 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#25D366]" }),
                "Active and ready for use"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Free Service Messages" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-black text-[#0B1F2A]", children: [
                freeServiceConversations,
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-400 ml-2", children: "/ month" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 h-1.5 rounded-full mt-5 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-[#25D366] h-full", style: { width: `${freeServiceConversations / 1e3 * 100}%` } }) }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-2 italic", children: "Refreshes in 12 days" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#0B1F2A] to-[#1a3646] p-8 rounded-[2rem] text-white shadow-xl shadow-[#0B1F2A]/10", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-white/50 uppercase tracking-widest mb-2", children: "Avg. Conversation Cost" }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-4", children: "₹0.30 - ₹0.72" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70 leading-relaxed", children: "Rates vary by category (Marketing vs Utility). Meta Business account billing applies." }),
              /* @__PURE__ */ jsxs("button", { className: "mt-4 text-[10px] font-bold text-[#25D366] hover:underline flex items-center gap-1", children: [
                "View detailed pricing",
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-10 py-6 border-b border-gray-50 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1F2A]", children: "Transaction History" }),
              /* @__PURE__ */ jsx("button", { className: "text-xs font-bold text-[#25D366] hover:bg-[#25D366]/5 px-4 py-2 rounded-xl transition-all", children: "Download CSV" })
            ] }),
            /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx("th", { className: "px-10 py-4", children: "Transaction Details" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Category" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Type" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Amount" }),
                /* @__PURE__ */ jsx("th", { className: "px-10 py-4 text-right", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: transactions.data.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/30 transition-all", children: [
                /* @__PURE__ */ jsx("td", { className: "px-10 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "topup" ? "bg-[#25D366]/10 text-[#25D366]" : "bg-amber-100 text-amber-600"}`, children: tx.type === "topup" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 11l5-5m0 0l5 5m-5-5v12" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 13l-5 5m0 0l-5-5m5 5V6" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-[#0B1F2A]", children: tx.description }),
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-0.5", children: new Date(tx.created_at).toLocaleString() })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-lg text-[9px] font-bold bg-gray-50 text-gray-500 border border-gray-100 uppercase tracking-wider", children: tx.category || "N/A" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold uppercase ${tx.type === "topup" ? "text-green-600" : "text-amber-600"}`, children: tx.type }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: `text-sm font-black ${tx.type === "topup" ? "text-[#25D366]" : "text-gray-900"}`, children: [
                  tx.type === "topup" ? "+" : "-",
                  currency,
                  Math.abs(tx.amount).toLocaleString()
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-10 py-5 text-right", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#25D366]" }),
                  "Completed"
                ] }) })
              ] }, tx.id)) })
            ] })
          ] })
        ] }) }),
        isBuyModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[#0B1F2A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] w-full max-w-lg p-12 shadow-2xl animate-fade-in relative text-center", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setIsBuyModalOpen(false), className: "absolute top-8 right-8 text-gray-400 hover:text-black transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#25D366]", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-[#0B1F2A] mb-2 font-heading", children: "Buy Credits!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-10", children: "Choose an amount to top up your wallet." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleBuyCredits, children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: quickAmounts.map((amt) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setData("amount", amt),
                className: `py-4 rounded-2xl border-2 text-sm font-bold transition-all ${data.amount == amt ? "border-[#25D366] bg-[#25D366]/5 text-[#25D366]" : "border-gray-50 text-gray-400 hover:border-gray-200"}`,
                children: [
                  currency,
                  " ",
                  amt.toLocaleString()
                ]
              },
              amt
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "relative mb-8", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold", children: currency }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Enter custom amount",
                  className: "w-full bg-gray-50 border-none rounded-2xl px-16 py-5 text-lg font-bold focus:ring-2 focus:ring-[#25D366]",
                  value: data.amount,
                  onChange: (e) => setData("amount", e.target.value),
                  min: "500",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full bg-[#0B1F2A] hover:bg-black text-white py-5 rounded-2xl font-bold shadow-2xl shadow-black/20 transition-all flex justify-center items-center gap-2", children: processing ? "Processing..." : "Proceed to Checkout" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold", children: [
              /* @__PURE__ */ jsx("span", { children: "Secured by Stripe" }),
              /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gray-300" }),
              /* @__PURE__ */ jsx("span", { children: "No hidden fees" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            ` } })
      ]
    }
  );
}
export {
  Credits as default
};
