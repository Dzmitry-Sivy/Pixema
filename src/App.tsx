import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Cartoons from "./components/cartoons/Cartoons";
import Favorites from "./components/user/Favorites";
import Settings from "./components/user/Settings";
import LogIn from "./components/login/LogIn";
import User from "./components/user/UserProfile";
import Series from "./components/series/Series";
import MovieCard from "./components/movieCard/MovieCard";
import Trailer from "./components/movieCard/Trailer";
import UserProfile from "./components/user/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import classNames from "classnames";
const apiKey = "60QTFQS-DPE44Y8-G003KC5-W1E0QJ1"; //   60QTFQS-DPE44Y8-G003KC5-W1E0QJ1 --   7PXP2XM-HE44Z9R-PWZJV8Y-PMM3F8J --  H1S6GE5-9VT4ANT-Q5YV6SD-BYK4YF1  -- 6Y8320X-FW64YXM-HSAAXXE-9WY3VMK

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div
      className={classNames("wrapper ", {
        "black-theme": theme === "black",
        "grey-theme": theme === "grey",
        "white-theme": theme === "white",
      })}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home apiKey={apiKey} />}>
          <Route path="card/:id" element={<MovieCard />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="series" element={<Series />}>
          <Route path="card/:id" element={<MovieCard />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
        </Route>
        <Route path="cartoons" element={<Cartoons />}>
          <Route path="card/:id" element={<MovieCard />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
