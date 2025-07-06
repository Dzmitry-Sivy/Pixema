import React, { JSX, useEffect, useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import { ISeries } from "../../Types/Types";
import Loading from "../loading/Loading";
import { Outlet, useNavigate } from "react-router-dom";
import PaginationSeries from "./PaginationSeries";
import "./series.scss";

function Series(): JSX.Element {
  const [seriesPage, setSeriesPage] = useState<number>(1);
  const [series, setSeries] = useState<ISeries[]>([]);
  const { apiKey } = useContext(ApiKeyContext);
  const { loading, setLoading } = useContext(LoadingContext);

  const seriesUrl: string = `https://api.kinopoisk.dev/v1.4/movie?page=${seriesPage}&limit=12&type=tv-series&rating.kp=7.2-10`;
  useEffect(() => {
    setLoading(true);
    fetch(seriesUrl, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSeries(data.docs);
          console.log(data.docs);
        }
        setLoading(false);
      })

      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [seriesUrl]);
  const navigate = useNavigate();
  const openCart = (id: string) => {
    navigate(`card/${id}`);
  };

  return (
    <div className="series ">
      {loading && <Loading />}
      <div className="series__cards">
        {series.map((serie) => (
          <div
            key={serie.id}
            className="page__card card"
            onClick={() => openCart(serie.id)}
          >
            <div className="card__img">
              <img
                src={serie.poster?.url || "/img/no image.jpg"}
                alt={serie.name}
              />
            </div>
            <h3 className="card__title">{serie.name}</h3>
            <p className="card__text">Year: {serie.year}</p>
          </div>
        ))}
      </div>
      <Outlet />
      <PaginationSeries seriesPage={seriesPage} setSeriesPage={setSeriesPage} />
    </div>
  );
}

export default Series;
