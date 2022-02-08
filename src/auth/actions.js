import * as types from "./types";
export const setToken = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TOKEN, payload: true });
    const response = await fetch(
      "https://academy-video-api.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const payload = await response.json();
    if (payload.token) {
      dispatch({
        type: types.GET_TOKEN_SUCCESS,
        payload: payload.token,
      });
    } else {
      console.log("error:", payload);
      dispatch({ type: types.GET_TOKEN_ERROR, payload: payload.message });
    }
  } catch (error) {
    dispatch({ type: types.GET_TOKEN_ERROR, payload: error });
  }
  dispatch({ type: types.GET_TOKEN, payload: false });
};
export const deleteToken = () => (dispatch) => {
  dispatch({ type: types.DELETE_TOKEN });
};
