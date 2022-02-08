import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContentContext } from "../../../context";
import content from "../../../content";
import "./index.css";
import Button from "../../components/button";
import auth from "../../../auth";
function SingleMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieId } = useParams();
  console.log("ID:", movieId);
  const { favourites, toggleFavourite } = useContext(ContentContext);
  const isFavourite = favourites.includes(movieId);

  let movie = useSelector((state) =>
    content.selectors.getSingleMovie(state, movieId)
  );
  const token = useSelector(auth.selectors.getToken);
  const error = useSelector(content.selectors.getMoviesError);
  const loading = useSelector(content.selectors.getMoviesLoading);
  const [trailer, toggleTrailer] = useState(false);

  useEffect(() => {
    if (error && error.message === "Access denied!") {
      console.log("klaida:", error);
      navigate("/", { replace: true });
    }
    if (!movie) {
      dispatch(content.actions.getSingleMovie(movieId));
    }
  }, [dispatch, token, movieId, movie, error]);

  console.log("movie:", movie, error);
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
      {error && <p>{error.message}</p>}
      {loading && <p>Loading</p>}
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
