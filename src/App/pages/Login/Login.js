import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../fetchAPI";
import Button from "../../components/button";
import hidden from "../../images/hidden.png";
import shown from "../../images/shown.png";
import "./index.css";
import Spiner from "../../components/loadingIcon";
import GetMoviesContext from "../../../context/GetMoviesContext";
import Form from "../../components/form";
function Login() {
  const passwordInput = useRef(null);
  const { token, setToken, loading, setLoading, tokenError, setTokenError } =
    useContext(AuthContext);
  const { setLoad } = useContext(GetMoviesContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [on, setOn] = useState(true);
  const LogIn = async () => {
    if (name && password) {
      try {
        setLoading(true);
        const response = await fetchAPI.postData(
          "https://academy-video-api.herokuapp.com/auth/login",
          {
            username: name,
            password: password,
          }
        );
        const data = await response;
        console.log(data);
        if (data.token) {
          setToken(data.token);
          setLoad(true);
          setTokenError(null);
        }
        if (data.status === 400) {
          setTokenError(data.data.error.message);
        }
      } catch (e) {
        setTokenError(e);
      }
    } else {
      setTokenError("Missing login information");
    }
    setLoading(false);
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
    if (token && token.length) navigate("/", { replace: true });
  }, [token, navigate]);

  return (
    <Form className="borderRadius-10 margin-20" background={"bg-darkGray"}>
      <div className="inputWrapper">
        <label htmlFor="username">Username </label>
        <br />
        <input
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
      {!loading && tokenError && <p className="error">{tokenError}</p>}
      <Button onClick={LogIn} className={"center marginTop"}>
        Sign In
      </Button>
      {loading && <Spiner className={"error marginTop"} />}
    </Form>
  );
}
export default Login;
