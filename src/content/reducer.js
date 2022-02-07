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
    case types.TOGGLE_FAVOURITES: {
      const { favourites } = state;
      let remove = favourites.filter((favId) => action.id !== favId);
      console.log("remove:", remove);
      if (favourites.includes(action.id)) {
        return {
          ...state,
          favourites: remove,
        };
      } else {
        let add = favourites.concat(action.id);
        console.log("add:", add);
        return { ...state, favourites: add };
      }
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
