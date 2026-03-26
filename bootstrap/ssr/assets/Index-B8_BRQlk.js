import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { Head, Link } from "@inertiajs/react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
import "react";
function Index({ isConnected, templates, apiError, success, flashError }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      case "PENDING":
      case "IN_APPEAL":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#0B1F2A] font-heading", children: "Template Messages" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Manage and sync your WhatsApp message templates" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: isConnected && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("button", { className: "px-4 py-2 text-sm font-bold text-[#4F46E5] bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
            "Sync Templates"
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("whatsapp.templates.create"),
              className: "bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#25D366]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
                "New Template"
              ]
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "WhatsApp Templates" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
            success && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-800 shadow-sm animate-fade-in", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#25D366]", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: success })
            ] }),
            (apiError || flashError) && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: apiError || flashError })
            ] }),
            !isConnected && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-amber-50 border border-amber-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-amber-100 rounded-2xl text-amber-600", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-[#0B1F2A]", children: "WhatsApp is not connected" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Connect your account to create and manage templates." })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Link, { href: route("whatsapp.connect"), className: "px-6 py-2 bg-[#0B1F2A] text-white rounded-xl text-sm font-bold hover:bg-black transition-all", children: "Go to Connection Page" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: isConnected && templates.length === 0 && !apiError ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-2", children: "No Templates Found" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8 max-w-xs mx-auto", children: "Create your first template message to start reaching out to your customers." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("whatsapp.templates.create"),
                className: "px-8 py-3 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5",
                children: "Create Template"
              }
            )
          ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: [
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4", children: "Template Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Category" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Language" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Message Preview" }),
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: (templates || []).map((tpl) => {
              const bodyComponent = tpl.components?.find((c) => c.type === "BODY");
              return /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/30 transition-all", children: [
                /* @__PURE__ */ jsxs("td", { className: "px-8 py-5", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm", children: tpl.name }),
                  /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-0.5", children: [
                    "ID: ",
                    tpl.id || "Meta Sync Pending"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-lg", children: tpl.category }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-500", children: tpl.language }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[10px] font-bold rounded-lg border ${getStatusStyle(tpl.status)}`, children: tpl.status }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 max-w-xs", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-2 leading-relaxed", title: bodyComponent?.text, children: bodyComponent?.text || "No text body" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-5 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all", children: [
                  /* @__PURE__ */ jsx("button", { className: "p-2 text-gray-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-all", title: "Send Campaign", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) }) }),
                  /* @__PURE__ */ jsx("button", { className: "p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all", title: "Delete", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })
                ] }) })
              ] }, tpl.id);
            }) })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
      ]
    }
  );
}
export {
  Index as default
};
