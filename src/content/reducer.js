import * as types from "./types";
const DEFAULT_STATE = {
  favourites: [],
  movies: {
    loading: false,
    error: null,
    list: [],
  },
};

function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.TOGGLE_FAVOURITE: {
      const { favourites } = state;

      if (favourites.includes(action.id)) {
        return {
          ...state,
          favourites: favourites.filter((favId) => action.id !== favId),
        };
      } else {
        return { ...state, favourites: favourites.concat(action.id) };
      }
    }
    case types.SET_MOVIES: {
      return {
        ...state,
        movies: {
          ...state.movies,
          list: action.payload,
        },
      };
    }
    case types.SET_MOVIES_SUCCESS: {
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: action.payload,
        },
      };
    }
    case types.SET_MOVIES_ERROR: {
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
