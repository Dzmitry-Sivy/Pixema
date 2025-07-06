import React, { JSX, useEffect, useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { ISeries } from "../../Types/Types";
import Loading from "../loading/Loading";
import { Outlet, useNavigate, } from "react-router-dom";
import PaginationCartoons from "./PaginationCartoons";
import "./cartoons.scss";
function Cartoons(): JSX.Element {
  const [cartoonsPage, setCartoonsPage] = useState<number>(1);
  const [cartoons, setCartoons] = useState<ISeries[]>([]);
  const { apiKey } = useContext(ApiKeyContext);
  const { loading, setLoading } = useContext(LoadingContext);

  const cartoonsUrl: string = `https://api.kinopoisk.dev/v1.4/movie?page=${cartoonsPage}&limit=12&typeNumber=3&rating.kp=8-10`;
  useEffect(() => {
    setLoading(true);
    fetch(cartoonsUrl, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCartoons(data.docs);
          console.log(data.docs);
        }
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [cartoonsUrl]);
  const navigate = useNavigate();
  const openCart = (id: string) => {
    navigate(`card/${id}`);
  };

  return (
    <div className="cartoons">
      {loading && <Loading />}
      <div className="cartoons__cards">
        {cartoons.map((cartoon) => (
          <div
            key={cartoon.id}
            className="page__card card"
            onClick={() => openCart(cartoon.id)}
          >
            <div className="card__img">
              <img
                src={cartoon.poster?.url || "/img/no image cards.jpeg"}
                alt={cartoon.name}
              />
            </div>
            <h3 className="card__title">{cartoon.name}</h3>
            <p className="card__text">Year: {cartoon.year}</p>
          </div>
        ))}
      </div>
      <Outlet />
      <PaginationCartoons
        seriesPage={cartoonsPage}
        setSeriesPage={setCartoonsPage}
      />
    </div>
  );
}

export default Cartoons;
