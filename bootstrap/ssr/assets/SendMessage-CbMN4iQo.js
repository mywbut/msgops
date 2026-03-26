import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { usePage, Head } from "@inertiajs/react";
import { useState, useMemo } from "react";
import axios from "axios";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { T as TextInput } from "./TextInput-D0qTZeQv.js";
import { I as InputLabel } from "./InputLabel-DDs2XNYP.js";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function SendMessage() {
  const { isConnected, templates = [], contacts = [] } = usePage().props;
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [detailedErrors, setDetailedErrors] = useState([]);
  const [msgType, setMsgType] = useState("text");
  const [recipientMode, setRecipientMode] = useState("single");
  const [singleRecipient, setSingleRecipient] = useState("");
  const [bulkRecipients, setBulkRecipients] = useState("");
  const [selectedCRMContacts, setSelectedCRMContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const templateData = useMemo(() => {
    return templates.find((t) => t.name === selectedTemplate);
  }, [selectedTemplate, templates]);
  const templateBody = useMemo(() => {
    const bodyComp = templateData?.components?.find((c) => c.type === "BODY");
    return bodyComp?.text || "";
  }, [templateData]);
  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    setError(null);
    setDetailedErrors([]);
    let recipients = [];
    if (recipientMode === "single") {
      recipients = [singleRecipient];
    } else if (recipientMode === "bulk") {
      recipients = bulkRecipients.split(/[\n,]+/).map((r) => r.trim()).filter((r) => r);
    } else if (recipientMode === "crm") {
      recipients = selectedCRMContacts.map((id) => contacts.find((c) => c.id === id)?.phone_number).filter((r) => r);
    }
    if (recipients.length === 0) {
      setError("Please provide at least one recipient.");
      setSending(false);
      return;
    }
    try {
      const payload = {
        recipients,
        type: msgType,
        message: msgType === "text" ? message : msgType === "template" ? templateBody : null,
        template_name: msgType === "template" ? selectedTemplate : null,
        template_language: msgType === "template" ? templateData?.language : null,
        media_url: msgType === "image" || msgType === "document" ? mediaUrl : null
      };
      const response = await axios.post("/whatsapp/send-message", payload);
      if (response.data.success) {
        setStatus(response.data.summary);
        if (response.data.details?.fail_count > 0) {
          setDetailedErrors(response.data.details.errors);
        }
        if (recipientMode === "single" && response.data.details?.fail_count === 0) {
          setSingleRecipient("");
          setMessage("");
          setMediaUrl("");
        }
      } else {
        setError(response.data.summary);
        setDetailedErrors(response.data.details?.errors || []);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send messages.");
    } finally {
      setSending(false);
    }
  };
  const toggleCRMContact = (id) => {
    setSelectedCRMContacts(
      (prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Pro Messaging Console" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Send Message" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800 h-full border border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "1. Select Audience" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setRecipientMode("single"),
                    className: `flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === "single" ? "bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold" : "text-gray-500"}`,
                    children: "Single"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setRecipientMode("bulk"),
                    className: `flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === "bulk" ? "bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold" : "text-gray-500"}`,
                    children: "Bulk"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setRecipientMode("crm"),
                    className: `flex-1 py-1 px-2 text-xs rounded-md transition ${recipientMode === "crm" ? "bg-white dark:bg-gray-800 shadow text-[#1877F2] font-semibold" : "text-gray-500"}`,
                    children: "CRM"
                  }
                )
              ] }),
              recipientMode === "single" && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Phone Number" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "w-full mt-1",
                    placeholder: "+12345...",
                    value: singleRecipient,
                    onChange: (e) => setSingleRecipient(e.target.value)
                  }
                )
              ] }),
              recipientMode === "bulk" && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Enter Numbers (Newline or Comma)" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: "w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
                    rows: 6,
                    placeholder: "+123456789\\n+987654321...",
                    value: bulkRecipients,
                    onChange: (e) => setBulkRecipients(e.target.value)
                  }
                )
              ] }),
              recipientMode === "crm" && /* @__PURE__ */ jsxs("div", { className: "max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar", children: [
                contacts.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center py-4", children: "No contacts in CRM yet." }),
                contacts.map((contact) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => toggleCRMContact(contact.id),
                    className: `p-2 border rounded cursor-pointer transition ${selectedCRMContacts.includes(contact.id) ? "border-[#1877F2] bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`,
                    children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: contact.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: contact.phone_number })
                    ]
                  },
                  contact.id
                ))
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800 border border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "2. Compose Message" }),
            !isConnected && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 rounded text-red-800 dark:text-red-200 text-sm", children: "WhatsApp is not connected. Please connect via dashboard." }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex space-x-4 border-b dark:border-gray-700 pb-4", children: ["text", "template", "image", "document"].map((type) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setMsgType(type),
                  className: `text-sm font-medium capitalize pb-2 px-1 transition ${msgType === type ? "text-[#1877F2] border-b-2 border-[#1877F2]" : "text-gray-500 hover:text-gray-700"}`,
                  children: type
                },
                type
              )) }),
              msgType === "text" && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Message Content" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: "w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
                    rows: 5,
                    placeholder: "Hello, how can I help you today?",
                    value: message,
                    onChange: (e) => setMessage(e.target.value)
                  }
                )
              ] }),
              msgType === "template" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Select Approved Template" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full mt-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
                      value: selectedTemplate,
                      onChange: (e) => setSelectedTemplate(e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- Choose a template --" }),
                        templates.map((t) => /* @__PURE__ */ jsxs("option", { value: t.name, children: [
                          t.name,
                          " (",
                          t.language,
                          ")"
                        ] }, t.id))
                      ]
                    }
                  )
                ] }),
                selectedTemplate && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider mb-2", children: "Live Preview (Body)" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm italic", children: templateBody || "Loading body..." })
                ] })
              ] }),
              (msgType === "image" || msgType === "document") && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: `${msgType === "image" ? "Image" : "Document"} URL (Public link)` }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "w-full mt-1",
                    placeholder: "https://example.com/file.jpg",
                    value: mediaUrl,
                    onChange: (e) => setMediaUrl(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
                  "For ",
                  msgType === "image" ? "images" : "PDFs",
                  ", ensure the link is publicly accessible via HTTPS."
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col space-y-4 border-t dark:border-gray-700", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-x-4", children: [
                    status && /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-green-600 dark:text-green-400", children: [
                      "✓ ",
                      status
                    ] }),
                    error && /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-red-600 dark:text-red-400", children: [
                      "✗ ",
                      error
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    PrimaryButton,
                    {
                      onClick: handleSend,
                      disabled: !isConnected || sending,
                      children: sending ? "Processing Broadcast..." : "Execute Send"
                    }
                  )
                ] }),
                detailedErrors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded text-xs text-red-700 dark:text-red-300 space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "Detailed Errors:" }),
                  detailedErrors.map((err, i) => /* @__PURE__ */ jsxs("p", { children: [
                    "• ",
                    err
                  ] }, i))
                ] })
              ] })
            ] })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  SendMessage as default
};
