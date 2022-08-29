import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginSlice";

import classes from "./Login.module.css";

const UserLogin = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Validacija

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordRepeat = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    let url;
    let user;
    let errorMessage;
    let message;

    if (isLogin) {
      url = "https://localhost:44301/api/Authentication/login";
      user = {
        Username: username.current.value,
        Password: password.current.value,
      };
      message = "Uspesno logovanje";
      errorMessage = "Neuspesno logovanje";
    } else {
      url = "https://localhost:44301/api/Authentication/register";
      user = {
        Username: username.current.value,
        Email: email.current.value,
        Password: password.current.value,
      };
      message = "Uspesna registracija";
      errorMessage = "Neuspesna registracija";
    }

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          console.log(message);
          return res.json();
        } else {
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        dispatch(loginActions.login(data.token));
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(errorMessage);
      });
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? "Login" : "Registracija"}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Unesi korisnicko ime:</label>
          <input type="text" id="username" required ref={username} />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required ref={email} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Lozinka:</label>
          <input type="password" id="password" ref={password} required />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Ponovi Lozinku:</label>
            <input
              type="password"
              id="passwordRepeat"
              ref={passwordRepeat}
              required
            />
          </div>
        )}

        <div className={classes.actions}>
          {!isLoading && !isLogin && <button>Registruj se</button>}
          {!isLoading && isLogin && <button>Uloguj se</button>}
          {isLoading && <p>Ucitavanje...</p>}
          <button onClick={loginHandler} className={classes.toggle}>
            {!isLogin ? "Vec imas profil? Uloguj se" : "Registruj se"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={cancelHandler}
          >
            Odustani
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
