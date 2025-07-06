import React, { useState, useEffect, useContext, JSX } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { UserContext } from "../../context/UserContext";
import "../loading/loading.scss";
import "./movie.scss";
import { ICard } from "../../Types/Types";


function MovieCard(): JSX.Element | null {
  const [card, setCard] = useState<ICard | null>(null);

  const { id } = useParams();
  const { setLoading, loading } = useContext(LoadingContext);
  const { apiKey } = useContext(ApiKeyContext);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const { setFavoriteCards, favoriteCards } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setCard(data);
          const trailerUrl = data?.videos?.trailers?.[0]?.url;
          if (trailerUrl) {
            setVideoUrl(trailerUrl);
          } else {
            setVideoUrl("");
          }
        } else {
          console.error("Данных нет");
        }
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoading(false));
  }, [id]);

  const closeCard = () => {
    if (location.pathname === `/series/card/${id}`) {
      setCard(null);
      navigate("/series");
      return null;
    }
    if (location.pathname === `/cartoons/card/${id}`) {
      setCard(null);
      navigate("/cartoons");
      return null;
    }
    navigate("/");
  };
  const openTrailer = () => {
    console.log(videoUrl);
    navigate("trailer", { state: { video: videoUrl } });
  };
  if (!card) return null;

  const addFavoritesCard = (card: ICard) => {
    setFavoriteCards((prev) => {
      const exists = prev.some((item) => item.name === card.name);
      if (exists) {
        return prev;
      } else {
        return [...prev, card];
      }
    });
  };

  return (
    <div className="movie">
      {loading && (
        <p className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </p>
      )}
      <div className="movie__card">
        <p className="movie__card_delete" onClick={closeCard}>
          X
        </p>
        <h1 className="movie__card_title">{card.name}</h1>
        <div className="movie__card_img">
          <img src={card.poster?.url || "/img/no image.jpg"} alt={card.name} />
        </div>
        <p>Year: {card.year}</p>
        <p>Country: {card?.countries[0]?.name}</p>
        <p>Description: {card.shortDescription}</p>
        <p>Rating: {card.rating.imdb}</p>
        <p>Time: {card.movieLength}</p>
        <button className="movie__card_button" onClick={openTrailer}>
          Trailer
        </button>
        <button
          className="movie__card_button"
          onClick={() => addFavoritesCard(card)}
        >
          Добавить в избранное
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieCard;
