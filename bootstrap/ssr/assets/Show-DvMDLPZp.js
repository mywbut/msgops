import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function Show({ contact, tags }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, patch, processing, errors } = useForm({
    name: contact.name || "",
    phone_number: contact.phone_number,
    tags: contact.tags || []
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("whatsapp.contacts.update", contact.id), {
      onSuccess: () => setIsEditing(false)
    });
  };
  const toggleTag = (tagName) => {
    const newTags = data.tags.includes(tagName) ? data.tags.filter((t) => t !== tagName) : [...data.tags, tagName];
    setData("tags", newTags);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsx(Link, { href: route("whatsapp.contacts.index"), className: "p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#0B1F2A] font-heading", children: contact.name || "Unknown Contact" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "Customer Profile" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Contact: ${contact.name || contact.phone_number}` }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [
                /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4", children: (contact.name || contact.phone_number).substring(0, 2).toUpperCase() }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A]", children: contact.name || "Unknown" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
                  "+",
                  contact.phone_number
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Growth Lifecycle" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center text-white", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" }) }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#25D366]", children: "Active Customer" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500", children: [
                        "Since ",
                        new Date(contact.created_at).toLocaleDateString()
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: "Segmentation Tags" }),
                    /* @__PURE__ */ jsx("button", { onClick: () => setIsEditing(!isEditing), className: "text-[10px] font-bold text-[#4F46E5] hover:underline", children: isEditing ? "Save Changes" : "Manage Tags" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                    (isEditing ? tags.map((t) => t.name) : data.tags).map((tagName) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        disabled: !isEditing,
                        onClick: () => toggleTag(tagName),
                        className: `px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${data.tags.includes(tagName) ? "bg-[#0B1F2A] text-white border-[#0B1F2A]" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"}`,
                        children: tagName
                      },
                      tagName
                    )),
                    data.tags.length === 0 && !isEditing && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 italic", children: "No tags assigned" })
                  ] }),
                  isEditing && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-gray-50 flex justify-end", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: submit,
                      disabled: processing,
                      className: "bg-[#25D366] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm",
                      children: processing ? "..." : "Update Tags"
                    }
                  ) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 underline underline-offset-8", children: "Engagement Metrics" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-2xl", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase mb-1", children: "Total" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-[#0B1F2A]", children: contact.messages ? contact.messages.length : 0 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-2xl", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase mb-1", children: "Inbound" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-[#0B1F2A]", children: contact.messages ? contact.messages.filter((m) => m.direction === "inbound").length : 0 })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1F2A]", children: "Interaction Timeline" }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("whatsapp.inbox", { contactId: contact.id }),
                  className: "bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
                    "Open in Team Inbox"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 p-8 overflow-y-auto space-y-8 bg-gray-50/20", children: !contact.messages || contact.messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center py-20", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-medium", children: "No interaction history found." })
            ] }) : contact.messages.map((msg, idx) => /* @__PURE__ */ jsxs("div", { className: "relative pl-12", children: [
              idx !== contact.messages.length - 1 && /* @__PURE__ */ jsx("div", { className: "absolute left-5 top-8 bottom-[-32px] w-0.5 bg-gray-100" }),
              /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm z-10 ${msg.direction === "inbound" ? "bg-indigo-50 text-indigo-600" : "bg-[#25D366]/10 text-[#25D366]"}`, children: msg.direction === "inbound" ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 10l7-7m0 0l7 7m-7-7v18" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-2xl border border-gray-100 shadow-sm inline-block max-w-full", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#0B1F2A] uppercase tracking-widest", children: msg.direction === "inbound" ? "Incoming Message" : "Response Sent" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: "•" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-medium", children: new Date(msg.created_at).toLocaleString([], { dateStyle: "short", timeStyle: "short" }) })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-[#0B1F2A] leading-relaxed break-words whitespace-pre-wrap", children: msg.content?.body || (msg.type === "template" ? `Template: ${msg.content?.template}` : `Sent ${msg.type}`) }),
                msg.status && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-gray-400 uppercase tracking-widest", children: "Status:" }),
                  /* @__PURE__ */ jsx("span", { className: `text-[9px] font-bold uppercase transition-all ${msg.status === "read" ? "text-blue-500" : "text-gray-400"}`, children: msg.status })
                ] })
              ] })
            ] }, msg.id)) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            ` } })
      ]
    }
  );
}
export {
  Show as default
};
