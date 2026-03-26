import { jsx } from "react/jsx-runtime";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      ...props,
      src: "/images/logo.png",
      alt: "MsgOps Logo",
      className: `${props.className} object-contain`
    }
  );
}
export {
  ApplicationLogo as A
};
