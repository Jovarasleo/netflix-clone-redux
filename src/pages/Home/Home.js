import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../components/banner";
import MovieCard from "../../components/content-cards";
import Button from "../../components/button";
import content from "../../content/";
import auth from "../../auth";

import "./index.css";

function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => auth.selectors.getToken(state));
  const movies = useSelector((state) => content.selectors.getMovies(state));
  const error = useSelector((state) => content.selectors.getMoviesError(state));
  const loading = useSelector((state) =>
    content.selectors.getMoviesLoading(state)
  );

  useEffect(() => {
    dispatch(content.actions.getMovies());
  }, [dispatch, token]);

  console.log(movies);
  return (
    <>
      {!token ? <Banner /> : null}
      <div className="contentWrapper">
        <div className="Cards">
          {error && <p className="error">{JSON.stringify(error)}</p>}
          {loading && <p className="loading">Loading</p>}
          {movies?.map(({ image, title, description, id }) => (
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
// const enhance = compose(
//   connect(
//     (state) => ({
//       movies: content.selectors.getMovies(state),
//       loading: content.selectors.getMoviesLoading(state),
//       error: content.selectors.getMoviesLoading(state),
//     }),
//     (dispatch) =>
//       bindActionCreators(
//         {
//           getMovies: content.actions.getMovies,
//           getMoviesLoading: content.actions.getMoviesLoading,
//           getMoviesError: content.actions.getMoviesError,
//         },
//         dispatch
//       )
//   )
// );
// export default enhance(Home);
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
