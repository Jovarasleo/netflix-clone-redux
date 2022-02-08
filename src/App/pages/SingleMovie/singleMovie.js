import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useCallback } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import AuthContext from "../../../context/AuthenticationContext";
import GetSingleMovieContext from "../../../context/SingleMovieContext";
import GetMoviesContext from "../../../context/GetMoviesContext";
import "./index.css";
import Button from "../../components/button";
function SingleMovie() {
  const navigate = useNavigate();
  const { movie, setMovie, movieLoading, setLoading, movieError, setError } =
    useContext(GetSingleMovieContext);
  const { token } = useContext(AuthContext);
  const { movieId } = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.includes(movieId);
  const { list } = useContext(GetMoviesContext);
  const [trailer, toggleTrailer] = useState(false);
  console.log(movie);
  if (list.length) setMovie(list.find((movie) => movie.id === movieId));
  const getMovie = useCallback(async () => {
    try {
      let payload;
      setLoading(true);
      if (token) {
        const response = await fetch(
          `https://academy-video-api.herokuapp.com/content/items/${movieId}`,
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
        setMovie(payload);
      }
      if (!token) {
        console.log("missing token");
      }
    } catch (e) {
      setError(e);
    }
    setLoading(movieLoading);
  }, [setError, setMovie, token, movieId]);
  useEffect(() => {
    if (movieError && movieError.message === "Access denied!") {
      console.log("klaida:", movieError);
      navigate("/", { replace: true });
    }
    if (!movie.length) {
      getMovie();
    }
  }, [getMovie, list]);

  console.log("movie:", movie);
  const WatchTrailer = () => {
    return (
      <div className="trailerWrapper" onClick={() => toggleTrailer(!trailer)}>
        <iframe
          className="iframe"
          src={movie.video}
          title={movie.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  return (
    <>
      {movieError && <p>{movieError.message}</p>}
      {movieLoading && <p>Loading</p>}
      {movie && (
        <div className="SingleMovie">
          <img
            src={movie.image}
            alt={movie.title}
            className="SingleMovie--image"
          ></img>

          <div className="SingleMovie__content">
            <div>
              <h3 className="SingleMovie__content--title">{movie.title}</h3>
              <p className="SingleMovie__content--about">{movie.description}</p>
            </div>
            <div className="SingleMovie__content--buttons">
              <Button onClick={() => toggleTrailer(!trailer)}>Watch ▶</Button>
              <Button
                isfavourite={isFavourite}
                className={isFavourite ? "outline" : ""}
                onClick={() => {
                  toggleFavourite(movieId);
                }}
              >
                {isFavourite ? "Remove 💔" : "favourite"}
              </Button>
            </div>
          </div>
          {trailer ? <WatchTrailer /> : null}
        </div>
      )}
    </>
  );
}
export default SingleMovie;
