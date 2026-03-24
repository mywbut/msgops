import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "react";
function Create({ isConnected, flashError }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    category: "MARKETING",
    language: "en_US",
    body: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("whatsapp.templates.store"));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: route("whatsapp.templates.index"), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", children: "← Back" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Create New Template" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "New WhatsApp Template" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl sm:px-6 lg:px-8", children: [
          flashError && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200", children: flashError }),
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "You must connect your WhatsApp Business Account before creating templates." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Template Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "name",
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  placeholder: "e.g. summer_sale_promo",
                  disabled: !isConnected || processing,
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Lowercase letters, numbers, and underscores only." }),
              errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Category" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "category",
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                    disabled: !isConnected || processing,
                    value: data.category,
                    onChange: (e) => setData("category", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "MARKETING", children: "Marketing (Promos, Offers)" }),
                      /* @__PURE__ */ jsx("option", { value: "UTILITY", children: "Utility (Updates, Reminders)" }),
                      /* @__PURE__ */ jsx("option", { value: "AUTHENTICATION", children: "Authentication (OTPs)" })
                    ]
                  }
                ),
                errors.category && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "language", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Language" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "language",
                    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                    disabled: !isConnected || processing,
                    value: data.language,
                    onChange: (e) => setData("language", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "en_US", children: "English (US)" }),
                      /* @__PURE__ */ jsx("option", { value: "en_GB", children: "English (UK)" }),
                      /* @__PURE__ */ jsx("option", { value: "es", children: "Spanish" }),
                      /* @__PURE__ */ jsx("option", { value: "pt_BR", children: "Portuguese (BR)" }),
                      /* @__PURE__ */ jsx("option", { value: "hi", children: "Hindi" })
                    ]
                  }
                ),
                errors.language && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.language })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "body", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Message Text Body" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "body",
                  rows: 5,
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                  placeholder: "Type your template message here...",
                  disabled: !isConnected || processing,
                  value: data.body,
                  onChange: (e) => setData("body", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Variables like ((1)), ((2)) are not supported in this text-only builder." }),
              errors.body && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.body })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: !isConnected || processing,
                className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-2 px-6 rounded shadow transition duration-200 disabled:opacity-50",
                children: processing ? "Submitting to Meta..." : "Submit Template"
              }
            ) })
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
