import Header from "../header";
import Footer from "../footer";
import "./index.css";

function Layout({ children }) {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
