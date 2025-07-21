import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoriesSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
