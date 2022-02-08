import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingleMovie from "./pages/SingleMovie/singleMovie";
import Layout from "./components/layout";
import { AuthProvider } from "../context/AuthenticationContext";
import { FavouritesProvider } from "../context/FavouritesContext";
import { GetMoviesProvider } from "../context/GetMoviesContext";
import { GetSingleMovieProvider } from "../context/SingleMovieContext";
import store from "../store";
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GetMoviesProvider>
          <FavouritesProvider>
            <GetSingleMovieProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/content/:movieId" element={<SingleMovie />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </GetSingleMovieProvider>
          </FavouritesProvider>
        </GetMoviesProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
