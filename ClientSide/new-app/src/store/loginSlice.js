import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { token: "", isLoggedIn: false },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
        state.token = null;
        state.isLoggedIn = false;
    },
  },
});

export default loginSlice;

export const loginActions = loginSlice.actions;
