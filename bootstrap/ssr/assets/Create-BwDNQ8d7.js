import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function Create({ templates, contacts, tags, isConnected }) {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    template_name: "",
    language: "",
    audience_type: "ALL",
    // ALL, TAGS, INDIVIDUAL
    selected_tags: [],
    selected_contacts: []
  });
  const filteredContacts = contacts.filter(
    (c) => c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone?.includes(searchTerm)
  );
  const submit = (e) => {
    e.preventDefault();
    post(route("whatsapp.campaigns.store"));
  };
  const toggleTag = (tag) => {
    const newTags = data.selected_tags.includes(tag) ? data.selected_tags.filter((t) => t !== tag) : [...data.selected_tags, tag];
    setData("selected_tags", newTags);
  };
  const toggleContact = (id) => {
    const newContacts = data.selected_contacts.includes(id) ? data.selected_contacts.filter((tid) => tid !== id) : [...data.selected_contacts, id];
    setData("selected_contacts", newContacts);
  };
  const getSelectedTemplate = () => templates.find((t) => t.name === data.template_name);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsx(Link, { href: route("whatsapp.campaigns.index"), className: "p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#0B1F2A] font-heading", children: "New Broadcast Campaign" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
          /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${step >= 1 ? "bg-[#25D366]" : "bg-gray-200"}` }),
          /* @__PURE__ */ jsx("div", { className: `w-8 h-0.5 ${step >= 2 ? "bg-[#25D366]" : "bg-gray-200"}` }),
          /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${step >= 2 ? "bg-[#25D366]" : "bg-gray-200"}` }),
          /* @__PURE__ */ jsx("div", { className: `w-8 h-0.5 ${step >= 3 ? "bg-[#25D366]" : "bg-gray-200"}` }),
          /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${step >= 3 ? "bg-[#25D366]" : "bg-gray-200"}` })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Campaign" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-8 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-amber-100 rounded-2xl text-amber-600", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-[#0B1F2A]", children: "WhatsApp is not connected" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center md:text-left", children: "Connect your account first to fetch templates and launch campaigns." })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: route("whatsapp.connect"), className: "px-6 py-2 bg-[#0B1F2A] text-white rounded-xl text-sm font-bold hover:bg-black transition-all", children: "Connect Now" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden", children: [
            step === 1 && /* @__PURE__ */ jsxs("div", { className: "p-10 animate-fade-in", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-8", children: "Step 1: Campaign Details" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Internal Campaign Name" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: "w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                      placeholder: "e.g. Eid Mubarak Broadcast",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      required: true
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Select Message Template" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: templates.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "col-span-2 p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-4", children: "No approved templates found." }),
                    /* @__PURE__ */ jsx(Link, { href: route("whatsapp.templates.create"), className: "text-[#4F46E5] font-bold text-sm hover:underline", children: "Create Template First" })
                  ] }) : templates.map((tpl) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => {
                        setData((prev) => ({ ...prev, template_name: tpl.name, language: tpl.language }));
                      },
                      className: `p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.template_name === tpl.name ? "border-[#25D366] bg-green-50/30" : "border-gray-50 hover:border-gray-200"}`,
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-[#0B1F2A] text-sm mb-1", children: tpl.name }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold", children: tpl.category }),
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400", children: tpl.language })
                        ] })
                      ]
                    },
                    tpl.name
                  )) }),
                  errors.template_name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500", children: errors.template_name })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-end", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setStep(2),
                  disabled: !data.name || !data.template_name,
                  className: "bg-[#0B1F2A] hover:bg-black text-white font-bold py-3.5 px-10 rounded-2xl transition-all disabled:opacity-50 flex items-center gap-2",
                  children: [
                    "Next View: Audience",
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
                  ]
                }
              ) })
            ] }),
            step === 2 && /* @__PURE__ */ jsxs("div", { className: "p-10 animate-fade-in", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-8", children: "Step 2: Choose Audience" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-1.5 bg-gray-50 rounded-2xl mb-10 overflow-x-auto", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setData("audience_type", "ALL"),
                    className: `px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === "ALL" ? "bg-white text-[#25D366] shadow-sm shadow-black/5" : "text-gray-400 hover:text-gray-600"}`,
                    children: [
                      "All Contacts (",
                      contacts.length,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setData("audience_type", "TAGS"),
                    className: `px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === "TAGS" ? "bg-white text-[#25D366] shadow-sm shadow-black/5" : "text-gray-400 hover:text-gray-600"}`,
                    children: "Select by Tags"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setData("audience_type", "INDIVIDUAL"),
                    className: `px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${data.audience_type === "INDIVIDUAL" ? "bg-white text-[#25D366] shadow-sm shadow-black/5" : "text-gray-400 hover:text-gray-600"}`,
                    children: "Select Individuals"
                  }
                )
              ] }),
              data.audience_type === "TAGS" && /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4", children: "Select Target Tags" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  tags.map((tag) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleTag(tag),
                      className: `px-4 py-2 rounded-xl text-xs font-bold border transition-all ${data.selected_tags.includes(tag) ? "bg-[#4F46E5] text-white border-[#4F46E5] shadow-lg shadow-[#4F46E5]/20" : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"}`,
                      children: [
                        "#",
                        tag
                      ]
                    },
                    tag
                  )),
                  tags.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "No tags found in your contact list." })
                ] })
              ] }),
              data.audience_type === "INDIVIDUAL" && /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search contacts...",
                    className: "w-full border-gray-100 bg-gray-50 rounded-2xl px-5 py-3 text-sm mb-4",
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto border border-gray-50 rounded-2xl divide-y divide-gray-50 bg-gray-50/30", children: filteredContacts.map((contact) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    onClick: () => toggleContact(contact.id),
                    className: "p-4 flex items-center justify-between cursor-pointer hover:bg-white transition-all",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded border flex items-center justify-center transition-all ${data.selected_contacts.includes(contact.id) ? "bg-[#25D366] border-[#25D366]" : "border-gray-200 bg-white"}`, children: data.selected_contacts.includes(contact.id) && /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-[#0B1F2A]", children: contact.name }),
                        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400", children: [
                          "+",
                          contact.phone
                        ] })
                      ] })
                    ] })
                  },
                  contact.id
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-12 flex justify-between", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setStep(1), className: "text-gray-400 hover:text-[#0B1F2A] text-sm font-bold transition-all", children: "Back to Basics" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setStep(3),
                    className: "bg-[#0B1F2A] hover:bg-black text-white font-bold py-3.5 px-10 rounded-2xl transition-all flex items-center gap-2",
                    children: [
                      "Final Step: Review",
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
                    ]
                  }
                )
              ] })
            ] }),
            step === 3 && /* @__PURE__ */ jsxs("div", { className: "p-10 animate-fade-in", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-8", children: "Step 3: Review & Send" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[2.5rem]", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Campaign Name" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#0B1F2A]", children: data.name })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Template" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-[#0B1F2A]", children: [
                      data.template_name,
                      " (",
                      data.language,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Target Audience" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-[#0B1F2A]", children: [
                      data.audience_type === "ALL" && `All Contacts (${contacts.length})`,
                      data.audience_type === "TAGS" && `Tagged: ${data.selected_tags.join(", ")}`,
                      data.audience_type === "INDIVIDUAL" && `${data.selected_contacts.length} Selected Contacts`
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Estimated Cost" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#25D366]", children: "Standard Unit Cost" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-2 border-dashed border-[#25D366]/20 bg-green-50/20 rounded-3xl", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-[#25D366] uppercase tracking-widest mb-4", children: "Message Preview" }),
                  /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-[85%]", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 leading-relaxed whitespace-pre-wrap", children: getSelectedTemplate()?.components?.find((c) => c.type === "BODY")?.text || "No preview available for this template." }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-12 flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setStep(2), className: "text-gray-400 hover:text-[#0B1F2A] text-sm font-bold transition-all", children: "Edit Audience" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: submit,
                    disabled: processing,
                    className: "bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-12 rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all transform hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50",
                    children: [
                      processing && /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                      ] }),
                      "Launch Broadcast Now"
                    ]
                  }
                )
              ] })
            ] })
          ] })
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
  Create as default
};
