import "./index.css";
import Button from "../button";

import logo from "../../images/logo.svg";
function Header() {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="nav--wrapper">
          <img src={logo} alt="" />
          <Button to="/login" className={"button"}>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
export default Header;
