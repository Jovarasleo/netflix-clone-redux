import React, { Component } from "react";
import "./index.css";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  performLogin = async (event) => {
    event.preventDefault();
    let body = {
      password: this.state.password,
      username: this.state.username,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    const url = "https://academy-video-api.herokuapp.com/auth/login";
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (response.ok) {
        console.log("login successful");
      } else {
        console.log("login failed");
      }
      let msg = { message: result.message };
      return console.log(result.message, msg);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="login-form">
        <input
          type="text"
          name="username"
          placeholder="usernameid"
          onChange={this.onchange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={this.onchange}
        />
        <br />
        <button type="submit" onClick={(event) => this.performLogin(event)}>
          Submit
        </button>
      </div>
    );
  }
}
export default LoginForm;
