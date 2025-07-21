import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getAllProductsThunk = createAsyncThunk(
  "products/getAllProductsThunk",
  async (values, thunkAPI) => {
    try {
      const response = await getAllProducts();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsThunk.pending, pendingCase);
    builder.addCase(getAllProductsThunk.rejected, rejectedCase);
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    });
  },
});

export default productsSlice.reducer;
