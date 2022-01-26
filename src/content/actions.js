export const toggleFavourite = createAction(types.TOGGLE_FAVOURITE, (id) => {
  let newFavourites = selector.getFavourites(getState());
});
