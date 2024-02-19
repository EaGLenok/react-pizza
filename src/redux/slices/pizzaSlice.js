import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { order, sortBy, category, currentPage } = params;
    const { data } = await axios.get(
      `https://65bb702652189914b5bc21bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    items: [],
    status: "loading", // loading, success, error
    searchValue: "",
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setSearch(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
      console.log("An error occured");
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { setItems, setSearch } = pizzaSlice.actions;

export default pizzaSlice.reducer;
