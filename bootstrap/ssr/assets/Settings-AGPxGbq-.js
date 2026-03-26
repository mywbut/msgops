import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Settings, Globe, Save, Users, Code, Check, Copy, CreditCard, Shield } from "lucide-react";
import { useState } from "react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
function SettingsPage({ organization, config, team, webhook_url }) {
  const [activeTab, setActiveTab] = useState("general");
  const [copied, setCopied] = useState(false);
  const { data, setData, patch, processing, errors } = useForm({
    name: organization.name || ""
  });
  const copyWebhook = () => {
    navigator.clipboard.writeText(webhook_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const submit = (e) => {
    e.preventDefault();
    patch(route("settings.org.update"));
  };
  const tabs = [
    { id: "general", label: "General Info", icon: /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }) },
    { id: "team", label: "Team Members", icon: /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }) },
    { id: "api", label: "WABA & API", icon: /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" }) },
    { id: "billing", label: "Billing & Plans", icon: /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }) },
    { id: "security", label: "Security", icon: /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }) }
  ];
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Organization Settings" }),
    /* @__PURE__ */ jsx("div", { className: "py-8 px-6 bg-[#F8FAFC] min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-[#0B1F2A] rounded-2xl flex items-center justify-center text-white shadow-xl", children: /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-[#0B1F2A] font-heading tracking-tight", children: "Organization Settings" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium uppercase tracking-widest text-[10px]", children: "Command Center" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: tabs.map((item) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? "bg-white text-[#4F46E5] shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"}`,
            children: [
              item.icon,
              item.label
            ]
          },
          item.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 space-y-8", children: [
          activeTab === "general" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-[#0B1F2A] mb-8 font-heading flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 text-blue-500" }),
              "Business Profile"
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3", children: "Organization Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all",
                    placeholder: "Enter organization name"
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-2 font-bold", children: errors.name })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled: processing,
                  className: "bg-[#0B1F2A] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                    "Save Changes"
                  ]
                }
              ) })
            ] })
          ] }),
          activeTab === "team" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-[#0B1F2A] font-heading flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-indigo-500" }),
                "Team Members"
              ] }),
              /* @__PURE__ */ jsx("button", { className: "bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all", children: "+ Invite Member" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50", children: team.map((member) => /* @__PURE__ */ jsxs("div", { className: "py-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-black text-xs border border-gray-100", children: member.name.charAt(0) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#0B1F2A]", children: member.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold tracking-tight uppercase", children: member.email })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "bg-green-50 text-[#25D366] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100", children: "ADMIN" })
            ] }, member.id)) })
          ] }),
          activeTab === "api" && /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1F2A] rounded-[2rem] shadow-2xl p-8 text-white", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/10 rounded-2xl backdrop-blur-md", children: /* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-[#25D366]" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Inbound Webhook" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "WABA Configuration" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mb-6 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10", children: [
              "Configure this URL in your Meta App Developer Portal under ",
              /* @__PURE__ */ jsx("strong", { children: "WhatsApp > Configuration" }),
              " to receive real-time messages and message status updates into your Team Inbox and CRM."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  readOnly: true,
                  value: webhook_url,
                  className: "w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-xs font-mono text-green-400 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: copyWebhook,
                  className: "absolute right-3 top-3 bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all",
                  children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-[#25D366]" }) : /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          activeTab === "billing" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 text-center", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-16 h-16 text-gray-200 mx-auto mb-6" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-[#0B1F2A] mb-2 font-heading", children: "Plan & Billing" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-sm mx-auto text-sm font-medium mb-8", children: "You are currently on the Free Trial. Upgrade to unlock bulk campaigns and automation." }),
            /* @__PURE__ */ jsx("div", { className: "bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1", children: "Active Plan" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-[#4F46E5]", children: "MsgOps PRO (Trial)" })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("billing.index"),
                  className: "bg-[#4F46E5] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center gap-2",
                  children: "Upgrade"
                }
              )
            ] }) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
  ] });
}
export {
  SettingsPage as default
};
