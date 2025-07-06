import React, { JSX, useState, useContext } from "react";
import "./aside.scss";

import { LoadingContext } from "../../context/LoadingContext";
import { MainFilterProps } from "../../Types/Types";
function Filter({
  movies,
  setMovies,
  updateSearchUrl,
  page,
}: MainFilterProps): JSX.Element {
  const [searchCountry, setSearchCountry] = useState<string>("");
  const [searchYear, setSearchYear] = useState<string>("2025");
  const [searchGenres, setSearchGenres] = useState<string>("");
  const [searchNetworks, setSearchNetworks] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [isMobileSideBarOpen, setMobileSideBarOpen] = useState<boolean>(false);

  const { setLoading } = useContext(LoadingContext);

  let searchBarUrl: string;
  //searchBarUrl:string = &year=${searchYear}&genres.name=${searchGenres}`//&typeNumber=${searchType}//&year=${searchYear}=&networks.items.name=${searchNetworks}`;
  const handleSearch = () => {
    setLoading(true);

    searchBarUrl = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=12`;

    if (searchCountry) {
      searchBarUrl += `&countries.name=${searchCountry}`;
    }
    if (searchYear) {
      searchBarUrl += `&year=${searchYear}`;
    }
    if (searchGenres) {
      searchBarUrl += `&genres.name=${searchGenres}`;
    }
    if (searchNetworks) {
      searchBarUrl += `&networks.items.name=${searchNetworks}`;
    }
    if (searchType) {
      searchBarUrl += `&typeNumber=${searchType}`;
    }

    updateSearchUrl(searchBarUrl);

    /* fetch(searchBarUrl, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setMovies(data.docs);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      }); */
  };
  const toggleMobilesSidebar = () => {
    setMobileSideBarOpen((prev) => !prev);
  };

  return (
    <div className="main__sidebar">
      <button className="sidebar__search-icon" onClick={toggleMobilesSidebar}>
        Search more
      </button>
      <aside className={`sidebar ${isMobileSideBarOpen ? "open" : ""}`}>
        <h1 className="sidebar__title">Search bar</h1>
        <div className="sidebar__country">
          <label htmlFor="">Country</label>
          <select onChange={(e) => setSearchCountry(e.target.value)}>
            <option value="">-- country --</option>
            <option value="США">USA</option>
            <option value="Россия">Russia</option>
            <option value="Франция">France</option>
            <option value="Великобритания">Britain</option>
          </select>
        </div>
        <div className="sidebar__year">
          <label htmlFor="">Year</label>
          <input
            type="text"
            placeholder="year"
            onChange={(e) => setSearchYear(e.target.value)}
          />
        </div>
        <div className="sidebar__genres">
          <label htmlFor="">Genres</label>
          <select onChange={(e) => setSearchGenres(e.target.value)}>
            <option value="">--genres --</option>
            <option value="драма">drama</option>
            <option value="комедия">comedy</option>
            <option value="мелодрама">melodrama</option>
            <option value="ужасы">horrors</option>
            <option value="боевик">action</option>
            <option value="фантастика">fantasy</option>
          </select>
        </div>
        <div className="sidebar__networks">
          <label htmlFor="">Studios/Networks</label>
          <select onChange={(e) => setSearchNetworks(e.target.value)}>
            <option value="">--networks --</option>
            <option value="HBO">HBO</option>
            <option value="Netflix">Netflix</option>
            <option value="!Amazon">Amazon</option>
          </select>
        </div>
        <div className="sidebar__type">
          <label htmlFor="">Movie type </label>
          <select onChange={(e) => setSearchType(e.target.value)}>
            <option value="">--movie type --</option>
            <option value="movie">movie</option>
            <option value="tv-series">tv-series</option>
            <option value="cartoon">cartoon</option>
            <option value="animated-series">animated-series</option>
            <option value="anime">anime</option>
          </select>
        </div>
        <button className="sidebar__button button" onClick={handleSearch}>
          Search
        </button>
      </aside>
    </div>
  );
}

export default Filter;
