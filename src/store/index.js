import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";
import i18nSlice from "./i18n-slice";
import ordersSlice from "./orders-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    i18n: i18nSlice.reducer,
    orders: ordersSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
