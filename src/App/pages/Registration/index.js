import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import { useContext } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import RegForm from "../../components/create-user";
import fetchAPI from "../../fetchAPI";
import PickPlan from "../../components/pickPlan";
import GetMoviesContext from "../../../context/GetMoviesContext";
import "./index.css";
import RegistrationContext from "../../../context/RegistrationContext";

function Regitration() {
  const navigate = useNavigate();
  const { setLoad } = useContext(GetMoviesContext);
  const { token, setToken } = useContext(AuthContext);
  const {
    email,
    setEmail,
    password,
    setPassword,
    plan,
    setPlan,
    setError,
    error,
    password2,
    setPassword2,
  } = useContext(RegistrationContext);
  const [selection, setSelection] = useState("create");
  const toPlans = (next) => {
    if (email.length && password.length && password2 === password) {
      setSelection(next);
      setError(null);
    }
    if (password2 !== password) {
      setError("Password Mismatch");
    }
  };
  const toPayment = (next) => {
    if (!plan) {
      setError("Please select plan");
    } else {
      setSelection(next);
      setError(null);
    }
  };
  const postReg = async () => {
    console.log("worked");
    try {
      const response = await fetchAPI.postData(
        "https://academy-video-api.herokuapp.com/auth/signup",
        {
          username: email,
          password: password,
          planId: plan,
        }
      );
      const data = await response;
      if (data.token) {
        setToken(data.token);
        setEmail("");
        setPassword("");
        setPassword2("");
        setPlan("");
        setLoad(true);
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  });
  return (
    <>
      {!token && (
        <div className="formWrapper">
          <section className="regSections">
            <div
              onClick={() => setSelection("create")}
              className={selection === "create" ? "selected" : ""}
            >
              Create User
            </div>
            <div
              onClick={() => setSelection("plan")}
              className={selection === "plan" ? "selected" : ""}
            >
              Pick a Plan
            </div>
            <div
              onClick={() => setSelection("payment")}
              className={selection === "payment" ? "selected" : ""}
            >
              Payment
            </div>
          </section>

          <form
            className="registration-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="regWrapper">
              {selection === "create" && <RegForm />}
              {selection === "plan" && <PickPlan />}
            </div>
            {error && <p className="error">{error}</p>}
            {selection === "create" && (
              <Button onClick={() => toPlans("plan")}>Continue</Button>
            )}
            {selection === "plan" && (
              <Button onClick={() => toPayment("payment")}>Continue</Button>
            )}
            {selection === "payment" && <Button onClick={postReg}>Next</Button>}
          </form>
        </div>
      )}
    </>
  );
}
export default Regitration;
