import { useContext, useRef, useState } from "react";
import RegistrationContext from "../../../context/RegistrationContext";
import shown from "../../images/shown.png";
import hidden from "../../images/hidden.png";
function RegForm() {
  const passwordInput = useRef(null);
  const { email, setEmail, password, setPassword, password2, setPassword2 } =
    useContext(RegistrationContext);
  const [on, setOn] = useState(true);
  const pswType = () => {
    setOn(!on);
    let type = passwordInput.current.type;
    if (type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  };
  return (
    <>
      <div className="inputWrapper">
        <label htmlFor="email">Email</label>
        <br />
        <input
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
          ref={passwordInput}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password1"
          id="password1"
          required
        />
        <img
          className="inputIcon"
          onClick={() => pswType()}
          alt="Visibility Icon"
          src={on ? hidden : shown}
        ></img>
      </div>

      <div className="inputWrapper">
        <label htmlFor="password">Repeat Password</label>
        <br />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
          type="password"
          name="password2"
          id="password2"
          required
        />
      </div>
    </>
  );
}
export default RegForm;
