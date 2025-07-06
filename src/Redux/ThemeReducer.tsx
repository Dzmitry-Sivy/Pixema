import { Reducer } from "@reduxjs/toolkit";

interface IThemeState {
  theme: string;
}

// Функция для загрузки состояния темы из localStorage
export const loadState = (): IThemeState => {
  const actualThemeStr = localStorage.getItem("currentUser");

  if (actualThemeStr === null) {
    return { theme: "black" }; // Значение по умолчанию
  }

  try {
    const currentUser = JSON.parse(actualThemeStr);
    const userTheme = currentUser?.changeTheme;

// Проверяем, является ли userTheme строкой, если нет, возвращаем значение по умолчанию
    return {
      theme: typeof userTheme === "string" ? userTheme : "black",
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