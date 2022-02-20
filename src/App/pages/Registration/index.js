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
import Form from "../../components/form";
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
    if (!email || !password) {
      console.log("works");
      setError("Enter Email and Password");
    }
    if (password2 !== password) {
      setError("Password Mismatch");
    }
  };
  const toPayment = (next) => {
    if (!plan) {
      setError("Please Select a Subscription Plan");
    } else {
      setSelection(next);
      setError(null);
    }
  };
  const isSelected = (selected) => {
    return selection === selected ? "selected" : "";
  };
  const postReg = async () => {
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
        setToken(data.token);
        setEmail("");
        setPassword("");
        setPassword2("");
        setPlan("");
        setLoad(true);
      } else {
        setError(...data.data.error.errors);
      }
    } catch (e) {
      setError(e);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  });
  return (
    <>
      <hr className="breakLine" />
      {!token && (
        <div className="formWrapper bg-black">
          <div className="innerWrapper">
            <div className="regSections">
              <div
                onClick={() => setSelection("create")}
                className={isSelected("create")}
              >
                Create User
              </div>
              <div
                onClick={() => toPlans("plan")}
                className={isSelected("plan")}
              >
                Pick a Plan
              </div>
              <div
                onClick={() => toPayment("payment")}
                className={isSelected("payment")}
              >
                Payment
              </div>
            </div>

            <Form className={"borderRadiusBtm-10"} background={"bg-black"}>
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
              {selection === "payment" && (
                <Button onClick={postReg}>Submit</Button>
              )}
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
export default Regitration;
