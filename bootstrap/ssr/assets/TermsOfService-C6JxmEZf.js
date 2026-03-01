import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
function TermsOfService() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(Head, { title: "Terms of Service" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 sm:p-12 overflow-hidden border border-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-10 border-b border-gray-100 pb-6", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/", className: "text-indigo-600 hover:text-indigo-500 font-bold text-2xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("svg", { className: "w-8 h-8", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ jsx("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            /* @__PURE__ */ jsx("path", { d: "M7 12L12 7L17 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7V17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
          ] }),
          "MsgOps"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 font-medium tracking-wider uppercase", children: "Terms & Conditions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-indigo max-w-none text-gray-600", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-gray-900 mb-8 leading-tight", children: "Terms of Service" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg leading-relaxed mb-8", children: [
          "Welcome to ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "MsgOps" }),
          "! These terms and conditions outline the rules and regulations for the use of MsgOps's Website and Platform."
        ] }),
        /* @__PURE__ */ jsx("section", { className: "mb-10 text-gray-600", children: /* @__PURE__ */ jsx("p", { className: "mb-4 italic bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 text-indigo-900", children: "By accessing this website we assume you accept these terms and conditions. Do not continue to use MsgOps if you do not agree to take all of the terms and conditions stated on this page." }) }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4", children: "1. License" }),
          /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Unless otherwise stated, MsgOps and/or its licensors own the intellectual property rights for all material on MsgOps. All intellectual property rights are reserved." }),
          /* @__PURE__ */ jsx("p", { children: "You must not:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 mt-4", children: [
            /* @__PURE__ */ jsx("li", { children: "Republish material from MsgOps" }),
            /* @__PURE__ */ jsx("li", { children: "Sell, rent or sub-license material from MsgOps" }),
            /* @__PURE__ */ jsx("li", { children: "Reproduce, duplicate or copy material from MsgOps" }),
            /* @__PURE__ */ jsx("li", { children: "Redistribute content from MsgOps" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4", children: "2. Use of WhatsApp API" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
            "Our platform integrates with Meta's WhatsApp Business API. You agree to comply with all ",
            /* @__PURE__ */ jsx("a", { href: "https://www.whatsapp.com/legal/business-policy/", className: "text-indigo-600 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "WhatsApp Business Policies" }),
            " and ",
            /* @__PURE__ */ jsx("a", { href: "https://developers.facebook.com/terms/", className: "text-indigo-600 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "Meta Developer Terms" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Misuse of the platform for spamming or violating WhatsApp's policies may lead to immediate termination of your account." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4", children: "3. Termination" }),
          /* @__PURE__ */ jsx("p", { children: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-500 pl-4", children: "4. Governing Law" }),
          /* @__PURE__ */ jsx("p", { children: "These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx(Link, { href: "/data-deletion", className: "text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors", children: "Data Deletion" }),
        /* @__PURE__ */ jsx(Link, { href: "/", className: "text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors ml-auto", children: "Back to Home" })
      ] })
    ] })
  ] });
}
export {
  TermsOfService as default
};
