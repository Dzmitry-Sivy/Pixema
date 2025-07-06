import React, { JSX, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./favorites.scss";
import { useNavigate } from "react-router-dom";
import { OpenFavoritesProps } from "../../Types/Types";
function Favorites({ setOpenFavorites }: OpenFavoritesProps): JSX.Element {
  const navigate = useNavigate();
  const { favoriteCards, currentUser, setCurrentUser } =
    useContext(UserContext);
  useEffect(() => {
    if (!currentUser) return;

    const updatedCurrentUser = {
      ...currentUser,
      favorites: favoriteCards,
    };
    setCurrentUser(updatedCurrentUser);
  }, [favoriteCards]);

  const openCart = (id: string) => {
    navigate(`/card/${id}`);
  };
  const closeFavorites = () => {
    setOpenFavorites(false);
  };
  return (
    <div>
      <p className="favorites__delete" onClick={closeFavorites}>
        X
      </p>
      <div className="main__favorites_user favorites">
        {favoriteCards.length === 0 ? (
          <p className="favorites__empty">Нет избранных фильмов</p>
        ) : (
          favoriteCards.map((card, index) => (
            <div
              className="favorites__card"
              key={index}
              onClick={() => openCart(card.id)}
            >
              <h3>{card.name}</h3>
              <div className="favorites__card_img">
                <img src={card.poster.url} alt={card.name} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
