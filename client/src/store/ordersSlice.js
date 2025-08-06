import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const createOrderThunk = createAsyncThunk(
  "orders/ createOrderthunk",
  async (values, thunkAPI) => {
    try {
      const response = await createOrder(values);
      return response.data.data;
    } catch (error) {
      console.log(error);
      const msg = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.pending, pendingCase);
    builder.addCase(createOrderThunk.rejected, rejectedCase);
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders.push(action.payload);
    });
  },
});

export default ordersSlice.reducer;
