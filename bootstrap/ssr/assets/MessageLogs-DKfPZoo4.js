import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-B05Cq_fG.js";
import axios from "axios";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function MessageLogs() {
  const { isConnected, logs = [] } = usePage().props;
  const [selectedContact, setSelectedContact] = useState(null);
  const [timelineMessages, setTimelineMessages] = useState([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const openTimeline = async (contactId) => {
    setLoadingTimeline(true);
    setIsTimelineOpen(true);
    try {
      const response = await axios.get(route("whatsapp.contacts.timeline", contactId));
      setSelectedContact(response.data.contact);
      setTimelineMessages(response.data.messages);
    } catch (err) {
      console.error("Failed to fetch timeline", err);
    } finally {
      setLoadingTimeline(false);
    }
  };
  const StatusIcon = ({ status, error }) => {
    if (status === "failed") {
      return /* @__PURE__ */ jsxs("div", { className: "group relative inline-block", children: [
        /* @__PURE__ */ jsx("span", { className: "text-red-500 cursor-help", title: JSON.stringify(error), children: "✕" }),
        error && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl z-50", children: [
          error.message || "Unknown Error",
          /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" })
        ] })
      ] });
    }
    switch (status) {
      case "read":
        return /* @__PURE__ */ jsx("span", { className: "text-blue-500", title: "Read", children: "✓✓" });
      case "delivered":
        return /* @__PURE__ */ jsx("span", { className: "text-gray-400", title: "Delivered", children: "✓✓" });
      case "sent":
        return /* @__PURE__ */ jsx("span", { className: "text-gray-400", title: "Sent", children: "✓" });
      default:
        return /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "..." });
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Communication Logs & Analytics" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Message Logs" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !isConnected && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 rounded text-yellow-800 dark:text-yellow-200 text-sm", children: "WhatsApp is not connected. Live status updates will not be received." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Time" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Contact" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Message" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700", children: [
              logs.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-8 text-center text-gray-500", children: "No messages logged yet." }) }),
              logs.map((log) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-xs text-gray-500", children: log.time }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-gray-100", children: log.contact_name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: log.to })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx("span", { className: `mr-2 flex-shrink-0 ${log.direction === "outbound" ? "text-blue-500" : "text-green-500"}`, children: log.direction === "outbound" ? "↑" : "↓" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm line-clamp-2 max-w-xs", children: log.message })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center text-sm", children: /* @__PURE__ */ jsx(StatusIcon, { status: log.status?.toLowerCase(), error: log.error }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openTimeline(log.contact_id),
                    className: "text-[#1877F2] hover:text-[#0c63d4] text-xs",
                    children: "View Timeline"
                  }
                ) })
              ] }, log.id))
            ] })
          ] }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: isTimelineOpen, onClose: () => setIsTimelineOpen(false), maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium", children: [
              "Conversation with ",
              selectedContact?.name || "Loading..."
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setIsTimelineOpen(false), className: "text-gray-400 hover:text-gray-600", children: "✕" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar flex flex-col", children: loadingTimeline ? /* @__PURE__ */ jsx("div", { className: "text-center py-10 text-gray-500", children: "Loading conversation history..." }) : timelineMessages.map((msg) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `max-w-[80%] rounded-lg p-3 ${msg.direction === "outbound" ? "bg-blue-50 dark:bg-blue-900/30 self-end ml-auto rounded-tr-none border border-blue-100 dark:border-blue-800" : "bg-gray-100 dark:bg-gray-700 self-start rounded-tl-none"}`,
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: msg.content.body || `[Sent ${msg.type}]` }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center justify-end space-x-2 text-[10px] text-gray-500", children: [
                  /* @__PURE__ */ jsx("span", { children: msg.time }),
                  msg.direction === "outbound" && /* @__PURE__ */ jsx(StatusIcon, { status: msg.status?.toLowerCase(), error: msg.error })
                ] })
              ]
            },
            msg.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsTimelineOpen(false), children: "Close" }) })
        ] }) })
      ]
    }
  );
}
export {
  MessageLogs as default
};
