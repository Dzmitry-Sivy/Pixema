import React, { JSX, useRef } from "react";
import { useState, useContext } from "react";
import "../header/header.scss";
import { UserContext } from "../../context/UserContext";
import Settings from "./Settings";
import { UserProfilesProps } from "..//../Types/Types";
import Favorites from "./Favorites";

function UserProfile({ userProfile }: UserProfilesProps): JSX.Element {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { currentUser, logout } = useContext(UserContext);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const settingsOpen = () => {
    setOpenSettings(true);
  };

  return (
    <div className={userProfile ? "header__body_user _container" : "user-open"}>
      <p className="user_logo">
        {currentUser ? `Hello, ${currentUser.name}` : ""}
      </p>
      <div
        className="user__favorites"
        onClick={() => {
          setOpenFavorites(true);
        }}
      >
        My Favorites
      </div>

      <div className="user__settings" onClick={settingsOpen} ref={settingsRef}>
        My Settings
      </div>

      <button
        className="button"
        onClick={() => {
          logout();
        }}
      >
        Log out
      </button>
      {openSettings && (
        <Settings
          setOpenSettings={setOpenSettings}
          innerRef={settingsRef as React.RefObject<HTMLDivElement>}
        />
      )}
      {openFavorites && <Favorites setOpenFavorites={setOpenFavorites} />}
    </div>
  );
}

export default UserProfile;
