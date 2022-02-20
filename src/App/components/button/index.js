import { Link } from "react-router-dom";
import React from "react";
import "./index.css";
function Button({ onClick, children, className, to, onMouseOver }) {
  const newClass = "buttonComponent " + className;
  const Component = to ? Link : "button";
  return (
    <Component
      onMouseOver={onMouseOver}
      to={to}
      onClick={onClick}
      className={newClass}
    >
      {children}
    </Component>
  );
}
export default Button;
