import React, { useContext, useState, useEffect } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";
import "../loading/loading.scss";
import { LoadingContext } from "../../context/LoadingContext";
import { MainInputProps } from "../../Types/Types";

function MainInput({ movies, setMovies, mainMovies }: MainInputProps) {
  const { apiKey } = useContext(ApiKeyContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {  setLoading } = useContext(LoadingContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      setLoading(true);
      fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=12&query=${inputValue}`,{
  method: 'GET',
  headers: {
    'X-API-KEY':apiKey ,
    'Content-Type': 'application/json'
  }
})
        .then((res) => res.json())
        .then((data) => {
          if (movies.length > 0) {
            setMovies(data.docs);
            setErrorMessage("");
            setLoading(false);
          } else {
            setMovies([]);
            setErrorMessage("No results found.");
            console.log("errorMessage:", errorMessage);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setMovies(mainMovies);
      setErrorMessage("");
      setLoading(false);
    }
  }, [inputValue]);

  return (
    <form className="main__search" onSubmit={(e) => e.preventDefault()}>
      <input
        className="main__input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="search"
      />
      <p>{errorMessage}</p>
    </form>
  );
}

export default MainInput;
