import { configureStore } from "@reduxjs/toolkit";
import changeThemeReducer from "./ThemeReducer";
import burgerMenuReducer from "./BurgerMenuReducer";

const store = configureStore({
  reducer: {
    theme: changeThemeReducer,
    menu: burgerMenuReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
