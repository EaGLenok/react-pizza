import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.items[existingIndex].count += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    plusPizza(state, action) {
      state.items.find((item) => item.id === action.payload).count += 1;
    },
    minusPizza(state, action) {
      state.items.find((item) => item.id === action.payload).count -= 1;
      if (state.items.find((item) => item.id === action.payload).count <= 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removePizza(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearPizzas(state) {
      state.items = [];
    },
  },
});

export const { addPizza, removePizza, clearPizzas, plusPizza, minusPizza } =
  cartSlice.actions;

export default cartSlice.reducer;
