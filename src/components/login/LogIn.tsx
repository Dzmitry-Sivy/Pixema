import React, { useContext, useState, JSX, } from "react";
import "./login.scss";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LogIn(): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const { register, login, Users, userErrorLogin, userErrorPassword } =
    useContext(UserContext);
  const navigate = useNavigate();
  const closeForm = () => {
    navigate("/");
  };

  const handleRegister = () => {
    const success = register({
      id: Users.length + 1,
      name: userName,
      password: userPassword,
      favorites: [],
      changeTheme: "black",
    });
    if (success) navigate("/");
  };
  const handleSignIn = () => {
    const success = login({
      id: Users.length + 1,
      name: userName,
      password: userPassword,
    });
    if (success) navigate("/");
  };

  return (
    <div className="main__form form">
      <h2 className="form__title">Login</h2>
      <p className="form__delete" onClick={closeForm}>
        X
      </p>
      <form className="form__container">
        <input
          className={userErrorLogin ? "form__error" : ""}
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p className="form__error_message">{userErrorLogin}</p>
        <input
          className={userErrorPassword ? "form__error" : ""}
          placeholder="Password"
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <p className="form__error_message">{userErrorPassword}</p>
        <div className="form__buttons">
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <button type="button" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
