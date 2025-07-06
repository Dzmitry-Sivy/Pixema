import React, { JSX,  } from "react";
import "./header.scss";
import "./burger.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { openMenu, closeMenu } from "../../Redux/BurgerMenuReducer";

function BurgerMenu(): JSX.Element {
  const isMenuOpen = useSelector((state: RootState) => state.menu.menu);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    if (isMenuOpen) {
      console.log("Dispatching closeMenu");
      dispatch(closeMenu());
    } else {
      console.log("Dispatching openMenu");
      dispatch(openMenu());
    }
  };
  return (
    <div className="header__body_burger">
      <label className="burger">
        <input type="checkbox" onClick={toggleMenu} />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
}

export default BurgerMenu;
