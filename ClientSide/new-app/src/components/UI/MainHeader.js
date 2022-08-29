import classes from "./MainHeader.module.css";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import React from "react";
import { loginActions } from "../../store/loginSlice";

const MainHeader = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(loginActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Oglasi</h1>
      <Routes>
        {isLoggedIn && (
          <Route
            path="/"
            element={
              <div>
                <Link
                  onClick={logoutHandler}
                  className={classes.toggle}
                  to="/login"
                >
                  Odjava
                </Link>
              </div>
            }
          />
        )}
        {!isLoggedIn && (
          <Route
            path="/"
            element={
              <div>
                <Link className={classes.toggle} to="/login">
                  Uloguj se
                </Link>
              </div>
            }
          />
        )}
      </Routes>
    </header>
  );
};

export default MainHeader;
