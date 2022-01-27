import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Banner from "../../components/banner";
import MovieCard from "../../components/content-cards";
import Button from "../../components/button";
import content from "../../content/";
import "./index.css";
import { bindActionCreators, compose } from "redux";

function Home({
  movies,
  loading,
  error,
  setMovies,
  setMoviesLoading,
  setMoviesError,
}) {
  const getMovies = useCallback(async () => {
    setMoviesLoading(true);
    try {
      const result = await fetch(
        "https://academy-video-api.herokuapp.com/content/free-items"
      );

      if (result.ok) {
        const data = await result.json();
        setMovies(data);
      } else {
        setMoviesError({ error: "something went wrong" });
      }
    } catch (error) {
      setMoviesError(error.message);
    } finally {
      setMoviesLoading(false);
    }
  }, [setMoviesLoading, setMovies, setMoviesError]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  // const {
  //   loading,
  //   error,
  //   payload: movies,
  // } = useFetch("https://academy-video-api.herokuapp.com/content/free-items");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [movies, setPayload] = useState([]);

  // const getMovies = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const result = await fetch(
  //       "https://academy-video-api.herokuapp.com/content/free-items"
  //     );
  //     const data = await result.json();

  //     if (result.ok) {
  //       setPayload(data);
  //     } else {
  //       setError(new Error(JSON.stringify(data)));
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   getMovies();
  // }, [getMovies]);

  return (
    <>
      <Banner />
      <div className="contentWrapper">
        <div className="Cards">
          {error && <p className="error">{JSON.stringify(error)}</p>}
          {loading && <p className="loading">Loading</p>}
          {movies.map(({ image, title, description, id }) => (
            <MovieCard
              key={id}
              id={id}
              img={image}
              title={title}
              about={description}
            />
          ))}
        </div>
        <Button className={"center"}>Get More Content</Button>
      </div>
    </>
  );
}

// function mapStateToProps(state) {
//   return {
//     movies: state.content.movies.list,
//     loading: state.content.movies.loading,
//     error: state.content.movies.error,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setMovies: (payload) =>
//       dispatch({ type: content.types.SET_MOVIES, payload }),
//     setMoviesLoading: (payload) =>
//       dispatch({ type: content.types.SET_MOVIES_LOADING, payload }),
//     setMoviesError: (payload) =>
//       dispatch({ type: content.types.SET_MOVIES_ERROR, payload }),
//   };
// }

const enhance = compose(
  connect(
    (state) => ({
      movies: content.selectors.getMovies(state),
      loading: content.selectors.getMoviesLoading(state),
      error: content.selectors.getMoviesLoading(state),
    }),
    (dispatch) =>
      bindActionCreators(
        {
          setMovies: content.actions.setMovies,
          setMoviesLoading: content.actions.setMoviesLoading,
          setMoviesError: content.actions.setMoviesError,
        },
        dispatch
      )
  )
);
export default enhance(Home);
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
