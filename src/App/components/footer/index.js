import creditCards from "../../images/credit-cards.png";
import "./index.css";
function Footer() {
  return (
    <footer>
      <div className="footerWrapper">
        <p>
          We care about your entertainment. Copyright © 2019–2022
          chineseNetflix.com
        </p>
        <img src={creditCards} alt=""></img>
      </div>
    </footer>
  );
}
export default Footer;
