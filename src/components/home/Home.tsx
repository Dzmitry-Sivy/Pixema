import React, { useEffect, useState, useContext, JSX } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./home.scss";
import MainInput from "../header/MainInput";
import "../loading/loading.scss";
import { LoadingContext } from "../../context/LoadingContext";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import { HomeProps } from "../../Types/Types";
import { IMovie } from "../../Types/Types";
import Filter from "../Filter/Filter";

function Home({ apiKey }: HomeProps): JSX.Element {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  const [searchUrl, setSearchUrl] = useState<string | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [mainMovies, mainSetMovies] = useState<IMovie[]>([]);
  const [page, Setpage] = useState<number>(1);
  const [limitOfPage, setLimitOfPage] = useState<number>(12);
  const mainUrl: string = `https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limitOfPage}&rating.kp=7.2-10`;
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchUrl(null);
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const urlToFetch = searchUrl || mainUrl;
    fetch(urlToFetch, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          mainSetMovies(data.docs);
          setMovies(data.docs);
        }
        setLoading(false);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setIsLoadingMore(false);
      });
  }, [searchUrl, mainUrl]);

  useEffect(() => {
    if (searchUrl) {
      const url = new URL(searchUrl);
      url.searchParams.set("page", page.toString());
      setSearchUrl(url.toString());
    }
  }, [page]);

  /*
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerWidth < 868 &&
        !isLoadingMore && 
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1
      ) {
        
        setIsLoadingMore(true);
        Setpage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingMore]);
*/
  const openCart = (id: string) => {
    navigate(`/card/${id}`);
  };
  console.log(movies);
  return (
    <div className="main _container">
      <MainInput
        movies={movies}
        setMovies={setMovies}
        mainMovies={mainMovies}
      />
      <Filter
        movies={movies}
        setMovies={setMovies}
        updateSearchUrl={setSearchUrl}
        page={page}
      />
      {loading && <Loading />}
      <div className="main__page page">
        <div className="page__no-found">
          {!movies && <img src="/img/no found.jpg"></img>}
        </div>
        <div className="page__cards card">
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="card"
                onClick={() => openCart(movie.id)}
              >
                <div className="card__img">
                  <img
                    src={movie.poster?.url || "/img/no image.jpg"}
                    alt={movie.name}
                  />
                </div>
                <h3 className="card__title">
                  {movie.name || "Sorry the movie was removed"}
                </h3>
                <p className="card__text">Year: {movie.year}</p>
              </div>
            ))}
        </div>
      </div>
      {movies && <Pagination page={page} setPage={Setpage} />}
      <Outlet />
    </div>
  );
}

export default Home;
