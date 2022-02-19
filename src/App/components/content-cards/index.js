import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import Button from "../button";

import "./index.css";

function MovieCard({ id, img, title, about }) {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.includes(id);
  return (
    <div className="card">
      <img
        src={img}
        alt={title}
        className="card--image"
        onClick={() => navigate(`/content/${id}`)}
      ></img>
      <div className="card--wrapper">
        <div>
          <h4
            onClick={() => navigate(`/content/${id}`)}
            className="card--title"
          >
            {title}
          </h4>
          <p
            onClick={() => navigate(`/content/${id}`)}
            className="card--description"
          >
            {about}
          </p>
        </div>
        <div>
          <Button
            isfavourite={isFavourite}
            className={isFavourite ? "outline" : ""}
            onClick={() => {
              toggleFavourite(id);
            }}
          >
            {isFavourite ? "Remove 💔" : "Favourite"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
