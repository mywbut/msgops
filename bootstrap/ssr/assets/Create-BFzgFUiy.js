import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function Create({ isConnected, flashError }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    category: "MARKETING",
    language: "en_US",
    header_type: "NONE",
    header_text: "",
    body: "",
    footer: "",
    buttons: []
    // { type: 'QUICK_REPLY', text: '' }
  });
  const [activeTab, setActiveTab] = useState("content");
  const submit = (e) => {
    e.preventDefault();
    post(route("whatsapp.templates.store"));
  };
  const addButton = () => {
    if (data.buttons.length < 3) {
      setData("buttons", [...data.buttons, { type: "QUICK_REPLY", text: "" }]);
    }
  };
  const removeButton = (index) => {
    const newButtons = [...data.buttons];
    newButtons.splice(index, 1);
    setData("buttons", newButtons);
  };
  const updateButtonText = (index, text) => {
    const newButtons = [...data.buttons];
    newButtons[index].text = text;
    setData("buttons", newButtons);
  };
  const WhatsAppMockup = () => {
    return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl", children: [
      /* @__PURE__ */ jsx("div", { className: "h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" }),
      /* @__PURE__ */ jsx("div", { className: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" }),
      /* @__PURE__ */ jsx("div", { className: "h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" }),
      /* @__PURE__ */ jsx("div", { className: "h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] overflow-hidden w-full h-full bg-[#E5DDD5] flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-[#075E54] p-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gray-300" }),
          /* @__PURE__ */ jsxs("div", { className: "text-white text-xs font-bold leading-tight", children: [
            "Business Account",
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-normal opacity-80", children: "Online" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 p-3 overflow-y-auto space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm p-0 overflow-hidden max-w-[90%] relative", children: [
            data.header_type === "TEXT" && data.header_text && /* @__PURE__ */ jsx("div", { className: "px-3 py-2 font-bold text-sm border-b border-gray-50", children: data.header_text }),
            /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap", children: data.body || "Type your message body..." }),
            data.footer && /* @__PURE__ */ jsx("div", { className: "px-3 pb-2 text-[10px] text-gray-400", children: data.footer })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1 w-[90%] mx-auto", children: data.buttons.map((btn, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-white text-[#00a5f4] text-xs font-semibold py-2.5 rounded-lg shadow-sm text-center border-t border-gray-100 flex items-center justify-center gap-2", children: [
            btn.type === "QUICK_REPLY" && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" }) }),
            btn.text || "Button text"
          ] }, idx)) })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white py-4 px-6 border-b border-gray-100", children: [
        /* @__PURE__ */ jsx(Link, { href: route("whatsapp.templates.index"), className: "p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#0B1F2A] font-heading", children: "Template Builder" }),
        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-indigo-50 text-[#4F46E5] text-[10px] font-bold rounded border border-indigo-100 uppercase tracking-widest", children: "BETA" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Template" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 px-6", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 flex gap-8", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("content"),
                  className: `pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === "content" ? "border-[#25D366] text-[#25D366]" : "border-transparent text-gray-400 hover:text-gray-600"}`,
                  children: "1. Content Builder"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("buttons"),
                  className: `pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === "buttons" ? "border-[#25D366] text-[#25D366]" : "border-transparent text-gray-400 hover:text-gray-600"}`,
                  children: "2. Interactive Buttons"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-8", children: activeTab === "content" ? /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Template Name" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                      placeholder: "e.g. order_confirmation",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] text-gray-400", children: "Only lowercase letters, numbers and underscores allowed." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Category" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                      value: data.category,
                      onChange: (e) => setData("category", e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "MARKETING", children: "Marketing" }),
                        /* @__PURE__ */ jsx("option", { value: "UTILITY", children: "Utility" }),
                        /* @__PURE__ */ jsx("option", { value: "AUTHENTICATION", children: "Authentication" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Header (Optional)" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("header_type", "NONE"),
                      className: `px-4 py-2 text-xs font-bold rounded-lg border transition-all ${data.header_type === "NONE" ? "bg-[#0B1F2A] text-white border-[#0B1F2A]" : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"}`,
                      children: "None"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("header_type", "TEXT"),
                      className: `px-4 py-2 text-xs font-bold rounded-lg border transition-all ${data.header_type === "TEXT" ? "bg-[#0B1F2A] text-white border-[#0B1F2A]" : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"}`,
                      children: "Text Header"
                    }
                  )
                ] }),
                data.header_type === "TEXT" && /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                    placeholder: "Enter header text...",
                    value: data.header_text,
                    onChange: (e) => setData("header_text", e.target.value),
                    maxLength: 60
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Message Body" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#25D366]", children: "REQUIRED" })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 6,
                    className: "w-full border-gray-100 bg-gray-50 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-[#25D366] transition-all resize-none",
                    placeholder: "Hello {{1}}, your order {{2}} has been shipped!",
                    value: data.body,
                    onChange: (e) => setData("body", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[10px] text-gray-400", children: [
                  "To add variables, use double curly braces like ",
                  /* @__PURE__ */ jsx("span", { className: "text-[#4F46E5] font-bold", children: "{{1}}" }),
                  ", ",
                  /* @__PURE__ */ jsx("span", { className: "text-[#4F46E5] font-bold", children: "{{2}}" }),
                  " etc."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Footer (Optional)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#25D366] transition-all",
                    placeholder: "Enter footer text...",
                    value: data.footer,
                    onChange: (e) => setData("footer", e.target.value),
                    maxLength: 60
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-indigo-50 border border-indigo-100 rounded-2xl", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-[#4F46E5] mb-1", children: "About Buttons" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-600/80 leading-relaxed", children: "Interactive buttons allow your customers to take action quickly. You can add up to 3 Quick Reply buttons per template." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                data.buttons.map((btn, index) => /* @__PURE__ */ jsx("div", { className: "flex gap-4 items-center animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100", children: index + 1 }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: "bg-transparent border-none focus:ring-0 text-sm p-0 w-full",
                        placeholder: "Button label...",
                        value: btn.text,
                        onChange: (e) => updateButtonText(index, e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeButton(index),
                      className: "text-gray-300 hover:text-red-500 transition-all",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
                    }
                  )
                ] }) }, index)),
                data.buttons.length < 3 && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: addButton,
                    className: "w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-xs font-bold hover:border-[#25D366] hover:text-[#25D366] transition-all flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
                      "Add Quick Reply Button"
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "p-8 bg-gray-50 border-t border-gray-100 flex justify-end", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: submit,
                disabled: !isConnected || processing,
                className: "bg-[#0B1F2A] hover:bg-black text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-black/10 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 disabled:opacity-50",
                children: [
                  processing && /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "Submit to Meta"
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:w-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-8", children: [
            /* @__PURE__ */ jsx("div", { className: "text-center mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200", children: "Live Mobile Preview" }) }),
            /* @__PURE__ */ jsx(WhatsAppMockup, {}),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("h5", { className: "text-xs font-bold text-[#0B1F2A] uppercase tracking-wider mb-2", children: "Meta Submission Notice" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 leading-relaxed", children: [
                "Templates sent to Meta typically take 2-24 hours for approval. Once approved, the status in your dashboard will update to ",
                /* @__PURE__ */ jsx("span", { className: "text-[#25D366] font-bold uppercase", children: "Approved" }),
                "."
              ] })
            ] })
          ] }) })
        ] }) }) }),
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
