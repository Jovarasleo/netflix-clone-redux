import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingleMovie from "./pages/SingleMovie/singleMovie";
import Layout from "./components/layout";
import store from "./store";
import LoggedContent from "./pages/LoggedContent";

import "./App.css";
// import ForgotPassword from "./components/pages/ForgotPassword";
// import BlogPost from "./components/pages/BlogPost";
// import Success from "./components/pages/Success";
function App() {
  const [user, setUser] = useState("");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout user={user} setUser={setUser}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route
              path="/content"
              element={<LoggedContent user={user} setUser={setUser} />}
            />
            <Route path="/content/:movieId" element={<SingleMovie />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
