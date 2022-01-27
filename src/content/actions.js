import * as types from "./types";
// export const toggleFavourite = createAction(types.TOGGLE_FAVOURITE, (id) => {
//   let newFavourites = selector.getFavourites(getState());
// });
export const setMovies = (payload) => ({ type: types.SET_MOVIES, payload });
export const setMoviesLoading = (payload) => ({
  type: types.SET_MOVIES_LOADING,
  payload,
});
export const setMoviesError = (payload) => ({
  type: types.SET_MOVIES_ERROR,
  payload,
});
