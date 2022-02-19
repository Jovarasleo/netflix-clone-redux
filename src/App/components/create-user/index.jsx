import { useContext } from "react";
import RegistrationContext from "../../../context/RegistrationContext";
function RegForm() {
  const { email, setEmail, password, setPassword, password2, setPassword2 } =
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
          name="password1"
          id="password1"
          required
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="password">Repeat Password</label>
        <br />
        <input
          className="login_form__input"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
          type="text"
          name="password2"
          id="password2"
          required
        />
      </div>
    </>
  );
}
export default RegForm;
