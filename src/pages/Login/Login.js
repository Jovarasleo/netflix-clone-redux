import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

import Button from "../../components/button";

import "./index.css";

function Login({ user, setUser }) {
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async (event, setUser, setError) => {
    event.preventDefault();

    const user = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    fetch("https://academy-video-api.herokuapp.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Failure: please check the login details");
        }
        return res.json();
      })
      .then((result) => {
        setUser(result.token);
        localStorage.setItem("user", result.token);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="login">
      {user && <Navigate to="/content" />}
      <form
        className="login_form"
        onSubmit={(event) => handleSubmit(event, setUser, setError)}
      >
        <div>
          <label htmlFor="username">Username </label>
          <br />
          <input
            className="login_form__input"
            type="text"
            name="username"
            id="username"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            className="login_form__input"
            type="password"
            name="password"
            id="password"
            required
          ></input>
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <div>
          <Button>Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
