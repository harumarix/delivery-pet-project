import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    login(state, action) {
      const token = action.payload;
      state.token = token;
      state.isLoggedIn = !!token;
      localStorage.setItem("token", token);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
