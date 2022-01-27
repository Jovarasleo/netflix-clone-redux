import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import MovieCard from "../../components/content-cards";

import "./index.css";

function Content({ favorite, toggleFavorite, user, setUser }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://academy-video-api.herokuapp.com/content/items", {
      headers: {
        authorization: user,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          setUser("");
          setError(res.status);
          throw new Error("authorization failed");
        }
        return res.json();
      })
      .then((result) => {
        setMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, setUser]);

  return (
    <div className="contentWrapper">
      {error && <Navigate to="/login" />}
      <div className="Cards">
        {movies.map(({ image, title, description, id }) => (
          <MovieCard
            key={id}
            id={id}
            img={image}
            title={title}
            about={description}
            toggleFavorite={toggleFavorite}
            favorite={favorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Content;
