import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null, status: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
    setStatus(state, action) {
      state.status = action.payload;
      //success, error, loading, null
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
