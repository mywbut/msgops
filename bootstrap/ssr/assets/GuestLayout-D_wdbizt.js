import { jsxs, jsx } from "react/jsx-runtime";
import { A as ApplicationLogo } from "./ApplicationLogo-xMpxFOcX.js";
import { Link } from "@inertiajs/react";
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-[#F8FAFC] font-sans text-[#111827]", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:w-1/2 bg-[#0B1F2A] flex-col justify-between p-12 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-16 h-16 fill-[#25D366]" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold text-white mt-12 mb-6 font-heading leading-tight", children: [
          "The World's Most ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#25D366]", children: "Popular WhatsApp" }),
          " ",
          /* @__PURE__ */ jsx("br", {}),
          "Marketing Platform."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg max-w-md", children: "Join 8,000+ businesses globally to scale your customer engagement with automated broadcasts and real-time support." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex -space-x-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "w-8 h-8 rounded-full border-2 border-[#0B1F2A] bg-gray-600 flex items-center justify-center text-[10px] text-white font-bold", children: [
          "U",
          i
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "4.8/5" }),
          " from over ",
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "1,200" }),
          " reviews"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#25D366]/10 rounded-full blur-3xl opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-[#4F46E5]/10 rounded-full blur-3xl opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-24 opacity-20 pointer-events-none", children: /* @__PURE__ */ jsxs("svg", { width: "400", height: "400", viewBox: "0 0 400 400", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "150", stroke: "#25D366", strokeWidth: "1", strokeDasharray: "10 10" }),
        /* @__PURE__ */ jsx("rect", { x: "150", y: "150", width: "100", height: "100", rx: "20", stroke: "#25D366", strokeWidth: "2" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:hidden mb-8 flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-12 h-12 fill-[#25D366]" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100", children }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-xs text-gray-400", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " msgops.in. All rights reserved."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
  ] });
}
export {
  GuestLayout as G
};
