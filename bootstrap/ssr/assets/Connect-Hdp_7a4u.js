import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DK4QHw_4.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Connect() {
  const {
    metaAppId,
    metaConfigId,
    isConnected,
    phoneNumberId,
    businessName,
    businessId,
    wabaName,
    wabaId,
    phoneNumber,
    phoneStatus,
    flashError,
    flashSuccess
  } = usePage().props;
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (flashError) {
      setStatus(flashError);
      setIsError(true);
    } else if (flashSuccess) {
      setStatus(flashSuccess);
      setIsError(false);
    }
  }, [flashError, flashSuccess]);
  const launchWhatsAppSignup = () => {
    setStatus("Redirecting to Facebook...");
    setIsError(false);
    const stateStr = "token_" + Math.random().toString(36).substring(7);
    const redirectUri = encodeURIComponent(window.location.origin + "/whatsapp/connect");
    const qs = `client_id=${metaAppId}&redirect_uri=${redirectUri}&response_type=code&config_id=${metaConfigId}&state=${stateStr}&override_default_response_type=true`;
    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?${qs}`;
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "WhatsApp Integrations" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Connect WhatsApp" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: isConnected ? /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-green-500 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6", children: "WhatsApp Connected!" }),
          /* @__PURE__ */ jsxs("div", { className: "text-left bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8 max-w-md mx-auto space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-600 pb-1", children: "Business Information" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Name:" }),
                  " ",
                  businessName
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Business ID:" }),
                  " ",
                  businessId
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-600 pb-1", children: "WhatsApp Business Account" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "WABA ID:" }),
                  " ",
                  wabaId
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Account Name:" }),
                  " ",
                  wabaName
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-gray-600 pb-1", children: "Phone Number" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Number:" }),
                  " ",
                  phoneNumber
                ] }),
                /* @__PURE__ */ jsxs("li", { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Phone ID:" }),
                  " ",
                  phoneNumberId
                ] }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("span", { className: "font-medium flex items-center gap-2", children: [
                  "Status: ",
                  /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs", children: phoneStatus })
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("whatsapp.disconnect"),
              method: "delete",
              as: "button",
              className: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow transition duration-200",
              children: "Disconnect Account"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto text-center py-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Connect WhatsApp Business" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-400", children: "Link your Meta Business Account to start sending automated replies, campaigns, and managing your CRM." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: launchWhatsAppSignup,
              className: "bg-[#1877F2] hover:bg-[#0c63d4] text-white font-bold py-3 px-6 rounded shadow transition duration-200 w-full flex items-center justify-center gap-2 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }),
                "Continue with Facebook"
              ]
            }
          ),
          status && /* @__PURE__ */ jsx("div", { className: `mt-4 p-4 rounded ${isError ? "bg-red-900/50 text-red-200" : "bg-blue-900/50 text-blue-200"}`, children: status })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Connect as default
};
