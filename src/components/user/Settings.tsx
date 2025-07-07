import React, { JSX, useContext, useEffect } from "react";
import "./settings.scss";
import { SettingsProps } from "../../Types/Types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { UserContext } from "../../context/UserContext";
function Settings({
  setOpenSettings,
  innerRef,
}: SettingsProps<HTMLDivElement>): JSX.Element {
  const dispatch = useDispatch();
  const closeSettings = () => {
    setOpenSettings(false);
   /* if (innerRef?.current) {
      innerRef.current.className = "";
    } */
  };
  const theme = useSelector((state: RootState) => state.theme.theme);

  const { setCurrentUser, currentUser } = useContext(UserContext);
  
  useEffect(() => {
    if (!currentUser) return;

    const updatedCurrentUser = {
      ...currentUser,
      changeTheme: theme,
    };
    setCurrentUser(updatedCurrentUser);
  }, [theme]);
  console.log(theme);
  
  return (
    <div className="main__settings settings">
      <p className="settings__close" onClick={closeSettings}>
        X
      </p>
      <div className="settings__theme">
        <h2 className="settings__theme_title">Change Theme</h2>
        <div className="settings__theme_buttons">
          <button
            className="button"
            onClick={() => dispatch({ type: "white" })}
          >
            White
          </button>
          <button
            className="button"
            onClick={() => dispatch({ type: "black" })}
          >
            Black
          </button>
          <button className="button" onClick={() => dispatch({ type: "grey" })}>
            Grey
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
