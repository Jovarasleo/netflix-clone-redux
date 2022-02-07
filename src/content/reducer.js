import * as types from "./types";
const DEFAULT_STATE = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  movies: {
    loading: false,
    error: {},
    list: [],
  },
};
function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.TOGGLE_FAVOURITES: {
      return {
        ...state,
        favourites: action.payload,
      };
    }

    case types.GET_MOVIES: {
      return {
        ...state,
        movies: {
          ...state.movies,
          isLoading: action.payload,
        },
      };
    }
    case types.GET_MOVIES_SUCCESS: {
      return {
        ...state,
        movies: {
          ...state.movies,
          list: action.payload,
        },
      };
    }
    case types.GET_MOVIES_ERROR: {
      return {
        ...state,
        movies: {
          ...state.movies,
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
export default reducer;
