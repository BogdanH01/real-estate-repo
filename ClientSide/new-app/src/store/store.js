import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users";
import oglasiSlice from "./oglasi";
import loginSlice from "./loginSlice";
import agencijeSlice from "./agencije";

const store = configureStore({
  reducer: {
    user: usersSlice.reducer,
    oglasi: oglasiSlice.reducer,
    login: loginSlice.reducer,
    agencije: agencijeSlice.reducer
  },
});

export default store;
