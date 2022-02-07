import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import content from "../../../content";
import Button from "../button";

import "./index.css";

function MovieCard({ id, img, title, about, isfavourite, togglefavourite }) {
  const navigate = useNavigate();

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
          <h4 onClick={() => navigate(`/content/${id}`)}>{title}</h4>
          <p onClick={() => navigate(`/content/${id}`)}>{about}</p>
        </div>
        <div>
          <Button
            isfavourite={isfavourite}
            className={isfavourite ? "outline" : ""}
            onClick={() => {
              togglefavourite(id);
            }}
          >
            {isfavourite ? "Remove 💔" : "Favourite"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ content }, { id }) {
  return {
    isfavourite: content.favourites.includes(id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglefavourite: (id) =>
      dispatch({ type: content.types.TOGGLE_FAVOURITES, id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
