import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../api";
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

export const createCategoryThunk = createAsyncThunk(
  "categories/createCategoryThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createCategory(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "categories/updateCategoryThunk",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await updateCategory(id, values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/deleteCategoryThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteCategory(id);
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

    builder.addCase(createCategoryThunk.pending, pendingCase);
    builder.addCase(createCategoryThunk.rejected, rejectedCase);
    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    });

    builder.addCase(updateCategoryThunk.pending, pendingCase);
    builder.addCase(updateCategoryThunk.rejected, rejectedCase);
    builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });

    builder.addCase(deleteCategoryThunk.pending, pendingCase);
    builder.addCase(deleteCategoryThunk.rejected, rejectedCase);
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
    });
  },
});

export default categoriesSlice.reducer;
