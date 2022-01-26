import { Link } from "react-router-dom";
import React from "react";
import "./index.css";
function Button({ onClick, children, className, to }) {
  const Component = typeof to === "string" ? Link : "button";
  return (
    <Component to={to} onClick={onClick} className={className}>
      {children}
    </Component>
  );
}
export default Button;
