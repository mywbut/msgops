import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DK4QHw_4.js";
import { usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Automation() {
  const { isConnected } = usePage().props;
  const [enabled, setEnabled] = useState(true);
  const [status, setStatus] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    setStatus("Automation settings saved (Demo Mode)");
    setTimeout(() => setStatus(""), 3e3);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Automation Features" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Automation Features" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Connect your account to enable Chatbot Automations." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Master Auto-Reply Toggles" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Enable or disable all automated replies globally for your WhatsApp number." })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: enabled,
                  onChange: () => setEnabled(!enabled),
                  disabled: !isConnected
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1877F2]/30 dark:peer-focus:ring-[#1877F2]/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1877F2]" }),
              /* @__PURE__ */ jsx("span", { className: "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300", children: enabled ? "Active" : "Paused" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: `space-y-6 ${!enabled || !isConnected ? "opacity-50" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "trigger", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Keyword Triggers (comma separated)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "trigger",
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  defaultValue: "hello, hi, help, support",
                  disabled: !enabled || !isConnected
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "When a user message contains any of these words, the auto-reply will trigger." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "reply_message", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Default Auto-Reply Message" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "reply_message",
                  rows: 4,
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  defaultValue: "Hello 👋! Thank you for reaching out to us. Our support team will respond to your query shortly. If it's urgent, please reply with 'URGENT'.",
                  disabled: !enabled || !isConnected
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !enabled || !isConnected,
                  className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50",
                  children: "Save Automations"
                }
              ),
              status && /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 dark:text-green-400", children: status })
            ] })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  Automation as default
};
