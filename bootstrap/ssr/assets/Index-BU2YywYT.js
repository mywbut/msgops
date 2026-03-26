import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function Index({ contacts, tags, contactTags, filters, isConnected }) {
  const { data, setData, get, post, patch, delete: destroy, processing } = useForm({
    search: filters.search || "",
    tag: filters.tag || ""
  });
  const contactForm = useForm({
    name: "",
    phone_number: "",
    tags: []
  });
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  useEffect(() => {
    if (selectedContact) {
      contactForm.setData({
        name: selectedContact.name || "",
        phone_number: selectedContact.phone_number || "",
        tags: selectedContact.tags || []
      });
    } else {
      contactForm.reset();
    }
  }, [selectedContact, isAddModalOpen]);
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (selectedContact) {
      contactForm.patch(route("whatsapp.contacts.update", selectedContact.id), {
        onSuccess: () => {
          setIsAddModalOpen(false);
          contactForm.reset();
        }
      });
    } else {
      contactForm.post(route("whatsapp.contacts.store"), {
        onSuccess: () => {
          setIsAddModalOpen(false);
          contactForm.reset();
        }
      });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    get(route("whatsapp.contacts.index"), { preserveState: true });
  };
  const handleTagFilter = (tagName) => {
    setData("tag", tagName === data.tag ? "" : tagName);
    get(route("whatsapp.contacts.index", { ...filters, tag: tagName === data.tag ? "" : tagName }), { preserveState: true });
  };
  const getTagColor = (tagName) => {
    const tag = tags.find((t) => t.name === tagName);
    return tag ? tag.color : "#64748b";
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#0B1F2A] font-heading", children: "Contacts & CRM" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Manage your audience segments and growth" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: route("whatsapp.contacts.export"),
              className: "bg-white border border-gray-200 text-[#0B1F2A] px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-gray-50 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                "Export"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsImportModalOpen(true),
              className: "bg-white border border-gray-200 text-[#0B1F2A] px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-gray-50 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }),
                "Import"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSelectedContact(null);
                contactForm.reset();
                setIsAddModalOpen(true);
              },
              className: "bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#25D366]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
                "Add Contact"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Contacts CRM" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex-1 relative group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search by name or phone...",
                  className: "w-full bg-white border-gray-100 rounded-2xl px-12 py-3.5 text-sm focus:ring-2 focus:ring-[#25D366] transition-all shadow-sm group-hover:border-gray-200",
                  value: data.search,
                  onChange: (e) => setData("search", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar", children: contactTags.map((tagName) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleTagFilter(tagName),
                className: `px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all flex items-center gap-2 ${data.tag === tagName ? "bg-[#0B1F2A] text-white border-[#0B1F2A] shadow-lg" : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full", style: { backgroundColor: getTagColor(tagName) } }),
                  tagName
                ]
              },
              tagName
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4", children: "Contact" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Tags" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Messages" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Last Activity" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: contacts.data.map((contact) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/30 transition-all", children: [
                /* @__PURE__ */ jsx("td", { className: "px-8 py-5", children: /* @__PURE__ */ jsxs(Link, { href: route("whatsapp.contacts.show", contact.id), className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm uppercase", children: (contact.name || contact.phone_number).substring(0, 2) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm group-hover:text-[#25D366] transition-colors", children: contact.name || "Unknown" }),
                    /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-0.5", children: [
                      "+",
                      contact.phone_number
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: (contact.tags || []).map((t) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-2 py-0.5 rounded-lg text-[9px] font-bold border border-opacity-20",
                    style: { backgroundColor: `${getTagColor(t)}15`, color: getTagColor(t), borderColor: getTagColor(t) },
                    children: t
                  },
                  t
                )) }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center min-w-[32px] h-8 bg-gray-50 rounded-lg text-xs font-bold text-[#0B1F2A]", children: contact.messages_count || 0 }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: contact.last_message_at ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-[#0B1F2A] font-medium", children: new Date(contact.last_message_at).toLocaleDateString() }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-0.5", children: new Date(contact.last_message_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300 italic", children: "No activity" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-5 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("whatsapp.contacts.show", contact.id),
                      className: "p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all",
                      children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setSelectedContact(contact);
                        contactForm.setData({
                          name: contact.name || "",
                          phone_number: contact.phone_number || "",
                          tags: contact.tags || []
                        });
                        setIsAddModalOpen(true);
                      },
                      className: "p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        if (confirm("Delete contact?")) destroy(route("whatsapp.contacts.destroy", contact.id));
                      },
                      className: "p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                    }
                  )
                ] }) })
              ] }, contact.id)) })
            ] }),
            contacts.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-center gap-2", children: contacts.links.map((link, i) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url,
                dangerouslySetInnerHTML: { __html: link.label },
                className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${link.active ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20" : link.url ? "bg-white text-gray-500 hover:bg-gray-100" : "bg-transparent text-gray-300 pointer-events-none"}`
              },
              i
            )) }),
            contacts.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-24 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-2", children: "No contacts found" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Try adjusting your search or filters." })
            ] })
          ] })
        ] }) }),
        isAddModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[#0B1F2A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-fade-in relative", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setIsAddModalOpen(false), className: "absolute top-8 right-8 text-gray-400 hover:text-black", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#0B1F2A] mb-2 font-heading", children: selectedContact ? "Edit Contact" : "Add New Contact" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-8", children: selectedContact ? "Update contact information" : "Create a new contact manually." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleContactSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Full Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                  placeholder: "e.g. John Doe",
                  value: contactForm.data.name,
                  onChange: (e) => contactForm.setData("name", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Phone Number" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                  placeholder: "e.g. 1234567890",
                  required: true,
                  value: contactForm.data.phone_number,
                  onChange: (e) => contactForm.setData("phone_number", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-2 italic", children: "Include country code without + or 00." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Tags (Comma separated)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                  placeholder: "e.g. customer, lead, priority",
                  value: contactForm.data.tags.join(", "),
                  onChange: (e) => contactForm.setData("tags", e.target.value.split(",").map((t) => t.trim()).filter((t) => t !== ""))
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: contactForm.processing, className: "w-full bg-[#0B1F2A] hover:bg-black text-white py-4 rounded-2xl font-bold shadow-xl shadow-black/10 transition-all flex justify-center items-center gap-2", children: contactForm.processing ? "Saving..." : selectedContact ? "Update Contact" : "Save Contact" })
          ] })
        ] }) }),
        isImportModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[#0B1F2A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-fade-in relative", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setIsImportModalOpen(false), className: "absolute top-8 right-8 text-gray-400 hover:text-black", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#0B1F2A] mb-2 font-heading", children: "Import Contacts" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-8", children: 'Upload a CSV file with "phone", "name", and optional "tags" columns.' }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            post(route("whatsapp.contacts.import"), { data: fd, forceFormData: true, onSuccess: () => setIsImportModalOpen(false) });
          }, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-100 rounded-3xl p-10 text-center hover:border-[#25D366] transition-colors group cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "file", name: "file", className: "hidden", id: "csv_import", required: true }),
              /* @__PURE__ */ jsxs("label", { htmlFor: "csv_import", className: "cursor-pointer", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-all", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4 4v12" }) }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#0B1F2A]", children: "Choose CSV File" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1 uppercase tracking-widest", children: "Max 2MB" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full bg-[#0B1F2A] hover:bg-black text-white py-4 rounded-2xl font-bold shadow-xl shadow-black/10 transition-all flex justify-center items-center gap-2", children: processing ? "Processing..." : "Upload & Start Import" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
  Index as default
};
