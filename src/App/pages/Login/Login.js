import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "../../../auth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import hidden from "../../images/hidden.png";
import shown from "../../images/shown.png";
import "./index.css";

function Login() {
  const passwordInput = useRef(null);
  const token = useSelector((state) => auth.selectors.getToken(state));
  const error = useSelector(auth.selectors.getTokenError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [on, setOn] = useState(true);
  const LogIn = async () => {
    dispatch(auth.actions.setToken(name, password));
    if (token) {
      navigate("/", { replace: true });
    }
  };
  const pswType = () => {
    setOn(!on);
    let type = passwordInput.current.type;
    if (type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  };
  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  return (
    <div className="formWrapper">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="login">
          <div className="inputWrapper">
            <label htmlFor="username">Username </label>
            <br />
            <input
              className="login_form__input"
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="username"
              id="username"
              required
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">Password</label> <br />
            <input
              ref={passwordInput}
              className="login_form__input password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              required
            />
            <img
              className="inputIcon"
              onClick={() => pswType()}
              alt="Visibility Icon"
              src={on ? hidden : shown}
            ></img>
          </div>
          {error && <p className="error">{error}</p>}
          <Button onClick={LogIn} className={"center signInBtn"}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Login;
