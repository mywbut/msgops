import { jsx, jsxs } from "react/jsx-runtime";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-DDs2XNYP.js";
import { T as TextInput } from "./TextInput-D0qTZeQv.js";
import { G as GuestLayout } from "./GuestLayout-D_wdbizt.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-[#0B1F2A] font-heading mb-2", children: "Welcome Back" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Please enter your details to sign in to your workspace." })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Work Email", className: "text-gray-700 font-semibold mb-1.5" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
            placeholder: "name@company.com",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "text-gray-700 font-semibold" }),
          canResetPassword && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("password.request"),
              className: "text-xs font-semibold text-[#4F46E5] hover:text-[#25D366] transition-all",
              children: "Forgot password?"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
            placeholder: "••••••••",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between py-2", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            className: "rounded border-gray-200 text-[#25D366] shadow-sm focus:ring-[#25D366]",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-500", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50",
          children: "Sign In"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-50 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("register"),
          className: "font-bold text-[#4F46E5] hover:text-[#25D366] transition-all underline decoration-2 underline-offset-4",
          children: "Start your free trial"
        }
      )
    ] }) })
  ] });
}
export {
  Login as default
};
