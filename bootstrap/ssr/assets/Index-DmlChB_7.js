import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { Head, Link } from "@inertiajs/react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "react";
function Index({ isConnected, templates, apiError, success, flashError }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Template Messages" }),
        isConnected && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("whatsapp.templates.create"),
            className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white px-4 py-2 rounded shadow text-sm font-medium transition",
            children: "+ New Template"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "WhatsApp Templates" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          success && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded text-green-800 dark:text-green-200", children: success }),
          (apiError || flashError) && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200", children: apiError || flashError }),
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "You must connect your WhatsApp Business Account before managing templates." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
            isConnected && templates.length === 0 && !apiError && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ jsx("p", { children: "No templates found for this WhatsApp Business Account." }),
              /* @__PURE__ */ jsx(Link, { href: route("whatsapp.templates.create"), className: "text-[#1877F2] hover:underline mt-2 inline-block", children: "Create your first template" })
            ] }),
            isConnected && templates.length > 0 && /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Name" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Category" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Language" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Status" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400", children: "Preview" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700", children: templates.map((tpl) => {
                const bodyComponent = tpl.components?.find((c) => c.type === "BODY");
                const statusColor = tpl.status === "APPROVED" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : tpl.status === "REJECTED" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: tpl.name }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: tpl.category }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: tpl.language }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`, children: tpl.status }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate", title: bodyComponent?.text, children: bodyComponent?.text || "No text body" })
                ] }, tpl.id);
              }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
