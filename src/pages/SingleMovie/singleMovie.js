import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./index.css";
import Button from "../../components/button";

function SingleMovie({ movies, togglefavourite, favourites }) {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(movies.find(({ id }) => id === movieId));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isfavourite = favourites.includes(movieId);

  const getMovie = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `https://academy-video-api.herokuapp.com/content/items/${movieId}`
      );
      const data = await result.json();
      if (result.ok) {
        setMovie(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (!movie) {
      console.log("fetching");
      getMovie();
    }
  }, [getMovie, movie]);

  return (
    <>
      {error && <p>{error}</p>}
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
              <Button>Watch ▶</Button>
              <Button
                isfavourite={isfavourite}
                className={isfavourite ? "outline" : ""}
                onClick={() => {
                  togglefavourite(movieId);
                }}
              >
                {isfavourite ? "Remove 💔" : "favourite"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps({ content }) {
  return {
    movies: content.movies.list,
    favourites: content.favourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglefavourite: (id) => dispatch({ type: "CONTENT/TOGGLE_FAVOURITE", id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
