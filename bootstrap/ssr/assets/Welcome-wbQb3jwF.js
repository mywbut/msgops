import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function Welcome({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-gray-900 font-sans", children: [
    /* @__PURE__ */ jsx(Head, { title: "MsgOps - WhatsApp Automation SaaS" }),
    /* @__PURE__ */ jsxs("nav", { className: "max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-indigo-600 font-bold text-2xl", children: [
        /* @__PURE__ */ jsxs("svg", { className: "w-10 h-10", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", fill: "currentColor", fillOpacity: "0.1", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M7 12L12 7L17 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M12 7V17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        "MsgOps"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6", children: auth.user ? /* @__PURE__ */ jsx(Link, { href: route("dashboard"), className: "text-gray-600 hover:text-indigo-600 font-medium transition-colors", children: "Dashboard" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-gray-600 hover:text-indigo-600 font-medium transition-colors", children: "Log in" }),
        /* @__PURE__ */ jsx(Link, { href: route("register"), className: "bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200", children: "Get Started" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-20 pb-32 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full", children: "WhatsApp Automation Made Simple" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight max-w-4xl mx-auto", children: [
          "Automate Conversations. ",
          /* @__PURE__ */ jsx("span", { className: "text-indigo-600", children: "Drive Growth." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed", children: "MsgOps is the all-in-one SaaS platform to scale your business on WhatsApp. Manage support, run broadcast campaigns, and automate replies effortlessly." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { href: route("register"), className: "bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2", children: [
            "Start Your Free Trial",
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#features", className: "bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2", children: "See How it Works" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full -z-10 opacity-20 blur-[100px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Powerful Features to Grow Your Business" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Everything you need to turn WhatsApp into your most effective customer engagement channel." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Smart Shared Inbox" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Collaborate with your team in a single place. Manage all WhatsApp conversations efficiently with multi-user access." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Broadcast Campaigns" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Send marketing messages, alerts, and updates to thousands of customers at once while staying compliant with Meta policies." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Automation Builder" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Set up intelligent auto-replies and flows. Provide 24/7 instant responses even when your team is offline." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-gray-100 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-4 gap-12 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-indigo-600 font-bold text-2xl mb-6", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-8 h-8", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsx("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", fill: "currentColor", fillOpacity: "0.1", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ jsx("path", { d: "M7 12L12 7L17 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ jsx("path", { d: "M12 7V17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            ] }),
            "MsgOps"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-sm leading-relaxed", children: "Empowering businesses to connect, engage, and grow with the world's most powerful WhatsApp automation tools." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest", children: "Platform" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-500 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("login"), className: "hover:text-indigo-600 transition-colors", children: "Login" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("register"), className: "hover:text-indigo-600 transition-colors", children: "Create Account" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-indigo-600 transition-colors text-gray-500", children: "Features" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-6 uppercase text-sm tracking-widest", children: "Legal" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-500 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("privacy.policy"), className: "hover:text-indigo-600 transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("terms"), className: "hover:text-indigo-600 transition-colors", children: "Terms of Service" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("data.deletion"), className: "hover:text-indigo-600 transition-colors", children: "Data Deletion" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm italic", children: "© 2026 MsgOps. All rights reserved." }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm", children: "Built with ❤️ for Businesses" })
      ] })
    ] }) })
  ] });
}
export {
  Welcome as default
};
