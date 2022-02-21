import Button from "../button";
import loadable from "@loadable/component";
import "./index.css";

const Registration = loadable(() => import("../../pages/Registration"));
function MainBanner() {
  return (
    <div className="header__banner">
      <div className="wrapper">
        <h2>Wanna more Content?</h2>
        <Button
          className={"center"}
          to={"/registration"}
          onMouseOver={() => Registration.preload()}
        >
          Get access
        </Button>
      </div>
    </div>
  );
}

export default MainBanner;
