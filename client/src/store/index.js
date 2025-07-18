import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoriesSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
  },
});

export default store;
