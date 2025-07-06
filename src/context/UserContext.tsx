import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { IUser, ICard, IUserLogin } from "../Types/Types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


interface IUserContextType {
  currentUser: IUser | null;
  register: (userData: IUser) => boolean;
  logout: () => void;
  login: (userData: IUserLogin) => boolean;
  Users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  userErrorLogin: string;
  userErrorPassword: string;
  favoriteCards: ICard[];
  setFavoriteCards: Dispatch<SetStateAction<ICard[]>>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContextType>({
  currentUser: null,
  register: () => true,
  login: () => true,
  logout: () => {},
  Users: [],
  setUsers: () => [],
  setCurrentUser: () => {},
  userErrorLogin: "",
  userErrorPassword: "",
  favoriteCards: [],
  setFavoriteCards: () => [],
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [Users, setUsers] = useState<IUser[]>([]);
  const [userErrorLogin, setUserErrorLogin] = useState<string>("");
  const [userErrorPassword, setUserErrorPassword] = useState<string>("");
  const [favoriteCards, setFavoriteCards] = useState<ICard[]>(() => {
    const storedFavorites = localStorage.getItem("currentUser");
    if (storedFavorites) {
      const parsed = JSON.parse(storedFavorites);
      return parsed.favorites || [];
    }
    return [];
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Загрузка Users из localStorage при инициализации
  useEffect(() => {
    const storedUsers = localStorage.getItem("Users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Загрузка currentUser из localStorage при инициализации
  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    }
  }, []);

  // Синхронизация изменений currentUser с Users и localStorage
  useEffect(() => {
    if (currentUser) {
     
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.name === currentUser.name ? currentUser : user
        );
        return updatedUsers;
      });

      // Обновляем currentUser в localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser, setCurrentUser]);

  // Сохранение Users в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(Users));
  }, [Users]);

  const register = (userData: IUser): boolean => {
    const userExists = Users.some((user) => user.name === userData.name);

    if (userExists) {
      setUserErrorLogin("Пользователя с таким логином уже существует! ");
      navigate("login");
      return false;
    }

    const passwordExists = Users.some(
      (user) => user.password === userData.password
    );
    if (passwordExists) {
      setUserErrorPassword("Пользователь с таким паролем уже существует!");
      navigate("login");
      return false;
    }

    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("auth", "true");
    setUsers((prevUsers) => [...prevUsers, userData]);
    setUserErrorLogin("");
    setUserErrorPassword("");
    return true;
  };

  const login = (userData: IUserLogin): boolean => {
    const foundUser = Users.find((user) => user.name === userData.name);

    if (!foundUser) {
      setUserErrorLogin("Пользователя с таким логином нет!");
      navigate("login");
      return false;
    }

    if (foundUser.password !== userData.password) {
      setUserErrorPassword("Неверный пароль!");
      navigate("login");
      return false;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    localStorage.setItem("auth", "true");
    setFavoriteCards(foundUser.favorites);
    dispatch({ type: foundUser.changeTheme });
    setUserErrorLogin("");
    setUserErrorPassword("");
    return true;
  };

  const logout = (): void => {
    setCurrentUser(null);
    setFavoriteCards([]);
    dispatch({ type: "black" });
    localStorage.removeItem("currentUser");
    localStorage.setItem("auth", "false");
    setUserErrorLogin("");
    setUserErrorPassword("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        Users,
        setUsers,
        setCurrentUser, 
        userErrorLogin,
        userErrorPassword,
        favoriteCards,
        setFavoriteCards,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
