import "./index.css";
import loadable from "@loadable/component";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import GetMoviesContext from "../../../context/GetMoviesContext";
const Login = loadable(() => import("../../pages/Login/Login"));
function Header() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const { setLoad } = useContext(GetMoviesContext);
  const logout = () => {
    localStorage.removeItem("token");
    setLoad(true);
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
