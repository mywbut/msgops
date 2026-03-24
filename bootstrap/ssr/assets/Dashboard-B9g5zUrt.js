import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { Head } from "@inertiajs/react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "react";
function Dashboard() {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2", children: "WhatsApp Automation" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-600/80 dark:text-indigo-400/60 mb-4", children: "Connect your Meta Business Account to start sending messages." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: route("whatsapp.connect"),
                className: "inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
                  "WhatsApp Integrations"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex-1 flex items-center justify-center italic text-gray-400", children: "More features coming soon..." })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
