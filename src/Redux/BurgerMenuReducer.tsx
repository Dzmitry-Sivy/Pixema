import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";


interface IBurgerMenuState {
  menu: boolean;
}


const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState: { menu: false } as IBurgerMenuState,
  reducers: {
    openMenu(state) {
     
      state.menu = true;
    },
    closeMenu(state) {
    
      state.menu = false;
    },
  },
});

export const { openMenu, closeMenu } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
