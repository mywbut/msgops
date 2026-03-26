import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BJmZ81Ej.js";
import { Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell } from "recharts";
import { Zap, Users, MessageSquare, CheckCircle, AlertCircle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import "./ApplicationLogo-B20psbHM.js";
import "@headlessui/react";
import "react";
function Dashboard({ isConnected = false, stats = {}, chartData = [], recentCampaigns = [], waba_status = "Disconnected" }) {
  const COLORS = ["#25D366", "#3b82f6", "#4F46E5", "#ef4444"];
  const safeStats = {
    total_contacts: stats?.total_contacts ?? 0,
    total_messages: stats?.total_messages ?? 0,
    sent: stats?.sent ?? 0,
    delivered: stats?.delivered ?? 0,
    read: stats?.read ?? 0,
    failed: stats?.failed ?? 0
  };
  const pieData = [
    { name: "Delivered", value: safeStats.delivered },
    { name: "Read", value: safeStats.read },
    { name: "Sent", value: safeStats.sent },
    { name: "Failed", value: safeStats.failed }
  ].filter((item) => item.value > 0);
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Premium Analytics Dashboard" }),
    /* @__PURE__ */ jsx("div", { className: "py-8 px-6 bg-[#F8FAFC] min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-[#0B1F2A] font-heading tracking-tight", children: "Analytics Dashboard" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium", children: "Real-time performance metrics for your organization" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: `px-4 py-2 rounded-xl flex items-center gap-2 border ${isConnected ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"} text-xs font-bold uppercase transition-all shadow-sm`, children: [
            /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${isConnected ? "bg-[#25D366] animate-pulse" : "bg-red-500"}` }),
            waba_status || (isConnected ? "API Connected" : "Disconnected")
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("whatsapp.campaigns.create"),
              className: "bg-[#4F46E5] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-all flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4" }),
                "NEW CAMPAIGN"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        { label: "Total Contacts", val: safeStats.total_contacts, icon: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }), color: "bg-blue-500", trend: "+12%" },
        { label: "Total Messages", val: safeStats.total_messages, icon: /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5" }), color: "bg-indigo-500", trend: "+8%" },
        { label: "Delivery Rate", val: safeStats.total_messages > 0 ? Math.round(safeStats.delivered / safeStats.total_messages * 100) : 0, icon: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }), color: "bg-[#25D366]", suffix: "%" },
        { label: "Failed Rate", val: safeStats.total_messages > 0 ? Math.round(safeStats.failed / safeStats.total_messages * 100) : 0, icon: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }), color: "bg-red-500", suffix: "%" }
      ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all group", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-3 rounded-2xl ${stat.color} text-white shadow-lg`, children: stat.icon }),
          stat.trend && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[#25D366] text-[10px] font-bold bg-green-50 px-2 py-1 rounded-full", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }),
            stat.trend
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1", children: stat.label }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#0B1F2A]", children: stat.val }),
          stat.suffix && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400", children: stat.suffix })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1F2A]", children: "Messaging Volume" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-medium", children: "Daily outbound traffic for last 7 days" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-gray-400", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Last 7 Days" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-[300px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "colorCount", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#4F46E5", stopOpacity: 0.1 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#4F46E5", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#F1F5F9" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "date",
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94A3B8", fontSize: 10, fontWeight: 600 },
                dy: 10
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                axisLine: false,
                tickLine: false,
                tick: { fill: "#94A3B8", fontSize: 10, fontWeight: 600 }
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: { borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", padding: "12px" },
                itemStyle: { fontSize: "12px", fontWeight: "bold" }
              }
            ),
            /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "count", stroke: "#4F46E5", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorCount)" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1F2A] self-start mb-6", children: "Delivery Breakdown" }),
          /* @__PURE__ */ jsxs("div", { className: "h-[250px] w-full relative", children: [
            /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(
                Pie,
                {
                  data: pieData,
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 5,
                  dataKey: "value",
                  children: pieData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, {})
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#0B1F2A]", children: safeStats.delivered + safeStats.sent + safeStats.failed }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "Total" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 w-full mt-4", children: pieData.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: COLORS[i % COLORS.length] } }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-500 uppercase", children: item.name })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1F2A]", children: "Recent Campaigns" }),
            /* @__PURE__ */ jsxs(Link, { href: route("whatsapp.campaigns.index"), className: "text-xs font-bold text-[#4F46E5] hover:underline transition-all flex items-center gap-1", children: [
              "View All ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50", children: recentCampaigns.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-gray-400 text-sm", children: "No campaigns sent yet." }) : recentCampaigns.map((camp) => /* @__PURE__ */ jsxs("div", { className: "p-6 flex items-center justify-between hover:bg-gray-50 transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${camp.status === "COMPLETED" ? "bg-[#25D366]" : "bg-indigo-500"}`, children: camp.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#0B1F2A]", children: camp.name }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-widest", children: camp.template_name })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-800", children: [
                camp.sent_count,
                " Sent"
              ] }),
              /* @__PURE__ */ jsx("p", { className: `text-[10px] font-bold uppercase tracking-widest ${camp.status === "COMPLETED" ? "text-[#25D366]" : "text-indigo-500"}`, children: camp.status })
            ] })
          ] }, camp.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1F2A] rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/10 p-4 rounded-2xl backdrop-blur-md", children: /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-[#25D366]" }) }),
              /* @__PURE__ */ jsx("span", { className: "bg-[#25D366] text-[#0B1F2A] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", children: "PRO PLAN" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 font-heading leading-tight underline underline-offset-8 decoration-[#25D366]", children: "Power your growth with MsgOps Pro" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 font-medium mb-8 leading-relaxed max-w-sm", children: "Unlock smart automation, multi-agent inbox, and white-labeled customer support today." }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route("billing.index"),
                className: "w-full bg-white text-[#0B1F2A] py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center block",
                children: "UPGRADE ACCOUNT"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -right-20 w-64 h-64 bg-[#25D366] rounded-full mix-blend-screen filter blur-[100px] opacity-10 group-hover:opacity-20 transition-all duration-700" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;900&display=swap');
                .font-heading { font-family: 'Poppins', sans-serif; }
                body { font-family: 'Inter', sans-serif; }
            ` } })
  ] });
}
export {
  Dashboard as default
};
