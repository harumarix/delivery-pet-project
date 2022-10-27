import { createSlice } from "@reduxjs/toolkit";

const initialState = { ordersData: [] };
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    replaceOrders(state, action) {
      state.ordersData = action.payload;
    },
    // changeSorting(state) {
    //   console.log(typeof state.ordersData);
    // },
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;
