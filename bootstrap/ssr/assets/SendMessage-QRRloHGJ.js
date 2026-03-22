import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DK4QHw_4.js";
import { usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function SendMessage() {
  const { isConnected } = usePage().props;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    setError("");
    try {
      const response = await axios.post("/whatsapp/send-message", {
        recipient,
        template,
        message
      });
      setStatus("Message successfully sent to Meta API!");
      setTimeout(() => setStatus(""), 5e3);
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while sending the message.");
      setTimeout(() => setError(""), 5e3);
    } finally {
      setSending(false);
    }
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
              /* @__PURE__ */ jsx("label", { htmlFor: "sender", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Sender WhatsApp Number (Asset)" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "sender",
                  className: "mt-1 mb-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800",
                  disabled: !isConnected,
                  children: isConnected ? /* @__PURE__ */ jsx("option", { value: "connected", children: "Connected WhatsApp Business Account" }) : /* @__PURE__ */ jsx("option", { value: "", children: "No Account Connected" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "recipient", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Recipient Phone Number (with country code)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  id: "recipient",
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  placeholder: "+1234567890",
                  disabled: !isConnected || sending,
                  required: true,
                  value: recipient,
                  onChange: (e) => setRecipient(e.target.value)
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
                  disabled: !isConnected || sending,
                  value: template,
                  onChange: (e) => {
                    const val = e.target.value;
                    setTemplate(val);
                    if (val === "hello_world") {
                      setMessage("Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.");
                    } else {
                      setMessage("");
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- No Template (Free-form Text) --" }),
                    /* @__PURE__ */ jsx("option", { value: "hello_world", children: "Meta Test Template (hello_world)" }),
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
                  className: `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ${template ? "bg-gray-100 dark:bg-gray-800" : ""}`,
                  placeholder: "Type your message here...",
                  disabled: !isConnected || sending || template !== "",
                  required: true,
                  value: message,
                  onChange: (e) => setMessage(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Variables like ((name)) will be replaced automatically." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !isConnected || sending,
                  className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50",
                  children: sending ? "Sending..." : "Send Message"
                }
              ),
              status && /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 dark:text-green-400", children: status }),
              error && /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600 dark:text-red-400", children: error })
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
