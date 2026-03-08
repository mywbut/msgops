import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DK4QHw_4.js";
import { usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function SendMessage() {
  const { isConnected } = usePage().props;
  const [status, setStatus] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    setStatus("Message added to queue (Demo Mode)");
    setTimeout(() => setStatus(""), 3e3);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Send Message" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Send Message" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "You must connect your WhatsApp Business Account before sending messages." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSend, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "recipient", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Recipient Phone Number (with country code)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  id: "recipient",
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  placeholder: "+1234567890",
                  disabled: !isConnected,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "template", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Message Template (Optional)" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "template",
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  disabled: !isConnected,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Select Template --" }),
                    /* @__PURE__ */ jsx("option", { value: "welcome", children: "Welcome Message" }),
                    /* @__PURE__ */ jsx("option", { value: "appointment", children: "Appointment Reminder" }),
                    /* @__PURE__ */ jsx("option", { value: "update", children: "Order Update" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Message Body" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "message",
                  rows: 4,
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  placeholder: "Type your message here...",
                  disabled: !isConnected,
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Variables like ((name)) will be replaced automatically." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !isConnected,
                  className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50",
                  children: "Send Message"
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
  SendMessage as default
};
