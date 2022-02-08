import { createContext, useState } from "react";
const ContentContext = createContext();
const FAVOURITES_KEY = "content/favourites";
function ContentProvider({ children }) {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || []
  );
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
    <ContentContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </ContentContext.Provider>
  );
}
export default ContentContext;
export { ContentProvider };
