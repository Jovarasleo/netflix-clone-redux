import { createContext, useState } from "react";
const DEFAULT_SINGLEMOVIE = {
  movieLoading: false,
  movieError: null,
  movie: [],
};
const GetSingleMovieContext = createContext(DEFAULT_SINGLEMOVIE);
const GetSingleMovieProvider = ({ children }) => {
  const [movie, setMovie] = useState(DEFAULT_SINGLEMOVIE.movie);
  const [movieLoading, setLoading] = useState(DEFAULT_SINGLEMOVIE.movieLoading);
  const [movieError, setError] = useState(DEFAULT_SINGLEMOVIE.movieError);
  return (
    <GetSingleMovieContext.Provider
      value={{
        movie,
        setMovie,
        movieLoading,
        setLoading,
        movieError,
        setError,
      }}
    >
      {children}
    </GetSingleMovieContext.Provider>
  );
};
export default GetSingleMovieContext;
export { GetSingleMovieProvider };
