import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrdersForAdmin, updateOrderStatus } from "../api";
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

export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatusThunk",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getOrdersForAdminThunk = createAsyncThunk(
  "orders/ getOrdersForAdminThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getOrdersForAdmin();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
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

    builder.addCase(updateOrderStatusThunk.pending, pendingCase);
    builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });

    builder.addCase(getOrdersForAdminThunk.pending, pendingCase);
    builder.addCase(getOrdersForAdminThunk.rejected, rejectedCase);
    builder.addCase(getOrdersForAdminThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
  },
});

export default ordersSlice.reducer;
