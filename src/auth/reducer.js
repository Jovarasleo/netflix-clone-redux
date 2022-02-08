import * as types from "./types";
const DEFAULT_STATE = {
  token: {
    loading: false,
    data: localStorage.getItem("token") || "",
    error: null,
  },
};

function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.GET_TOKEN: {
      return {
        ...state,
        token: { ...state.token, loading: action.payload },
      };
    }
    case types.GET_TOKEN_SUCCESS: {
      localStorage.setItem("token", action.payload);
      console.log(action, action.payload);
      return {
        ...state,
        token: {
          ...state.token,
          data: action.payload,
          loading: false,
        },
      };
    }
    case types.GET_TOKEN_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        token: {
          ...state.token,
          error: action.payload,
          loading: false,
        },
      };
    }
    case types.DELETE_TOKEN: {
      console.log("delete_token fires");
      localStorage.removeItem("token");
      return {
        ...state,
        token: {
          ...state.token,
          data: "",
        },
      };
    }
    default:
      return state;
  }
}
export default reducer;
