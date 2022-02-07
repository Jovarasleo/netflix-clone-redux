import banner from "../../images/banner.jpg";
import Button from "../button";
import "./index.css";
function MainBanner() {
  return (
    <div className="header__banner">
      <img src={banner} alt="" />
      <div className="wrapper">
        <h2>Wanna more Content?</h2>
        <Button className={"center"} to={"/login"}>
          Get access
        </Button>
      </div>
    </div>
  );
}

export default MainBanner;
