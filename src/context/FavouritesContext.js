import { createContext, useState } from "react";

const FAVOURITES_KEY = "content/favourites";
const DEFAULT_FAVOURITES = {
  favorites: JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [],
};

const FavouritesContext = createContext(DEFAULT_FAVOURITES.favorites);
function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(DEFAULT_FAVOURITES.favorites);
  console.log(favourites);
  const toggleFavourite = (id) => {
    let newFavourites = null;
    if (favourites.includes(id)) {
      newFavourites = favourites.filter((movieId) => id !== movieId);
    } else {
      newFavourites = [...favourites, id];
    }
    setFavourites(newFavourites);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(newFavourites));
  };
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
export default FavouritesContext;
export { FavouritesProvider };
