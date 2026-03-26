import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { Head, Link } from "@inertiajs/react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
import "react";
function Index({ campaigns, success, error }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 border-green-200";
      case "SENDING":
        return "bg-blue-100 text-blue-700 border-blue-200 animate-pulse";
      case "FAILED":
        return "bg-red-100 text-red-700 border-red-200";
      case "SCHEDULED":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  const calculatePercentage = (count, total) => {
    if (!total) return 0;
    return Math.round(count / total * 100);
  };
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent_count, 0);
  const totalDelivered = campaigns.reduce((acc, c) => acc + c.delivered_count, 0);
  const totalRead = campaigns.reduce((acc, c) => acc + c.read_count, 0);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#0B1F2A] font-heading", children: "Campaigns & Broadcasts" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Monitor your message reach and engagement" })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("whatsapp.campaigns.create"),
            className: "bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#25D366]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
              "Create Campaign"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "WhatsApp Campaigns" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Total Sent" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-[#0B1F2A]", children: totalSent.toLocaleString() })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-2 text-[10px] text-indigo-600 font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-indigo-100 px-2 py-0.5 rounded-lg", children: "All Time" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Delivered" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-[#0B1F2A]", children: totalDelivered.toLocaleString() })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-2 text-[10px] text-green-600 font-bold", children: /* @__PURE__ */ jsxs("span", { className: "bg-green-100 px-2 py-0.5 rounded-lg", children: [
                calculatePercentage(totalDelivered, totalSent),
                "% Rate"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Read Rate" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-[#0B1F2A]", children: totalRead.toLocaleString() })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-2 text-[10px] text-amber-600 font-bold", children: /* @__PURE__ */ jsxs("span", { className: "bg-amber-100 px-2 py-0.5 rounded-lg", children: [
                calculatePercentage(totalRead, totalDelivered),
                "% Rate"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Campaigns" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-[#0B1F2A]", children: campaigns.length })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gray-100 px-2 py-0.5 rounded-lg", children: "Active & Past" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
            success && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-800 shadow-sm animate-fade-in", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#25D366]", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: success })
            ] }),
            error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: error })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: campaigns.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-2", children: "No Campaigns Yet" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-xs mx-auto", children: "Launch your first broadcast campaign to reach your audience at scale." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("whatsapp.campaigns.create"),
                className: "px-8 py-3 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5",
                children: "Start Broadcast"
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4", children: "Campaign Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Audience Stats" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Delivery" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Read" }),
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right", children: "Created" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: campaigns.map((camp) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/30 transition-all", children: [
              /* @__PURE__ */ jsxs("td", { className: "px-8 py-5", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm", children: camp.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-0.5 italic", children: [
                  camp.template_name,
                  " (",
                  camp.language,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[10px] font-bold rounded-lg border ${getStatusStyle(camp.status)}`, children: camp.status }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 min-w-[120px]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "PROGRESS" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[#0B1F2A]", children: [
                    calculatePercentage(camp.sent_count, camp.total_contacts),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-[#25D366] h-full transition-all duration-500 ease-out",
                    style: { width: `${calculatePercentage(camp.sent_count, camp.total_contacts)}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400", children: [
                  camp.sent_count,
                  " / ",
                  camp.total_contacts,
                  " sent"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm", children: camp.delivered_count }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-green-500 font-bold", children: [
                  calculatePercentage(camp.delivered_count, camp.sent_count),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm", children: camp.read_count }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-amber-500 font-bold", children: [
                  calculatePercentage(camp.read_count, camp.delivered_count),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "px-8 py-5 text-right", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-[#0B1F2A] font-medium", children: new Date(camp.created_at).toLocaleDateString() }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: new Date(camp.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ] })
            ] }, camp.id)) })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
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
  Index as default
};
