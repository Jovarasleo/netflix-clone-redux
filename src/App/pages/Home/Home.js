import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../components/banner";
import MovieCard from "../../components/content-cards";
import Button from "../../components/button";
import content from "../../../content/";
import auth from "../../../auth";
import { useCallback } from "react";
import AuthContext from "../../../context/AuthenticationContext";
import GetMoviesContext from "../../../context/GetMoviesContext";
import { useContext } from "react";
import "./index.css";

function Home() {
  const { list, setList, listLoading, listError, setError } =
    useContext(GetMoviesContext);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const tokenError = useSelector((state) =>
    auth.selectors.getTokenError(state)
  );
  const getMovies = useCallback(async () => {
    // setLoading(true);
    let payload;
    try {
      if (token) {
        let response = await fetch(
          "https://academy-video-api.herokuapp.com/content/items",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        payload = await response.json();
        console.log("getMovies TOKEN:", payload);
      }
      if (!token) {
        let response = await fetch(
          "https://academy-video-api.herokuapp.com/content/free-items"
        );
        payload = await response.json();
        console.log("getMovies !TOKEN:", payload);
      }
      setList(payload);
    } catch (e) {
      setError(e);
    }
    // setLoading(listLoading);
  }, [setError, setList, token]);

  useEffect(() => {
    getMovies();
    // if (tokenError?.length) {
    //   console.log("token err:", tokenError);
    //   dispatch(auth.actions.deleteToken());
    // }
  }, [getMovies]);
  console.log(" HOME CALLED:", list);
  return (
    <>
      {!token ? <Banner /> : null}
      <div className="contentWrapper">
        <div className="Cards">
          {listError?.length && (
            <p className="error">{JSON.stringify(listError)}</p>
          )}
          {listLoading && <p className="loading">Loading</p>}
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
        {!token ? (
          <Button to={"/login"} className={"center margin-top"}>
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
