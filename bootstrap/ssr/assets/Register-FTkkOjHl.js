import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-DDs2XNYP.js";
import { T as TextInput } from "./TextInput-D0qTZeQv.js";
import { G as GuestLayout } from "./GuestLayout-VLdB-mLJ.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-B20psbHM.js";
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Start Free Trial" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-[#0B1F2A] font-heading mb-2", children: "Create Account" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Start your 7-day free trial. No credit card required." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Full Name", className: "text-gray-700 font-semibold mb-1.5" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
            placeholder: "John Doe",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
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
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Mobile Number", className: "text-gray-700 font-semibold mb-1.5" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "phone",
            type: "tel",
            name: "phone",
            value: data.phone,
            className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
            placeholder: "+1 234 567 8900",
            onChange: (e) => setData("phone", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "text-gray-700 font-semibold mb-1.5" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
              placeholder: "••••••••",
              autoComplete: "new-password",
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "password_confirmation",
              value: "Confirm",
              className: "text-gray-700 font-semibold mb-1.5"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              type: "password",
              name: "password_confirmation",
              value: data.password_confirmation,
              className: "w-full border-gray-100 bg-gray-50 rounded-xl px-4 py-3 placeholder:text-gray-300 focus:ring-2 focus:ring-[#25D366] transition-all",
              placeholder: "••••••••",
              autoComplete: "new-password",
              onChange: (e) => setData("password_confirmation", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password_confirmation,
              className: "mt-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50",
          children: "Create My Account"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-gray-50 text-center text-xs text-gray-400", children: [
      'By clicking "Create My Account", you agree to our ',
      /* @__PURE__ */ jsx(Link, { href: "#", className: "underline", children: "Terms of Service" }),
      " and ",
      /* @__PURE__ */ jsx(Link, { href: "#", className: "underline", children: "Privacy Policy" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("login"),
          className: "font-bold text-[#25D366] hover:text-[#128C7E] transition-all underline decoration-2 underline-offset-4",
          children: "Sign in instead"
        }
      )
    ] }) })
  ] });
}
export {
  Register as default
};
