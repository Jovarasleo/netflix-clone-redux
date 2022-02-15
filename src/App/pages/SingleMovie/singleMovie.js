import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useCallback } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import AuthContext from "../../../context/AuthenticationContext";
import GetMoviesContext from "../../../context/GetMoviesContext";
import "./index.css";
import Button from "../../components/button";
import Spiner from "../../components/loadingIcon";
import fetchAPI from "../../fetchAPI";
function SingleMovie() {
  const navigate = useNavigate();
  const { list } = useContext(GetMoviesContext);
  const { token } = useContext(AuthContext);
  const { movieId } = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.includes(movieId);
  const [trailer, toggleTrailer] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [movie, setMovie] = useState();
  const getMovie = useCallback(async () => {
    try {
      const getContent = await fetchAPI.getData(
        `https://academy-video-api.herokuapp.com/content/items/${movieId}`,
        token
      );
      console.log(getContent);
      if (getContent.success) {
        setMovie(getContent.data);
      }
      if (!getContent.success) {
        setError(getContent.data.error);
        setTimeout(function () {
          navigate("/");
        }, 5000);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, [setError, setMovie, movieId, navigate, token]);

  useEffect(() => {
    if (!list.length) {
      setLoading(true);
      getMovie();
    } else setMovie(list.find((movie) => movie.id === movieId));
  }, [getMovie, setError, list, movieId]);
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
      <div className="movieWrapper">
        {error && <p className="error-msg">{error.message}</p>}
        {loading && <Spiner />}
        {movie && !error && !loading && (
          <div className="singleMovie">
            <img
              src={movie.image}
              alt={movie.title}
              className="singleMovie--image"
            ></img>

            <div className="singleMovie__content">
              <div>
                <h3 className="content--title">{movie.title}</h3>
                <p className="content--about">{movie.description}</p>
              </div>
              <div className="content--buttons">
                <Button onClick={() => toggleTrailer(!trailer)}>Watch ▶</Button>
                <Button
                  isfavourite={isFavourite}
                  className={isFavourite ? "outline" : ""}
                  onClick={() => {
                    toggleFavourite(movieId);
                  }}
                >
                  {isFavourite ? "Remove 💔" : "Favourite"}
                </Button>
              </div>
            </div>
            {trailer ? <WatchTrailer /> : null}
          </div>
        )}
      </div>
    </>
  );
}
export default SingleMovie;
