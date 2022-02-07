import * as types from "./types";
import * as selectors from "./selectors";
import auth from "../auth";

export const toggleFavourites = (id) => (dispatch, getState) => {
  let favourites = selectors.getFavourites(getState());
  if (favourites.includes(id)) {
    favourites = favourites.filter((favId) => id !== favId);
  } else {
    favourites = favourites.concat(id);
  }
  dispatch({ type: types.TOGGLE_FAVOURITES, payload: favourites });
};

export const getMovies = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: types.GET_MOVIES, payload: false });
  if (token) {
    const response = await fetch(
      "https://academy-video-api.herokuapp.com/content/items",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      }
    );
    if (response.status === 401) {
      const payload = await response.json();
      console.log("error payload:", payload);
      dispatch({ type: auth.types.DELETE_TOKEN, payload: "" });
    } else {
      const payload = await response.json();
      dispatch({ type: types.GET_MOVIES_SUCCESS, payload: payload });
    }
  }
  if (!token) {
    const response = await fetch(
      "https://academy-video-api.herokuapp.com/content/free-items"
    );
    const payload = await response.json();
    dispatch({ type: types.GET_MOVIES_SUCCESS, payload: payload });
  }
};
export const getSingleMovie = (movieId) => async (dispatch) => {
  dispatch({ type: types.GET_MOVIES, payload: false });
  const token = localStorage.getItem("token");
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
    if (response.status === 401) {
      const payload = await response.json();
      console.log("error payload:", payload);
      dispatch({ type: auth.types.DELETE_TOKEN, payload: payload });
      dispatch({ type: types.GET_MOVIES_ERROR, payload: payload });
    }
    if (response.ok) {
      const payload = await response.json();
      dispatch({ type: types.GET_MOVIES_SUCCESS, payload: [payload] });
    }
  }
  if (!token) {
    const response = await fetch(
      `https://academy-video-api.herokuapp.com/content/items/${movieId}`
    );
    const payload = await response.json();
    dispatch({ type: types.GET_MOVIES_SUCCESS, payload: [payload] });
  }
};
