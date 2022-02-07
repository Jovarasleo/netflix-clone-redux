import * as types from "./types";
import api from "../api";
export const setToken = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TOKEN, paylaod: true });
    const response = await api.logIn(username, password);
    if (response.token) {
      dispatch({
        type: types.GET_TOKEN_SUCCESS,
        payload: response.token,
      });
    } else {
      dispatch({ type: types.GET_TOKEN_ERROR, payload: response.message });
    }
  } catch (error) {
    dispatch({ type: types.GET_TOKEN_ERROR, payload: error });
  }
  dispatch({ type: types.GET_TOKEN, payload: false });
};

export const deleteToken = () => (dispatch) => {
  dispatch({ type: types.DELETE_TOKEN });
};
