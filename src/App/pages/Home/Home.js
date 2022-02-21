import React, { useEffect } from "react";
import loadable from "@loadable/component";
import Banner from "../../components/banner";
import MovieCard from "../../components/content-cards";
import Spiner from "../../components/loadingIcon";
import Button from "../../components/button";
import { useCallback } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import GetMoviesContext from "../../../context/GetMoviesContext";
import { useContext } from "react";
import fetchAPI from "../../fetchAPI";
import "./index.css";

const Registration = loadable(() => import("../../pages/Registration"));

function Home() {
  const { list, setList, load, setLoad, error, setError } =
    useContext(GetMoviesContext);
  const { token, setToken } = useContext(AuthContext);
  const getMovies = useCallback(async () => {
    try {
      const getContent = await fetchAPI.getData(
        token
          ? `https://academy-video-api.herokuapp.com/content/items`
          : `https://academy-video-api.herokuapp.com/content/free-items`,
        token
      );
      console.log(getContent);
      if (getContent.success) {
        setList(getContent.data);
        setLoad(false);
      }
      if (!getContent.success) {
        setError(getContent.data.error);
      }
      if (getContent.status === 401) {
        setError("Session Expired");
        setTimeout(function () {
          localStorage.removeItem("token");
          setToken("");
          setLoad(true);
          setError(null);
        }, 5000);
      }
    } catch (e) {
      setError(e);
    }
  }, [token, setToken, setList, setError, setLoad]);

  useEffect(() => {
    console.log(load);
    if (load) {
      getMovies();
    }
  }, [getMovies, token, load]);
  console.log(" HOME CALLED:", list);
  return (
    <>
      {!token ? <Banner /> : null}
      <div className="contentWrapper">
        <div className="Cards">
          {list?.map(({ image, title, description, id }) => (
            <MovieCard
              key={id}
              id={id}
              img={image}
              title={title}
              about={description}
            />
          ))}
        </div>
        {error && <p className="error-msg">{JSON.stringify(error)}</p>}
        {load && <Spiner />}
        {!token ? (
          <Button
            to={"/registration"}
            onMouseOver={() => Registration.preload()}
            className={"center margin-top"}
          >
            Get More Content
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Home;
