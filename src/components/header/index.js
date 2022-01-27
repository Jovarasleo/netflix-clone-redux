import "./index.css";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
function Header(user, setUser) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__nav">
        <div className="nav--wrapper">
          <img src={logo} alt="" onClick={() => navigate("./")} />
          {user.user ? (
            <Button to="/" onClick={() => setUser("")}>
              Log Out
            </Button>
          ) : (
            <Button to="/login">Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
