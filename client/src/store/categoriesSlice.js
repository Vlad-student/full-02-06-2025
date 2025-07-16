import { createSlice, createAsyncThunk, Tuple } from "@reduxjs/toolkit";
import { getAllCategories } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getAllCategoriesThunk = createAsyncThunk(
  "categories/getAllCategoriesThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getAllCategories();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesThunk.pending, pendingCase);
    builder.addCase(getAllCategoriesThunk.rejected, rejectedCase);
    builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
