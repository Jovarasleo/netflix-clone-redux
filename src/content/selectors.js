export const getFavourites = (state) => state.content.favourites;
export const getMovies = (state) => state.content.movies.list;
export const getMoviesLoading = (state) => state.content.movies.loading;
export const getMoviesError = (state) => state.content.movies.error;
export const getSingleMovie = (state, movieId) => {
  return state.content.movies.list.find((movie) => movie.id === movieId);
};
export const isFavourite = (state, id) => state.content.favourites.includes(id);
