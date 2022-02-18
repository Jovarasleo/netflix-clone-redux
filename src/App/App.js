import { BrowserRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import SingleMovie from "./pages/SingleMovie/singleMovie";
import Layout from "./components/layout";
import { AuthProvider } from "../context/AuthenticationContext";
import { FavouritesProvider } from "../context/FavouritesContext";
import { GetMoviesProvider } from "../context/GetMoviesContext";
import { RegistrationProvider } from "../context/RegistrationContext";
import "./App.css";
const Login = loadable(() => import("./pages/Login/Login"));
const SingleMovie = loadable(() => import("./pages/SingleMovie/singleMovie"));
const Registration = loadable(() => import("./pages/Registration"));
function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <GetMoviesProvider>
          <BrowserRouter>
            <RegistrationProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/content/:movieId" element={<SingleMovie />} />

                  <Route
                    path="/registration"
                    element={<Registration />}
                  ></Route>
                </Routes>
              </Layout>
            </RegistrationProvider>
          </BrowserRouter>
        </GetMoviesProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}
export default App;
