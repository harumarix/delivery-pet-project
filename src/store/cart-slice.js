import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0, changed: false },
  reducers: {
    addItem(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingItem = state.items[existingItemIndex];
      state.totalAmount = newItem.price * newItem.amount;

      if (existingItem) {
        existingItem.amount += newItem.amount;
      } else {
        state.items.push(newItem);
      }
    },
    removeItem(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingItemIndex];
      state.totalAmount = state.totalAmount - existingItem.price;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.changed = true;
    },
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
