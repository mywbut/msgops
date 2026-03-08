import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DK4QHw_4.js";
import { usePage, Head } from "@inertiajs/react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "react";
function MessageLogs() {
  const { isConnected } = usePage().props;
  const logs = [
    { id: 1, to: "+91 9876543210", status: "Read", message: "Hello! Thank you for contacting us...", time: "10:45 AM" },
    { id: 2, to: "+1 555-123-4567", status: "Delivered", message: "Your appointment is confirmed for t...", time: "09:30 AM" },
    { id: 3, to: "+44 7911 123456", status: "Sent", message: "Here is your tracking link: https...", time: "Yesterday" },
    { id: 4, to: "+91 8765432109", status: "Read", message: "Welcome to MsgOps! Let us know how w...", time: "Yesterday" },
    { id: 5, to: "+1 888-999-0000", status: "Failed", message: "Please reply STOP to unsubscribe...", time: "Oct 24" }
  ];
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Message Logs" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Last 30 Days" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Message Logs" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Connect your account to view your messaging history." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex mb-6 space-x-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by number or keyword...",
                className: "flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                disabled: !isConnected
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                disabled: !isConnected,
                className: "bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition",
                children: "Filter"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Recipient" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Message Snippet" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Time" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: `bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ${!isConnected ? "opacity-50" : ""}`, children: logs.map((log) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: log.to }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${log.status === "Read" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : log.status === "Delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : log.status === "Failed" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}
                                                    `, children: log.status }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: log.message }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400", children: log.time })
            ] }, log.id)) })
          ] }) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  MessageLogs as default
};
