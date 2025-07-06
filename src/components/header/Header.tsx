import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "./header.scss";
import { UserContext } from "../../context/UserContext";
import UserProfile from "../user/UserProfile";
import BurgerMenu from "./BurgerMenu";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import UserProfileMobile from "../header/UserProfileMobile"



function Header() {
  const[userProfile,setUserProfile]=useState<boolean>(true)
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const isMenuOpen = useSelector((state: RootState) => state.menu.menu);
 
 
  return (
    <div className="header _container">
      <div className="header__body">
        <h2 className="header__body_title" onClick={() => navigate("/")}>
          Pixema
        </h2>
      
        <UserProfileMobile setUserProfile={setUserProfile} userProfile={userProfile} />
        <nav className={isMenuOpen ? "mobile__nav" : "header__body_nav"}>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            onClick={() => navigate("/")}
          >
            Home
          </NavLink>
          <NavLink
            to="/series"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            onClick={() => navigate("/")}
          >
            Series
          </NavLink>
          <NavLink
            to="/cartoons"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Cartoons
          </NavLink>
        </nav>
        {currentUser ? (
          <UserProfile userProfile={userProfile} />
        ) : (
          <button className="header__body_login" onClick={handleLogin}>
            Log In
          </button>
        )}
          <BurgerMenu />
      </div>
    </div>
  );
}

export default Header;
