import "./index.css";
import loadable from "@loadable/component";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import AuthContext from "../../../context/AuthenticationContext";
const Login = loadable(() => import("../../pages/Login/Login"));
function Header() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <header className="header">
      <div className="header__nav">
        <div className="nav--wrapper">
          <img src={logo} alt="" onClick={() => navigate("./")} />
          {token ? (
            <Button to="/" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <Button onMouseOver={() => Login.preload()} to="/login">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
