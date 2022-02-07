export const getToken = (state) => state.auth.token.data;
export const getTokenLoading = (state) => {
  return state.auth.token.loading;
};
export const getTokenError = (state) => {
  return state.auth.token.error;
};
