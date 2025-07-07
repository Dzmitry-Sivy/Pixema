import { Reducer } from "@reduxjs/toolkit";

interface IThemeState {
  theme: string;
}


export const loadState = (): IThemeState => {
  const currentUserActual = localStorage.getItem("currentUser");

  if (currentUserActual=== null) {
    return { theme: "black" }; 
  }

  try {
    const currentUser = JSON.parse(currentUserActual);
    const userTheme = currentUser?.changeTheme;


    return {
      theme: userTheme ? userTheme : "black",
    };
  } catch (error) {
    console.error("Ошибка при загрузке состояния темы:", error);
    return { theme: "black" }; 
  }
};

const initialState: IThemeState = loadState();

const changeThemeReducer: Reducer<IThemeState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "white":
      return { ...state, theme: "white" };
    case "black":
      return { ...state, theme: "black" };
    case "grey":
      return { ...state, theme: "grey" };
    default:
      return state;
  }
};

export default changeThemeReducer;