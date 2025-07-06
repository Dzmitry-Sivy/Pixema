import React, { JSX,  useContext } from "react";
import "./header.scss";
import { UserContext } from "../../context/UserContext";
import { UserProfilesMobileProps } from "../../Types/Types";

function UserProfileMobile({
  setUserProfile,
  userProfile,
}: UserProfilesMobileProps): JSX.Element {
  const { currentUser } = useContext(UserContext);
  return (
    <div
      className={
        currentUser
          ? "header__body_mobile-user"
          : "header__body_mobile-user-hidden"
      }
      onClick={() => {
        setUserProfile(!userProfile);
      }}
    >
     
      {currentUser ? currentUser.name : ""}
    </div>
  );
}

export default UserProfileMobile;
