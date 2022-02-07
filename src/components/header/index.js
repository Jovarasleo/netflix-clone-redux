import "./index.css";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../auth";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => auth.selectors.getToken(state));
  const logout = () => {
    dispatch(auth.actions.deleteToken());
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
            <Button to="/login">Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
