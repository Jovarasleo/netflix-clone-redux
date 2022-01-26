import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingleMovie from "./pages/SingleMovie/singleMovie";
import Layout from "./components/layout";
import store from "./store";
import Content from "./content";

import "./App.css";
// import ForgotPassword from "./components/pages/ForgotPassword";
// import BlogPost from "./components/pages/BlogPost";
// import Success from "./components/pages/Success";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content" element={<Content />} />
            <Route path="/content/:movieId" element={<SingleMovie />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
