import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import RegistrationContext from "../../../context/RegistrationContext";
import Button from "../button";
function RegForm() {
  const { email, setEmail, password, setPassword, plan, setPlan } =
    useContext(RegistrationContext);
  return (
    <>
      <div className="inputWrapper">
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="login_form__input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="login_form__input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="password1"
          required
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="password">Repeat Password</label>
        <br />
        <input
          className="login_form__input"
          onChange={(e) => setPassword(e.target.value)}
          value={""}
          type="text"
          name="password"
          id="password2"
          required
        />
      </div>
    </>
  );
}
export default RegForm;
