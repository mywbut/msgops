import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { usePage, Head } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function TeamInbox() {
  const { auth } = usePage().props;
  const [conversations, setConversations] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 1e4);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id);
      const interval = setInterval(() => fetchMessages(selectedContact.id), 5e3);
      return () => clearInterval(interval);
    }
  }, [selectedContact]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const fetchConversations = async () => {
    try {
      const response = await axios.get(route("api.whatsapp.conversations"));
      setConversations(response.data.conversations);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };
  const fetchMessages = async (contactId) => {
    try {
      const response = await axios.get(route("api.whatsapp.messages", contactId));
      setMessages(response.data.messages);
      setIsExpired(response.data.is_expired);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;
    try {
      const response = await axios.post(route("whatsapp.send-message"), {
        recipients: [selectedContact.phone_number],
        type: "text",
        message: newMessage
      });
      if (response.data.success) {
        setNewMessage("");
        fetchMessages(selectedContact.id);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const filteredConversations = conversations.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone_number.includes(searchQuery)
  );
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Team Inbox" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Team Inbox" }),
        /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-160px)] mt-4 mx-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-80 flex flex-col border-r border-gray-100 bg-[#F8FAFC]", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-white border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search conversations...",
                  className: "w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#25D366]",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-2.5 w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-400 text-sm", children: "Loading conversations..." }) : filteredConversations.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-gray-400 text-sm", children: "No conversations found" }) : filteredConversations.map((conv) => /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => setSelectedContact(conv),
                className: `p-4 cursor-pointer border-b border-gray-50 transition-all ${selectedContact?.id === conv.id ? "bg-white border-l-4 border-l-[#25D366] shadow-sm" : "hover:bg-gray-50"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "font-bold text-[#111827] text-sm truncate w-40", children: conv.name }),
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: conv.last_message_time })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 truncate", children: conv.last_message || "New conversation" }),
                  conv.is_expired && /* @__PURE__ */ jsx("span", { className: "mt-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded uppercase font-bold tracking-wider", children: "Expired" })
                ]
              },
              conv.id
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col bg-white", children: selectedContact ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] font-bold", children: selectedContact.name.charAt(0) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-800", children: selectedContact.name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: selectedContact.phone_number })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx("button", { className: "p-2 hover:bg-gray-50 rounded-lg text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" }) }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 bg-[#F8FAFC]", children: [
              messages.map((msg, idx) => {
                const isOutbound = msg.direction === "outbound";
                const showDate = idx === 0 || messages[idx - 1].date !== msg.date;
                return /* @__PURE__ */ jsxs("div", { children: [
                  showDate && /* @__PURE__ */ jsx("div", { className: "flex justify-center my-6", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: msg.date }) }),
                  /* @__PURE__ */ jsx("div", { className: `flex mb-4 ${isOutbound ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${isOutbound ? "bg-[#25D366] text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-50"}`, children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed", children: msg.content?.body || JSON.stringify(msg.content) }),
                    /* @__PURE__ */ jsxs("div", { className: `text-[10px] mt-1 flex justify-end items-center gap-1 ${isOutbound ? "text-white/70" : "text-gray-400"}`, children: [
                      msg.time,
                      isOutbound && /* @__PURE__ */ jsx("span", { children: msg.status === "read" ? /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" }) }) })
                    ] })
                  ] }) })
                ] }, msg.id);
              }),
              /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-white border-t border-gray-100", children: isExpired ? /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-100 rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 mb-3 font-medium", children: "The 24-hour window has expired. You can only send template messages." }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => window.location.href = route("whatsapp.send", { contact: selectedContact.id }),
                  className: "inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-600 transition-all shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v-2" }) }),
                    "SELECT TEMPLATE"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSendMessage, className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: "1",
                  placeholder: "Type a message...",
                  className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] focus:border-transparent resize-none",
                  value: newMessage,
                  onChange: (e) => setNewMessage(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }
                }
              ) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !newMessage.trim(),
                  className: "bg-[#25D366] text-white p-3 rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#25D366]/20",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" }) })
                }
              )
            ] }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#F8FAFC]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-[#25D366]/40", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-2 font-heading", children: "No conversation selected" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-xs mx-auto text-sm leading-relaxed", children: "Select a chat from the left panel to view messages and start communicating with your customers." })
          ] }) }),
          selectedContact && /* @__PURE__ */ jsxs("div", { className: "w-72 border-l border-gray-100 bg-white p-6 hidden lg:block overflow-y-auto", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-6", children: "Contact Info" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#25D366] text-3xl font-bold mb-4 border border-gray-50", children: selectedContact.name.charAt(0) }),
              /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-lg mb-1", children: selectedContact.name }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 font-medium", children: selectedContact.phone_number })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block", children: "Source" }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs py-2 px-3 bg-[#F8FAFC] rounded-lg text-gray-600 font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[#25D366]" }),
                  "WhatsApp Business"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block", children: "Tags" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100", children: "CUSTOMER" }),
                  /* @__PURE__ */ jsx("button", { className: "px-2.5 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all", children: "+ ADD TAG" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .font-heading { font-family: 'Poppins', 'Inter', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
      ]
    }
  );
}
export {
  TeamInbox as default
};
