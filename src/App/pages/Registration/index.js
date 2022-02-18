import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/button";
import { useContext } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import RegForm from "../../components/create-user";
import fetchAPI from "../../fetchAPI";
import PickPlan from "../../components/pickPlan";
import "./index.css";
import RegistrationContext from "../../../context/RegistrationContext";

function Regitration() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const { email, setEmail, password, setPassword, plan, setPlan } =
    useContext(RegistrationContext);
  const [selection, setSelection] = useState("create");
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
      console.log(data);
      if (data.token) {
        console.log("worked");
        setToken(data.token);
        setEmail("");
        setPassword("");
        setPlan("");
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
            {selection === "create" && (
              <Button onClick={() => setSelection("plan")}>Continue</Button>
            )}
            {selection === "plan" && (
              <Button onClick={() => setSelection("payment")}>Continue</Button>
            )}
            {selection === "payment" && <Button onClick={postReg}>Next</Button>}
          </form>
        </div>
      )}
    </>
  );
}
export default Regitration;
