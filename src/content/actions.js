import * as types from "./types";
import api from "../api";
export const getMovies = () => async (dispatch) => {
  const storeToken = localStorage.getItem("token");
  dispatch({ type: types.GET_MOVIES, payload: false });
  try {
    let response = null;
    if (storeToken) {
      response = await api.fetchAllMovies(storeToken);
    } else response = await api.fetchFreeMovies();
    dispatch({ type: types.GET_MOVIES_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_MOVIES_ERROR, payload: error });
  }
};
export const getSingleMovie = (movieId) => async (dispatch) => {
  const storeToken = localStorage.getItem("token");
  dispatch({ type: types.GET_MOVIES, payload: false });
  try {
    let response = null;
    if (storeToken) {
      response = await api.fetchMovie(movieId, storeToken);
    } else response = await api.fetchMovie(movieId);
    dispatch({ type: types.GET_MOVIES_SUCCESS, payload: [response] });
    console.log("getSingleMovie fires", response);
  } catch (error) {
    dispatch({ type: types.GET_MOVIES_ERROR, payload: error });
  }
};
export const toggleFavourites = (id) => (dispatch) => {
  dispatch({ type: types.TOGGLE_FAVOURITES, id });
};
